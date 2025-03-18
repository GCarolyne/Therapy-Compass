import './App.css';

import { UserPage } from './pages/UserPage';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage.tsx';
import { SignUp } from './pages/SignUp.tsx';
import { Header } from './components/Header.tsx';
import { GoogleMap } from './components/GoogleMap.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path="userpage" element={<UserPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="locate" element={<GoogleMap />} />
      </Route>
    </Routes>
  );
}
