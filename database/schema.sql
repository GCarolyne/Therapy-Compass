set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "firstName" text,
  "userName" text UNIQUE,
  "hashedPassword" text,
  "lastLoggedIn" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "progressAssessment" (
  "progressId" serial PRIMARY KEY,
  "userId" integer,
  "anxietyLevel" text,
  "depressionLevel" text,
  "irritabilityLevel" text,
  "panicAttacks" integer,
  "panicAttacksIntensity" integer,
  "typeStress" text,
  "intensityStress" text,
  "copingStrategy" text,
  "copingStrategyManageStress" text,
  "typeOfPhysicalActivity" text,
  "durationOfActivity" text,
  "intesityOfActivity" text,
  "enjoymentLevel" text,
  "moodBeforeActivity" text,
  "moodAfterActivity" text,
  "bedtime" integer,
  "wakeTime" integer,
  "totalSleep" integer,
  "sleepQuality" text,
  "dreamActivity" text,
  "morningMood" text,
  "progressScore" integer,
  "date" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "therapyAssessment" (
  "therapyId" serial PRIMARY KEY,
  "userId" integer,
  "currentConcerns" text,
  "lengthOfSymptoms" text,
  "severityOfDistress" integer,
  "moodRelated" text,
  "anxietyRelated" text,
  "traumaRelated" text,
  "thinkingPatterns" text,
  "behavioral" text,
  "therapyGoals" text,
  "therapyPreferences" text,
  "primaryCopingStrategies" text,
  "acceptedTherapyType" text,
  "date" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "calendarNotes" (
  "notesId" serial PRIMARY KEY,
  "userId" integer,
  "notes" text,
  "date" timestamptz NOT NULL DEFAULT (now())
);

ALTER TABLE "progressAssessment" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "therapyAssessment" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "calendarNotes" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");
