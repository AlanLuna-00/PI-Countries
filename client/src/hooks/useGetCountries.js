import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../redux/actions";
import { useEffect } from "react";

const useGetCountries = () => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);

    useEffect(() => {
        if (!countries?.length) {
            dispatch(getCountries());
        }
    }, [countries, dispatch]);

    return countries;
};

export default useGetCountries;
