import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Header.css';
export function Header() {
  return (
    <>
      <div className="row">
        <div className="column-one">
          <img
            src="/public/TherapyLogo.png"
            className="logo"
            alt="Therapy Logo"
          />
          <div className="nav-links">
            <Link to="/Signin">
              <button>Sign In</button>
            </Link>
            <Link to="/Signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/Locate">
              <button>Locate</button>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
