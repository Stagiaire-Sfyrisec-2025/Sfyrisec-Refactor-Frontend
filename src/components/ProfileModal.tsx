import React from 'react';
import {
  Modal,
  ModalDialog,
  DialogContent,
  Stack,
  Button,
  Box,
  Avatar,
  IconButton,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  Input,
} from '@mui/joy';
import { Edit, Close } from '@mui/icons-material';

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        sx={{
          width: '90%',
          maxWidth: '800px',
          borderRadius: 'lg',
          bgcolor: 'background.paper',
          boxShadow: 'lg',
          p: 3,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.vars.palette.neutral.plainColor,
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  alt="User Profile"
                  src="https://via.placeholder.com/150"
                  sx={{ width: 100, height: 100 }}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: '#A855F7',
                    color: 'white',
                    borderRadius: '20%',
                    '&:hover': { bgcolor: '#9333EA' },
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Nom Complet</FormLabel>
                    <Input placeholder="Enter your full name" sx={{ borderRadius: 'md' }} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <Input placeholder="Enter your username" sx={{ borderRadius: 'md' }} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Compétences</FormLabel>
                    <Input placeholder="JavaScript, Python, Refactoring" sx={{ borderRadius: 'md' }} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Langages Préférés</FormLabel>
                    <Input placeholder="Python, Java" sx={{ borderRadius: 'md' }} />
                  </FormControl>
                </Stack>
              </Grid>
              <Grid xs={12} md={6}>
                <Stack spacing={2}>
                  <FormControl>
                    <Input defaultValue="Aatenadiry" disabled sx={{ borderRadius: 'md' }} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Lien GitHub/Portfolio</FormLabel>
                    <Input placeholder="https://github.com/user" sx={{ borderRadius: 'md' }} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Bio</FormLabel>
                    <Input
                      placeholder="Courte description du développeur."
                      multiline
                      minRows={4}
                      sx={{ borderRadius: 'md' }}
                    />
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
            <Typography
              level="body-xs"
              sx={{ color: 'text.tertiary', textAlign: 'left' }}
            >
              This is a small informative text or a catchphrase.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  borderColor: '#F472B6',
                  color: '#F472B6',
                  '&:hover': {
                    borderColor: '#EC4899',
                    color: '#EC4899',
                  },
                }}
              >
                ANNULER
              </Button>
              <Button
                variant="solid"
                onClick={onClose}
                sx={{
                  bgcolor: '#F472B6',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#EC4899',
                  },
                }}
              >
                ENREGISTRER
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default ProfileModal;
