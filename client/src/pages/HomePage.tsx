import { Link } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  return (
    <>
      <div className="row">
        <div className="column-one">
          <Link to="/sign-up">
            <button className="my-butt">Sign Up</button>
          </Link>
          <div className="row">
            <p className="home-p">
              Welcome to your personalized therapy progress tracker. This
              compass is designed to provide meaningful insights into your
              therapeutic journey, helping you monitor key indicators such as
              symptom patterns, stress triggers, and physical activity.
            </p>
            <img
              src="/public/premium_vector-1722926950860-10f2cc4d94e1.avif"
              className="people-image"
            />
            <p className="home-p">
              Locate a therapist in your area based on your needs and
              preferences!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
