import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, PlusCircle, Menu, X, Info, Home } from 'lucide-react';
import { cn } from './ui/Button';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navRef = useRef(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/home', icon: Home },
        { name: 'About', path: '/about', icon: Info },
    ];

    return (
        <nav
            ref={navRef}
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 py-2" : "bg-white/50 backdrop-blur-sm border-b border-white/10 py-4"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-12">
                    {/* Logo */}
                    <Link to="/home" className="flex items-center gap-2.5 group">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white p-2.5 rounded-xl shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-0.5">
                            <CalendarDays size={22} className="stroke-[2.5]" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-primary-900 to-primary-700 bg-clip-text text-transparent">
                            Community Events
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={cn(
                                            "text-sm font-semibold transition-colors relative group py-2",
                                            isActive ? "text-primary-600" : "text-slate-600 hover:text-primary-600"
                                        )}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-full" />
                                        )}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 rounded-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="h-6 w-px bg-slate-200"></div>

                        <Link
                            to="/create"
                            className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            <span>Host Event</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-primary-600 hover:bg-slate-100 rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={cn(
                "md:hidden fixed inset-x-0 top-[calc(100%+1px)] bg-white border-b border-slate-200 shadow-xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col",
                isMobileMenuOpen ? "max-h-96 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
            )}>
                <div className="px-4 py-6 flex flex-col gap-4">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors",
                                    isActive ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-50 hover:text-primary-600"
                                )}
                            >
                                <Icon size={20} className={isActive ? "text-primary-500" : "text-slate-400"} />
                                {link.name}
                            </Link>
                        );
                    })}

                    <div className="h-px w-full bg-slate-100 my-2"></div>

                    <Link
                        to="/create"
                        className="flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl font-medium shadow-sm active:scale-[0.98] transition-all"
                    >
                        <PlusCircle size={20} />
                        <span>Host an Event</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
