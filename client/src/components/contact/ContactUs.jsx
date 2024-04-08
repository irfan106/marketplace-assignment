import React from 'react';
import { Typography, Container, Grid, TextField, Button, Card, CardContent } from '@mui/material';

const ContactUs = () => {
  return (
    <Container style={{ marginTop: '100px', marginBottom: '50px', fontFamily: 'Poppins, sans-serif' }}>
      <Typography variant="h2" gutterBottom>Contact Us</Typography>
      <Typography variant="body1" paragraph>
        Have questions, suggestions, or feedback? We'd love to hear from you! Please fill out the form below, and our team will get back to you as soon as possible.
      </Typography>

      <Card variant="outlined">
        <CardContent>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth type="submit" style={{fontFamily: 'Poppins, sans-serif', color: '#fff', backgroundColor: '#003566'}}>
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactUs;
