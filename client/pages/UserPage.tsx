import React from 'react';

export function UserPage() {
  return (
    <div className="logo-container">
      <div className="row">
        <div className="column-one">
          <img src="/public/TherapyLogo.png" className="logo"></img>
        </div>
      </div>
      <div className="row">
        <div className="column-one">
          <button>Sign In</button>
          <button>Sign Up</button>
          <button>Locate</button>
        </div>
      </div>
      <div className="body-row">
        <div className="column-two">
          <img src="/public/People.png" className="people-image" />
          <p>
            "Welcome to your personalized therapy progress tracker. This compass
            is designed to provide meaningful insights into your therapeutic
            journey, helping you monitor key indicators such as symptom
            patterns, stress triggers, and physical activity.”
          </p>
          <img src="/public/map.png" className="map" />
          <p>
            Locate a therapist in your area based on your needs and preferences!
          </p>
        </div>
      </div>
    </div>
  );
}
