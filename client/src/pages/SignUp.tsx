import './SignUp.css';

export function SignUp() {
  return (
    <>
      <div className="body-row">
        <div className="column-two">
          <div className="form-group">
            <label className="form-label">
              Username:
              <input type="text"></input>
            </label>
            <label className="form-label">
              Password:
              <input type="text"></input>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
