import { useState, useMemo, useEffect, useRef } from 'react';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Search, Filter, ChevronRight, ChevronLeft } from 'lucide-react';
import { isPast, parseISO } from 'date-fns';

const Home = () => {
    const {
        events,
        searchQuery, setSearchQuery,
        filterType, setFilterType,
        filterLocation, setFilterLocation,
        filterDate, setFilterDate,
        uniqueLocations,
        uniqueTypes
    } = useEvents();

    // Pagination & Mobile State
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerPage = 6; // 6 events per page
    const filterRef = useRef(null);

    // Close filters on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };

        if (showFilters) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilters]);

    // Hero Carousel Data
    const heroSlides = [
        {
            bgImage: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200",
            title: "Community Workshops",
            subtitle: "Learn local crafts & skills together."
        },
        {
            bgImage: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=1200",
            title: "Tech Meetups",
            subtitle: "Network and innovate right here in town."
        },
        {
            bgImage: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&q=80&w=1200",
            title: "Local Cultural Festivals",
            subtitle: "Celebrate diversity and have fun!"
        }
    ];

    // Auto-rotate slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    // Filter events
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchType = filterType === 'All' || event.type === filterType;
            const matchLocation = filterLocation === 'All' || event.location === filterLocation;

            let matchDate = true;
            if (filterDate === 'Upcoming') {
                matchDate = !isPast(parseISO(event.date));
            } else if (filterDate === 'Past') {
                matchDate = isPast(parseISO(event.date));
            }

            return matchSearch && matchType && matchLocation && matchDate;
        });
    }, [events, searchQuery, filterType, filterLocation, filterDate]);

    // Pagination logic
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 350, behavior: 'smooth' });
    };

    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery, filterType, filterLocation, filterDate]);

    return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-12">

            {/* Top Layout: Left Image Slider + Right Text/Search Info */}
            <section className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center lg:items-center min-h-[500px]">

                {/* Left Side: Images (Info) Carousel */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] w-full group">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear"
                                style={{
                                    backgroundImage: `url(${slide.bgImage})`,
                                    transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)'
                                }}
                            />
                            {/* Gradient Overlay for Text Visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

                            {/* Dynamic Image Info Details */}
                            <div className="absolute bottom-8 left-8 right-8 animate-in slide-in-from-bottom-4 duration-700">
                                <h3 className="text-white font-extrabold text-2xl md:text-3xl mb-2 drop-shadow-md">
                                    {slide.title}
                                </h3>
                                <p className="text-primary-100 font-medium md:text-lg mb-1 shadow-sm">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Nav Controls for Carousel */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={prevSlide} className="p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all transform hover:scale-110 active:scale-95">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextSlide} className="p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all transform hover:scale-110 active:scale-95">
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Dots / Indicators */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {heroSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-8 bg-primary-500' : 'w-2 bg-white/60 hover:bg-white/90'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side: Text Info + Search/Filter Setup */}
                <div className="flex flex-col justify-center space-y-10 lg:py-6 h-full">

                    {/* Text Area */}
                    <div className="space-y-5 px-2">
                        <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-primary-50 text-primary-700 tracking-wide border border-primary-100 shadow-sm">
                            WELCOME TO YOUR COMMUNITY
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900">
                            Discover Local <br />
                            <span className="relative inline-block mt-2">
                                <span className="absolute -inset-2 bg-gradient-to-r from-primary-100 to-teal-50 rounded-xl blur-lg rotate-1 -z-10"></span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-500 relative z-10">
                                    Happenings
                                </span>
                            </span>
                        </h1>
                        <p className="text-slate-500 text-lg sm:text-xl font-medium leading-relaxed max-w-lg">
                            An inclusive space to find workshops, professional meetups, and classes in your area. Step out and connect!
                        </p>
                    </div>

                    {/* SearchBar & Filter Section */}
                    <div ref={filterRef} className="relative z-30 mt-4 sm:max-w-xl">
                        <div className="bg-white p-2 rounded-[1.5rem] shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-row gap-2 sm:gap-3 w-full items-center relative z-40">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                                    <Search size={20} />
                                </div>
                                <Input
                                    id="search"
                                    placeholder="Search for local events..."
                                    className="pl-12 w-full h-12 sm:h-14 text-base bg-slate-50 border-transparent focus:bg-white focus:border-primary-300 focus:ring-4 focus:ring-primary-500/10 rounded-xl transition-all font-medium"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                aria-label="Toggle Filters"
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl active:scale-[0.98] transition-all border shrink-0 ${showFilters
                                    ? 'bg-primary-50 text-primary-700 border-primary-200 shadow-inner'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                                    }`}
                            >
                                <Filter size={20} className={showFilters ? "text-primary-600" : "text-slate-500"} />
                            </button>
                        </div>

                        {/* Dropdown Filters Container */}
                        <div
                            className={`absolute left-0 right-0 top-[110%] sm:w-[600px] max-w-[95vw] bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-5 z-20 transition-all duration-300 origin-top flex flex-col sm:flex-row gap-4 ${showFilters ? 'opacity-100 scale-y-100 visible translate-y-0' : 'opacity-0 scale-y-95 invisible translate-y-[-10px] pointer-events-none'
                                }`}
                        >
                            <div className="flex-1 w-full">
                                <Select
                                    id="filterType"
                                    options={uniqueTypes}
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <Select
                                    id="filterLocation"
                                    options={uniqueLocations}
                                    value={filterLocation}
                                    onChange={(e) => setFilterLocation(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <Select
                                    id="filterDate"
                                    options={['All Dates', 'Upcoming', 'Past']}
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Header */}
            <div className="flex justify-between items-center px-1 pt-8 border-t border-slate-100">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore Events</h2>
                <div className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                    {filteredEvents.length} {filteredEvents.length === 1 ? 'MATCH' : 'MATCHES'}
                </div>
            </div>

            {/* Cards Grid */}
            <section>
                {paginatedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {paginatedEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200 border-dashed shadow-sm">
                        <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inset">
                            <Search size={40} className="text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">No events found</h3>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto text-lg leading-relaxed">We couldn't find any events matching your current filters. Adjust your search to explore more.</p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setFilterType('All');
                                setFilterLocation('All');
                                setFilterDate('All Dates');
                            }}
                            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all active:scale-95 hover:shadow-lg"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 pt-12 text-sm font-medium">
                        <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`px-4 h-12 rounded-full transition-all ${currentPage === 1 ? 'text-slate-400 cursor-not-allowed hidden sm:block' : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-primary-600 border border-slate-200 shadow-sm'
                                }`}
                        >
                            Previous
                        </button>

                        <div className="hidden sm:flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-12 h-12 rounded-full font-bold transition-all ${currentPage === page
                                        ? 'bg-primary-600 text-white shadow-md'
                                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-sm'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <div className="flex sm:hidden items-center justify-center px-4 font-semibold text-slate-600">
                            {currentPage} / {totalPages}
                        </div>

                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`px-4 h-12 rounded-full transition-all ${currentPage === totalPages ? 'text-slate-400 cursor-not-allowed hidden sm:block' : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-primary-600 border border-slate-200 shadow-sm'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
