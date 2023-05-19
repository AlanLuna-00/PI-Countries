import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../redux/actions';

const useGetCountryByName = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    useEffect(() => {
        if (input) {
            dispatch(getCountryByName(input));
        }
    }, [dispatch, input]);


    return [input, handleInputChange];
}

export default useGetCountryByName;