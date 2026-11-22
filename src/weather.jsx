
"use client";

import { useState,useEffect } from "react";
import './weather.css'
export default function WeatherPage() {
    const [weather, setWeather] = useState("clear");    
    const [search,setSearch] = useState('sivakasi');
    const [weatherData,setWeatherData] = useState({});

    const getWeather = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=35ab641bcea16eefb908d13a740b770b`);
        const data = await response.json();
        updateWeather(data);
        setWeatherData(data);
    };

    const degreeCheck = (kelvin) => {
        if(!kelvin) return 0;
        return (kelvin - 273.15);
    };

    useEffect(() => {
        getWeather();
    }, []);

    const handleSearch = async () =>{
        if(!search) return;
        
        await getWeather();
        setSearch('');
    }

    const updateWeather = (data) => {
        const condition = data.weather?.[0]?.main?.toLowerCase();
        const windSpeed = data.wind?.speed || 0;
        
        if(condition === "thunderstorm"){
            setWeather("stormy");
        }else if (condition === "rain" || condition === "drizzle"){
            setWeather("rainy");
        }else if (condition === "snow"){
            setWeather("snowy");
        }else if (windSpeed >= 9 || condition === "mist"){
            setWeather("windy");
        }else if (condition === "clouds"){
            setWeather("cloudy");
        }else {
            setWeather("clear");
        }
    };

    return (
        <main className="weather-app" data-weather={weather} >
            <div className="weather-effects" aria-hidden="true">
                <div className="weather-particles"></div>
                <div className="weather-atmosphere"></div>
            </div>

            <div className="weather-content" style={{backgroundImage: `url(/${weather}.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                <div className="weather-image" >
                    <div className="city-details">
                        <div className="city">
                            <div className="city-name">
                                <h3>{weatherData?.name || ''}</h3>
                            </div>
                        </div>
                        <div className="degree-details">
                                <div className="degree">
                                    <p className="temperature">{degreeCheck(weatherData?.main?.feels_like).toFixed(0)}</p>
                                </div>
                                <div className="weather-name">
                                    <div>
                                        {/* clear */}
                                        <svg className={`weather-icon ${weather == 'clear' ? 'active' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round">
                                            <circle cx="32" cy="32" r="12"/>
                                            <path d="M32 5v8m0 38v8M5 32h8m38 0h8M13 13l6 6m26 26 6 6m0-38-6 6M19 45l-6 6"/>
                                        </svg>

                                        {/* rainy */}
                                        <svg className={`weather-icon ${weather == 'rainy' ? 'active' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M17 37h30a10 10 0 0 0 0-20 14 14 0 0 0-27-2 11 11 0 0 0-3 22Z"/>
                                            <path d="m22 44-3 7m17-7-3 7m17-7-3 7"/>
                                        </svg>

                                        {/* windy */}
                                        <svg className={`weather-icon ${weather == 'windy' ? 'active' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLineCap="round" strokeLineJoin="round">
                                            <path d="M6 21h37a8 8 0 1 0-8-8"/>
                                            <path d="M6 32h47a7 7 0 1 1-7 7"/>
                                            <path d="M6 43h24a6 6 0 1 1-6 6"/>
                                        </svg>

                                        {/* snow */}
                                        <svg className={`weather-icon ${weather == 'snowy' ? 'active' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 32h34a10 10 0 0 0 1-20 15 15 0 0 0-28-1 11 11 0 0 0-7 21Z"/>
                                            <path d="M18 41v12m-5-9 10 6m0-6-10 6"/>
                                            <path d="M32 41v12m-5-9 10 6m0-6-10 6"/>
                                            <path d="M46 41v12m-5-9 10 6m0-6-10 6"/>
                                        </svg>

                                        {/* Storm */}
                                        <svg className={`weather-icon ${weather == 'stormy' ? 'active' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M15 37h33a10 10 0 0 0 0-20 14 14 0 0 0-27-2 11 11 0 0 0-6 22Z"/>
                                            <path d="m34 39-8 12h8l-3 9 12-15h-8l4-6"/>
                                        </svg>

                                        {/* cloud */}
                                        <svg className={`weather-icon ${weather == 'cloudy' ? 'active' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M16 42h33a11 11 0 0 0 0-22 15 15 0 0 0-29-2 12 12 0 0 0-4 24Z"/>
                                        </svg> 

                                    </div>
                                    <p>{weatherData.weather?.[0]?.main || ''}</p>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="search-div">
                    <div className="search-header">
                        <h1>Welcome</h1>
                        <p>Check out today's weather information</p>
                    </div>
                    <div className="search-box">
                        <h3>Search city</h3>
                        <div className="search-input-box">
                            <div className="search">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="10.8" cy="10.8" r="7" />
                                    <path d="m16 16 5 5" />
                                </svg>
                                <input type="text" name="search" value={search} placeholder="Search your city..."  onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") {handleSearch()}}}/>
                            </div>
                            <div className="search-button">
                                <button type="button" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="more-details">
                        <h3>More details of today's weather</h3>
                        <div className="weather-card-details">
                            <div className="weather-card">
                                <div className="weather-card__header">
                                    <h5>Humidity</h5>
                                    <div className="weather-card__header-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 64 64" width="24" height="24">
                                            <defs>
                                                <linearGradient id="waterDrop" x1="0" y1="0" x2="1" y2="1">
                                                    <stop offset="0%" stopColor="#fff"/>
                                                    <stop offset="100%" stopColor="#1685E8"/>
                                                </linearGradient>
                                            </defs>
                                            <path d="M32 4 C32 4 10 31 10 43 A22 22 0 0 0 54 43 C54 31 32 4 32 4Z" fill="url(#waterDrop)"/>
                                            <path d="M21 40 C22 33 27 25 30 21" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".8"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="weather-card__body">
                                        <p>{weatherData?.main?.humidity || '0'}% </p>
                                </div>
                            </div>
                            <div className="weather-card">
                                <div className="weather-card__header">
                                    <h5>Wind</h5>
                                    <div className="weather-card__header-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor"
                                            strokeWidth="3" strokeLinecap="round"strokeLinejoin="round">
                                            <path d="M7 21h37c9 0 9-13 1-13-4 0-6 3-6 5"/>
                                            <path d="M7 32h48c9 0 9 14 0 14-4 0-6-3-6-5"/>
                                            <path d="M7 43h23"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="weather-card__body">
                                        <p>{weatherData?.wind?.speed || '0'} <span>Km/h</span></p>
                                </div>
                            </div>
                            <div className="weather-card">
                                <div className="weather-card__header">
                                    <h5>Temperature <span>(Feels like)</span></h5>
                                    <div className="weather-card__header-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 64 64"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2.8"
                                            strokeLineCap="round"
                                            strokeLineJoin="round">

                                        <path d="M26 38.5V13a7 7 0 0 1 14 0v25.5 a13 13 0 1 1-14 0Z"/>
                                        <path d="M33 18v29"/>
                                        <circle cx="33" cy="48" r="5" fill="currentColor" stroke="none"/>
                                        <path d="M40 20h5m-5 8h3m-3 8h5"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="weather-card__body">
                                        <p className="temperature">{weatherData?.main?.feels_like ? degreeCheck(weatherData?.main?.feels_like).toFixed(2) : '0'}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </main>
    );
}
