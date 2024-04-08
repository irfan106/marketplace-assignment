import axios from "axios";

const BASE_URL = "https://marketplace-assignment.onrender.com";

export const fetchModels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/models`);
    return response.data;
  } catch (error) {
    console.error("Error fetching models:", error);
    throw error;
  }
};

export const fetchTopModels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/topModel`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top models:", error);
    throw error;
  }
};

export const fetchAllModels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/allModels`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all models:", error);
    throw error;
  }
};

export const fetchUniqueCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/uniqueCategories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching unique categories:", error);
    throw error;
  }
};

export const fetchUniqueProviders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/uniqueProviders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching unique providers:", error);
    throw error;
  }
};

export const fetchFavoriteModels = async (idsString) => {
  try {
    const response = await axios.get(`${BASE_URL}/favorites?ids=${idsString}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite models:', error);
    throw error;
  }
};


export const fetchModelDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/model/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching model details:", error);
    throw error;
  }
};
