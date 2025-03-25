/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express, { response } from 'express';
import pg, { Client } from 'pg';
import { ClientError, errorMiddleware, authMiddleware } from './lib/index.js';
import axios from 'axios';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { getRandomValues } from 'crypto';
import argon2, { hash } from 'argon2';
import { nextTick } from 'process';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};
type Auth = {
  username: string;
  password: string;
};

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const googleKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

//* This is a interface I have prepared for one of my objects.

type TherapyA = {
  therapyId?: number;
  userId?: number;
  currentConcerns: string;
  lengthOfSymptoms: string;
  severityOfDistress: number;
  moodRelated: string;
  anxietyRelated: string;
  traumaRelated: string;
  thinkingPatterns: string;
  behavioral: string;
  therapyGoals: string;
  therapyPreferences: string;
  primaryCopingStrategies: string;
  acceptedTherapyType?: string;
};

//* Test mock up user for therapy type assessment.

const user3 = {
  currentConcerns: 'Isolation',
  lengthOfSymptoms: 'Months',
  severityOfDistress: '7',
  moodRelated: 'Hopelessness',
  anxietyRelated: 'OverThinking',
  traumaRelated: 'Avoidance',
  thinkingPatterns: 'Catastrophizing',
  behavioral: 'Withdrawal',
  therapyGoals: 'Connection',
  therapyPreferences: 'Directive',
  primaryCopingStrategies: 'substance abuse',
};

let content = '';

for (const [key, value] of Object.entries(user3)) {
  content += `${key}: ${value},`;
}

//* Test mock up for a progress report assessment.

const user5 = {
  anxietyLevel: 'high',
  depressionLevel: 'daily',
  irritabilityLevel: 'lower than usual',
  panicAttacks: '5',
  panicAttacksIntensity: '9',
  typeStress: 'family related',
  intensityStress: 'hourly',
  copingStrategy: 'exercise',
  copingStrategyManageStress: 'smoking',
  typeOfPhysicalActivity: 'walking',
  durationOfActivity: '1 hour',
  intesityOfActivity: 'hard',
  enjoymentLevel: 'no enjoyment',
  moodBeforeActivity: 'very low energy',
  moodAfterActivity: 'not better at all',
  bedtime: '1 am',
  wakeTime: '8 am',
  totalSleep: '7hours',
  sleepQuality: 'average',
  dreamActivity: 'nightmares',
  morningMood: 'sluggish',
  progressScore: '',
};

let progressTest = '';

for (const [key, value] of Object.entries(user5)) {
  progressTest += `${key}: ${value},`;
}

//* My Therapy Assessment object for AI response, create assessment for therapy type css front end and then back end

const TherapyRecommendation = z.object({
  Therapy: z.string(),
  Reason: z.string(),
});

//* My Therapy Assessment awaiting AI response

app.post('/api/therapyassessment', authMiddleware, async (req, res, next) => {
  try {
    const formData = req.body;
    if (formData === undefined) {
      throw new ClientError(400, 'must fill out form.');
    }
    const therapyAssessmentResult = await openai.chat.completions.create({
      model: 'gpt-4o-2024-05-13',
      messages: [
        {
          role: 'system',
          content:
            'You are a clinical psychology assistant analyzing patient assessment data. Extract users data and recommend them a type of therapy. This is not being used for professional medical help. answer with just the type of therapy.',
        },
        {
          role: 'user',
          content: `My user is waiting to see a result of that type of therapy that is all they need.${JSON.stringify(
            formData
          )}`,
        },
      ],
    });

    const aiResponse = therapyAssessmentResult.choices[0].message.content;

    const sql = `
    insert into "therapyAssessment" ("currentConcerns","lengthOfSymptoms","severityOfDistress","moodRelated","anxietyRelated","traumaRelated","thinkingPatterns","behavioral","therapyGoals","therapyPreferences","acceptedTherapyType","primaryCopingStrategies","userId")
    values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    returning *`;

    const params = [
      formData.currentConcerns,
      formData.lengthOfSymptoms,
      formData.severityOfDistress,
      formData.moodRelated,
      formData.anxietyRelated,
      formData.traumaRelated,
      formData.thinkingPatterns,
      formData.behavioral,
      formData.therapyGoals,
      formData.therapyPreferences,
      aiResponse,
      formData.primaryCopingStrategies,
      req.user?.userId,
    ];

    const dbResult = await db.query(sql, params);

    res.json(dbResult.rows[0]);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.get('/api/therapyassessment', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
    select *
    from "therapyassessment"`;
    const response = await db.query(sql);
    if (!response) throw new Error('response failed');
    res.json(response.rows);
  } catch (err) {
    next(err);
  }
});

app.put('/api/calendar', async (req, res, next) => {
  try {
    const { notes, title, date, notesId } = req.body;
    if (!req.body) {
      throw new Error('request body not provided.');
    }
    const sql = `
    update "calendarNotes"
    set "notes" = $1,
    "title" = $2,
    "date" = $3
    where "notesId" = $4
    returning *`;
    const params = [notes, title, date, notesId];
    const response = await db.query(sql, params);
    if (!response) throw new Error('response failed');
    res.json(response.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/calendar', async (req, res, next) => {
  try {
    const formData = req.body;
    if (formData === undefined) {
      throw new ClientError(400, 'must fill out form.');
    }

    const sql = `
    insert into "calendarNotes" ("title","notes","date","notesId")
    values ($1,$2,$3,$4)
    returning *`;
    const params = [formData.notes, formData.title, formData.date];
    const response = await db.query(sql, params);
    if (!response) throw new Error('response failed');
    res.json(response.rows);
  } catch (err) {
    next(err);
  }
});

//* Client progress tracking assessment object and async function.

export const TherapyProgress = z.object({
  ProgressStatement: z.string(),
  Score: z.number(),
});

app.post('/api/progressassessment', authMiddleware, async (req, res, next) => {
  try {
    const formData = req.body;
    if (!formData.date) {
      formData.date = new Date().toISOString();
    }
    if (formData === undefined) {
      throw new ClientError(400, 'must contain form data.');
    }
    const progressResult = await openai.chat.completions.create({
      model: 'gpt-4o-2024-05-13',
      messages: [
        {
          role: 'system',
          content: `You are a clinical psychology assistant analyzing patient assessment data.
    Your task is to evaluate the data and provide a single overall progress score on a scale of 1-100,
    where 100 represents optimal psychological health. You must respond with ONLY a single integer
    between 1 and 100, with no explanation, commentary, or additional text.`,
        },
        {
          role: 'user',
          content: `Analyze the following mental health assessment data and return ONLY a single numeric progress score
    between 1-100 that can be directly used in a chart visualization.
    ${JSON.stringify(formData)}`,
        },
      ],
      max_tokens: 200,
    });

    const aiResponse = progressResult.choices[0].message.content;

    const sql = `
    insert into "progressAssessment" ("anxietyLevel","depressionLevel","irritabilityLevel","panicAttacks","panicAttacksIntensity","typeStress","intensityStress","copingStrategy","copingStrategyManageStress","typeOfPhysicalActivity","durationOfActivity","intesityOfActivity","enjoymentLevel","moodBeforeActivity","moodAfterActivity","bedtime","wakeTime","totalSleep","sleepQuality","dreamActivity","morningMood","progressScore","date","userId")
    values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)
    returning *`;

    const params = [
      formData.anxietyLevel,
      formData.depressionLevel,
      formData.irritabilityLevel,
      formData.panicAttacks,
      formData.panicAttacksIntensity,
      formData.typeStress,
      formData.intensityStress,
      formData.copingStrategy,
      formData.copingStrategyManageStress,
      formData.typeOfPhysicalActivity,
      formData.durationOfActivity,
      formData.intesityOfActivity,
      formData.enjoymentLevel,
      formData.moodBeforeActivity,
      formData.moodAfterActivity,
      formData.bedtime,
      formData.wakeTime,
      formData.totalSleep,
      formData.sleepQuality,
      formData.dreamActivity,
      formData.morningMood,
      aiResponse,
      formData.date,
      req.user?.userId,
    ];
    const dbResult = await db.query(sql, params);

    res.status(201).json(dbResult.rows[0]);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//* Querying a database for progressScore.

app.get('/api/progressassessment', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
    select *
    from "progressAssessment"
    where "userId" = $1
    `;
    const params = [req.user?.userId];

    const response = await db.query(sql, params);
    if (!response) throw new Error('response failed');
    console.log('res', response.rows);

    res.json(response.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }

    const safePassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("userName", "hashedPassword")
      values($1, $2)
      returning "userName", "userId"`;
    const params = [username, safePassword];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `
      select "userId", "hashedPassword", "userName"
      from "users"
      where "userName" = $1
      `;
    const params = [username];
    const result = await db.query(sql, params);
    const user = result.rows[0];
    if (!user) throw new ClientError(401, 'invalid login information.');

    const passwordValid = await argon2.verify(user.hashedPassword, password);

    if (!passwordValid) throw new ClientError(401, 'invalid login error');
    if (passwordValid) {
      const payload = {
        userId: user.userId,
        username: user.userName,
      };
      const token = jwt.sign(payload, hashKey);
      res.status(200).json({
        user: payload,
        token,
      });
    }
  } catch (err) {
    next(err);
  }
});

/*
 * Handles paths that aren't handled by any other route handler.
 * It responds with `index.html` to support page refreshes with React Router.
 * This must be the _last_ route, just before errorMiddleware.
 */

app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
