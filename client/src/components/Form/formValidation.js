const formValidate = (values) => {
    let errors = {};

    if (!values.name.trim()) {
        errors.name = "Name is required";
    } else if (/[^A-Za-z0-9 ]+/g.test(values.name)) {
        errors.name = "Name must be alphanumeric";
    }

    if (!values.difficulty) {
        errors.difficulty = "Difficulty is required";
    }

    if (!values.duration) {
        errors.duration = "Duration is required";
    }

    if (!values.season) {
        errors.season = "Season is required";
    }

    if (values.countriesID.length === 0) {
        errors.countriesID = "Select at least one country";
    }

    return errors;
};

export default formValidate;