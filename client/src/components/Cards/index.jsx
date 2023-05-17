import { useEffect, useState } from 'react';
import Style from './style.module.css';
import Card from '../Card/index';
import useGetCountries from '../../hooks/useGetCountries';
import Filters from '../Filters';
import Pagination from '../Pagination';

const Cards = ({ currentPage, onPageChange }) => {
    const savePage = (page) => {
        localStorage.setItem('currentPage', page.toString());
    };

    const getSavedPage = () => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage, 10) : null;
    };

    const [page, setPage] = useState(getSavedPage() || currentPage || 1);
    const countries = useGetCountries();
    const [applyFilter, setApplyFilter] = useState(false);

    const CARDS_PER_PAGE = 10;

    const maxPage = Math.ceil(countries.length / CARDS_PER_PAGE);

    const indexOfLastCard = page * CARDS_PER_PAGE;
    const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
    const displayedCountries = countries.slice(
        indexOfFirstCard,
        indexOfLastCard
    );

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        onPageChange(pageNumber);
    };

    useEffect(() => {
        savePage(page);
    }, [page]);

    useEffect(() => {
        if (applyFilter) {
            setPage(1);
            setApplyFilter(false);
        }
    }, [applyFilter]);

    useEffect(() => {
        if (currentPage) {
            setPage(currentPage);
        }
    }, [currentPage]);

    return (
        <>
            <Filters setApplyFilter={setApplyFilter} />
            <div className={Style.cards}>
                {displayedCountries.length > 0 ? (
                    displayedCountries.map((c, i) => (
                        <Card key={i} name={c.name} flag={c.flag} continent={c.continent} id={c.id} />
                    ))
                ) : (
                    <div className={Style.spinnerLoading}></div>
                )
                }
            </div>
            <div className={Style.paginationContainer}>
                <Pagination currentPage={page} totalPages={maxPage} onPageChange={handlePageChange} />
            </div>
        </>
    );
};

export default Cards;