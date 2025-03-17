import './SignUp.css';

export function SignUp() {
  return (
    <>
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
            <label>
              UserName
              <input type="text"></input>
            </label>
            <label>
              <input type="text"></input>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
