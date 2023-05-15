import Style from './style.module.css';
import Card from '../Card/index';
import useGetCountries from '../../hooks/useGetCountries'

const Cards = () => {
    const countries = useGetCountries()

    return (
        <div className={Style.cards}>
            {countries.length > 0 ?
                countries.map((country) => {
                    return (
                        <Card
                            key={country.id}
                            name={country.name}
                            flag={country.flag}
                            continent={country.continent}
                            id={country.id}
                        />
                    );
                }
                ) : <h1>Loading...</h1>}
        </div>
    );
};

export default Cards;
