import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const GeneralHeader = ({ heading, subheading }) => {
  return (
    <Box
      sx={{
        position: 'static',
        height: '200px',
        backgroundColor: '#00171f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 0',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" style={{ color: '#fff', marginTop: '15%', fontFamily: 'Poppins, sans-serif' }}>{heading}</Typography>
            <Typography variant="subtitle1" style={{ color: '#fff', marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>{subheading}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralHeader;
