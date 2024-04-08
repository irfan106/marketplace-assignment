import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ModelCard = ({ model, handleSnackbarOpen }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [confirmRemove, setConfirmRemove] = useState(false);

    useEffect(() => {
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(existingFavorites.some(favorite => favorite._id === model._id));
    }, [model._id]);

    const handleAddToFavorites = () => {
        let existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!existingFavorites.some(favorite => favorite._id === model._id)) {
            existingFavorites.push(model);
            localStorage.setItem('favorites', JSON.stringify(existingFavorites));
            setIsFavorite(true);
            handleSnackbarOpen('Model added to favorites!', 'success');
        } else {
            handleSnackbarOpen('Model is already in favorites!', 'warning');
        }
    };

    const handleRemoveFromFavorites = () => {
        if (!confirmRemove) {
            setConfirmRemove(true);
            return;
        }

        let existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = existingFavorites.filter(favorite => favorite._id !== model._id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
        handleSnackbarOpen('Model removed from favorites!', 'info');
        setConfirmRemove(false);
    };

    return (
        <Card>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ width: '100%' }}>
                        <Link to={`/model/${model._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h5" component="div" style={{ fontFamily: 'Poppins, sans-serif', cursor: 'pointer' }}>
                                {model.name}
                            </Typography>
                        </Link>
                    </div>
                </div>
                <div>
                    <Typography variant="body1" color="textSecondary" style={{ fontFamily: 'Poppins, sans-serif', marginTop: 10 }}>
                        {model.description}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Liked by: {model.likes} Devs
                    </Typography>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                        {!isFavorite ? (
                            <Button variant="outlined" size="small" onClick={handleAddToFavorites} style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Add to Favorites
                            </Button>
                        ) : (
                            <>
                                {confirmRemove ? (
                                    <>
                                        <Button variant="contained" size="small" onClick={handleRemoveFromFavorites} style={{ fontFamily: 'Poppins, sans-serif', marginRight: 5 }}>
                                            Confirm Removal
                                        </Button>
                                        <Button variant="contained" color="error" size="small" onClick={() => setConfirmRemove(false)} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', padding: '5px', }}>
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button variant="contained" color="error" style={{ fontSize: '12px', padding: '5px', fontFamily: 'Poppins, sans-serif' }} onClick={() => setConfirmRemove(true)}>
                                        Remove from Favorites
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ModelCard;
