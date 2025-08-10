import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import ColorSchemeToggle from './ColorSchemeToggle';
import SignInForm from './auth/SignInForm';
import SignUpForm from './auth/SignUpForm';

interface LoginFormProps {
  onLoginSuccess: (data: { email: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [showSignInForm, setShowSignInForm] = React.useState(true);

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
            <SignInForm
              onLoginSuccess={onLoginSuccess}
              onSwitchToSignUp={() => setShowSignInForm(false)}
            />
          ) : (
            <SignUpForm
              onSwitchToSignIn={() => setShowSignInForm(true)}
            />
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
            'url(https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg)',
            //https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg)',
          },
        })}
      />
    </>
  );
};

export default LoginForm;
