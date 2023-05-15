import Home from '../Home';
import Landing from '../Landing';
import Detail from '../Detail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Layout = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/countries/:id" element={<Detail />} />
            </Routes>
        </Router>
    );
}

export default Layout;
