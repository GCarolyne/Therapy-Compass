import { Link } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  return (
    <>
      <div className="body-row">
        <div className="column-home">
          <Link to="/sign-up">
            <button>Sign Up</button>
          </Link>
          <img src="/public/People.png" className="people-image" />
          <p>
            Welcome to your personalized therapy progress tracker. This compass
            is designed to provide meaningful insights into your therapeutic
            journey, helping you monitor key indicators such as symptom
            patterns, stress triggers, and physical activity.
          </p>
          <img src="/public/map.png" className="map" />
          <p className="space-padding">
            Locate a therapist in your area based on your needs and preferences!
          </p>
        </div>
      </div>
    </>
  );
}
