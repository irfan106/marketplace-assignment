import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/logo.png';

const Navbar = () => {
    return (
        <AppBar position="fixed">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', backgroundColor:'#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton component={Link} to="/">
                        <img src={LogoImage} alt="Logo" style={{ width: 150, height: 50 }} />
                    </IconButton>
                </div>
                <div>
                    <Typography variant="body1" component={Link} to="/" style={{ textDecoration: 'none', color: '#333', marginRight: 20, fontFamily: 'Poppins, sans-serif' }}>
                        Home
                    </Typography>
                    <Typography variant="body1" component={Link} to="/models" style={{ textDecoration: 'none', color: '#333', marginRight: 20, fontFamily: 'Poppins, sans-serif' }}>
                        Explore Models
                    </Typography>
                    <Typography variant="body1" component={Link} to="/favorites" style={{ textDecoration: 'none', color: '#333', marginRight: 20, fontFamily: 'Poppins, sans-serif' }}>
                        Your Favorites
                    </Typography>
                    <Typography variant="body1" component={Link} to="/about" style={{ textDecoration: 'none', color: '#333', marginRight: 20, fontFamily: 'Poppins, sans-serif' }}>
                        About Us
                    </Typography>
                    <Typography variant="body1" component={Link} to="/contact" style={{ textDecoration: 'none', color: '#333', marginRight: 20, fontFamily: 'Poppins, sans-serif' }}>
                        Contact Us
                    </Typography>
                    <Button component={Link} to="/upload" variant="contained" color="primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Upload Model
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
