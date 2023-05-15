export const useGetActivities = async () => {
    try {
        const response = await fetch('http://localhost:3001/activities')
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}