export const useGetCountryByName = async (name) => {
    try {
        const response = await fetch(`http://localhost:8080/countries?name=${name}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}