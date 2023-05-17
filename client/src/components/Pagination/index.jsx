import { useState } from 'react';
import Style from './style.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [inputPage, setInputPage] = useState('');

    const handleInputChange = (e) => {
        setInputPage(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const handleGoToPage = () => {
        const pageNumber = parseInt(inputPage, 10);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            handlePageChange(pageNumber);
            setInputPage('');
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; // Número máximo de páginas para mostrar

        // Cálculo de las páginas iniciales y finales del grupo
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // Ajuste para mostrar siempre el número máximo de páginas
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? Style.active : ''}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className={Style.pagination}>
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                &lt;&lt; 1
            </button>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
            <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                {totalPages} &gt;&gt;
            </button>
            <div className={Style.goToPage}>
                Ir a la página:
                <input
                    type="number"
                    value={inputPage}
                    onChange={handleInputChange}
                    min="1"
                    max={totalPages}
                />
                <button onClick={handleGoToPage}>Ir</button>
            </div>
        </div>
    );
};

export default Pagination;
