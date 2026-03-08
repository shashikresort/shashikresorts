import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { ShieldCheck, Calendar, RefreshCcw, LogOut } from 'lucide-react';
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
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === 'Admin' && loginPassword === 'Garuda@123') {
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
      <div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center p-6 font-sans relative overflow-hidden">
        {/* Abstract Background for Login */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5A5A40] rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2a2a1a] rounded-full blur-[150px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-black/5 relative z-10 p-10"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#5A5A40] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#5A5A40]/20">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-2">Admin Portal</h1>
            <p className="text-[#1a1a1a]/60 text-center text-sm">Sign in to manage resort bookings</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-widest mb-2">Username</label>
              <input 
                type="text" 
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full bg-[#f5f2ed] p-4 rounded-xl text-[#1a1a1a] focus:ring-2 focus:ring-[#5A5A40] outline-none transition-shadow"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#f5f2ed] p-4 rounded-xl text-[#1a1a1a] focus:ring-2 focus:ring-[#5A5A40] outline-none transition-shadow"
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
              className="w-full bg-[#1a1a1a] hover:bg-[#5A5A40] text-white p-4 justify-center items-center flex rounded-xl font-bold transition-colors shadow-lg shadow-black/10"
            >
              Sign In Securely
            </button>
             <button
               type="button"
               onClick={onExit} 
               className="w-full bg-transparent hover:bg-black/5 text-[#1a1a1a]/60 hover:text-[#1a1a1a] p-4 justify-center items-center flex rounded-xl font-bold transition-colors"
             >
               Return to Website
             </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2ed] p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 bg-white p-6 rounded-[2rem] shadow-sm">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-[#5A5A40] rounded-2xl flex items-center justify-center text-white">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#1a1a1a]">Admin Control Panel</h1>
              <p className="text-sm text-[#1a1a1a]/60">Manage your reservations and inquiries</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchBookings}
              className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-xl hover:bg-black/10 transition-colors font-medium text-sm text-[#1a1a1a]"
            >
              <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} />
              Refresh Data
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm">
              <LogOut size={16} />
              Secure Logout
            </button>
          </div>
        </div>

        {/* Booking Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-black/5"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1a1a1a] text-white">
                  <th className="p-4 text-xs uppercase tracking-widest font-medium">ID / Date</th>
                  <th className="p-4 text-xs uppercase tracking-widest font-medium">Guest Details</th>
                  <th className="p-4 text-xs uppercase tracking-widest font-medium">Reservation</th>
                  <th className="p-4 text-xs uppercase tracking-widest font-medium">Payment</th>
                  <th className="p-4 text-xs uppercase tracking-widest font-medium">Status Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#1a1a1a]/50">Loading booking data...</td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#1a1a1a]/50">No bookings found in the database.</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#5A5A40]/5 transition-colors group">
                      <td className="p-4 align-top">
                        <div className="font-bold text-[#1a1a1a]">#{booking.id}</div>
                        <div className="text-xs text-[#1a1a1a]/60 mt-1">{format(new Date(booking.created_at), 'PP p')}</div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="font-bold text-[#1a1a1a]">{booking.name}</div>
                        <div className="text-sm text-[#1a1a1a]/70">{booking.phone}</div>
                        <div className="text-xs text-[#1a1a1a]/50">{booking.email}</div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-black/5 px-2 py-1 rounded text-[#1a1a1a] mb-2">
                          {booking.room_type}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-[#5A5A40]">In:</span> {format(new Date(booking.check_in), 'MMM dd, yyyy')}<br />
                          <span className="font-medium text-[#5A5A40]">Out:</span> {format(new Date(booking.check_out), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-xs text-[#1a1a1a]/60 mt-1">{booking.guests} Guests • {booking.event_type}</div>
                      </td>
                      <td className="p-4 align-top">
                        <div className="font-medium text-[#1a1a1a]">{booking.payment_method || 'N/A'}</div>
                        {booking.payment_method && booking.payment_method !== 'None' && (
                          <div className="text-xs text-emerald-600 font-bold mt-1">₹5,000 Expected</div>
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
      </div>
    </div>
  );
};
