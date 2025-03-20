import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function TherapyAssessment() {
  const navigate = useNavigate();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const response = await fetch('/api/therapyassessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Assessment submitted successfully!');
      }
      const json = await response.json();
      console.log('json', json);
      navigate(`/googleMaps/${json}`);
    } catch (error) {
      console.error('error', error);
    }
  }
  return (
    <>
      <div className="therapy-assessment-container">
        <form id="formInput" onSubmit={handleSubmit}>
          <label>
            What are your current concerns?
            <select name="currentConcerns">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Depression or Low Mood">
                Depression or Low Mood
              </option>
              <option value="Anxiety or excessive worry">
                Anxiety or excessive worry
              </option>
              <option value="Relationship difficulties">
                Relationship difficulties
              </option>
              <option value="Trauma or past experiences">
                Trauma or Past experiences from childhood
              </option>
              <option value="Work or academic stress">
                Work or academic stress
              </option>
            </select>
          </label>
          <label>
            What is the length of the symptoms you are experiencing?
            <select name="lengthOfSymptoms">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Less than 1 month">Less than 1 month</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="More than 1 year">More than 1 year</option>
            </select>
          </label>
          <label>
            Are any of these symptoms mood related?
            <select name="moodRelated">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Persistent sadness or emptiness">
                Persistent sadness or emptiness
              </option>
              <option value="Loss of interest in activities">
                Loss of interest in activities
              </option>
              <option value="Feelings of worthlessness or guilt">
                Feelings of worthlessness or guilt
              </option>
              <option value="Sleep disturbances">Sleep disturbances</option>
              <option value="Changes in appetite or weight">
                Changes in appetite or weight
              </option>
            </select>
          </label>
          <label>
            Are any of these symptoms mood related?
            <select name="severityOfDistress">
              <option value="" disabled>
                Choose One
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
          <label>
            Are any of these symptoms mood related?
            <select name="anxietyRelated">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Excessive worry or fear">
                Excessive worry or fear
              </option>
              <option value="Physical tension or restlessness">
                Physical tension or restlessness
              </option>
              <option value="Panic attacks">Panic attacks</option>
              <option value="Avoidance behaviors">Avoidance behaviors</option>
              <option value="Social anxiety">Social anxiety</option>
            </select>
          </label>
          <label>
            Are any of these symptoms trauma related?
            <select name="traumaRelated">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Intrusive memories or flashbacks">
                Intrusive memories or flashbacks
              </option>
              <option value="Nightmares related to traumatic events">
                Nightmares related to traumatic events
              </option>
              <option value="Avoidance of trauma reminders">
                Avoidance of trauma reminders
              </option>
              <option value="Hypervigilance">Hypervigilance</option>
              <option value="Emotional numbness or detachment">
                Emotional numbness or detachment
              </option>
            </select>
          </label>
          <label>
            What is one of the main daily thinking habits you noticed?
            <select name="thinkingPatterns">
              <option value="" disabled>
                Choose One
              </option>
              <option value="All-or-nothing thinking">
                All-or-nothing thinking
              </option>
              <option value="Catastrophizing">Catastrophizing"</option>
              <option value="Excessive self-criticism">
                Excessive self-criticism
              </option>
              <option value="paranoid thoughts">Paranoid thoughts</option>
              <option value="Rumination or overthinking">
                Rumination or overthinking
              </option>
            </select>
          </label>
          <label>
            Which one do you mostly identify with?
            <select name="behavioral">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Withdrawal from social activities">
                Withdrawal from social activities
              </option>
              <option value="Procrastination or avoidance">
                Procrastination or avoidance
              </option>
              <option value="Impulsivity or risk-taking">
                Impulsivity or risk-taking
              </option>
              <option value="Changes in energy level">
                Changes in energy level
              </option>
              <option value="Self-destructive behaviors">
                Self-destructive behaviors
              </option>
            </select>
          </label>
          <label>
            What is your main goal in therapy?
            <select name="therapyGoals">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Reduce symptom severity">
                Reduce symptom severity
              </option>
              <option value="Improve coping skills">
                Improve coping skills
              </option>
              <option value="Enhance relationships">
                Enhance relationships
              </option>
              <option value="Process trauma or difficult experiences">
                Process trauma or difficult experiences
              </option>
              <option value="Develop self-understanding">
                Develop self-understanding
              </option>
            </select>
          </label>
          <label>
            What are your therapy preferences?
            <select name="therapyPreferences">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Structured approach with homework">
                Structured approach with homework
              </option>
              <option value="Insight-focused exploration">
                Insight-focused exploration
              </option>
              <option value="Practical skills and techniques">
                Practical skills and techniques
              </option>
              <option value="Movement and Art Therapy">
                Movement and Art therapy
              </option>
              <option value="Combination of approaches">
                Combination of approaches
              </option>
            </select>
          </label>
          <label>
            What coping strategy do you use the most?
            <select name="primaryCopingStrategies">
              <option value="" disabled>
                Choose One
              </option>
              <option value="Social support">Social support</option>
              <option value="Physical activity">Physical activity</option>
              <option value="Creative expression">Creative expression</option>
              <option value="Mindfulness or meditation">
                Mindfulness or meditation
              </option>
              <option value="Problem-solving">Problem-solving</option>
            </select>
          </label>
          <Link to="/googleMaps">
            <button>Submit</button>
          </Link>
        </form>
      </div>
    </>
  );
}
