import React from 'react';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const FilterChip = ({ label, isSelected, onClick }) => (
  <Chip
    label={label}
    clickable
    onClick={onClick}
    variant={isSelected ? 'default' : 'outlined'}
    style={{
      marginBottom: '5px',
      marginRight: '5px',
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: isSelected ? '#70e000' : '#00171f',
      color: isSelected ? '#00171f' : 'white',
    }}
  />
);

const ModelSidebar = ({
  categories,
  providers,
  selectedCategories,
  selectedProviders,
  handleCategoryFilter,
  handleProviderFilter,
}) => {
  return (
    <Box style={{ marginTop: '3%', marginLeft: '5%' }}>
      <Typography variant="h6" gutterBottom>
        Filter By Category
      </Typography>
      {categories.map(category => (
        <FilterChip
          key={category}
          label={category}
          isSelected={selectedCategories.includes(category)}
          onClick={() => handleCategoryFilter(category)}
        />
      ))}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Filter By Provider
      </Typography>
      {providers.map(provider => (
        <FilterChip
          key={provider}
          label={provider}
          isSelected={selectedProviders.includes(provider)}
          onClick={() => handleProviderFilter(provider)}
        />
      ))}
    </Box>
  );
};

export default ModelSidebar;
