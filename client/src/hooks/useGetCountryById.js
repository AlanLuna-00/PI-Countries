import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCountryById, cleanCountry } from "../redux/actions";

const useGetCountryById = () => {
    const dispatch = useDispatch()
    const countryDetail = useSelector(state => state.country)
    const { id } = useParams()
    const idCountry = id.toUpperCase()

    useEffect(() => {
        dispatch(getCountryById(idCountry))
        return () => {
            dispatch(cleanCountry())
        }
    }, [dispatch, idCountry])

    return countryDetail
}

export default useGetCountryById