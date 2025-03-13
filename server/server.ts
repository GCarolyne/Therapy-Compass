/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';
import axios from 'axios';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
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
  acceptedTherapyType: string;
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

//* My Therapy Assessment object for AI response

const TherapyRecommendation = z.object({
  Therapy: z.string(),
  Reason: z.string(),
});

//* My Therapy Assessment awaiting AI response

app.post('/api/090', async (req, res, next) => {
  try {
    const therapyAssessmentResult = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'developer',
          content:
            'Extract users data to give back two responses one being what type of therapy they need to attend based on the assessment and a short but descriptive motivating reason why.',
        },
        {
          role: 'user',
          content: JSON.stringify(user3),
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

app.post('/api/', async (req, res, next) => {
  try {
    const progressResult = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'developer',
          content:
            'Evaluate the user mental health data and provide a score for each dimension below: Anxiety Intensity (0-10, where 0=none, 10=severe), Depression Severity (0-10, where 0=none, 10=severe), Positive emotion frequency (0-10, where 0=none, 10=frequent), Coping skills iimplementations (0-10, where 0=none, 10=excellent) daily functioning (0-10, where 0=poor, 10=excellent) Return ONLY these numerical scores and a brief 1-2 sentence progress statement. ',
        },
        {
          role: 'user',
          content: JSON.stringify(progressTest),
        },
      ],
    });
    res.json(progressResult);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//* Google maps implementations

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
