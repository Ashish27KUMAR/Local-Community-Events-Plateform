import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { ArrowLeft, CalendarPlus } from 'lucide-react';

const EVENT_TYPES = ['Fitness', 'Music', 'Meetup', 'Workshop', 'Sports', 'Social', 'Entertainment', 'Other'];

const CreateEvent = () => {
    const navigate = useNavigate();
    const { addEvent } = useEvents();

    const [formData, setFormData] = useState({
        title: '',
        type: 'Meetup',
        date: '',
        location: '',
        host: '',
        description: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        // Clear error for field when typing
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: undefined }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.host.trim()) newErrors.host = 'Host name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        else if (formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            addEvent(formData);
            navigate('/home');
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300 pb-12">
            <Link to="/home" className="text-slate-500 hover:text-primary-600 transition-colors inline-flex items-center gap-2 font-medium w-fit group">
                <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100 group-hover:border-primary-200 group-hover:shadow transition-all">
                    <ArrowLeft size={16} />
                </div>
                Back to Events
            </Link>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-900 to-primary-700 p-6 sm:p-10 text-white flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                        <CalendarPlus size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Host an Event</h1>
                        <p className="text-primary-100 text-sm sm:text-base">Bring the community together by creating a new local event.</p>
                    </div>
                </div>

                <div className="p-6 sm:p-10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <Input
                                    label="Event Title"
                                    id="title"
                                    placeholder="e.g. Community Yoga Session"
                                    value={formData.title}
                                    onChange={handleChange}
                                    error={errors.title}
                                />
                            </div>

                            <Select
                                label="Event Type"
                                id="type"
                                options={EVENT_TYPES}
                                value={formData.type}
                                onChange={handleChange}
                            />

                            <Input
                                label="Date & Time"
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                error={errors.date}
                            />

                            <Input
                                label="Location"
                                id="location"
                                placeholder="e.g. Central Park"
                                value={formData.location}
                                onChange={handleChange}
                                error={errors.location}
                            />

                            <Input
                                label="Host Name"
                                id="host"
                                placeholder="Your name or organization"
                                value={formData.host}
                                onChange={handleChange}
                                error={errors.host}
                            />

                            <div className="md:col-span-2 space-y-1.5">
                                <label htmlFor="description" className="text-sm font-medium text-slate-700">
                                    Event Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={5}
                                    className={`flex w-full rounded-xl border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow resize-none ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-slate-300'}`}
                                    placeholder="Describe your event. What should people expect? What should they bring?"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-100">
                            <Button type="button" variant="ghost" onClick={() => navigate('/home')}>
                                Cancel
                            </Button>
                            <Button type="submit" size="lg" className="min-w-[150px]">
                                Create Event
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
