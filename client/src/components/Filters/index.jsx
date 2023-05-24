import React, { useState } from 'react';
import Style from './style.module.css';
import { useDispatch } from 'react-redux';
import { sortByContinent, sortByPopulation, sortByAlphabet, sortByActivity } from '../../redux/actions';
import useGetActivities from '../../hooks/useGetActivities';

const Filters = ({ setPage }) => {
    const dispatch = useDispatch();
    const activities = useGetActivities();

    const initialFilters = {
        selectedSort: localStorage.getItem('selectedSort') || 'Sort',
        selectedPopulation: localStorage.getItem('selectedPopulation') || 'Population',
        selectedContinent: localStorage.getItem('selectedContinent') || 'All',
        selectedActivity: localStorage.getItem('selectedActivity') || 'All',
    };

    const [filters, setFilters] = useState(initialFilters);

    const handleSortByAlphabet = (e) => {
        const value = e.target.value;
        const updatedFilters = {
            ...filters,
            selectedSort: value,
            selectedPopulation: 'Population',
        };
        setFilters(updatedFilters);
        dispatch(sortByAlphabet(value));
        setPage(1);
    };

    const handleSortByPopulation = (e) => {
        const value = e.target.value;
        const updatedFilters = {
            ...filters,
            selectedPopulation: value,
            selectedSort: 'Sort',
        };
        setFilters(updatedFilters);
        dispatch(sortByPopulation(value));
        setPage(1);
    };

    const handleSortByContinent = (e) => {
        const value = e.target.value;
        const updatedFilters = {
            ...filters,
            selectedContinent: value,
        };
        setFilters(updatedFilters);
        dispatch(sortByContinent(value));
        setPage(1);
    };

    const handleSortByActivities = (e) => {
        const value = e.target.value;
        const updatedFilters = {
            ...filters,
            selectedActivity: value,
        };
        setFilters(updatedFilters);
        dispatch(sortByActivity(value));
        setPage(1);
    };

    const handleCleanFilters = () => {
        const updatedFilters = {
            selectedSort: 'sort',
            selectedPopulation: 'population',
            selectedContinent: 'all',
            selectedActivity: 'all',
        };
        setFilters(updatedFilters);
        dispatch(sortByContinent('All'));
        dispatch(sortByPopulation('Population'));
        dispatch(sortByAlphabet('Sort'));
        dispatch(sortByActivity('All'));
        localStorage.removeItem('selectedSort');
        localStorage.removeItem('selectedPopulation');
        localStorage.removeItem('selectedContinent');
        localStorage.removeItem('selectedActivity');
        setPage(1);
    };

    const continents = ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];

    return (
        <div className={Style.filtersContainer}>
            <div className={Style.selectContainer}>
                <label htmlFor="sort" className={Style.label}>
                    Alphabet (Sort)
                </label>
                <select
                    id="sort"
                    name="Sort"
                    className={Style.select}
                    value={filters.selectedSort}
                    onChange={handleSortByAlphabet}
                >
                    <option value="Sort" className={Style.option}>
                        Sort (A-Z)
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
                    Population (Sort)
                </label>
                <select
                    id="population"
                    name="Population"
                    className={Style.select}
                    value={filters.selectedPopulation}
                    onChange={handleSortByPopulation}
                >
                    <option value="Population" className={Style.option}>
                        Population (=)
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
                    Continents (Filter)
                </label>
                <select
                    id="continents"
                    name="Continents"
                    className={Style.select}
                    value={filters.selectedContinent}
                    onChange={handleSortByContinent}
                >
                    <option value="All" className={Style.option}>
                        All
                    </option>
                    {continents.map((c) => (
                        <option key={c} value={c} className={Style.option}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>
            <div className={Style.selectContainer}>
                <label htmlFor="activities" className={Style.label}>
                    Activities (Filter)
                </label>
                <select
                    id="activities"
                    name="Activities"
                    className={Style.select}
                    value={filters.selectedActivity}
                    onChange={handleSortByActivities}
                >
                    <option value="All" className={Style.option}>
                        All
                    </option>
                    {activities?.length > 0 ?
                        activities?.map((a) => (
                            <option key={a.id} value={a.name} className={Style.option}>
                                {a.name}
                            </option>
                        )) : <option value="All" className={Style.option}>
                            Create an activity
                        </option>}
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
