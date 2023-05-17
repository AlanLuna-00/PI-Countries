import React, { useState } from 'react';
import Navbar from '../NavBar';
import Cards from '../Cards';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div>
            <Navbar setCurrentPage={setCurrentPage} />
            <Cards currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    );
}

export default Home;
