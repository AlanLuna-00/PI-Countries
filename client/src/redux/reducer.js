import not from '../assets/notfounded.png';
import {
    GET_COUNTRIES,
    GET_COUNTRY_BY_ID,
    CLEAN_COUNTRY,
    GET_COUNTRY_BY_NAME,
    GET_ACTIVITIES,
    SORT_BY_CONTINENT,
    SORT_BY_POPULATION,
    SORT_BY_ALPHABET,
    SORT_BY_ACTIVITY,
    POST_ACTIVITY,
    FILTER_BY_NAME
} from './actions';

const initialState = {
    countries: [], // se modifica
    allCountries: [], // no se modifica
    country: {},
    activities: [],
    allActivities: [],
    loading: false
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
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
                countries: action.payload,
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case POST_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, action.payload]
            }
        case SORT_BY_CONTINENT:
            const allCountries = [...state.allCountries];
            let continentFiltered = action.payload === 'all' ? allCountries : allCountries.filter(c => c.continent === action.payload);
            return {
                ...state,
                countries: continentFiltered,
            }
        case SORT_BY_POPULATION:
            const sortedCountriesByPopulation = action.payload === 'high'
                ? [...state.countries].sort((a, b) => b.population - a.population)
                : [...state.countries].sort((a, b) => a.population - b.population);
            return {
                ...state,
                countries: sortedCountriesByPopulation,
            };
        case SORT_BY_ALPHABET:
            let sortedCountriesByAlphabet = action.payload === 'asc'
                ? [...state.countries].sort((a, b) => a.name.localeCompare(b.name))
                : [...state.countries].sort((a, b) => b.name.localeCompare(a.name));
            return {
                ...state,
                countries: sortedCountriesByAlphabet,
            };
        case SORT_BY_ACTIVITY:
            let sortedCountriesByActivity = action.payload === 'all'
                ? [...state.countries]
                : [...state.countries].filter(c => c.activities?.some(a => a.name === action.payload));
            let continent = localStorage.getItem('continent');
            if (sortedCountriesByActivity.length === 0) {
                sortedCountriesByActivity = [{
                    name: `Please clean the filter...`,
                    flag: `${not}`,
                    continent: `${action.payload} not found in ${continent}...`,
                    notFound: true
                }]
            }
            return {
                ...state,
                countries: sortedCountriesByActivity,
            };
        case FILTER_BY_NAME:
            let filteredCountriesByName = action.payload === '' ?
                [...state.allCountries] :
                [...state.allCountries].filter(c => c.name.toLowerCase().includes(action.payload.toLowerCase()));
            if (filteredCountriesByName.length === 0) {
                filteredCountriesByName = [{
                    name: 'Not found',
                    flag: `${not}`,
                    continent: 'Not country, please delete the search...',
                    notFound: true
                }]
            }
            return {
                ...state,
                countries: filteredCountriesByName
            }
        default:
            return state;
    }
}

export default rootReducer;
