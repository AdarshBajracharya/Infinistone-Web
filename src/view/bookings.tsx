import React, { useState } from "react";
import { useGetBookings, useUpdateBooking, useDeleteBooking } from "./query";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Define types
interface Customer {
  fname: string;
  lname: string;
}

interface Product {
  item_name: string;
  item_price: number;
}

interface Booking {
  _id: string;
  bookingDate: string;
  customer: Customer;
  product: Product;
}

// Bookings page component
const BookingsPage = () => {
  const navigate = useNavigate();  // Hook for navigation

  const { data: bookings, isLoading, error } = useGetBookings();
  const { mutate: updateBooking } = useUpdateBooking();
  const { mutate: deleteBooking } = useDeleteBooking();

  const [isUpdating, setIsUpdating] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
  const [newBookingDate, setNewBookingDate] = useState<string>("");

  // Handle update booking
  const handleUpdateBooking = () => {
    if (currentBookingId && newBookingDate) {
      updateBooking({
        id: currentBookingId,
        bookingDate: newBookingDate,
      });
      setIsUpdating(false);
      setCurrentBookingId(null);
      setNewBookingDate("");
      toast.success("Booking updated successfully!");
    } else {
      toast.error("Please fill out all fields to update the booking.");
    }
  };

  // Handle delete booking
  const handleDeleteBooking = (id: string) => {
    deleteBooking(id);
    toast.success("Booking deleted successfully!");
  };

  // Render loading state or error state
  if (isLoading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>Error fetching bookings: {error.message}</div>;
  }

  // Handle logout
  const handleLogout = () => {
    // Here you would typically clear the session or token (if using authentication)
    navigate("/"); // Redirect to the homepage (or login page)
  };

  // Handle navigating to products page
  const handleProductsPage = () => {
    navigate("/admin"); // Redirect to the products page (admin page)
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Custom Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-3xl">Bookings</h1>

        <div className="space-x-4">
          <button
            onClick={handleProductsPage}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
          >
            Products
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6">
        {bookings && bookings.length > 0 ? (
          <div>
            <ul className="space-y-4">
              {bookings.map((booking: Booking) => (
                <li
                  key={booking._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-bold">{booking.customer.fname} {booking.customer.lname}</h3>
                  <p>Booking Date: {booking.bookingDate}</p>
                  <p>Product: {booking.product.item_name} - ${booking.product.item_price}</p>

                  <div className="space-x-4 mt-2">
                    <button
                      onClick={() => {
                        setIsUpdating(true);
                        setCurrentBookingId(booking._id);
                        setNewBookingDate(booking.bookingDate);
                      }}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
                    >
                      Update Booking
                    </button>

                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
                    >
                      Delete Booking
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {isUpdating && (
              <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Update Booking</h2>
                <input
                  type="date"
                  value={newBookingDate}
                  onChange={(e) => setNewBookingDate(e.target.value)}
                  className="border p-2 rounded-md w-full"
                />
                <div className="mt-4 space-x-4">
                  <button
                    onClick={handleUpdateBooking}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsUpdating(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>No bookings available.</div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default BookingsPage;
