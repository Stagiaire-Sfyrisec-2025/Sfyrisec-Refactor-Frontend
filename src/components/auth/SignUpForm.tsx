import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

interface SignUpFormElements extends HTMLFormControlsCollection {
  signup_email: HTMLInputElement;
  signup_password: HTMLInputElement;
  signup_confirm_password: HTMLInputElement;
}
interface SignUpFormElement extends HTMLFormElement {
  readonly elements: SignUpFormElements;
}

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToSignIn }) => {
  const handleSignUpSubmit = (event: React.FormEvent<SignUpFormElement>) => {
    event.preventDefault();
    // Handle sign up logic here
    onSwitchToSignIn();
  };

  return (
    <>
      <Stack sx={{ gap: 1, mb: 2 }}>
        <Typography component="h1" level="h3">Sign up</Typography>
        <Typography level="body-sm">
          Already have an account?{' '}
          <Link href="#" level="title-sm" onClick={(e) => { e.preventDefault(); onSwitchToSignIn(); }}>
            Sign in!
          </Link>
        </Typography>
      </Stack>
      <Stack sx={{ gap: 4, mt: 2 }}>
        <form onSubmit={handleSignUpSubmit}>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="signup_email" />
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="signup_password" />
          </FormControl>
          <FormControl required>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" name="signup_confirm_password" />
          </FormControl>
          <Stack sx={{ gap: 4, mt: 2 }}>
            <Button type="submit" fullWidth>Sign up</Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default SignUpForm;
