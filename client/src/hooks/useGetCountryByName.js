export const useGetCountryByName = async (name) => {
    try {
        const response = await fetch(`http://localhost:3001/countries?name=${name}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}