import React from 'react';
import { Link } from 'react-router-dom';
import Style from './style.module.css';
import SearchBar from '../SearchBar';
import logo from '../../assets/title.png'
import { useLocation } from 'react-router-dom';


const Navbar = () => {
    const location = useLocation();
    return (
        <nav className={Style.navbar}>
            <div className={Style.leftSection}>
                {/* src in assets */}
                <img src={logo} alt='THE FUCKING WORLD' className={Style.title}></img>
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
                        {location !== '/activities' && <SearchBar />}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
