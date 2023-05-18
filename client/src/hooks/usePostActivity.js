import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postActivity } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const usePostActivity = ({ setSelectedCountries }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
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
        navigate('/home');
        console.log(input)
    };


    return [input, handleInputChange, handleSelectChange, handleSubmit];
}

export default usePostActivity;