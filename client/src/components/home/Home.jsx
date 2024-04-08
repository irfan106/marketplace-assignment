import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GeneralHeader from '../helpers/GeneralHeader';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ModelCard from './ModelCard';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { fetchModels, fetchTopModels } from '../apis/api';

const Home = () => {
    const [models, setModels] = useState([]);
    const [topModels, setTopModels] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const modelsData = await fetchModels();
                setModels(modelsData);
                
                const topModelsData = await fetchTopModels();
                setTopModels(topModelsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSnackbarOpen = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton onClick={onClick} style={{ position: 'absolute', top: '50%', left: '-4%', transform: 'translateY(-50%)', zIndex: 1 }}>
                <ChevronLeft />
            </IconButton>
        );
    };

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton onClick={onClick} style={{ position: 'absolute', top: '50%', right: '-4%', transform: 'translateY(-50%)', zIndex: 1 }}>
                <ChevronRight />
            </IconButton>
        );
    };

    const sliderContainerStyle = {
        fontFamily: 'Poppins, sans-serif',
        marginLeft: '5%',
        marginRight: '5%',
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <>
            <GeneralHeader heading="Explore AI Models" subheading="Discover the Latest AI Models and LLMs" />
            <div style={sliderContainerStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '20px' }}>
                    <h2 style={{ fontFamily: 'Poppins, sans-serif' }}>Explore Models</h2>
                    <Link to="/models" style={{ textDecoration: 'none' }}>
                        <button style={{ fontFamily: 'Poppins, sans-serif', marginTop: 10, cursor: 'pointer', background: 'transparent', border: 'none', fontWeight: 'bold' }}>View More<span style={{ marginLeft: 5, fontSize: 18 }}>&rarr;</span></button>
                    </Link>
                </div>
                <Slider {...settings}>
                    {models?.map((model) => (
                        <div key={model._id}>
                            <ModelCard model={model} handleSnackbarOpen={handleSnackbarOpen} />
                        </div>
                    ))}
                </Slider>
            </div>

            <div style={sliderContainerStyle}>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', marginLeft: '20px' }}>Top Models</h2>
                <Slider {...settings}>
                    {topModels?.map((model) => (
                        <div key={model._id}>
                            <ModelCard model={model} handleSnackbarOpen={handleSnackbarOpen} />
                        </div>
                    ))}
                </Slider>
            </div>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default Home;
