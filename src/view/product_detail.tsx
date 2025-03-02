import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProduct, useAddBooking } from "./query"; // Using useAddBooking
import Header from "./header";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProduct(id || "");
  const { mutate: addBooking } = useAddBooking();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");

  // Placeholder for customerId (replace with actual user ID if available)
  const customerId = localStorage.getItem('userId');

  // Handle loading and error states
  if (isLoading) return <p className="text-center text-black">Loading product...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching product: {error.message}</p>;
  if (!product) return <p className="text-center text-red-500">Product not found!</p>;

  // Function to handle booking
  const handleBookAppointment = () => {
    if (!appointmentDate) {
      alert("Please select a date for the appointment.");
      return;
    }

    addBooking(
      {
        customerId,
        productId: product._id,
        bookingDate: appointmentDate,
      },
      {
        onSuccess: () => {
          alert("Appointment booked successfully!");
          setShowDatePicker(false);
          setAppointmentDate("");
        },
        onError: () => {
          alert("Failed to book the appointment.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-white text-black py-16 px-8">
      <Header />

      <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">{product?.item_name}</h1>

        <div className="flex flex-col items-center mb-8">
          <img
            src={product?.image || "https://via.placeholder.com/300"}
            alt={product?.item_name}
            className="w-full max-w-xs object-cover rounded-lg shadow-lg mb-6"
          />

          <div className="flex flex-col items-center text-center">
            <p className="text-lg mb-4">{product?.item_description || "No description available"}</p>
            <p className="text-xl font-semibold mb-4">Price: ${product?.item_price}</p>

            {!showDatePicker ? (
              <button
                onClick={() => setShowDatePicker(true)}
                className="px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-900 transition-colors"
              >
                Book Appointment
              </button>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="border p-2 rounded-md"
                />
                <div className="space-x-4">
                  <button
                    onClick={handleBookAppointment}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
