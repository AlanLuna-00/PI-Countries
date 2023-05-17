import React from 'react';
import { Link } from 'react-router-dom';
import Style from './style.module.css';
import SearchBar from '../SearchBar';

const Navbar = ({ setCurrentPage }) => {
    return (
        <nav className={Style.navbar}>
            <div className={Style.leftSection}>
                <h1 className={Style.title}>THE FUCKING WORLD</h1>
            </div>
            <div className={Style.rightSection}>
                <ul className={Style.links}>
                    <li>
                        <Link to="/home" className={Style.link}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/activities" className={Style.link}>
                            Activities
                        </Link>
                    </li>
                    <li>
                        <SearchBar setCurrentPage={setCurrentPage} />
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
