export const useGetCountryById = async (id) => {
    try {
        const response = await fetch(`http://localhost:3001/countries/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}