import React from 'react';
import { Link } from 'react-router-dom';
import Style from './style.module.css';

const Card = ({ name, flag, continent, id }) => {
    return (
        <div className={Style.card}>
            <Link to={`/countries/${id}`} className={Style.cardLinks}>
                <img src={flag} alt={name} className={Style.cardFlag} />
                <h3 className={Style.cardName}>{name}</h3>
                <p className={Style.cardContinent}>{continent}</p>
            </Link>
        </div>
    );
};

export default Card;
