import React from 'react';
import { Typography, Container} from '@mui/material';

const AboutUs = () => {
    return (
        <Container maxWidth="md" style={{ marginTop:"10%" }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: 20 }}>
                About Us
            </Typography>
            <Typography variant="body1" paragraph style={{ textAlign: 'center' }}>
                Welcome to our AI Models Marketplace, where innovation meets intelligence!
            </Typography>
            <Typography variant="body1" paragraph style={{ textAlign: 'center' }}>
                Our mission is to provide a platform for organizations and developers to showcase and explore
                cutting-edge AI models and LLMs (Large Language Models). We believe in the power of AI to transform
                industries and drive meaningful progress.
            </Typography>

            <Typography variant="h5" gutterBottom style={{ textAlign: 'center', marginTop: 30 }}>
                Our Team
            </Typography>
            <Typography variant="body1" style={{ marginTop: 30, textAlign: 'center' }}>
                We are passionate about leveraging AI to solve complex problems and drive innovation. Join us on this
                journey towards a smarter future!
            </Typography>
        </Container>
    );
};

export default AboutUs;
