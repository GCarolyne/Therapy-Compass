import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export type ProgressReport = {
  anxietyLevel: string;
  depressionLevel: string;
  irritabilityLevel: string;
  panicAttacks: string;
  panicAttacksIntensity: string;
  typeStress: string;
  intensityStress: string;
  copingStrategy: string;
  copingStrategyManageStress: string;
  typeOfPhysicalActivity: string;
  durationOfActivity: string;
  intesityOfActivity: string;
  enjoymentLevel: string;
  moodBeforeActivity: string;
  moodAfterActivity: string;
  bedtime: string;
  wakeTime: string;
  totalSleep: string;
  sleepQuality: string;
  dreamActivity: string;
  morningMood: string;
  progressScore: string;
  date: Date;
};

type Props = {
  onClose: () => void;
  onSubmitSuccess: (response: ProgressReport) => void;
};

export function ProgressAssessment({ onClose, onSubmitSuccess }: Props) {
  const navigate = useNavigate();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/progressassessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert(`Thank you, we added your new score to your progress chart!`);
        const json = await response.json();
        onSubmitSuccess(json);
        setTimeout(() => {
          navigate('/userpage');
        }, 1000);
        onClose();
      } else {
        alert('Error submitting progress report');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  return (
    <>
      <div className="progress-assessment-container">
        <form id="formInput" onSubmit={handleSubmit}>
          {/* Anxiety Assessment Section */}
          <div className="assessment-section">
            <h3 className="section-title">Anxiety Assessment</h3>
            <div className="option-row">
              <label className="form-label">
                How would you rate your anxiety level over the past week?
                <select name="anxietyLevel" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="0" className="select-option">
                    No anxiety
                  </option>
                  <option value="1" className="select-option">
                    Mild anxiety
                  </option>
                  <option value="2" className="select-option">
                    Moderate anxiety
                  </option>
                  <option value="3" className="select-option">
                    High anxiety
                  </option>
                  <option value="4" className="select-option">
                    Severe anxiety
                  </option>
                </select>
              </label>

              <label className="form-label">
                Have you experienced any panic attacks in the past week?
                <select name="panicAttacks" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="1" className="select-option">
                    No panic attacks
                  </option>
                  <option value="2" className="select-option">
                    One mild panic attack
                  </option>
                  <option value="3" className="select-option">
                    2-3 panic attacks
                  </option>
                  <option value="4" className="select-option">
                    4-5 panic attacks
                  </option>
                  <option value="5" className="select-option">
                    More than 5 panic attacks
                  </option>
                </select>
              </label>

              <label className="form-label">
                If you experienced panic attacks, how intense were they?
                <select name="panicAttacksIntensity" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="1" className="select-option">
                    Not applicable
                  </option>
                  <option value="2" className="select-option">
                    Mild
                  </option>
                  <option value="3" className="select-option">
                    Moderate
                  </option>
                  <option value="4" className="select-option">
                    Severe
                  </option>
                  <option value="5" className="select-option">
                    Extreme
                  </option>
                </select>
              </label>
            </div>
          </div>

          {/* Mood Assessment Section */}
          <div className="assessment-section">
            <h3 className="section-title">Mood Assessment</h3>
            <div className="option-row">
              <label className="form-label">
                How would you rate your mood level over the past week?
                <select name="depressionLevel" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="0" className="select-option">
                    I felt positive and enjoyed activities normally.
                  </option>
                  <option value="1" className="select-option">
                    Occasionally felt down but still enjoyed most activities.
                  </option>
                  <option value="2" className="select-option">
                    Often felt sad and had reduced interest in activities.
                  </option>
                  <option value="3" className="select-option">
                    Frequently felt down and found little enjoyment in most
                    activities.
                  </option>
                  <option value="4" className="select-option">
                    Persistent feelings of sadness and almost no enjoyment in
                    activities.
                  </option>
                </select>
              </label>

              <label className="form-label">
                How irritable or easily frustrated have you felt this week?
                <select name="irritabilityLevel" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="0" className="select-option">
                    I felt patient and even-tempered.
                  </option>
                  <option value="1" className="select-option">
                    Minor irritation in specific situations.
                  </option>
                  <option value="2" className="select-option">
                    Noticeably more short-tempered than usual.
                  </option>
                  <option value="3" className="select-option">
                    Frequently felt on edge and easily angered.
                  </option>
                  <option value="4" className="select-option">
                    Constant feelings of frustration and anger.
                  </option>
                </select>
              </label>
            </div>
          </div>

          {/* Stress Assessment Section */}
          <div className="assessment-section">
            <h3 className="section-title">Stress Assessment</h3>
            <div className="option-row">
              <label className="form-label">
                What was your primary source of stress this week?
                <select name="typeStress" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="1" className="select-option">
                    Work or academic stress
                  </option>
                  <option value="2" className="select-option">
                    Relationship or social stress
                  </option>
                  <option value="3" className="select-option">
                    Financial stress
                  </option>
                  <option value="4" className="select-option">
                    Health-related stress
                  </option>
                  <option value="5" className="select-option">
                    Environmental factors
                  </option>
                </select>
              </label>

              <label className="form-label">
                How would you rate the overall intensity of stress you
                experienced?
                <select name="intensityStress" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="1" className="select-option">
                    Felt relaxed most of the time
                  </option>
                  <option value="2" className="select-option">
                    Noticeable but easily managed
                  </option>
                  <option value="3" className="select-option">
                    Definitely felt pressure but still functioning well
                  </option>
                  <option value="4" className="select-option">
                    Difficult to manage and affecting multiple areas of life
                  </option>
                  <option value="5" className="select-option">
                    Overwhelming and significantly impairing daily functioning
                  </option>
                </select>
              </label>
            </div>
          </div>

          {/* Coping Strategies Section */}
          <div className="assessment-section">
            <h3 className="section-title">Coping Strategies</h3>
            <div className="option-row">
              <label className="form-label">
                Which coping strategy did you use most frequently this week?
                <select name="copingStrategy" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="0" className="select-option">
                    Mindfulness or meditation
                  </option>
                  <option value="1" className="select-option">
                    Physical activity or exercise
                  </option>
                  <option value="2" className="select-option">
                    Social support (talking with friends/family)
                  </option>
                  <option value="3" className="select-option">
                    Creative outlets (art, music, writing, etc.)
                  </option>
                  <option value="4" className="select-option">
                    Unhealthy(substance abuse,isolation,etc.)
                  </option>
                </select>
              </label>

              <label className="form-label">
                How effective was your primary coping strategy in managing
                stress?
                <select
                  name="copingStrategyManageStress"
                  className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="0" className="select-option">
                    Very effective - Successfully reduced stress to manageable
                    levels
                  </option>
                  <option value="1" className="select-option">
                    Somewhat effective - Provided notable relief
                  </option>
                  <option value="2" className="select-option">
                    Neutral - Neither helped nor made things worse
                  </option>
                  <option value="3" className="select-option">
                    Somewhat ineffective - Provided minimal relief
                  </option>
                  <option value="4" className="select-option">
                    Not effective - Did not reduce stress or made it worse
                  </option>
                </select>
              </label>
            </div>
          </div>

          {/* Physical Activity Section */}
          <div className="assessment-section">
            <h3 className="section-title">Physical Activity</h3>
            <div className="option-row">
              <label className="form-label">
                What type of physical activity did you engage in most
                frequently?
                <select name="typeOfPhysicalActivity" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="0" className="select-option">
                    Cardiovascular exercise (walking, running, cycling, etc.)
                  </option>
                  <option value="1" className="select-option">
                    Strength training or resistance exercises
                  </option>
                  <option value="2" className="select-option">
                    Flexibility exercises (yoga, stretching, etc.)
                  </option>
                  <option value="3" className="select-option">
                    Sports or recreational activities
                  </option>
                  <option value="4" className="select-option">
                    No significant physical activity
                  </option>
                </select>
              </label>

              <label className="form-label">
                On average, how long were your physical activity sessions?
                <select name="durationOfActivity" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="4" className="select-option">
                    Less than 15 minutes
                  </option>
                  <option value="3" className="select-option">
                    15-30 minutes
                  </option>
                  <option value="2" className="select-option">
                    30-45 minutes
                  </option>
                  <option value="1" className="select-option">
                    45-60 minutes
                  </option>
                  <option value="0" className="select-option">
                    More than 60 minutes
                  </option>
                </select>
              </label>
            </div>

            <div className="option-row">
              <label className="form-label">
                How would you rate the intensity of your physical activity?
                <select name="intesityOfActivity" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="4" className="select-option">
                    Very light - No noticeable change in breathing or sweating
                  </option>
                  <option value="3" className="select-option">
                    Light - Slight increase in breathing, minimal sweating
                  </option>
                  <option value="2" className="select-option">
                    Moderate - Noticeable increase in breathing and some
                    sweating
                  </option>
                  <option value="1" className="select-option">
                    Vigorous - Breathing hard and sweating
                  </option>
                  <option value="0" className="select-option">
                    Very intense - Maximum effort, significant sweating and
                    elevated heart rate
                  </option>
                </select>
              </label>

              <label className="form-label">
                How much did you enjoy your physical activities this week?
                <select name="enjoymentLevel" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="5" className="select-option">
                    Did not enjoy at all
                  </option>
                  <option value="4" className="select-option">
                    Enjoyed slightly
                  </option>
                  <option value="3" className="select-option">
                    Moderately enjoyed
                  </option>
                  <option value="2" className="select-option">
                    Greatly enjoyed
                  </option>
                  <option value="1" className="select-option">
                    Extremely enjoyed and looked forward to activities
                  </option>
                </select>
              </label>
            </div>

            <div className="option-row">
              <label className="form-label">
                How would you typically your mood before engaging in physical
                activity?
                <select name="moodBeforeActivity" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="0" className="select-option">
                    Very negative
                  </option>
                  <option value="1" className="select-option">
                    Somewhat negative
                  </option>
                  <option value="2" className="select-option">
                    Neutral
                  </option>
                  <option value="3" className="select-option">
                    Somewhat positive
                  </option>
                  <option value="4" className="select-option">
                    Very positive
                  </option>
                </select>
              </label>

              <label className="form-label">
                How would you rate your mood after completing physical activity?
                <select name="moodAfterActivity" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="0" className="select-option">
                    Very negative
                  </option>
                  <option value="1" className="select-option">
                    Somewhat negative
                  </option>
                  <option value="2" className="select-option">
                    Neutral
                  </option>
                  <option value="3" className="select-option">
                    Somewhat positive
                  </option>
                  <option value="4" className="select-option">
                    Very positive
                  </option>
                </select>
              </label>
            </div>
          </div>

          {/* Sleep Patterns Section */}
          <div className="assessment-section">
            <h3 className="section-title">Sleep Patterns</h3>
            <div className="option-row">
              <label className="form-label">
                What time did you typically go to bed this week?
                <select name="bedtime" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="1" className="select-option">
                    Before 9:00 PM
                  </option>
                  <option value="2" className="select-option">
                    9:00 PM - 10:30 PM
                  </option>
                  <option value="3" className="select-option">
                    10:30 PM - 12:00 AM
                  </option>
                  <option value="4" className="select-option">
                    12:00 AM - 1:30 AM
                  </option>
                  <option value="5" className="select-option">
                    After 1:30 AM
                  </option>
                </select>
              </label>

              <label className="form-label">
                What time did you typically wake up this week?
                <select name="wakeTime" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="1" className="select-option">
                    Before 6:00 AM
                  </option>
                  <option value="2" className="select-option">
                    6:00 AM - 7:30 AM
                  </option>
                  <option value="3" className="select-option">
                    7:30 AM - 9:00 AM
                  </option>
                  <option value="4" className="select-option">
                    9:00 AM - 10:30 AM
                  </option>
                  <option value="5" className="select-option">
                    After 10:30 AM
                  </option>
                </select>
              </label>
            </div>

            <div className="option-row">
              <label className="form-label">
                On average, how many hours of sleep did you get each night?
                <select name="totalSleep" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="1" className="select-option">
                    Less than 5 hours
                  </option>
                  <option value="2" className="select-option">
                    5-6 hours
                  </option>
                  <option value="3" className="select-option">
                    6-7 hours
                  </option>
                  <option value="4" className="select-option">
                    7-8 hours
                  </option>
                  <option value="5" className="select-option">
                    More than 8 hours
                  </option>
                </select>
              </label>

              <label className="form-label">
                How many hours did you sleep last night?
                <select name="lastNightSleep" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="1" className="select-option">
                    Less than 5 hours
                  </option>
                  <option value="2" className="select-option">
                    5-6 hours
                  </option>
                  <option value="3" className="select-option">
                    6-7 hours
                  </option>
                  <option value="4" className="select-option">
                    7-8 hours
                  </option>
                  <option value="5" className="select-option">
                    More than 8 hours
                  </option>
                </select>
              </label>
            </div>

            <div className="option-row">
              <label className="form-label">
                What was the quality of your sleep last night?
                <select name="sleepQuality" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="0" className="select-option">
                    Very poor
                  </option>
                  <option value="1" className="select-option">
                    Poor
                  </option>
                  <option value="2" className="select-option">
                    Average
                  </option>
                  <option value="3" className="select-option">
                    Good
                  </option>
                  <option value="4" className="select-option">
                    Excellent
                  </option>
                </select>
              </label>

              <label className="form-label">
                How would you rate your dreams activity from last night?
                <select name="dreamActivity" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="0" className="select-option">
                    No dreams recalled
                  </option>
                  <option value="1" className="select-option">
                    Pleasant dreams
                  </option>
                  <option value="2" className="select-option">
                    Neutral dreams
                  </option>
                  <option value="3" className="select-option">
                    Vivid dreams
                  </option>
                  <option value="4" className="select-option">
                    Nightmares
                  </option>
                </select>
              </label>
            </div>

            <div className="option-row">
              <label className="form-label">
                How did you feel this morning?
                <select name="morningMood" className="form-select">
                  <option value="" disabled className="select-option">
                    Choose One
                  </option>
                  <option value="4" className="select-option">
                    Refreshed and energetic
                  </option>
                  <option value="3" className="select-option">
                    Content and calm
                  </option>
                  <option value="2" className="select-option">
                    Neutral
                  </option>
                  <option value="1" className="select-option">
                    Irritable and fatigued
                  </option>
                  <option value="numb" className="select-option">
                    Numb
                  </option>
                </select>
              </label>
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
