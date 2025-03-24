import './App.css';

import { UserPage } from './pages/UserPage';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage.tsx';

import { Header } from './components/Header.tsx';
import { FindTherapist } from './pages/FindTherapist.tsx';

import { GoogleMap } from './components/GoogleMap.tsx';

import { AuthPage } from './components/AuthPage.tsx';
import { UserProvider } from './components/UserContext.tsx';

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path="/sign-up" element={<AuthPage mode="sign-up" />} />
          <Route path="/sign-in" element={<AuthPage mode="sign-in" />} />
          <Route path="/locate" element={<FindTherapist />} />
          <Route path="/googleMaps/:therapyType" element={<GoogleMap />} />
          <Route path="/userpage" element={<UserPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}
