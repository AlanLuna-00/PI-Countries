import Home from '../Home';
import Landing from '../Landing';
import Detail from '../Detail';
import Form from '../Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Layout = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/activities" element={<Form />} />
                <Route path="/countries/:id" element={<Detail />} />
            </Routes>
        </Router>
    );
}

export default Layout;
