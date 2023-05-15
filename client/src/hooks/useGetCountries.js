export const useGetCountries = async () => {
    try {
        const response = await fetch('http://localhost:3001/countries')
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}