import { useEffect, useState } from 'react';
import Style from './style.module.css';
import Card from '../Card/index';
import useGetCountries from '../../hooks/useGetCountries';

const Cards = () => {
    const [page, setPage] = useState(getSavedPage() || 1);
    const countries = useGetCountries();

    const CARDS_PER_PAGE = 10; // Cambia este valor según tus necesidades

    const maxPage = Math.ceil(countries.length / CARDS_PER_PAGE);

    const indexOfLastCard = page * CARDS_PER_PAGE;
    const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
    const displayedCountries = countries.slice(
        indexOfFirstCard,
        indexOfLastCard
    );

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < maxPage) {
            setPage(page + 1);
        }
    };

    const handleFirstPage = () => {
        setPage(1);
    };

    const handleLastPage = () => {
        setPage(maxPage);
    };

    useEffect(() => {
        // Guarda la página actual en localStorage
        savePage(page);
    }, [page]);

    function savePage(page) {
        localStorage.setItem('currentPage', page.toString());
    }

    function getSavedPage() {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage, 10) : null;
    }

    return (
        <>
            <div>Página {page}</div>
            <div className={Style.cards}>
                {displayedCountries.map((c, i) => (
                    <Card
                        key={i}
                        name={c.name}
                        flag={c.flag}
                        continent={c.continent}
                        id={c.id}
                    />
                ))}
            </div>
            <div className={Style.pagination}>
                {page > 1 && (
                    <button onClick={handleFirstPage} disabled={page === 1}>
                        &lt;&lt; 1
                    </button>
                )}
                <button onClick={handlePrevPage} disabled={page === 1}>
                    Anterior
                </button>
                <button onClick={handleNextPage} disabled={page === maxPage}>
                    Siguiente
                </button>
                {page < maxPage && (
                    <button onClick={handleLastPage} disabled={page === maxPage}>
                        25 &gt;&gt;
                    </button>
                )}
            </div>
        </>
    );
};

export default Cards;
