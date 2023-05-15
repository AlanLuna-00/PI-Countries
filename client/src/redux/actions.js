export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_COUNTRY_BY_ID = 'GET_COUNTRY_BY_ID'
export const CLEAN_COUNTRY = 'CLEAN_COUNTRY'
export const GET_COUNTRY_BY_NAME = 'GET_COUNTRY_BY_NAME'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const SORT_BY_CONTINENT = 'SORT_BY_CONTINENT'
export const SORT_BY_POPULATION = 'SORT_BY_POPULATION'
export const SORT_BY_ALPHABET = 'SORT_BY_ALPHABET'

export const getCountries = () => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:8080/countries')
        const data = await response.json()
        dispatch({
            type: GET_COUNTRIES,
            payload: data
        })
    }
}

export const getCountryById = (id) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/countries/${id}`)
        const data = await response.json()
        dispatch({
            type: GET_COUNTRY_BY_ID,
            payload: data
        })
    }
}

export const cleanCountry = () => {
    return {
        type: CLEAN_COUNTRY
    }
}

export const getCountryByName = (name) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/countries?name=${name}`)
        const data = await response.json()
        dispatch({
            type: GET_COUNTRY_BY_NAME,
            payload: data
        })
    }
}

export const getActivities = () => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:8080/activities')
        const data = await response.json()
        dispatch({
            type: GET_ACTIVITIES,
            payload: data
        })
    }
}

export const sortByContinent = (continent) => {
    return {
        type: SORT_BY_CONTINENT,
        payload: continent
    }
}

export const sortByPopulation = (population) => {
    return {
        type: SORT_BY_POPULATION,
        payload: population
    }
}

export const sortByAlphabet = (alphabet) => {
    return {
        type: SORT_BY_ALPHABET,
        payload: alphabet
    }
}

