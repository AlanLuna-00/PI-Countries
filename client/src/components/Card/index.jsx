import React from 'react';
import { Link } from 'react-router-dom';
import Style from './style.module.css';
import not from '../../assets/notfounded.png';

function HiCursorClick(props) {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 20 20"
            height="1em"
            width="1em"
            {...props}
            style={{ position: 'relative', top: '1px', fontSize: '15px' }}
        >
            <path
                fillRule="evenodd"
                d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Card = ({ name, flag, continent, id, notFound }) => {
    const simplifiedName = name.length > 15 ? name.substring(0, 15) + '...' : name;

    return (
        <div className={Style.card}>
            {notFound ? (
                <div className={Style.notFound}>
                    <h3>Country not found</h3>
                    <img src={not} alt="not found" />
                    <p>Please clean filters or search bar</p>
                </div>
            ) : (
                <>
                    <Link to={`/countries/${id}`} className={Style.cardLinks}>
                        <img src={flag} alt={name} className={Style.cardFlag} />
                        <h3 className={Style.cardName}>
                            {simplifiedName} <HiCursorClick />
                        </h3>
                        <p className={Style.cardContinent}>{continent}</p>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Card;
