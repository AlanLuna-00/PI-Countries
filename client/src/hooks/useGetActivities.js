import { useSelector, useDispatch } from "react-redux";
import { getActivities } from "../redux/actions";
import { useEffect } from "react";

const useGetActivities = () => {
    const dispatch = useDispatch()
    const activities = useSelector(state => state.activities)

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch,])

    return activities
}

export default useGetActivities