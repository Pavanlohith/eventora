// // import React, { useState, useEffect, useContext } from 'react';
// // import { AuthContext } from '../context/AuthContext';
// // import api from '../utils/axios';
// // import { useNavigate } from 'react-router-dom';

// // const AdminDashboard = () => {
// //     const { user } = useContext(AuthContext);
// //     const navigate = useNavigate();

// //     const [events, setEvents] = useState([]);
// //     const [bookings, setBookings] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     const [showEventForm, setShowEventForm] = useState(false);

// //     // ✅ FIXED: image → imageUrl (backend requirement)
// //     const [formData, setFormData] = useState({
// //         title: '',
// //         description: '',
// //         date: '',
// //         location: '',
// //         category: '',
// //         totalSeats: '',
// //         ticketPrice: '',
// //         imageUrl: ''   // ✅ FIX ONLY
// //     });

// //     useEffect(() => {
// //         if (!user || user.role !== 'admin') {
// //             navigate('/login');
// //             return;
// //         }

// //         fetchData();
// //     }, [user, navigate]);

// //     const fetchData = async () => {
// //         try {
// //             const [eventsRes, bookingsRes] = await Promise.all([
// //                 api.get('/events'),
// //                 api.get('/bookings')
// //             ]);

// //             setEvents(eventsRes.data.events || eventsRes.data || []);
// //             //setBookings(bookingsRes.data.bookings || bookingsRes.data || []);
// //         //    setBookings(bookingsRes.data || []);
// //     setBookings(Array.isArray(bookingsRes.data) 
// //     ? bookingsRes.data 
// //     : bookingsRes.data.bookings || []
// // );    
// //     } catch (error) {
// //             console.error('Error fetching admin data', error);
// //             setEvents([]);
// //             setBookings([]);

// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleCreateEvent = async (e) => {
// //         e.preventDefault();

// //         try {
// //             // ✅ FIXED: send correct field name
// //             await api.post('/events', {
// //                 ...formData,
// //                 imageUrl: formData.imageUrl
// //             });

// //             setShowEventForm(false);

// //             // reset form
// //             setFormData({
// //                 title: '',
// //                 description: '',
// //                 date: '',
// //                 location: '',
// //                 category: '',
// //                 totalSeats: '',
// //                 ticketPrice: '',
// //                 imageUrl: ''
// //             });

// //             fetchData();

// //         } catch (error) {
// //             alert(error.response?.data?.message || 'Error creating event');
// //         }
// //     };

// //     const handleDeleteEvent = async (id) => {
// //         if (window.confirm('Are you sure you want to delete this event?')) {
// //             try {
// //                 await api.delete(`/events/${id}`);
// //                 fetchData();

// //             } catch (error) {
// //                 alert('Error deleting event');
// //             }
// //         }
// //     };

// //     const handleConfirmBooking = async (id, paymentStatus) => {
// //         try {
// //             await api.put(`/bookings/${id}/confirm`, { paymentStatus });
// //             fetchData();

// //         } catch (error) {
// //             alert(error.response?.data?.message || 'Error confirming booking');
// //         }
// //     };

// //     const handleCancelBooking = async (id) => {
// //         if (window.confirm("Cancel this user's booking request?")) {
// //             try {
// //                 await api.delete(`/bookings/${id}`);
// //                 fetchData();

// //             } catch (error) {
// //                 alert(error.response?.data?.message || 'Error cancelling booking');
// //             }
// //         }
// //     };

// //     if (loading) {
// //         return (
// //             <div className="text-center py-20 text-xl font-semibold">
// //                 Loading admin panel...
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="max-w-7xl mx-auto">

// //             <div className="bg-black text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
// //                 <div>
// //                     <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
// //                         Admin Dashboard
// //                     </h1>

// //                     <p className="text-gray-300">
// //                         Manage events and manually confirm bookings.
// //                     </p>
// //                 </div>

// //                 <button
// //                     onClick={() => setShowEventForm(!showEventForm)}
// //                     className="w-full md:w-auto bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition shadow-md"
// //                 >
// //                     {showEventForm ? 'Cancel Creation' : '+ Create New Event'}
// //                 </button>
// //             </div>

// //             {/* Stats */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

// //                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// //                     <p className="text-gray-500 text-sm font-bold uppercase mb-1">
// //                         Total Revenue
// //                     </p>

// //                     <h3 className="text-3xl font-black text-green-600">
// //                         ₹{
// //                             bookings.reduce(
// //                                 (sum, b) =>
// //                                     b.paymentStatus === 'paid' &&
// //                                     b.status === 'confirmed'
// //                                         ? sum + b.amount
// //                                         : sum,
// //                                 0
// //                             )
// //                         }
// //                     </h3>
// //                 </div>

// //                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// //                     <p className="text-gray-500 text-sm font-bold uppercase mb-1">
// //                         Paid Clients
// //                     </p>

// //                     <h3 className="text-3xl font-black text-blue-600">
// //                         {
// //                             new Set(
// //                                 bookings
// //                                     .filter(b => b.paymentStatus === 'paid' && b.status === 'confirmed')
// //                                     .map(b => b.userId?._id)
// //                             ).size
// //                         }
// //                     </h3>
// //                 </div>

// //                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// //                     <p className="text-gray-500 text-sm font-bold uppercase mb-1">
// //                         Pending Requests
// //                     </p>

// //                     <h3 className="text-3xl font-black text-yellow-600">
// //                         {bookings.filter(b => b.status === 'pending').length}
// //                     </h3>
// //                 </div>

// //             </div>

// //             {/* Event Form */}
// //             {showEventForm && (
// //                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">

// //                     <h2 className="text-2xl font-bold mb-6 text-gray-800">
// //                         Create New Event
// //                     </h2>

// //                     <form
// //                         onSubmit={handleCreateEvent}
// //                         className="grid grid-cols-1 md:grid-cols-2 gap-6"
// //                     >

// //                         <input
// //                             required
// //                             type="text"
// //                             placeholder="Event Title"
// //                             className="border px-4 py-3 rounded-lg"
// //                             value={formData.title}
// //                             onChange={e =>
// //                                 setFormData({ ...formData, title: e.target.value })
// //                             }
// //                         />

// //                         <input
// //                             required
// //                             type="text"
// //                             placeholder="Category"
// //                             className="border px-4 py-3 rounded-lg"
// //                             value={formData.category}
// //                             onChange={e =>
// //                                 setFormData({ ...formData, category: e.target.value })
// //                             }
// //                         />

// //                         <input
// //                             required
// //                             type="date"
// //                             className="border px-4 py-3 rounded-lg"
// //                             value={formData.date}
// //                             onChange={e =>
// //                                 setFormData({ ...formData, date: e.target.value })
// //                             }
// //                         />

// //                         <input
// //                             required
// //                             type="text"
// //                             placeholder="Location"
// //                             className="border px-4 py-3 rounded-lg"
// //                             value={formData.location}
// //                             onChange={e =>
// //                                 setFormData({ ...formData, location: e.target.value })
// //                             }
// //                         />

// //                         <input
// //                             required
// //                             type="number"
// //                             placeholder="Total Seats"
// //                             className="border px-4 py-3 rounded-lg"
// //                             value={formData.totalSeats}
// //                             onChange={e =>
// //                                 setFormData({ ...formData, totalSeats: e.target.value })
// //                             }
// //                         />

// //                         <input
// //                             required
// //                             type="number"
// //                             placeholder="Ticket Price"
// //                             className="border px-4 py-3 rounded-lg"
// //                             value={formData.ticketPrice}
// //                             onChange={e =>
// //                                 setFormData({ ...formData, ticketPrice: e.target.value })
// //                             }
// //                         />

// //                         {/* ✅ ONLY FIXED FIELD */}
// //                         <div className="md:col-span-2">
// //                             <input
// //                                 type="text"
// //                                 placeholder="Image URL"
// //                                 className="w-full border px-4 py-3 rounded-lg"
// //                                 value={formData.imageUrl}
// //                                 onChange={e =>
// //                                     setFormData({ ...formData, imageUrl: e.target.value })
// //                                 }
// //                             />
// //                         </div>

// //                         <textarea
// //                             required
// //                             placeholder="Event Description"
// //                             className="border px-4 py-3 rounded-lg md:col-span-2 h-32"
// //                             value={formData.description}
// //                             onChange={e =>
// //                                 setFormData({ ...formData, description: e.target.value })
// //                             }
// //                         />

// //                         <button
// //                             type="submit"
// //                             className="md:col-span-2 bg-gray-900 text-white font-bold py-3 rounded-lg"
// //                         >
// //                             Publish Event
// //                         </button>

// //                     </form>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default AdminDashboard;



// //NEW ONW
// {/* Events + Booking Requests */}
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//     {/* All Events */}
//     <div>
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">
//             {events.length} All Events
//         </h2>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//             {events.map(event => (
//                 <div
//                     key={event._id}
//                     className="p-6 border-b last:border-b-0 flex justify-between items-center"
//                 >
//                     <div>
//                         <h3 className="font-bold text-lg text-gray-900">
//                             {event.title}
//                         </h3>

//                         <p className="text-gray-500">
//                             {new Date(event.date).toLocaleDateString()} •{" "}
//                             {event.availableSeats ?? event.totalSeats}/{event.totalSeats} seats
//                         </p>
//                     </div>

//                     <button
//                         onClick={() => handleDeleteEvent(event._id)}
//                         className="border border-red-200 text-red-500 font-semibold px-5 py-2 rounded-lg hover:bg-red-50"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ))}
//         </div>
//     </div>

//     {/* Booking Requests */}
//     <div>
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">
//             {bookings.length} Booking Requests
//         </h2>

//         <div className="space-y-5">
//             {bookings.map(booking => (
//                 <div
//                     key={booking._id}
//                     className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-400"
//                 >
//                     <div className="flex justify-between items-start mb-4">
//                         <h3 className="font-bold text-xl text-gray-900">
//                             {booking.eventId?.title || booking.event?.title || 'Event'}
//                         </h3>

//                         <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded">
//                             {booking.status}
//                         </span>
//                     </div>

//                     <p className="text-gray-600 mb-1">
//                         <b>User:</b> {booking.userId?.name || booking.user?.name}
//                     </p>

//                     <p className="text-gray-600 mb-1">
//                         <b>Email:</b> {booking.userId?.email || booking.user?.email}
//                     </p>

//                     <p className="text-gray-600 mb-1">
//                         <b>Amount:</b> ₹{booking.amount}
//                     </p>

//                     <p className="text-gray-600 mb-4">
//                         <b>Payment:</b> {booking.paymentStatus}
//                     </p>

//                     {booking.status === 'pending' && (
//                         <div className="grid grid-cols-3 gap-3">
//                             <button
//                                 onClick={() => handleConfirmBooking(booking._id, 'paid')}
//                                 className="bg-green-100 text-green-700 font-bold py-2 rounded-lg"
//                             >
//                                 ✓ Approve Paid
//                             </button>

//                             <button
//                                 onClick={() => handleConfirmBooking(booking._id, 'unpaid')}
//                                 className="bg-blue-100 text-blue-700 font-bold py-2 rounded-lg"
//                             >
//                                 ✓ Approve
//                             </button>

//                             <button
//                                 onClick={() => handleCancelBooking(booking._id)}
//                                 className="bg-red-100 text-red-700 font-bold py-2 rounded-lg"
//                             >
//                                 ✕ Reject
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     </div>

// </div>




// all code

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEventForm, setShowEventForm] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
        totalSeats: '',
        ticketPrice: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }
        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            setLoading(true);

            const [eventsRes, bookingsRes] = await Promise.all([
                api.get('/events'),
                api.get('/bookings')
            ]);

            setEvents(
                Array.isArray(eventsRes.data)
                    ? eventsRes.data
                    : eventsRes.data.events || []
            );

            setBookings(
                Array.isArray(bookingsRes.data)
                    ? bookingsRes.data
                    : bookingsRes.data.bookings || []
            );
        } catch (error) {
            console.error('Error fetching admin data:', error);
            setEvents([]);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        try {
            await api.post('/events', {
                ...formData,
                totalSeats: Number(formData.totalSeats),
                ticketPrice: Number(formData.ticketPrice)
            });

            setShowEventForm(false);

            setFormData({
                title: '',
                description: '',
                date: '',
                location: '',
                category: '',
                totalSeats: '',
                ticketPrice: '',
                imageUrl: ''
            });

            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating event');
        }
    };

    const handleDeleteEvent = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            await api.delete(`/events/${id}`);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error deleting event');
        }
    };

    const handleConfirmBooking = async (id, paymentStatus) => {
        try {
            await api.put(`/bookings/${id}/confirm`, { paymentStatus });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error confirming booking');
        }
    };

    const handleCancelBooking = async (id) => {
        if (!window.confirm("Cancel this user's booking request?")) return;

        try {
            await api.delete(`/bookings/${id}`);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error cancelling booking');
        }
    };

    const totalRevenue = bookings.reduce((sum, b) => {
        if (b.paymentStatus === 'paid' && b.status === 'confirmed') {
            return sum + Number(b.amount || 0);
        }
        return sum;
    }, 0);

    const paidClients = new Set(
        bookings
            .filter(b => b.paymentStatus === 'paid' && b.status === 'confirmed')
            .map(b => b.userId?._id || b.user?._id)
            .filter(Boolean)
    ).size;

    const pendingRequests = bookings.filter(b => b.status === 'pending').length;

    if (loading) {
        return (
            <div className="text-center py-20 text-xl font-semibold">
                Loading admin panel...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            <div className="bg-black text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-300">
                        Manage events and manually confirm bookings.
                    </p>
                </div>

                <button
                    onClick={() => setShowEventForm(!showEventForm)}
                    className="w-full md:w-auto bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition shadow-md"
                >
                    {showEventForm ? 'Cancel Creation' : '+ Create New Event'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm font-bold uppercase mb-1">
                        Total Revenue
                    </p>
                    <h3 className="text-3xl font-black text-green-600">
                        ₹{totalRevenue}
                    </h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm font-bold uppercase mb-1">
                        Paid Clients
                    </p>
                    <h3 className="text-3xl font-black text-blue-600">
                        {paidClients}
                    </h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm font-bold uppercase mb-1">
                        Pending Requests
                    </p>
                    <h3 className="text-3xl font-black text-yellow-600">
                        {pendingRequests}
                    </h3>
                </div>
            </div>

            {showEventForm && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Create New Event
                    </h2>

                    <form
                        onSubmit={handleCreateEvent}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <input
                            required
                            type="text"
                            placeholder="Event Title"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />

                        <input
                            required
                            type="text"
                            placeholder="Category"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        />

                        <input
                            required
                            type="date"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                        />

                        <input
                            required
                            type="text"
                            placeholder="Location"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                        />

                        <input
                            required
                            type="number"
                            placeholder="Total Seats"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.totalSeats}
                            onChange={e => setFormData({ ...formData, totalSeats: e.target.value })}
                        />

                        <input
                            required
                            type="number"
                            placeholder="Ticket Price"
                            className="border px-4 py-3 rounded-lg"
                            value={formData.ticketPrice}
                            onChange={e => setFormData({ ...formData, ticketPrice: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Image URL"
                            className="border px-4 py-3 rounded-lg md:col-span-2"
                            value={formData.imageUrl}
                            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                        />

                        <textarea
                            required
                            placeholder="Event Description"
                            className="border px-4 py-3 rounded-lg md:col-span-2 h-32"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />

                        <button
                            type="submit"
                            className="md:col-span-2 bg-gray-900 text-white font-bold py-3 rounded-lg"
                        >
                            Publish Event
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                        {events.length} All Events
                    </h2>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {events.length === 0 ? (
                            <p className="p-6 text-gray-500">No events found.</p>
                        ) : (
                            events.map(event => (
                                <div
                                    key={event._id}
                                    className="p-6 border-b last:border-b-0 flex justify-between items-center gap-4"
                                >
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">
                                            {event.title}
                                        </h3>

                                        <p className="text-gray-500">
                                            {new Date(event.date).toLocaleDateString()} •{' '}
                                            {event.availableSeats ?? event.totalSeats}/{event.totalSeats} seats
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteEvent(event._id)}
                                        className="border border-red-200 text-red-500 font-semibold px-5 py-2 rounded-lg hover:bg-red-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                        {bookings.length} Booking Requests
                    </h2>

                    <div className="space-y-5">
                        {bookings.length === 0 ? (
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-gray-500">
                                No bookings found.
                            </div>
                        ) : (
                            bookings.map(booking => (
                                <div
                                    key={booking._id}
                                    className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-400"
                                >
                                    <div className="flex justify-between items-start mb-4 gap-4">
                                        <h3 className="font-bold text-xl text-gray-900">
                                            {booking.eventId?.title || booking.event?.title || 'Event'}
                                        </h3>

                                        <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded uppercase">
                                            {booking.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-1">
                                        <b>User:</b> {booking.userId?.name || booking.user?.name || 'Unknown'}
                                    </p>

                                    <p className="text-gray-600 mb-1">
                                        <b>Email:</b> {booking.userId?.email || booking.user?.email || 'No email'}
                                    </p>

                                    <p className="text-gray-600 mb-1">
                                        <b>Amount:</b> ₹{booking.amount || 0}
                                    </p>

                                    <p className="text-gray-600 mb-4">
                                        <b>Payment:</b> {booking.paymentStatus || 'not paid'}
                                    </p>

                                    {booking.status === 'pending' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <button
                                                onClick={() => handleConfirmBooking(booking._id, 'paid')}
                                                className="bg-green-100 text-green-700 font-bold py-2 rounded-lg hover:bg-green-200"
                                            >
                                                ✓ Approve Paid
                                            </button>

                                            <button
                                                onClick={() => handleConfirmBooking(booking._id, 'unpaid')}
                                                className="bg-blue-100 text-blue-700 font-bold py-2 rounded-lg hover:bg-blue-200"
                                            >
                                                ✓ Approve
                                            </button>

                                            <button
                                                onClick={() => handleCancelBooking(booking._id)}
                                                className="bg-red-100 text-red-700 font-bold py-2 rounded-lg hover:bg-red-200"
                                            >
                                                ✕ Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;