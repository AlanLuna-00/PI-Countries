import { useState, useEffect } from 'react';
import Style from "./style.module.css";
import { useDispatch } from "react-redux";
import { sortByContinent, sortByPopulation, sortByAlphabet, sortByActivity } from "../../redux/actions";
import useGetActivities from "../../hooks/useGetActivities";

const Filters = ({ setApplyFilter }) => {
    const dispatch = useDispatch();
    const activities = useGetActivities();

    const [selectedSort, setSelectedSort] = useState('sort');
    const [selectedPopulation, setSelectedPopulation] = useState('population');
    const [selectedContinent, setSelectedContinent] = useState('all');
    const [selectedActivity, setSelectedActivity] = useState('all');

    const handleSortByContinent = (e) => {
        const value = e.target.value;
        setSelectedContinent(value);
        dispatch(sortByContinent(value));
        setApplyFilter(true);
    };

    const handleSortByPopulation = (e) => {
        const value = e.target.value;
        setSelectedPopulation(value);
        dispatch(sortByPopulation(value));
        setApplyFilter(true);
    };

    const handleSortByAlphabet = (e) => {
        const value = e.target.value;
        setSelectedSort(value);
        dispatch(sortByAlphabet(value));
        setApplyFilter(true);
    };

    const handleSortByActivities = (e) => {
        const value = e.target.value;
        setSelectedActivity(value);
        dispatch(sortByActivity(value));
        setApplyFilter(true);
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
        setApplyFilter(true);
    };

    useEffect(() => {
        localStorage.setItem('selectedSort', selectedSort);
        localStorage.setItem('selectedPopulation', selectedPopulation);
        localStorage.setItem('selectedContinent', selectedContinent);
        localStorage.setItem('selectedActivity', selectedActivity);
    }, [selectedSort, selectedPopulation, selectedContinent, selectedActivity]);


    return (
        <div className={Style.filtersContainer}>
            <div className={Style.selectContainer}>
                <label htmlFor="sort" className={Style.label}>Sort</label>
                <select id='sort' name="Sort" className={Style.select} value={selectedSort} onChange={handleSortByAlphabet} >
                    <option value='sort' className={Style.option}>Sort</option>
                    <option value='asc' className={Style.option}>Name (A-Z)</option>
                    <option value='desc' className={Style.option}>Name (Z-A)</option>
                </select>
            </div>
            <div className={Style.selectContainer}>
                <label htmlFor="population" className={Style.label}>Population</label>
                <select id="population" name="Population" className={Style.select} value={selectedPopulation} onChange={handleSortByPopulation}>
                    <option value='population' className={Style.option}>Population</option>
                    <option value='high' className={Style.option}>Highest (↑)</option>
                    <option value='low' className={Style.option}>Lowest (↓)</option>
                </select>
            </div>
            <div className={Style.selectContainer}>
                <label htmlFor="continents" className={Style.label}>Continents</label>
                <select id="continents" name="Continents" className={Style.select} value={selectedContinent} onChange={handleSortByContinent}>
                    <option value='all' className={Style.option}>All</option>
                    <option value='Africa' className={Style.option}>Africa</option>
                    <option value='Antarctica' className={Style.option}>Antarctica</option>
                    <option value='Asia' className={Style.option}>Asia</option>
                    <option value='Europe' className={Style.option}>Europe</option>
                    <option value='North America' className={Style.option}>North America</option>
                    <option value='Oceania' className={Style.option}>Oceania</option>
                    <option value='South America' className={Style.option}>South America</option>
                </select>
            </div>
            <div className={Style.selectContainer}>
                <label htmlFor="activities" className={Style.label}>Activities</label>
                <select id="activities" name="Activities" className={Style.select} value={selectedActivity} onChange={handleSortByActivities}>
                    <option value='all' className={Style.option}>All</option>
                    {activities.map(a => <option key={a.name} value={a.name} className={Style.option}>{a.name}</option>)}
                </select>
            </div>
            <div className={Style.selectContainer}>
                <button id="clean" className={Style.button} onClick={handleCleanFilters}>Clean Filters</button>
            </div>
        </div>
    );
};

export default Filters;
