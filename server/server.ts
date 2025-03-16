/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';
import axios from 'axios';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { getRandomValues } from 'crypto';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

app.post('/api/therapyassessment', async (req, res, next) => {
  try {
    const formData = req.body;
    const sql = `
    insert into "therapyAssessment" ("currentConcerns","lengthOfSymptoms","severityOfDistress","moodRelated","anxietyRelated","traumaRelated","thinkingPatterns","behavioral","therapyGoals","therapyPreferences","primaryCopingStrategies","acceptedTherapyType")
    values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
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
      formData.acceptedTherapyType,
      formData.primaryCopingStrategies,
    ];

    const dbResult = await db.query(sql, params);

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
          content:
            'My user is waiting to see a result of that type of therapy in the area and that is all they need.',
        },
      ],
    });

    res.json(therapyAssessmentResult);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//* Client progress tracking assessment object and async function.

const TherapyProgress = z.object({
  ProgressStatement: z.string(),
  Score: z.number(),
});

app.post('/api/progressassessment', async (req, res, next) => {
  try {
    const formData = req.body;
    const sql = `
    insert into "progressAssessment" ("anxietyLevel","depressionLevel","irritabilityLevel","panicAttacks","panicAttacksIntensity","typeStress","intensityStress","copingStrategy","copingStrategyManageStress","typeOfPhysicalActivity","durationOfActivity","intesityOfActivity","enjoymentLevel","moodBeforeActivity","moodAfterActivity","bedtime","wakeTime","totalSleep","sleepQuality","dreamActivity","morningMood")
    values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
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
    ];

    const dbResult = await db.query(sql, params);

    const progressResult = await openai.chat.completions.create({
      model: 'gpt-4o-2024-05-13',
      messages: [
        {
          role: 'system',
          content:
            'You are a clinical psychology assistant analyzing patient assessment data. Your task is to evaluate the data and provide a single overall wellbeing score on a scale of 1-100, where 100 represents optimal psychological health. Return only the numerical score without explanation.',
        },
        {
          role: 'user',
          content:
            'Please analyze this psychological assessment data and provide a single numerical score: ',
        },
      ],
      max_tokens: 200,
    });
    res.json(progressResult);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//* Querying a database for results, incomplete.

app.get('/api/therapyType', async (req, res, next) => {
  try {
    const sql = `
    select *
    from "Therapy-Compass"
    order by "therapyId"
    `;
    const result = await db.query<TherapyA>(sql);
    console.log(result);
    res.json(result.rows);
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
