import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postActivity } from '../redux/actions';

const usePostActivity = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
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
            countries: [...input.countries, e.target.value]
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
            countries: []
        });
        console.log(input)
    };


    return [input, handleInputChange, handleSelectChange, handleSubmit];
}

export default usePostActivity;