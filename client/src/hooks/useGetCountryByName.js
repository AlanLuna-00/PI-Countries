import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName, loading, filterByName } from '../redux/actions';

const useGetCountryByName = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleButtonClick = () => {
        dispatch(getCountryByName(input));
        setInput('');
    };

    useEffect(() => {
        dispatch(filterByName(input));
    }, [input, dispatch]);
    return [input, handleInputChange, handleButtonClick];
};

export default useGetCountryByName;
