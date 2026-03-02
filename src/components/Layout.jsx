import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import PageTransition from './PageTransition';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                <PageTransition key={location.pathname}>
                    <Outlet />
                </PageTransition>
            </main>
            <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Local Community Events. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
