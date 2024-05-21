import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('London');
    const [error, setError] = useState('');
    const [story, setStory] = useState('');

    const apiKey = 'YOUR_API_KEY_HERE';

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
            );
            setWeatherData(response.data);
            setError('');
        } catch (error) {
            setError('Could not fetch weather data');
        }
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSearch = () => {
        fetchWeatherData();
    };

    const handleStoryChange = (e) => {
        setStory(e.target.value);
    };

    return (
        <div className="weather-dashboard">
            <h1>Weather Dashboard</h1>
            <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter location"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <p>{weatherData.weather[0].description}</p>
                    <p>{weatherData.main.temp} °C</p>
                </div>
            )}
            <textarea
                value={story}
                onChange={handleStoryChange}
                placeholder="Share your weather story..."
            ></textarea>
        </div>
    );
};

export default WeatherDashboard;
