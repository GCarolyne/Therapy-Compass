import { RegistrationForm } from '../components/RegistrationForm';
import { SignIn } from '../pages/SignIn';

type Props = {
  mode: 'sign-up' | 'sign-in';
};
export function AuthPage({ mode }: Props) {
  return (
    <div className="container m-4">
      {mode === 'sign-up' && <RegistrationForm />}
      {mode === 'sign-in' && <SignIn />}
    </div>
  );
}
