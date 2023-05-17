import usePostActivity from "../../hooks/usePostActivity";
import useGetCountries from "../../hooks/useGetCountries";
import Style from "./style.module.css";

const Form = () => {
    const [input, handleInputChange, handleSelectChange, handleSubmit] = usePostActivity();
    const countries = useGetCountries();

    return (
        <div className={Style.formContainer}>
            <form onSubmit={handleSubmit} className={Style.form}>
                <div className={Style.inputContainer}>
                    <label htmlFor="name" className={Style.label}>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                        className={Style.input}
                        required
                    />
                </div>
                <div className={Style.inputContainer}>
                    <label htmlFor="difficulty" className={Style.label}>Difficulty</label>
                    <select id='difficulty' name="difficulty" className={Style.select} onChange={handleInputChange} required>
                        <option value='' className={Style.option}>Select difficulty</option>
                        <option value='1' className={Style.option}>1</option>
                        <option value='2' className={Style.option}>2</option>
                        <option value='3' className={Style.option}>3</option>
                        <option value='4' className={Style.option}>4</option>
                        <option value='5' className={Style.option}>5</option>
                    </select>
                </div>
                <div className={Style.inputContainer}>
                    <label htmlFor="duration" className={Style.label}>Duration</label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={input.duration}
                        onChange={handleInputChange}
                        className={Style.input}
                        required
                    />
                </div>
                <div className={Style.inputContainer}>
                    <label htmlFor="season" className={Style.label}>Season</label>
                    <select id='season' name="season" className={Style.select} onChange={handleInputChange} required>
                        <option value='' className={Style.option}>Select season</option>
                        <option value='summer' className={Style.option}>Summer</option>
                        <option value='autumn' className={Style.option}>Autumn</option>
                        <option value='winter' className={Style.option}>Winter</option>
                        <option value='spring' className={Style.option}>Spring</option>
                    </select>
                </div>
                <div className={Style.inputContainer}>
                    <label htmlFor="countries" className={Style.label}>Countries</label>
                    <select id='countries' name="countries" className={Style.select} onChange={handleSelectChange} required>
                        <option value='' className={Style.option}>Select countries</option>
                        {countries.map((c, i) => (
                            <option key={i} value={c.id} className={Style.option}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className={Style.button}>Create activity</button>
            </form>
        </div>
    );
};

export default Form;
