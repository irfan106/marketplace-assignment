import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { fetchAllModels, fetchUniqueCategories, fetchUniqueProviders } from '../apis/api';
import ModelSidebar from './ModelSidebar';
import ModelCards from './ModelCards';
import { Button } from '@mui/material';
import GeneralHeader from '../helpers/GeneralHeader';

const ExploreModels = () => {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(12);
  const itemsToLoad = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelsData = await fetchAllModels();
        setModels(modelsData);

        const categoriesData = await fetchUniqueCategories();
        setCategories(categoriesData);

        const providersData = await fetchUniqueProviders();
        setProviders(providersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = models;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(model => selectedCategories.includes(model.category));
    }

    if (selectedProviders.length > 0) {
      filtered = filtered.filter(model => selectedProviders.includes(model.provider));
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(model =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredModels(filtered);
    setFilteredModels(filtered.slice(0, displayCount));
  }, [selectedCategories, selectedProviders, models, searchQuery, displayCount]);

  const handleCategoryFilter = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleProviderFilter = (provider) => {
    setSelectedProviders(prev => {
      if (prev.includes(provider)) {
        return prev.filter(prov => prov !== provider);
      } else {
        return [...prev, provider];
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + itemsToLoad);
  };

  return (
    <>
    <GeneralHeader heading="Explore AI Models" subheading="Discover the Latest AI Models and LLMs" />
    <div style={{ marginTop: '6%', margin: '5%' }}>
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <ModelSidebar
            categories={categories}
            providers={providers}
            selectedCategories={selectedCategories}
            selectedProviders={selectedProviders}
            handleCategoryFilter={handleCategoryFilter}
            handleProviderFilter={handleProviderFilter}
          />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={3}>
            {filteredModels.map((model) => (
              <ModelCards key={model._id} model={model} />
            ))}
          </Grid>
          {filteredModels.length < models.length && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button variant="contained" style={{ fontFamily: 'Poppins, sans-serif', color: '#fff', backgroundColor: '#003566' }} onClick={handleLoadMore}>Load More...</Button>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
    </>
  );
};

export default ExploreModels;
