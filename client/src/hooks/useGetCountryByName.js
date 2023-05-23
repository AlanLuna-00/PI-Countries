import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName, filterByName } from '../redux/actions';

const useGetCountryByName = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [inputChange, setInputChange] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setInputChange(true);
    };

    const handleButtonClick = () => {
        dispatch(getCountryByName(input));
        setInput('');
    };

    useEffect(() => {
        if (inputChange) {
            dispatch(filterByName(input));
            setInputChange(false);
        }
        setInputChange(false);
    }, [input, dispatch, inputChange]);
    return [input, handleInputChange, handleButtonClick];
};

export default useGetCountryByName;
