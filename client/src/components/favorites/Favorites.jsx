import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Card, CardContent, Typography } from '@mui/material';
import ModelCards from '../models/ModelCards';
import { fetchFavoriteModels } from '../apis/api';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favoriteModels, setFavoriteModels] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesIds = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favoritesIds.length > 0) {
          const idsString = favoritesIds.map(favorite => favorite._id).join(',');
          const modelsData = await fetchFavoriteModels(idsString);
          setFavoriteModels(modelsData);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  console.log(favoriteModels)
  return (
    <Container style={{ marginTop: '6%' }}>
      <h1>Favorite Models</h1>
      {favoriteModels.length === 0 ? (
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" align="center">
                  You don't have any favorite models.
                </Typography>
                <Link to="/models" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" fullWidth>
                    Mark Models Favorite
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={6}>
          {favoriteModels.map(model => (
            <ModelCards key={model._id} model={model} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
