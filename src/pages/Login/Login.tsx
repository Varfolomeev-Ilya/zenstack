import { signInWithGoogle } from '@/api/auth';

const Login = () => {
  return (
    <div>
      <button onClick={signInWithGoogle}>Login with Google</button>
      <h1>Login</h1>
    </div>
  );
};

export default Login;
