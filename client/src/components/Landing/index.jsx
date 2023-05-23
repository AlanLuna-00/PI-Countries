import { Link } from "react-router-dom";
import Style from "./style.module.css";


const Landing = () => {


    return (
        <>
            <div className={Style.landingContainer}>
                <h1 className={Style.landingTitle}>App for Countries of the world</h1>
                <Link className={Style.landingLink} to="/home">Go to Home</Link>
            </div>
            <footer className={Style.footer}>
                <p className={Style.footerText}>Developed by <a className={Style.footerLink} href="https://github.com/AlanLuna-00" target="_blank" rel="noreferrer">Alan Luna</a> 👨🏽‍💻</p>
            </footer>
        </>
    );
}

export default Landing;