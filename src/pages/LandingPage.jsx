import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin, Users, Music } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Navigate to home after 1.5 seconds
        const timer = setTimeout(() => {
            navigate('/home');
        }, 1500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="fixed inset-0 min-h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden z-[100]">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

            {/* Floating Icons Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <MapPin className="absolute top-[15%] left-[20%] w-12 h-12 text-primary-300 animate-float" style={{ animationDelay: '0s' }} />
                <Users className="absolute top-[25%] right-[25%] w-16 h-16 text-primary-400 animate-float" style={{ animationDelay: '1s' }} />
                <Music className="absolute bottom-[20%] left-[30%] w-14 h-14 text-white animate-float" style={{ animationDelay: '2s' }} />
                <CalendarDays className="absolute bottom-[30%] right-[20%] w-20 h-20 text-primary-500 animate-float" style={{ animationDelay: '1.5s' }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center animate-in zoom-in-95 duration-1000 slide-in-from-bottom-8">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-primary-500 blur-2xl opacity-40 rounded-full animate-pulse"></div>
                    <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-6 rounded-3xl shadow-2xl relative animate-bounce-slow text-white border border-white/10">
                        <CalendarDays size={64} className="stroke-[1.5]" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-100 to-primary-300 mb-4 text-center tracking-tight drop-shadow-sm">
                    Local Community<br />Events
                </h1>

                <p className="text-slate-400 text-lg md:text-xl font-medium tracking-wide animate-pulse">
                    Discover. Connect. Belong.
                </p>

                {/* Loading Indicator */}
                <div className="mt-12 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
