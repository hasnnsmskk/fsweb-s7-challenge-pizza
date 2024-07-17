import React from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/order');
    };

    return (
        <div className="home">
            <h1>Teknolojik Yemekler</h1>
            <p>KOD ACIKTIRIR</p>
            <p>PIZZA, DOYURUR</p>
            <button onClick={handleClick}>ACIKTIM</button>
        </div>
    );
};

export default Home;