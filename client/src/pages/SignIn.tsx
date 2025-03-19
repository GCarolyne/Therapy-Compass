import { Link } from 'react-router-dom';
import './SignIn.css';

export function SignIn() {
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
            <Link to="/userpage">
              <button>Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
