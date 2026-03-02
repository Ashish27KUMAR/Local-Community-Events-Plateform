import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import About from './pages/About';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import PageTransition from './components/PageTransition';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <PageTransition>
                        <LandingPage />
                    </PageTransition>
                } />
                <Route element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="event/:id" element={<EventDetails />} />
                    <Route path="create" element={<CreateEvent />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <EventProvider>
            <Router>
                <AnimatedRoutes />
            </Router>
        </EventProvider>
    );
}

export default App;
