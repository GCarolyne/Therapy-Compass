import { Link } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  return (
    <>
      <div className="row">
        <div className="column-two">
          <Link to="/sign-up">
            <button className="my-butt">Sign Up</button>
          </Link>
          <img
            src="/premium_vector-1722926950860-10f2cc4d94e1.avif"
            className="people-image"
          />
          <p className="home-p">
            Welcome to your personalized therapy progress tracker. This App is
            designed to provide meaningful insights into your therapeutic
            journey, helping you monitor key indicators such as symptom
            patterns, stress triggers, and physical activity but also keep track
            of your notes regarding your therapy sessions.
          </p>
        </div>
      </div>
    </>
  );
}
