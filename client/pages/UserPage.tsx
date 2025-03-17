import './UserPage.css';
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
          <p>Welcome, User name</p>
        </div>
      </div>
    </div>
  );
}
