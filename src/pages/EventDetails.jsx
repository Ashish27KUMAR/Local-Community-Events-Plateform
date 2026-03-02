import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { format, parseISO } from 'date-fns';
import { ArrowLeft, Calendar, MapPin, User, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

const EventDetails = () => {
    const { id } = useParams();
    const { events, isRsvped, addRsvp, removeRsvp } = useEvents();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({ name: '', email: '' });
    const [formErrors, setFormErrors] = useState({});

    const event = events.find((e) => e.id === parseInt(id));

    if (!event) {
        return (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 border-dashed">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Event not found</h2>
                <p className="text-slate-500 max-w-sm mx-auto mb-6">The event you are looking for does not exist or has been removed.</p>
                <Link to="/home">
                    <Button variant="outline"><ArrowLeft size={16} className="mr-2" /> Back to Events</Button>
                </Link>
            </div>
        );
    }

    const rsvped = isRsvped(event.id);
    const date = parseISO(event.date);

    const typeColors = {
        'Fitness': 'success',
        'Music': 'primary',
        'Meetup': 'warning',
        'Workshop': 'default',
        'Sports': 'danger',
        'Social': 'success',
        'Entertainment': 'primary'
    };

    const handleRsvpSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Submit RSVP
        addRsvp(event.id);
        setIsSuccess(true);
    };

    const closeAndResetModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setIsSuccess(false);
            setFormData({ name: '', email: '' });
            setFormErrors({});
        }, 300);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            <Link to="/home" className="text-slate-500 hover:text-primary-600 transition-colors inline-flex items-center gap-2 font-medium w-fit group">
                <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100 group-hover:border-primary-200 group-hover:shadow transition-all">
                    <ArrowLeft size={16} />
                </div>
                Back to Events
            </Link>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                {/* Banner */}
                <div className="min-h-[18rem] md:h-72 bg-slate-900 relative overflow-hidden flex flex-col justify-end">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent"></div>

                    <div className="relative p-6 md:p-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex-1 space-y-3">
                            <Badge variant={typeColors[event.type] || 'default'}>{event.type}</Badge>
                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{event.title}</h1>
                        </div>

                        <div className="w-full md:w-auto shrink-0 mt-2 md:mt-0">
                            {rsvped ? (
                                <Button
                                    variant="outline"
                                    className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm text-base py-6 sm:py-3 rounded-xl sm:rounded-lg"
                                    onClick={() => removeRsvp(event.id)}
                                >
                                    <CheckCircle2 size={18} className="mr-2 text-emerald-400" />
                                    Joined
                                </Button>
                            ) : (
                                <Button
                                    size="lg"
                                    className="w-full shadow-lg shadow-primary-600/30 text-lg py-6 sm:py-3 rounded-xl sm:rounded-lg"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    RSVP Now
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 space-y-10">
                    {/* Main Description */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">About this event</h2>
                        <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
                            {event.description}
                        </p>
                    </section>

                    {/* Information Card Stack */}
                    <div className="bg-slate-50/80 rounded-3xl p-6 md:p-8 space-y-8 border border-slate-100 max-w-3xl">
                        <div className="flex items-start gap-5">
                            <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100/50 text-primary-600 shrink-0">
                                <Calendar size={24} className="stroke-[1.5]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1 text-base md:text-lg">Date & Time</h3>
                                <p className="text-slate-500 font-medium md:text-lg">{format(date, 'EEEE, MMMM d, yyyy')}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100/50 text-primary-600 shrink-0">
                                <MapPin size={24} className="stroke-[1.5]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1 text-base md:text-lg">Location</h3>
                                <p className="text-slate-500 font-medium md:text-lg">{event.location}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100/50 text-primary-600 shrink-0">
                                <User size={24} className="stroke-[1.5]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1 text-base md:text-lg">Hosted by</h3>
                                <p className="text-slate-500 font-medium md:text-lg">{event.host}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RSVP Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeAndResetModal}
                title={isSuccess ? "You're all set!" : "RSVP to Event"}
            >
                {isSuccess ? (
                    <div className="text-center py-6 animate-in zoom-in-95 duration-300">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                            <CheckCircle2 size={40} className="stroke-[2.5]" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">See you there!</h3>
                        <p className="text-slate-500 mb-8">
                            We've saved your spot for <br />
                            <span className="font-medium text-slate-900">{event.title}</span>.
                        </p>
                        <Button className="w-full" onClick={closeAndResetModal}>
                            Close
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleRsvpSubmit} className="space-y-5">
                        <p className="text-slate-600 text-sm mb-4">
                            Please provide your details to register for <strong>{event.title}</strong>.
                        </p>

                        <Input
                            label="Full Name"
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            error={formErrors.name}
                        />

                        <Input
                            label="Email Address"
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={formErrors.email}
                        />

                        <div className="pt-4 flex gap-3">
                            <Button type="button" variant="outline" className="flex-1" onClick={closeAndResetModal}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1">
                                Confirm RSVP
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default EventDetails;
