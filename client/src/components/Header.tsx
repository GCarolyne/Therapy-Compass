import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Header.css';
export function Header() {
  return (
    <>
      <div className="row">
        <div className="column-one">
          <Link to="/">
            <img
              src="/public/TherapyLogo.png"
              className="logo"
              alt="Therapy Logo"
            />
          </Link>
          <div className="nav-links">
            <Link to="/sign-in     ">
              <button>Sign In</button>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
