import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { FormEvent } from 'react';
import { User, useUser } from '../components/useUser';
import { readToken } from '../lib';

type AuthData = {
  user: User;
  token: string;
};

export function SignIn() {
  const { handleSignIn } = useUser();
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const bear = readToken();
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bear}`,
        },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }

      const { user, token } = (await res.json()) as AuthData;
      handleSignIn(user, token);
      navigate('/userpage');
    } catch (err) {
      alert(`Error signing in: ${err}`);
    }
  }

  async function handleGuestLogin() {
    const bear = readToken();
    try {
      const guestData = {
        username: 'Guest777',
        password: 'Guest777',
      };
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bear}`,
        },
        body: JSON.stringify(guestData),
      };

      const res = await fetch('/api/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }

      const { user, token } = (await res.json()) as AuthData;
      handleSignIn(user, token);
      navigate('/userpage');
    } catch (err) {
      alert(`Error signing in as guest: ${err}`);
    }
  }

  return (
    <>
      <div className="body-row">
        <div className="column-sign">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                Username:
                <input required name="username" type="text" />
              </label>
              <label className="form-label">
                Password:
                <input required name="password" type="password" />
              </label>
              <button type="submit" className="sign-butt">
                Log In
              </button>
            </div>
          </form>
          <div className="guest-login-container">
            <button onClick={handleGuestLogin} className="guest-butt">
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
