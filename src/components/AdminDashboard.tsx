import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { ShieldCheck, Calendar, RefreshCcw, LogOut, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';
import { cn } from '../utils/cn';

interface Booking {
  id: number;
  name: string;
  phone: string;
  email: string;
  guests: number;
  room_type: string;
  event_type: string;
  check_in: string;
  check_out: string;
  payment_method: string;
  status: string;
  created_at: string;
}

interface AdminDashboardProps {
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'media'>('bookings');
  const [mediaFiles, setMediaFiles] = useState<{ id: string, url: string, name: string }[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const fetchBookings = () => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      try {
        const existingBookingsStr = localStorage.getItem('ghvr_bookings');
        if (existingBookingsStr) {
          const parsed = JSON.parse(existingBookingsStr);
          // Sort by date descending (newest first)
          parsed.sort((a: Booking, b: Booking) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          setBookings(parsed);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  useEffect(() => {
    // Check if properly authenticated in sessionStorage to persist login across minor reloads
    const loggedIn = sessionStorage.getItem('ghvr_admin_auth');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
      fetchBookings();
      loadMedia();
    }
  }, []);

  const loadMedia = () => {
    const existingMediaStr = localStorage.getItem('ghvr_custom_gallery');
    if (existingMediaStr) {
      setMediaFiles(JSON.parse(existingMediaStr));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const newMedia = {
        id: Date.now().toString(),
        url: base64String,
        name: file.name
      };
      
      const updatedMedia = [...mediaFiles, newMedia];
      setMediaFiles(updatedMedia);
      localStorage.setItem('ghvr_custom_gallery', JSON.stringify(updatedMedia));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteMedia = (id: string) => {
    const updatedMedia = mediaFiles.filter(m => m.id !== id);
    setMediaFiles(updatedMedia);
    localStorage.setItem('ghvr_custom_gallery', JSON.stringify(updatedMedia));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (loginUsername === 'Admin' && loginPassword === 'Garuda@123') ||
      (loginUsername.toLowerCase() === 'admin' && loginPassword === 'admin123')
    ) {
      setIsAuthenticated(true);
      setLoginError('');
      sessionStorage.setItem('ghvr_admin_auth', 'true');
      fetchBookings();
    } else {
      setLoginError('Invalid Administrator Credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ghvr_admin_auth');
    setLoginUsername('');
    setLoginPassword('');
    onExit();
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    try {
      const existingBookingsStr = localStorage.getItem('ghvr_bookings');
      if (existingBookingsStr) {
        let parsed: Booking[] = JSON.parse(existingBookingsStr);
        parsed = parsed.map(b => b.id === id ? { ...b, status: newStatus } : b);
        localStorage.setItem('ghvr_bookings', JSON.stringify(parsed));
        setBookings(parsed);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New Inquiry': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Advance Paid': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Confirmed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-6 font-sans relative z-50">
        {/* Background Canvas Logic (Only load when not authenticated to prevent WebGL Context crash) */}
        <div className="fixed inset-0 z-[-1]">
            <div className="absolute inset-0 bg-black" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 relative z-10 p-10"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#1f4d3e] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-black/20">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-white/80 text-center text-sm">Sign in to manage resort bookings</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-widest mb-2">Username</label>
              <input 
                type="text" 
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full bg-white/10 border border-white/20 p-4 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-[#c19b6a] outline-none transition-shadow backdrop-blur-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 p-4 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-[#c19b6a] outline-none transition-shadow backdrop-blur-sm"
                required
              />
            </div>

            {loginError && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-500 text-sm font-medium text-center bg-red-50 py-3 rounded-xl"
              >
                {loginError}
              </motion.p>
            )}

            <button 
              type="submit" 
              className="w-full bg-[#c19b6a] hover:bg-white text-black p-4 justify-center items-center flex rounded-xl font-bold transition-colors shadow-lg shadow-black/20"
            >
              Sign In Securely
            </button>
             <button
               type="button"
               onClick={onExit} 
               className="w-full bg-transparent border border-white/20 hover:bg-white/10 text-white p-4 justify-center items-center flex rounded-xl font-bold transition-colors"
             >
               Return to Website
             </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans relative z-50 pt-32 text-white">
      {/* Dynamic Background Image Instead of Heavy 3D Canvas */}
      <div className="fixed inset-0 z-[-1]">
        <img 
            src="https://images.unsplash.com/photo-1542314831-c6a4d14faaf2?auto=format&fit=crop&q=80&w=2000" 
            alt="Admin Background" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/5 p-8 rounded-[3rem] border border-white/10 shadow-2xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 bg-white/5 p-6 rounded-[2rem] border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-4 md:mb-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1f4d3e] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-white">Admin Control Panel</h1>
                <p className="text-sm text-white/60">Manage your reservations and media</p>
              </div>
            </div>
            
            <div className="hidden md:block h-8 w-px bg-white/20 mx-2"></div>
            
            <div className="flex bg-white/10 p-1 rounded-xl border border-white/10">
              <button 
                onClick={() => setActiveTab('bookings')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  activeTab === 'bookings' ? "bg-[#c19b6a] text-black shadow-md" : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                Bookings
              </button>
              <button 
                onClick={() => setActiveTab('media')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  activeTab === 'media' ? "bg-[#c19b6a] text-black shadow-md" : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                Media Gallery
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchBookings}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors font-medium text-sm text-white"
            >
              <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} />
              Refresh Data
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors font-medium text-sm">
              <LogOut size={16} />
              Secure Logout
            </button>
          </div>
        </div>

        {activeTab === 'bookings' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-[2rem] shadow-xl overflow-hidden border border-white/20"
          >
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1f4d3e] text-white">
                  <th className="p-4 text-xs uppercase tracking-widest font-medium border-b border-white/10">ID / Date</th>
                  <th className="p-4 text-xs uppercase tracking-widest font-medium border-b border-white/10">Guest Details</th>
                  <th className="p-4 text-xs uppercase tracking-widest font-medium border-b border-white/10">Reservation</th>
                  <th className="p-4 text-xs uppercase tracking-widest font-medium border-b border-white/10">Payment</th>
                  <th className="p-4 text-xs uppercase tracking-widest font-medium border-b border-white/10">Status Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-white/50">Loading booking data...</td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-white/50">No bookings found in the database.</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#5A5A40]/5 transition-colors group">
                      <td className="p-4 align-top">
                        <div className="font-bold text-white">#{booking.id}</div>
                        <div className="text-xs text-white/60 mt-1">{format(new Date(booking.created_at), 'PP p')}</div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="font-bold text-white">{booking.name}</div>
                        <div className="text-sm text-white/70">{booking.phone}</div>
                        <div className="text-xs text-white/50">{booking.email}</div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-white/10 px-2 py-1 rounded text-white mb-2">
                          {booking.room_type}
                        </div>
                        <div className="text-sm text-white">
                          <span className="font-medium text-[#c19b6a]">In:</span> {format(new Date(booking.check_in), 'MMM dd, yyyy')}<br />
                          <span className="font-medium text-[#c19b6a]">Out:</span> {format(new Date(booking.check_out), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-xs text-white/60 mt-1">{booking.guests} Guests • {booking.event_type}</div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="font-medium text-white">{booking.payment_method || 'N/A'}</div>
                        {booking.payment_method && booking.payment_method !== 'None' && (
                          <div className="text-xs text-emerald-400 font-bold mt-1">₹5,000 Expected</div>
                        )}
                      </td>
                      <td className="p-4 align-top">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className={cn(
                            "text-sm font-bold uppercase tracking-wider px-3 py-2 rounded-lg border outline-none cursor-pointer appearance-none transition-colors",
                            getStatusColor(booking.status)
                          )}
                        >
                          <option value="New Inquiry">New Inquiry</option>
                          <option value="Advance Paid">Advance Paid</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </motion.div>
        )}

        {/* Media Management Tab */}
        {activeTab === 'media' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-[2rem] shadow-xl overflow-hidden border border-white/20 p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-2">Resort Media Library</h2>
                <p className="text-white/60">Upload new images. These photos will override the default gallery on the public website.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-[#c19b6a] hover:bg-white text-black font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:-translate-y-1">
                <Upload size={20} />
                Upload Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {mediaFiles.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-white/20 rounded-[2rem]">
                <ImageIcon size={48} className="mx-auto text-white/20 mb-4" />
                <p className="text-white/50 mb-2">No custom media uploaded yet.</p>
                <p className="text-sm font-bold tracking-widest uppercase text-white/30">Using default gallery</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mediaFiles.map((media) => (
                  <div key={media.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                    <img 
                      src={media.url} 
                      alt={media.name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <div className="text-center">
                        <p className="text-white text-xs font-bold mb-4 truncate w-40">{media.name}</p>
                        <button 
                          onClick={() => handleDeleteMedia(media.id)}
                          className="bg-red-500/20 hover:bg-red-500 text-white rounded-full p-3 transition-colors text-xs font-bold flex items-center gap-2 mx-auto"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
