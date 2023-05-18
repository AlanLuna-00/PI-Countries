import React, { useEffect } from 'react';
import Style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { sortByContinent, sortByPopulation, sortByAlphabet, sortByActivity, setFilterContinent, setFilterPopulation } from '../../redux/actions';
import useGetActivities from '../../hooks/useGetActivities';

const Filters = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const activities = useGetActivities();

    const filterContinent = useSelector((state) => state.filterContinent);
    const filterPopulation = useSelector((state) => state.filterPopulation);

    useEffect(() => {
        // Recuperar los valores de los filtros desde el LocalStorage al montar el componente
        const savedContinent = localStorage.getItem('filterContinent');
        const savedPopulation = localStorage.getItem('filterPopulation');

        if (savedContinent) {
            dispatch(setFilterContinent(savedContinent));
        }

        if (savedPopulation) {
            dispatch(setFilterPopulation(savedPopulation));
        }
    }, []);

    const handleSortByContinent = (e) => {
        const value = e.target.value;
        dispatch(sortByContinent(value));
        dispatch(setFilterContinent(value));
        setCurrentPage(1);
        localStorage.setItem('filterContinent', value); // Guardar el valor en el LocalStorage
    };

    const handleSortByPopulation = (e) => {
        const value = e.target.value;
        dispatch(sortByPopulation(value));
        dispatch(setFilterPopulation(value));
        setCurrentPage(1);
        localStorage.setItem('filterPopulation', value); // Guardar el valor en el LocalStorage
    };

    const handleSortByAlphabet = (e) => {
        const value = e.target.value;
        dispatch(sortByAlphabet(value));
        setCurrentPage(1);
    };

    const handleSortByActivities = (e) => {
        const value = e.target.value;
        dispatch(sortByActivity(value));
        setCurrentPage(1);
    };

    const handleCleanFilters = () => {
        dispatch(sortByContinent('all'));
        dispatch(sortByPopulation('population'));
        dispatch(sortByAlphabet('sort'));
        dispatch(sortByActivity('all'));
        setCurrentPage(1);
        localStorage.removeItem('filterContinent'); // Eliminar el valor del LocalStorage
        localStorage.removeItem('filterPopulation'); // Eliminar el valor del LocalStorage
    };
    return (
        <div className={Style.filtersContainer}>
            <div className={Style.selectContainer}>
                <label htmlFor="sort" className={Style.label}>
                    Sort
                </label>
                <select
                    id="sort"
                    name="Sort"
                    className={Style.select}
                    defaultValue="sort"
                    onChange={handleSortByAlphabet}
                >
                    <option value="sort" className={Style.option}>
                        Sort
                    </option>
                    <option value="asc" className={Style.option}>
                        Name (A-Z)
                    </option>
                    <option value="desc" className={Style.option}>
                        Name (Z-A)
                    </option>
                </select>
            </div>
            <div className={Style.selectContainer}>
                <label htmlFor="population" className={Style.label}>
                    Population
                </label>
                <select
                    id="population"
                    name="Population"
                    className={Style.select}
                    defaultValue="population"
                    onChange={handleSortByPopulation}
                >
                    <option value="population" className={Style.option}>
                        Population
                    </option>
                    <option value="high" className={Style.option}>
                        Highest (↑)
                    </option>
                    <option value="low" className={Style.option}>
                        Lowest (↓)
                    </option>
                </select>
            </div>
            <div className={Style.selectContainer}>
                <label htmlFor="continents" className={Style.label}>
                    Continents
                </label>
                <select
                    id="continents"
                    name="Continents"
                    className={Style.select}
                    defaultValue="all"
                    onChange={handleSortByContinent}
                >
                    <option value="all" className={Style.option}>
                        All
                    </option>
                    <option value="Africa" className={Style.option}>
                        Africa
                    </option>
                    <option value="Antarctica" className={Style.option}>
                        Antarctica
                    </option>
                    <option value="Asia" className={Style.option}>
                        Asia
                    </option>
                    <option value="Europe" className={Style.option}>
                        Europe
                    </option>
                    <option value="North America" className={Style.option}>
                        North America
                    </option>
                    <option value="Oceania" className={Style.option}>
                        Oceania
                    </option>
                    <option value="South America" className={Style.option}>
                        South America
                    </option>
                </select>
            </div>
            <div className={Style.selectContainer}>
                <label htmlFor="activities" className={Style.label}>
                    Activities
                </label>
                <select
                    id="activities"
                    name="Activities"
                    className={Style.select}
                    defaultValue="all"
                    onChange={handleSortByActivities}
                >
                    <option value="all" className={Style.option}>
                        All
                    </option>
                    {activities.map((a) => (
                        <option key={a.name} value={a.name} className={Style.option}>
                            {a.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={Style.selectContainer}>
                <button id="clean" className={Style.button} onClick={handleCleanFilters}>
                    Clean Filters
                </button>
            </div>
        </div>
    );
};

export default Filters;
