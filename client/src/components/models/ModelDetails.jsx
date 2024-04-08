import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchModelDetails } from '../apis/api';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Chip, Snackbar, Alert, Paper, Box } from '@mui/material';
import GeneralHeader from '../helpers/GeneralHeader';
import TerminalView from './TerminalView';

const ModelDetails = () => {
  const { modelId } = useParams();
  const [modelDetails, setModelDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [confirmRemove, setConfirmRemove] = useState(false);

  useEffect(() => {
    const getModelDetails = async () => {
      try {
        const data = await fetchModelDetails(modelId);
        setModelDetails(data);
        checkFavoriteStatus(data);
      } catch (error) {
        console.error('Error fetching model details:', error);
      }
    };

    getModelDetails();
  }, [modelId]);

  const checkFavoriteStatus = (model) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(existingFavorites.some(favorite => favorite._id === model._id));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAddToFavorites = () => {
    let existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!existingFavorites.some(favorite => favorite._id === modelDetails._id)) {
      existingFavorites.push(modelDetails);
      localStorage.setItem('favorites', JSON.stringify(existingFavorites));
      setIsFavorite(true);
      setSnackbarSeverity('success');
      setSnackbarMessage('Model added to favorites!');
      setSnackbarOpen(true);
    } else {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Model is already in favorites!');
      setSnackbarOpen(true);
    }
  };

  const handleRemoveFromFavorites = () => {
    if (!confirmRemove) {
      setConfirmRemove(true);
      return;
    }

    let existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = existingFavorites.filter(favorite => favorite._id !== modelDetails._id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(false);
    setSnackbarSeverity('info');
    setSnackbarMessage('Model removed from favorites!');
    setSnackbarOpen(true);
    setConfirmRemove(false);
  };

  if (!modelDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GeneralHeader heading={modelDetails.name} />

      <Container style={{ marginTop: '3%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontFamily: 'Poppins, sans-serif' }}>
          {isFavorite ? (
            <Button variant="contained" color="error" style={{ fontFamily: 'Poppins, sans-serif' }} onClick={handleRemoveFromFavorites}>Remove from Favorites</Button>
          ) : (
            <Button variant="outlined" color="primary" style={{ fontFamily: 'Poppins, sans-serif' }} onClick={handleAddToFavorites}>Add to Favorites</Button>
          )}
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                height="350"
                image={modelDetails.imageURL}
                alt={modelDetails.name}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="body1" gutterBottom style={{ fontFamily: 'Poppins, sans-serif' }}>{modelDetails.description}</Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Chip label={modelDetails.category} variant="outlined" color="primary" style={{ fontFamily: 'Poppins, sans-serif' }} />
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom style={{ fontFamily: 'Poppins, sans-serif' }}>By: {modelDetails.provider}</Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom style={{ fontFamily: 'Poppins, sans-serif' }}>Liked By: {modelDetails.likes} Devs</Typography>
                <Paper elevation={3} style={{ marginTop: '1rem', padding: '1rem', fontFamily: 'Poppins, sans-serif' }}>
                  <Typography variant="body1" gutterBottom>Sample Usage:</Typography>
                  <Box sx={{ bgcolor: 'background.paper', p: 2, overflowX: 'auto' }}>
                    <code>{modelDetails.codeSnippet}</code>
                  </Box>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <TerminalView />
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', fontFamily: 'Poppins, sans-serif' }}>{snackbarMessage}</Alert>
      </Snackbar>
      <Snackbar style={{ fontFamily: 'Poppins, sans-serif' }} open={confirmRemove} onClose={() => setConfirmRemove(false)} message="Are you sure you want to remove this model from favorites?" action={
        <>
          <Button color="error" size="small" style={{ fontFamily: 'Poppins, sans-serif' }} onClick={() => setConfirmRemove(false)}>Cancel</Button>
          <Button color="primary" size="small" style={{ fontFamily: 'Poppins, sans-serif' }} onClick={handleRemoveFromFavorites}>Confirm</Button>
        </>
      } />
    </>
  );
};

export default ModelDetails;
