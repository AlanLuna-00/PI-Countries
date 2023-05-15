import Home from '../Home';
import Landing from '../Landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Layout = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default Layout;
