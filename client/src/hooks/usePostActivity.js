import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountries, postActivity } from '../redux/actions';

const usePostActivity = ({ setSelectedCountries }) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: null,
        season: '',
        countriesID: []
    });

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (e) => {
        setInput({
            ...input,
            countriesID: [...input.countriesID, e.target.value]
        });
    };

    const handleDeleteCountry = (countryId) => {
        setInput({
            ...input,
            countriesID: input.countriesID.filter((country) => country !== countryId)
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postActivity(input));
        setInput({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countriesID: []
        });
        setSelectedCountries([]);
        dispatch(getCountries());
    };

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    return [input, handleInputChange, handleSelectChange, handleDeleteCountry, handleSubmit];
};

export default usePostActivity;
