import React, { useState } from 'react';
import Style from './style.module.css';
import { useDispatch } from 'react-redux';
import { sortByContinent, sortByPopulation, sortByAlphabet, sortByActivity } from '../../redux/actions';
import useGetActivities from '../../hooks/useGetActivities';

const Filters = ({ setCurrentPage }) => {
    const dispatch = useDispatch();

    const activities = useGetActivities();

    const [selectedSort, setSelectedSort] = useState(localStorage.getItem('selectedSort') || 'Sort');
    const [selectedPopulation, setSelectedPopulation] = useState(localStorage.getItem('selectedPopulation') || 'Population');
    const [selectedContinent, setSelectedContinent] = useState(localStorage.getItem('selectedContinent') || 'All');
    const [selectedActivity, setSelectedActivity] = useState(localStorage.getItem('selectedActivity') || 'All');

    const handleSortByAlphabet = (e) => {
        const value = e.target.value;
        setSelectedSort(value);
        localStorage.setItem('selectedSort', value);
        localStorage.setItem('selectedPopulation', 'Population');
        setSelectedPopulation('population');
        dispatch(sortByAlphabet(value));
        setCurrentPage(1);
    };

    const handleSortByPopulation = (e) => {
        const value = e.target.value;
        setSelectedPopulation(value);
        localStorage.setItem('selectedPopulation', value);
        localStorage.setItem('selectedSort', 'Sort');
        setSelectedSort('Sort');
        dispatch(sortByPopulation(value));
        setCurrentPage(1);
    };

    const handleSortByContinent = (e) => {
        const value = e.target.value;
        setSelectedContinent(value);
        localStorage.setItem('selectedContinent', value);
        dispatch(sortByContinent(value));
        setCurrentPage(1);
    };

    const handleSortByActivities = (e) => {
        const value = e.target.value;
        setSelectedActivity(value);
        localStorage.setItem('selectedActivity', value);
        dispatch(sortByActivity(value));
        setCurrentPage(1);
    };

    const handleCleanFilters = () => {
        setSelectedSort('sort');
        setSelectedPopulation('population');
        setSelectedContinent('all');
        setSelectedActivity('all');
        dispatch(sortByContinent('all'));
        dispatch(sortByPopulation('population'));
        dispatch(sortByAlphabet('sort'));
        dispatch(sortByActivity('all'));
        setCurrentPage(1);
        localStorage.removeItem('selectedSort');
        localStorage.removeItem('selectedPopulation');
        localStorage.removeItem('selectedContinent');
        localStorage.removeItem('selectedActivity');
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
                    value={selectedSort}
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
                    Population (Sort)
                </label>
                <select
                    id="population"
                    name="Population"
                    className={Style.select}
                    value={selectedPopulation}
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
                    Continents (Filter)
                </label>
                <select
                    id="continents"
                    name="Continents"
                    className={Style.select}
                    value={selectedContinent}
                    onChange={handleSortByContinent}
                >
                    <option value="all" className={Style.option}>
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
                    value={selectedActivity}
                    onChange={handleSortByActivities}
                >
                    <option value="all" className={Style.option}>
                        All
                    </option>
                    {activities?.length > 0 ?
                        activities?.map((a) => (
                            <option key={a.id} value={a.name} className={Style.option}>
                                {a.name}
                            </option>
                        )) : <option value="all" className={Style.option}>
                            Create a activity
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
