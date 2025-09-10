import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { GoogleIcon } from './common';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface SignInFormProps {
  onLoginSuccess: (data: { email: string }) => void;
  onSwitchToSignUp: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onLoginSuccess, onSwitchToSignUp }) => {
  const handleFormSubmit = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const email = formElements.email.value;
    const password = formElements.password.value;

    if (email === 'user@example.com' && password === 'password123') {
      onLoginSuccess({ email });
    } else {
      console.error('Invalid email or password.');
    }
  };

  return (
    <>
      <Stack sx={{ gap: 4, mb: 2 }}>
        <Stack sx={{ gap: 1 }}>
          <Typography component="h1" level="h3">Sign in</Typography>
          <Typography level="body-sm">
            New to company?{' '}
            <Link href="#" level="title-sm" onClick={(e) => { e.preventDefault(); onSwitchToSignUp(); }}>
              Sign up!
            </Link>
          </Typography>
        </Stack>
        <Button variant="soft" color="neutral" fullWidth startDecorator={<GoogleIcon />} onClick={(e) => e.preventDefault()}>
          Continue with Google
        </Button>
      </Stack>
      <Divider>or</Divider>
      <Stack sx={{ gap: 4, mt: 2 }}>
        <form onSubmit={handleFormSubmit}>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" />
          </FormControl>
          <Stack sx={{ gap: 4, mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Checkbox size="sm" label="Remember me" name="persistent" />
              <Link level="title-sm" href="#" onClick={(e) => e.preventDefault()}>
                Forgot your password?
              </Link>
            </Box>
            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default SignInForm;
