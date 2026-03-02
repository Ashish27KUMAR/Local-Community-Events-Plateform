import { Link } from 'react-router-dom';
import { Calendar, MapPin, User, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';

const EventCard = ({ event }) => {
    const date = parseISO(event.date);
    const formattedDate = format(date, 'MMM d, yyyy');
    const formattedDay = format(date, 'EEEE');

    // Assign standard colors to types
    const typeColors = {
        'Fitness': 'success',
        'Music': 'primary',
        'Meetup': 'warning',
        'Workshop': 'default',
        'Sports': 'danger',
        'Social': 'success',
        'Entertainment': 'primary'
    };

    const badgeVariant = typeColors[event.type] || 'default';

    return (
        <Card className="flex flex-col h-full group">
            <CardHeader>
                <div className="flex justify-between items-start mb-3 gap-2">
                    <Badge variant={badgeVariant}>{event.type}</Badge>
                    <div className="flex flex-col items-end text-sm text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <span className="text-primary-600 font-bold block leading-none mb-1">{format(date, 'MMM d')}</span>
                        <span className="text-xs">{formattedDay}</span>
                    </div>
                </div>
                <CardTitle className="group-hover:text-primary-600 transition-colors line-clamp-2">
                    <Link to={`/event/${event.id}`}>
                        {event.title}
                    </Link>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
                <p className="text-slate-600 line-clamp-2 text-sm">
                    {event.description}
                </p>

                <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} className="text-slate-400 shrink-0" />
                        <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <User size={16} className="text-slate-400 shrink-0" />
                        <span className="truncate">By {event.host}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="border-t border-slate-50 mt-auto pt-4">
                <Link
                    to={`/event/${event.id}`}
                    className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors ml-auto group/btn"
                >
                    View Details
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </CardFooter>
        </Card>
    );
};

export default EventCard;
