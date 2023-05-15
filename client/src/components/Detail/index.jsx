import Style from "./style.module.css"
import { Link } from "react-router-dom"
import useGetCountryById from "../../hooks/useGetCountryById"

const Detail = () => {

    const countryDetail = useGetCountryById()
    const activities = countryDetail.activities || []

    return (
        <div className={Style.detail}>
            <div className={Style.detailCard}>
                <img src={countryDetail.flag} alt={countryDetail.name} className={Style.detailFlag} />
                <h1 className={Style.detailName}>{countryDetail.name}</h1>
                <p className={Style.detailContinent}>{countryDetail.continent}</p>
                <p className={Style.detailCapital}>Capital: {countryDetail.capital}</p>
                <p className={Style.detailSubregion}>Subregion: {countryDetail.subregion}</p>
                <p className={Style.detailArea}>Area: {countryDetail.area} km²</p>
                <p className={Style.detailPopulation}>Population: {countryDetail.population}</p>
                <p className={Style.detailActivities}>Activities: {activities.map(a => a.name).join(', ')}</p>
                <Link to="/home">
                    <button className={Style.detailButton}>Back</button>
                </Link>
            </div>
        </div>
    )
}

export default Detail