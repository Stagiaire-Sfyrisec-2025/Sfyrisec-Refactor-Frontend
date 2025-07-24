import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import ColorSchemeToggle from './ColorSchemeToggle';
import SvgIcon from '@mui/joy/SvgIcon';

function GoogleIcon() {
  return (
    <SvgIcon fontSize="xl">
      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
        <path
          fill="#4285F4"
          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
        />
        <path
          fill="#34A853"
          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
        />
        <path
          fill="#FBBC05"
          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
        />
        <path
          fill="#EA4335"
          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
        />
      </g>
    </SvgIcon>
  );
}

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface SignUpFormElements extends HTMLFormControlsCollection {
  signup_email: HTMLInputElement;
  signup_password: HTMLInputElement;
  signup_confirm_password: HTMLInputElement;
}
interface SignUpFormElement extends HTMLFormElement {
  readonly elements: SignUpFormElements;
}

interface LoginFormProps {
  onLoginSuccess: (data: { email: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [showSignInForm, setShowSignInForm] = React.useState(true);

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

  const handleSignUpSubmit = (event: React.FormEvent<SignUpFormElement>) => {
    event.preventDefault();
    setShowSignInForm(true);
  };

  return (
    <>
      <Box
        sx={{
          width: { xs: '100%', md: '50vw' },
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          px: 2,
          backgroundColor: 'background.surface',
        }}
      >
        <Box
          component="header"
          sx={{ py: 3, display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '400px', mx: 'auto' }}
        >
          <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <IconButton variant="soft" color="primary" size="sm">
              <BadgeRoundedIcon />
            </IconButton>
            <Typography level="title-lg">CodeRefactor</Typography>
          </Box>
          <ColorSchemeToggle />
        </Box>
        <Box
          component="main"
          sx={{
            my: 'auto',
            py: 2,
            pb: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: 400,
            maxWidth: '100%',
            mx: 'auto',
            borderRadius: 'sm',
            '& form': { display: 'flex', flexDirection: 'column', gap: 2 },
            [`& .MuiFormLabel-asterisk`]: { visibility: 'hidden' },
          }}
        >
          {showSignInForm ? (
            <>
              <Stack sx={{ gap: 4, mb: 2 }}>
                <Stack sx={{ gap: 1 }}>
                  <Typography component="h1" level="h3">Sign in</Typography>
                  <Typography level="body-sm">
                    New to company?{' '}
                    <Link href="#" level="title-sm" onClick={(e) => { e.preventDefault(); setShowSignInForm(false); }}>
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
          ) : (
            <>
              <Stack sx={{ gap: 1, mb: 2 }}>
                <Typography component="h1" level="h3">Sign up</Typography>
                <Typography level="body-sm">
                  Already have an account?{' '}
                  <Link href="#" level="title-sm" onClick={(e) => { e.preventDefault(); setShowSignInForm(true); }}>
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
          )}
        </Box>
        <Box component="footer" sx={{ py: 3, width: '100%', maxWidth: '400px', mx: 'auto' }}>
          <Typography level="body-xs" sx={{ textAlign: 'center' }}>
            © CodeRefactor {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: '100%', md: '50vw' },
          display: { xs: 'none', md: 'block' },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://www.open.edu.au/-/media/blog/2023/10-october/learn-how-to-code.jpg?h=477&iar=0&w=715&rev=27fd8b9e501e49bd9722ac012f5336ce&hash=04367A2B2E4D8A637C76FBEB4DEDBF9A)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://www.open.edu.au/-/media/blog/2023/10-october/learn-how-to-code.jpg?h=477&iar=0&w=715&rev=27fd8b9e501e49bd9722ac012f5336ce&hash=04367A2B2E4D8A637C76FBEB4DEDBF9A)',
          },
        })}
      />
    </>
  );
};

export default LoginForm;
