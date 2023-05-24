import { useEffect, useState } from "react";
import Style from "./style.module.css";
import usePostActivity from "../../hooks/usePostActivity";
import useGetCountries from "../../hooks/useGetCountries";
import useGetActivities from "../../hooks/useGetActivities";
import { Link } from "react-router-dom";
import formValidate from "./formValidation";
import Navbar from "../NavBar";

const Form = () => {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [input, handleInputChange, handleSelectChange, handleDeleteCountry, handleSubmit] = usePostActivity({ setSelectedCountries });
    const countries = useGetCountries();
    const activities = useGetActivities();

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(activities));
    }, [activities]);

    const errors = formValidate(input);

    const handleCountrySelection = (e) => {
        const selectedCountryId = e.target.value;
        const selectedCountry = countries.find((c) => c.id === selectedCountryId);
        if (!selectedCountries.find((c) => c.id === selectedCountryId)) {
            setSelectedCountries([...selectedCountries, selectedCountry]);
        }

    };

    useEffect(() => {
        formValidate(input);
    }, [input]);


    const seasons = ["Summer", "Autumn", "Winter", "Spring"];

    const sortCountries = countries.sort((a, b) => a.name.localeCompare(b.name));

    const Required = () => {
        return (
            <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>*</span>
        )
    }

    return (
        <>
            <div className={Style.formContainer}>
                <form onSubmit={handleSubmit} className={Style.form}>
                    <div className={Style.inputContainer}>
                        <label htmlFor="name" className={Style.label}>Name <Required /></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={input.name}
                            onChange={handleInputChange}
                            className={Style.input}
                            autoComplete="off"
                        />
                        {errors.name && <span className={Style.error}>{errors.name}</span>}
                    </div>
                    <div className={Style.inputContainer}>
                        <label htmlFor="difficulty" className={Style.label}>Difficulty <Required /></label>
                        <select id='difficulty' name="difficulty" className={Style.select} onChange={handleInputChange} value={input.difficulty}>
                            <option value='' className={Style.option}>Select difficulty</option>
                            {Array.from(Array(5).keys()).map((number) => (
                                <option key={number} value={number + 1} className={Style.option}>
                                    {number + 1} {number + 1 === 1 ? "star" : "stars"}
                                </option>
                            ))}
                        </select>
                        {errors.difficulty && <span className={Style.error}>{errors.difficulty}</span>}
                    </div>
                    <div className={Style.inputContainer}>
                        <label htmlFor="duration" className={Style.label}>Duration</label>
                        <select id='duration' name="duration" className={Style.select} onChange={handleInputChange} value={input.duration}>
                            <option value={null} className={Style.option}>Select duration</option>
                            {Array.from(Array(12).keys()).map((number) => (
                                <option key={number} value={number + 1} className={Style.option}>
                                    {number + 1} {number + 1 === 1 ? "hour" : "hours"}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={Style.inputContainer}>
                        <label htmlFor="season" className={Style.label}>Season <Required /></label>
                        <select id='season' name="season" className={Style.select} onChange={handleInputChange} value={input.season}>
                            <option value='' className={Style.option}>Select season</option>
                            {seasons.map((season, i) => (
                                <option key={i} value={season} className={Style.option}>{season}</option>
                            ))}
                        </select>
                        {errors.season && <span className={Style.error}>{errors.season}</span>}
                    </div>
                    <div className={Style.inputContainer}>
                        <label htmlFor="countries" className={Style.label}>
                            Countries <Required />
                        </label>
                        <select
                            id="countries"
                            name="countries"
                            value={input.countriesID}
                            className={Style.select}
                            onChange={(e) => {
                                handleSelectChange(e);
                                handleCountrySelection(e);
                            }}
                            multiple
                        >
                            {sortCountries.map((c, i) => (
                                <option key={i} value={c.id} className={Style.option}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        {errors.countriesID && <span className={Style.error}>{errors.countriesID}</span>}
                    </div>
                    {selectedCountries.map((country, index) => (
                        <li key={index} className={Style.selectedCountryItem}>
                            {country.name}
                            <span
                                className={Style.removeCountryButton}
                                onClick={() => {
                                    handleDeleteCountry(country.id);
                                    setSelectedCountries((prevSelectedCountries) =>
                                        prevSelectedCountries.filter(
                                            (c) => c.id !== country.id
                                        )
                                    );
                                }}
                            >
                                ❌
                            </span>
                        </li>
                    ))}
                    <div className={Style.buttonsContainer}>
                        <button
                            type="submit"
                            className={Object.keys(errors).length ? Style.submitButtonDisabled : Style.submitButton}
                            disabled={Object.keys(errors).length}
                        >
                            Create activity
                        </button>
                        <Link to="/home" className={Style.backButton}>
                            Go Back
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Form;
