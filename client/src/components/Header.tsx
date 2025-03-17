import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Header.css';
export function Header() {
  return (
    <div className="logo-container">
      <div className="row">
        <div className="column-one">
          <img src="/public/TherapyLogo.png" className="logo"></img>

          <Link to="/Signin" className="text-white">
            <button>Sign In</button>
          </Link>

          <Link to="/Signup" className="text-white">
            <button>Sign Up</button>
          </Link>

          <Link to="/Locate" className="text-white">
            <button>Locate</button>
          </Link>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
