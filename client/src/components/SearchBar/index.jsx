import { useEffect } from "react";
import useGetCountryByName from "../../hooks/useGetCountryByName";
import Style from "./style.module.css";


const SearchBar = () => {
    const [input, handleInputChange, handleButtonClick] = useGetCountryByName();

    const handleCountrySelection = (e) => {
        handleInputChange(e);
        localStorage.setItem('currentPage', 1);
    };

    useEffect(() => {
        localStorage.setItem('currentPage', 1);
    }, [input]);

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
                Search by API
            </button>
        </div>
    );
};

export default SearchBar;
