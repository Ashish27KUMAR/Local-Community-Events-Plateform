import { Heart, Globe2, Zap, Users } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

const About = () => {
    const values = [
        {
            icon: Users,
            title: "Community First",
            description: "We believe in the power of local connections. Every event on our platform is an opportunity to strengthen neighborhood bonds."
        },
        {
            icon: Globe2,
            title: "Accessible to All",
            description: "Our platform is designed to be inclusive, making discovering and hosting events as absolutely frictionless as possible."
        },
        {
            icon: Zap,
            title: "Dynamic Experiences",
            description: "From yoga in the park to intensive tech workshops, we support a vibrant, diverse ecosystem of activities."
        },
        {
            icon: Heart,
            title: "Safety & Trust",
            description: "We cultivate a respectful environment where everyone feels safe to participate, learn, and grow together."
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-500 pb-12">

            {/* Header Section */}
            <section className="text-center pt-8 pb-12 px-4 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-400/20 rounded-full blur-[80px] -z-10"></div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Our Platform</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    We are on a mission to bring people together by making local events easily discoverable, accessible, and delightful to join.
                </p>
            </section>

            {/* Story Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center px-4">
                <div className="space-y-6">
                    <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-50 text-primary-700 tracking-wide">
                        OUR STORY
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                        Bridging the gap between desire and discovery.
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Many people want to participate in local activities—workshops, social gatherings, hobby clubs, fitness meetups—but find it difficult to discover and register for them.
                    </p>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        We built this platform to serve as the missing link. By curating a beautifully organized, easily filterable list of local happenings, we empower individuals to step out, learn new skills, and meet like-minded people in their own neighborhoods.
                    </p>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-teal-50 rounded-[2.5rem] transform rotate-3 scale-105 -z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1000"
                        alt="Community gathering"
                        className="rounded-[2rem] shadow-xl w-full object-cover aspect-[4/3] border border-white/50"
                    />
                </div>
            </section>

            {/* Values Section */}
            <section className="px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
                    <p className="text-slate-600 max-w-xl mx-auto">The principles that guide everything we build and curate.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <Card key={index} className="bg-white/50 backdrop-blur-sm border-slate-100/50 group hover:bg-white hover:shadow-xl transition-all duration-300">
                                <CardContent className="pt-8 px-6 pb-8 text-center flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                        <Icon size={28} className="stroke-[1.5]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

        </div>
    );
};

export default About;
