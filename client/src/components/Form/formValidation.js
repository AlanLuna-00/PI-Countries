const formValidate = (values) => {
    let errors = {};;

    if (!values.name.trim()) {
        errors.name = "Name is required";
    } else if (/[^A-Za-z0-9 ]+/g.test(values.name)) {
        errors.name = "Name must be alphanumeric";
    } else if (values.name.length < 4 || values.name.length > 20) {
        errors.name = "Name must be between 4 and 20 characters";
    }

    if (values.name.trim()) {
        let activities = JSON.parse(localStorage.getItem('activities'));
        if (activities) {
            // si el nombre de la actividad ya existe, no la agrego
            let activity = activities?.find(a => a.name?.toLowerCase().trim() === values.name?.toLowerCase().trim());
            activity && (errors.name = "Activity already exists");
        }
    }

    !values.difficulty && (errors.difficulty = "Difficulty is required");

    !values.season && (errors.season = "Season is required");

    values.countriesID.length === 0 && (errors.countriesID = "Select at least one country");

    return errors;
};

export default formValidate;