import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const ModelCards = ({ model }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [confirmRemove, setConfirmRemove] = useState(false);

    useEffect(() => {
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(existingFavorites.some(favorite => favorite._id === model._id));
    }, [model._id]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleAddToFavorites = (model) => {
        let existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!existingFavorites.some(favorite => favorite._id === model._id)) {
            existingFavorites.push(model);
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

    const handleRemoveFromFavorites = (model) => {
        if (!confirmRemove) {
            setConfirmRemove(true);
            return;
        }

        let existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = existingFavorites.filter(favorite => favorite._id !== model._id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
        setSnackbarSeverity('info');
        setSnackbarMessage('Model removed from favorites!');
        setSnackbarOpen(true);
        setConfirmRemove(false);
    };

    return (
        <Grid item xs={12} sm={8} md={4} key={model._id}>
            <Card style={{ height: '100%' }}>
                <Link to={`/model/${model._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ position: 'relative', height: '65%' }}>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                background: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                padding: '8px',
                            }}
                        >
                            {model.name}
                        </div>
                        <img
                            src={model.imageURL}
                            alt={model.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </Link>
                <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {model?.description?.length <= 30 ? model?.description : `${model.description?.slice(0, 30)}...`}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <Chip label={model.category} variant="outlined" color="primary" style={{ marginRight: 5, fontFamily: 'Poppins, sans-serif' }} />
                        <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            By: {model.provider}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Liked by: {model.likes} Devs
                        </Typography>
                        {isFavorite ? (
                            <Button variant="contained" color="error" style={{ fontSize: '12px', padding: '5px', fontFamily: 'Poppins, sans-serif' }} onClick={() => handleRemoveFromFavorites(model)}>Remove from Favorites</Button>
                        ) : (
                            <Button variant="outlined" color="primary" style={{ fontSize: '12px', fontFamily: 'Poppins, sans-serif' }} onClick={() => handleAddToFavorites(model)}>Add to Favorites</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            <Snackbar open={confirmRemove} onClose={() => setConfirmRemove(false)} message="Are you sure you want to remove this model from favorites?" action={
                <>
                    <Button color="error" size="small" style={{ fontFamily: 'Poppins, sans-serif', }} onClick={() => setConfirmRemove(false)}>
                        Cancel
                    </Button>
                    <Button color="primary" size="small" style={{ fontFamily: 'Poppins, sans-serif' }} onClick={() => handleRemoveFromFavorites(model)}>
                        Confirm
                    </Button>
                </>
            } />
        </Grid>
    );
};

export default ModelCards;
