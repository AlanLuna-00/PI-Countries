import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar';
import Cards from '../Cards';
import { useDispatch } from 'react-redux';
import { getActivities } from '../../redux/actions';


const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        if (savedPage) {
            setCurrentPage(parseInt(savedPage, 10));
        }
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
    }, [currentPage]);

    return (
        <div>
            <Navbar setCurrentPage={setCurrentPage} />
            <Cards currentPage={currentPage} onPageChange={handlePageChange} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default Home;