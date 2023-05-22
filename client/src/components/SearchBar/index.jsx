import { useEffect } from "react";
import useGetCountryByName from "../../hooks/useGetCountryByName";
import Style from "./style.module.css";


const SearchBar = ({ setCurrentPage }) => {
    const [input, handleInputChange, handleButtonClick] = useGetCountryByName();

    const handleCountrySelection = (e) => {
        handleInputChange(e);
        setCurrentPage(1); // Restablecer la página actual a 1 después de una búsqueda exitosa
    };

    useEffect(() => {
        if (input === '') {
            setCurrentPage(1); // Restablecer la página actual a 1 después de borrar el campo de búsqueda
        }
    }, [input, setCurrentPage]);

    return (
        <div className={Style.searchBarContainer}>
            <input
                type="text"
                id="name"
                name="name"
                value={input}
                onChange={handleCountrySelection}
                className={Style.searchBar}
                placeholder='Search country...'
                autoComplete="off"
            />
            <button type="submit" className={Style.searchButton} onClick={handleButtonClick}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;
