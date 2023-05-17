import React from "react";
import Style from "./style.module.css";
import { Link } from "react-router-dom";
import useGetCountryById from "../../hooks/useGetCountryById";

const Detail = () => {
    const countryDetail = useGetCountryById();
    const activities = countryDetail.activities || [];

    return (
        <div className={Style.detail}>
            {
                countryDetail.name ?
                    <div className={Style.detailCard}>
                        <img
                            src={countryDetail.flag}
                            alt={countryDetail.name}
                            className={Style.detailFlag}
                        />
                        <h1 className={Style.detailName}>{countryDetail.name}</h1>
                        <p className={Style.detailContinent}>{countryDetail.continent}</p>
                        <p className={Style.detailCapital}>Capital: {countryDetail.capital}</p>
                        <p className={Style.detailSubregion}>
                            Subregion: {countryDetail.subregion}
                        </p>
                        <p className={Style.detailArea}>Area: {countryDetail.area} km²</p>
                        <p className={Style.detailPopulation}>
                            Population: {countryDetail.population}
                        </p>
                        <p className={Style.detailActivities}>Actividades turisticas del pais:</p>
                        {activities.length > 0 ? (
                            activities.map((a, i) => (
                                <div key={i}>
                                    <p className={Style.detailActivityName}>Activity: {a.name}</p>
                                    <p className={Style.detailActivityDifficulty}>
                                        Difficulty: {a.difficulty}
                                    </p>
                                    <p className={Style.detailActivityDuration}>
                                        Duration: {a.duration} hours
                                    </p>
                                    <p className={Style.detailActivitySeason}>
                                        Season: {a.season}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className={Style.detailActivityName}>No activities</p>
                        )}
                        <Link to="/home">
                            <button className={Style.detailButton}>Back</button>
                        </Link>
                    </div>
                    :
                    <div className={Style.detailCard}>
                        <div className={Style.loadingSpinner}></div>
                    </div>
            }
        </div>
    );
};

export default Detail;
