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

//* testing mock up of a fake assessment

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

// My Therapy Assessment object for AI response

const TherapyRecommendation = z.object({
  Therapy: z.string(),
  Reason: z.string(),
});

// My Therapy Assessment awaiting AI response

app.post('/api/', async (req, res, next) => {
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
