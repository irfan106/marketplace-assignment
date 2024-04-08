import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const defaultImageUrl = 'https://w0.peakpx.com/wallpaper/737/751/HD-wallpaper-ai-abstract-artificial-inteligence-blue-brain-crack-iphone-modern-patterns-samsung.jpg';

const UploadModel = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    provider: '',
    codeSnippet: '',
    imageURL: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageData = { ...formData };
      if (!imageData.imageURL) {
        imageData.imageURL = defaultImageUrl;
      }
      await axios.post('http://localhost:5000/models/upload', imageData);
      alert('Model uploaded successfully!');
      setFormData({
        name: '',
        category: '',
        description: '',
        provider: '',
        codeSnippet: '',
        imageURL: '',
      });
    } catch (error) {
      console.error('Error uploading model:', error);
      alert('Error uploading model. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '6%' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: 20 }}>
        Upload Model
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Model Name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          name="category"
          label="Category"
          fullWidth
          margin="normal"
          value={formData.category}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          name="provider"
          label="Model Provider or Source Organization"
          fullWidth
          margin="normal"
          value={formData.provider}
          onChange={handleChange}
        />
        <TextField
          name="codeSnippet"
          label="Code Snippet (if applicable)"
          fullWidth
          margin="normal"
          value={formData.codeSnippet}
          onChange={handleChange}
        />
        <TextField
          name="imageURL"
          label="Image URL"
          fullWidth
          margin="normal"
          value={formData.imageURL}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </form>
    </Container>
  );
};

export default UploadModel;
