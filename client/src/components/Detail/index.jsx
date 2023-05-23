import React from "react";
import Style from "./style.module.css";
import { Link } from "react-router-dom";
import useGetCountryById from "../../hooks/useGetCountryById";

const Detail = () => {
    const countryDetail = useGetCountryById();
    const activities = countryDetail.activities || [];
    return (
        <div className={Style.detail}>
            {countryDetail.name ? (
                <div className={Style.detailCard}>
                    <img
                        src={countryDetail.flag}
                        alt={countryDetail.name}
                        className={Style.detailFlag}
                    />
                    <h1 className={Style.detailName}><b>{countryDetail.name}</b></h1>
                    <p className={Style.detailContinent}><b>{countryDetail.continent}</b></p>
                    <p className={Style.detailCapital}>Capital: {countryDetail.capital}</p>
                    <p className={Style.detailSubregion}>
                        Subregion: {countryDetail.subregion}
                    </p>
                    <p className={Style.detailArea}>Area: {countryDetail.area} km²</p>
                    <p className={Style.detailPopulation}>
                        Population: {countryDetail.population}
                    </p>
                    <p className={Style.detailActivities}>Tourist activities in the country:</p>
                    {activities.length > 0 ? (
                        <table className={Style.detailActivityTable}>
                            <thead>
                                <tr>
                                    <th>Activity</th>
                                    <th>Difficulty</th>
                                    <th>Duration</th>
                                    <th>Season</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((a, i) => (
                                    <tr key={i}>
                                        <td>{a.name}</td>
                                        <td>{a.difficulty}</td>
                                        <td>
                                            {a.duration === null ? "No duration" : a.duration}
                                        </td>
                                        <td>{a.season}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className={Style.detailActivityName}>No activities loaded</p>
                    )}
                    <Link to="/home">
                        <button className={Style.detailButton}>Back</button>
                    </Link>
                </div>
            ) : (
                <div className={Style.detailCard}>
                    <div className={Style.loadingSpinner}></div>
                </div>
            )}
        </div>
    );
};

export default Detail;
