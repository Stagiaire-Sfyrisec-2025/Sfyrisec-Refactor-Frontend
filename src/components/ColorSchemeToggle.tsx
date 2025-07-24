import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

const ColorSchemeToggle: React.FC<IconButtonProps> = (props) => {
  const { onClick, sx, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      sx={[
        {
          '& > svg': {
            transform: 'rotate(0deg)',
            transition: 'transform 0.2s',
          },
          ...(mode === 'dark' && {
            '& > svg': {
              transform: 'rotate(40deg)',
            },
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
    </IconButton>
  );
};

export default ColorSchemeToggle;
