import './App.css';

import { UserPage } from './pages/UserPage';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage.tsx';
import { SignIn } from './pages/SignIn.tsx';
import { Header } from './components/Header.tsx';
import { GoogleMap } from './components/GoogleMap.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path="userpage" element={<UserPage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="locate" element={<GoogleMap />} />
      </Route>
    </Routes>
  );
}
