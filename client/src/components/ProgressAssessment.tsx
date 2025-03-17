import { FormEvent } from 'react';

export function ProgressAssessment() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const response = await fetch('/api/progressassessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Progress Report submitted successfully!');
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
          <label>
            How would you rate your anxiety level over the past week?
            <select name="anxietyLevel">
              <option value="" disabled>
                Choose One
              </option>
              <option value="0 no anxiety">No anxiety</option>
              <option value="1 Mild anxiety ">Mild anxiety </option>
              <option value="2 Moderate anxiety ">Moderate anxiety</option>
              <option value="3 High anxiety">High anxiety</option>
              <option value="4 Severe anxiety">Severe anxiety</option>
            </select>
          </label>
          <label>
            How would you rate your mood level over the past week?
            <select name="depressionLevel">
              <option value="" disabled>
                Choose One
              </option>
              <option value="0 I felt positive and enjoyed activities normally">
                I felt positive and enjoyed activities normally.
              </option>
              <option value="1 Occasionally felt down but still enjoyed most activities">
                Occasionally felt down but still enjoyed most activities.
              </option>
              <option value="2 Often felt sad and had reduced interest in activities">
                Often felt sad and had reduced interest in activities.
              </option>
              <option value="3 Frequently felt down and found little enjoyment in most activities">
                Frequently felt down and found little enjoyment in most
                activities.
              </option>
              <option value="4 Persistent feelings of sadness and almost no enjoyment in activities">
                Persistent feelings of sadness and almost no enjoyment in
                activities.
              </option>
            </select>
          </label>
          <label>
            How irritable or easily frustrated have you felt this week?
            <select name="irritabilityLevel">
              <option value="" disabled>
                Choose One
              </option>
              <option value="0 I felt patient and even-tempered">
                I felt patient and even-tempered.
              </option>
              <option value="1 Minor irritation in specific situations">
                Minor irritation in specific situations.
              </option>
              <option value="2 Noticeably more short-tempered than usual">
                Noticeably more short-tempered than usual.
              </option>
              <option value="3 Frequently felt on edge and easily angered">
                Frequently felt on edge and easily angered.
              </option>
              <option value="4 Constant feelings of frustration and anger">
                Constant feelings of frustration and anger.
              </option>
            </select>
          </label>
          <label>
            Have you experienced any panic attacks in the past week?
            <select name="4 panicAttacks">
              <option value="" disabled>
                Choose One
              </option>
              <option value={1}>No panic attacks</option>
              <option value={2}>One mild panic attack</option>
              <option value={3}>2-3 panic attacks</option>
              <option value={4}>4-5 panic attacks</option>
              <option value={5}>More than 5 panic attacks</option>
            </select>
          </label>
          <label>
            If you experienced panic attacks, how intense were they?
            <select name="panicAttacksIntensity">
              <option value="" disabled>
                Choose One
              </option>
              <option value={1}>Not applicable</option>
              <option value={2}>Mild</option>
              <option value={3}>Moderate</option>
              <option value={4}>Severe</option>
              <option value={5}>Extreme</option>
            </select>
          </label>
          <label>
            What was your primary source of stress this week?
            <select name="typeStress">
              <option value="" disabled>
                Choose One
              </option>
              <option value={1}>Work or academic stress</option>
              <option value={2}>Relationship or social stress</option>
              <option value={3}>Financial stress</option>
              <option value={4}>Health-related stress</option>
              <option value={5}>Environmental factors</option>
            </select>
          </label>
          <label>
            How would you rate the overall intensity of stress you experienced?
            <select name="intensityStress">
              <option value="" disabled>
                Choose One
              </option>
              <option value={1}>Felt relaxed most of the time</option>
              <option value={2}>Noticeable but easily managed</option>
              <option value={3}>
                Definitely felt pressure but still functioning well
              </option>
              <option value={4}>
                Difficult to manage and affecting multiple areas of life
              </option>
              <option value={5}>
                Overwhelming and significantly impairing daily functioning
              </option>
            </select>
          </label>
          <label>
            Which coping strategy did you use most frequently this week?
            <select name="copingStrategy">
              <option value="" disabled>
                Choose One
              </option>
              <option value="0 Mindfulness or meditation">
                Mindfulness or meditation
              </option>
              <option value="1 Physical activity or exercise">
                Physical activity or exercise
              </option>
              <option value="2 Social support (talking with friends/family)">
                Social support (talking with friends/family)
              </option>
              <option value="3 Creative outlets (art, music, writing, etc.)">
                Creative outlets (art, music, writing, etc.)
              </option>
              <option value="4 Unhealthy(substance abuse,aggression,etc.)">
                Unhealthy(substance abuse,isolation,etc.)
              </option>
            </select>
          </label>
          <label>
            How effective was your primary coping strategy in managing stress?
            <select name="copingStrategyManageStress">
              <option value="" disabled>
                Choose One
              </option>
              <option value="0 Very effective - Successfully reduced stress to manageable levels">
                Very effective - Successfully reduced stress to manageable
                levels
              </option>
              <option value="1 Somewhat effective - Provided notable relief">
                Somewhat effective - Provided notable relief
              </option>
              <option value="2 Neutral - Neither helped nor made things worse">
                Neutral - Neither helped nor made things worse
              </option>
              <option value="3 Somewhat ineffective - Provided minimal relief">
                Somewhat ineffective - Provided minimal relief
              </option>
              <option value="4 Not effective - Did not reduce stress or made it worse">
                Not effective - Did not reduce stress or made it worse
              </option>
            </select>
          </label>
          <label>
            What type of physical activity did you engage in most frequently?
            <select name="typeOfPhysicalActivity">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Cardiovascular exercise (walking, running, cycling, etc.)">
                Cardiovascular exercise (walking, running, cycling, etc.)
              </option>
              <option value="Strength training or resistance exercises">
                Strength training or resistance exercises
              </option>
              <option value="Flexibility exercises (yoga, stretching, etc.)">
                Flexibility exercises (yoga, stretching, etc.)
              </option>
              <option value="Sports or recreational activities">
                Sports or recreational activities
              </option>
              <option value="No significant physical activity">
                No significant physical activity
              </option>
            </select>
          </label>
          <label>
            On average, how long were your physical activity sessions?
            <select name="durationOfActivity">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Less than 15 minutes">Less than 15 minutes</option>
              <option value="15-30 minutes">15-30 minutes</option>
              <option value="30-45 minutes">30-45 minutes</option>
              <option value="45-60 minutes">45-60 minutes</option>
              <option value="More than 60 minutes">More than 60 minutes</option>
            </select>
          </label>
          <label>
            How would you rate the intensity of your physical activity?
            <select name="intesityOfActivity">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Very light - No noticeable change in breathing or sweating">
                Very light - No noticeable change in breathing or sweating
              </option>
              <option value="Light - Slight increase in breathing, minimal sweating">
                Light - Slight increase in breathing, minimal sweating
              </option>
              <option value="Moderate - Noticeable increase in breathing and some sweating">
                Moderate - Noticeable increase in breathing and some sweating
              </option>
              <option value="Vigorous - Breathing hard and sweating">
                Vigorous - Breathing hard and sweating
              </option>
              <option value="Very intense - Maximum effort, significant sweating and elevated heart rate">
                Very intense - Maximum effort, significant sweating and elevated
                heart rate
              </option>
            </select>
          </label>
          <label>
            How much did you enjoy your physical activities this week?
            <select name="enjoymentLevel">
              <option value="" disabled>
                Choose One
              </option>
              <option value="5 Did not enjoy at all">
                Did not enjoy at all
              </option>
              <option value="4 Enjoyed slightly">Enjoyed slightly</option>
              <option value="3 Moderately enjoyed">Moderately enjoyed</option>
              <option value="2 Greatly enjoyed">Greatly enjoyed</option>
              <option value="1 Extremely enjoyed and looked forward to activities">
                Extremely enjoyed and looked forward to activities
              </option>
            </select>
          </label>
          <label>
            How would you typically your mood before engaging in physical
            activity?
            <select name="moodBeforeActivity">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Very negative">Very negative</option>
              <option value="Somewhat negative">Somewhat negative</option>
              <option value="Neutral">Neutral </option>
              <option value="Somewhat positive ">Somewhat positive </option>
              <option value="Very positive ">Very positive</option>
            </select>
          </label>
          <label>
            How would you rate your mood after completing physical activity?
            <select name="moodAfterActivity">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Very negative">Very negative</option>
              <option value="Somewhat negative">Somewhat negative</option>
              <option value="Neutral">Neutral </option>
              <option value="Somewhat positive ">Somewhat positive </option>
              <option value="Very positive ">Very positive</option>
            </select>
          </label>
          <label>
            What time did you typically go to bed this week?
            <select name="bedtime">
              <option value="" disabled>
                Choose One
              </option>
              <option value={1}>Before 9:00 PM</option>
              <option value={2}>9:00 PM - 10:30 PM</option>
              <option value={3}>10:30 PM - 12:00 AM</option>
              <option value={4}>12:00 AM - 1:30 AM</option>
              <option value={5}>After 1:30 AM</option>
            </select>
          </label>
          <label>
            What time did you typically wake up this week?
            <select name="wakeTime">
              <option value="" disabled>
                Choose One
              </option>
              <option value={1}>Before 9:00 PM</option>
              <option value={2}>9:00 PM - 10:30 PM</option>
              <option value={3}>10:30 PM - 12:00 AM</option>
              <option value={4}>12:00 AM - 1:30 AM</option>
              <option value={5}>After 1:30 AM</option>
            </select>
          </label>
          <label>
            On average, how many hours of sleep did you get each night?
            <select name="totalSleep">
              <option value="" disabled>
                Choose One
              </option>
              <option value={1}>Less than 5 hours</option>
              <option value={2}>5-6 hours</option>
              <option value={3}>6-7 hours</option>
              <option value={4}>7-8 hours</option>
              <option value={5}>More than 8 hours</option>
            </select>
          </label>
          <label>
            How many hours did you sleep last night?
            <select name="totalSleep">
              <option value="" disabled>
                Choose One
              </option>
              <option value={1}>Less than 5 hours</option>
              <option value={2}>5-6 hours</option>
              <option value={3}>6-7 hours</option>
              <option value={4}>7-8 hours</option>
              <option value={5}>More than 8 hours</option>
            </select>
          </label>
          <label>
            What was the quality of your sleep last night??
            <select name="sleepQuality">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Very poor">"Very poor"</option>
              <option value="Poor">"Poor"</option>
              <option value="Average">"Average"</option>
              <option value="Good">"Good"</option>
              <option value="Excellent"> "Excellent"</option>
            </select>
          </label>
          <label>
            How would you rate your dreams activity from last night?
            <select name="dreamActivity">
              <option value="" disabled>
                Choose One
              </option>
              <option value="No dreams recalled">"No dreams recalled"</option>
              <option value="Pleasant dreams">"Pleasant dreams"</option>
              <option value="Neutral dreams">"Neutral dreams"</option>
              <option value="Vivid dreams">"Vivid dreams"</option>
              <option value="Nightmares"> "Nightmares"</option>
            </select>
          </label>
          <label>
            How did you feel this morning?
            <select name="morningMood">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Refreshed and energetic">
                "Refreshed and energetic"
              </option>
              <option value="Content and calm">Content and calm</option>
              <option value="Neutral">"Neutral"</option>
              <option value="Irritable and fatigued">
                "Irritable and fatigued"
              </option>
              <option value="numb">"numb"</option>
            </select>
          </label>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
