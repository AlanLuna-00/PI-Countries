import { GET_COUNTRIES, GET_COUNTRY_BY_ID, CLEAN_COUNTRY, GET_COUNTRY_BY_NAME, GET_ACTIVITIES, SORT_BY_CONTINENT, SORT_BY_POPULATION, SORT_BY_ALPHABET } from "./actions"

const initialState = {
    countries: [],
    country: {},
    activities: [],
    filteredCountries: [],
    filteredActivities: [],
    continent: '',
    population: '',
    alphabet: ''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload
            }
        case GET_COUNTRY_BY_ID:
            return {
                ...state,
                country: action.payload
            }
        case CLEAN_COUNTRY:
            return {
                ...state,
                country: {}
            }
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                filteredCountries: action.payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case SORT_BY_CONTINENT:
            const filteredCountries = action.payload === 'All' ? state.countries : state.countries.filter(c => c.continent === action.payload)
            return {
                ...state,
                filteredCountries: filteredCountries
            }
        case SORT_BY_POPULATION:
            const sortedCountries = action.payload === 'high' ?
                state.filteredCountries.sort((a, b) => b.population - a.population) :
                action.payload === 'low' ? state.filteredCountries.sort((a, b) => a.population - b.population) : [...state.countries]
            return {
                ...state,
                filteredCountries: sortedCountries
            }
        case SORT_BY_ALPHABET:
            const sortedAlphabet = action.payload === 'asc' ?
                state.filteredCountries.sort((a, b) => a.name.localeCompare(b.name)) :
                action.payload === 'desc' ? state.filteredCountries.sort((a, b) => b.name.localeCompare(a.name)) : [...state.countries]
            return {
                ...state,
                filteredCountries: sortedAlphabet
            }
        default:
            return {
                ...state
            }
    }
}