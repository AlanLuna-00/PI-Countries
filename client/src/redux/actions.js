import { useGetCountries } from '../hooks/useGetCountries'
import { useGetCountryById } from '../hooks/useGetCountryById'
import { useGetCountryByName } from '../hooks/useGetCountryByName'
import { useGetActivities } from '../hooks/useGetCountryByActivity'
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
        const countries = await useGetCountries()
        dispatch({
            type: GET_COUNTRIES,
            payload: countries
        })
    }
}

export const getCountryById = (id) => {
    return async (dispatch) => {
        const country = await useGetCountryById(id)
        dispatch({
            type: GET_COUNTRY_BY_ID,
            payload: country
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
        const country = await useGetCountryByName(name)
        dispatch({
            type: GET_COUNTRY_BY_NAME,
            payload: country
        })
    }
}

export const getActivities = () => {
    return async (dispatch) => {
        const activities = await useGetActivities()
        dispatch({
            type: GET_ACTIVITIES,
            payload: activities
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

