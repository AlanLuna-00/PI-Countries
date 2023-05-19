import usePostActivity from "../../hooks/usePostActivity";
import useGetCountries from "../../hooks/useGetCountries";
import Style from "./style.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formValidate from "./formValidation";

const Form = () => {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [errors, setErrors] = useState({});
    const [input, handleInputChange, handleSelectChange, handleSubmit] =
        usePostActivity({
            setSelectedCountries,
        });
    const countries = useGetCountries();

    const handleCountrySelection = (e) => {
        const selectedCountryId = e.target.value;
        const selectedCountry = countries.find((c) => c.id === selectedCountryId);

        if (selectedCountry && !selectedCountries.includes(selectedCountry)) {
            setSelectedCountries([...selectedCountries, selectedCountry]);
        }
    };

    const handleCountryRemoval = (countryId) => {
        const updatedSelectedCountries = selectedCountries.filter(
            (country) => country.id !== countryId
        );
        setSelectedCountries(updatedSelectedCountries);
        handleInputChange({
            target: {
                name: "countriesID",
                value: updatedSelectedCountries.map((c) => c.id),
            },
        });
    };

    let countriesSorted = countries?.sort((a, b) => a.name.localeCompare(b.name));

    const validateField = (name, value) => {
        const errors = formValidate({ ...input, [name]: value });
        return errors[name] || "";
    };


    const handleInputChangeWithValidation = (e) => {
        const { name, value } = e.target;
        const errorMessage = validateField(name, value);

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));

        handleInputChange(e);
    };

    const validateForm = () => {
        const formErrors = formValidate(input);
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(e);
        }
    };

    const seasons = ["Summer", "Autumn", "Winter", "Spring"];

    useEffect(() => {
        setErrors(formValidate(input));
    }, [input]);

    return (
        <div className={Style.formContainer}>
            <form onSubmit={handleFormSubmit} className={Style.form}>
                <div className={Style.inputContainer}>
                    <label htmlFor="name" className={Style.label}>
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={input.name}
                        onChange={handleInputChangeWithValidation}
                        className={Style.input}
                    />
                    {errors.name && <p className={Style.error}>* {errors.name}</p>}
                </div>
                <div className={Style.inputContainer}>
                    <label htmlFor="difficulty" className={Style.label}>
                        Difficulty
                    </label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        className={Style.select}
                        onChange={handleInputChangeWithValidation}
                    >
                        <option value="" className={Style.option}>
                            Select difficulty
                        </option>
                        {Array.from(Array(5).keys()).map((number) => (
                            <option key={number} value={number + 1} className={Style.option}>
                                {number + 1} {number + 1 === 1 ? "star" : "stars"}
                            </option>
                        ))}
                    </select>
                    {errors.difficulty && (
                        <p className={Style.error}>* {errors.difficulty}</p>
                    )}
                </div>
                <div className={Style.inputContainer}>
                    <label htmlFor="duration" className={Style.label}>
                        Duration
                    </label>
                    <select
                        id="duration"
                        name="duration"
                        className={Style.select}
                        onChange={handleInputChangeWithValidation}
                    >
                        <option value="" className={Style.option}>
                            Select duration
                        </option>
                        {Array.from(Array(5).keys()).map((number) => (
                            <option key={number} value={number + 1} className={Style.option}>
                                {number + 1} {number + 1 === 1 ? "hour" : "hours"}
                            </option>
                        ))}
                    </select>
                    {errors.duration && <p className={Style.error}>* {errors.duration}</p>}
                </div>
                <div className={Style.inputContainer}>
                    <label htmlFor="season" className={Style.label}>
                        Season
                    </label>
                    <select
                        id="season"
                        name="season"
                        className={Style.select}
                        onChange={handleInputChangeWithValidation}
                    >
                        <option value="" className={Style.option}>
                            Select season
                        </option>
                        {seasons.map((season, i) => (
                            <option key={i} value={season} className={Style.option}>
                                {season}
                            </option>
                        ))}
                    </select>
                    {errors.season && <p className={Style.error}>* {errors.season}</p>}
                </div>
                <div className={Style.inputContainer}>
                    <label htmlFor="countries" className={Style.label}>
                        Countries
                    </label>
                    <select
                        id="countries"
                        name="countriesID" // Actualizamos el nombre del campo a "countriesID"
                        className={Style.select}
                        onChange={(e) => {
                            handleSelectChange(e);
                            handleCountrySelection(e);
                            handleInputChangeWithValidation(e); // Aplica la validación al campo de selección de países
                        }}
                        multiple
                    >
                        <option value="" className={Style.option}>
                            Select countries
                        </option>
                        {countriesSorted?.map((c, i) => (
                            <option key={i} value={c.id} className={Style.option}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {errors.countriesID && <p className={Style.error}>* {errors.countriesID}</p>}
                </div>
                {selectedCountries?.map((country, index) => (
                    <li key={index} className={Style.selectedCountryItem}>
                        {country.name}
                        <span
                            className={Style.removeCountryButton}
                            onClick={() => handleCountryRemoval(country.id)}
                        >
                            ❌
                        </span>
                    </li>
                ))}
                <div className={Style.buttonsContainer}>
                    <button type="submit"
                        // classname will be disabled if there are errors
                        className={Object.keys(errors).length ? Style.submitButtonDisabled : Style.submitButton}
                    >
                        Create activity
                    </button>

                    <Link to="/home" className={Style.backButton}>
                        Go Back
                    </Link>
                </div>
            </form >
        </div >
    );
};

export default Form;
