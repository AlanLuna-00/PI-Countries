import React, { useEffect, useState } from 'react';
import Style from './style.module.css';
import Card from '../Card/index';
import Filters from '../Filters';
import Pagination from '../Pagination';
import useGetCountries from '../../hooks/useGetCountries';

const Cards = () => {
    const savePage = (page) => {
        localStorage.setItem('currentPage', page.toString());
    };

    const countries = useGetCountries();

    const [page, setPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage, 10) : 1;
    });

    const CARDS_PER_PAGE = 10;
    const maxPage = Math.ceil(countries?.length / CARDS_PER_PAGE);

    const indexOfLastCard = page * CARDS_PER_PAGE;
    const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
    const displayedCountries = countries?.slice(
        indexOfFirstCard,
        indexOfLastCard
    );

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    useEffect(() => {
        savePage(page);
    }, [page]);



    return (
        <>
            <div className={Style.filtersContainer}>
                <Filters setPage={setPage} />
            </div>
            <div className={Style.cards}>
                {displayedCountries.length > 0 ? (
                    displayedCountries.map((c, i) => (
                        <Card
                            key={i}
                            name={c.name}
                            flag={c.flag}
                            continent={c.continent}
                            id={c.id}
                            notFound={c.notFound}
                        />
                    ))
                ) : (
                    <div className={Style.spinnerLoading}></div>
                )}
            </div>
            <div className={Style.paginationContainer}>
                <Pagination
                    currentPage={page}
                    totalPages={maxPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default Cards;
