import React from 'react';
import { motion } from 'motion/react';
import { Waves, Trophy, Camera, Trees, ArrowRight } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';

const activities = [
  {
    icon: <Waves size={32} />,
    title: 'Swimming Pool',
    description: 'Relax in our crystal clear infinity pool with a view of the village fields.',
    image: `${(import.meta as any).env.BASE_URL}images/media__1773073812058.jpg`
  },
  {
    icon: <Trophy size={32} />,
    title: 'Box Cricket',
    description: 'Challenge your friends to a high-energy match in our professional box cricket ground.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800'
  },
  {
    icon: <Camera size={32} />,
    title: 'Photo Spots',
    description: 'Discover numerous scenic locations perfect for pre-wedding shoots and memories.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800'
  },
  {
    icon: <Trees size={32} />,
    title: 'Nature Walks',
    description: 'Explore the serene village environment with guided morning nature walks.',
    image: `${(import.meta as any).env.BASE_URL}images/media__1773073790876.jpg`
  }
];

export const Activities: React.FC = () => {
  return (
    <section id="activities" className="py-32 px-6 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto backdrop-blur-md bg-white/10 p-10 rounded-[3rem] border border-white/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.4em] text-[#c19b6a] font-bold mb-4 block drop-shadow-md"
            >
              Recreation
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">Play, Relax, <span className="italic font-light text-[#c19b6a]">Celebrate</span></h2>
            <p className="text-white/90 text-lg font-serif drop-shadow-md">
              From high-energy sports to peaceful relaxation, we have something for everyone.
            </p>
          </div>
          <GradientButton variant="variant" className="gap-2 group">
            View All Activities
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </GradientButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl hover:-translate-y-3 transition-transform duration-500"
            >
              <img 
                src={activity.image} 
                alt={activity.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="relative mt-auto p-10 text-white z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-6 group-hover:bg-[#c19b6a] group-hover:border-[#c19b6a] group-hover:text-black transition-all duration-500 shadow-lg">
                  {activity.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 drop-shadow-md">{activity.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-md">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
