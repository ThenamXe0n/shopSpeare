import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaFileDownload,
  FaRedoAlt,
  FaChevronDown,
} from "react-icons/fa";
import { getMyOrdersApi } from "../service/apiCollections";

// const orders = [
//   {
//     orderId: "ORD-90342X",
//     orderStatus: "shipped",
//     expectedDelivery: "15 April 2026",
//     discount: 300,
//     totalAmount: 5698,
//     createdAt: "12 April 2026",
//     address: {
//       house: "221B Premium Residency, Sector 4",
//       city: "Bhopal",
//       pincode: "462001",
//       state: "Madhya Pradesh",
//       contact: "+91 9876543210",
//     },
//     items: [
//       {
//         quantity: 1,
//         price: 2499,
//         productDetails: {
//           name: "premium sneakers for men",
//           poster:
//             "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop",
//           brand: "nike",
//           category: "footwear",
//         },
//       },
//       {
//         quantity: 1,
//         price: 3499,
//         productDetails: {
//           name: "smart watch series x",
//           poster:
//             "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop",
//           brand: "noise",
//           category: "electronics",
//         },
//       },
//     ],
//   },
//   {
//     orderId: "ORD-88112A",
//     orderStatus: "delivered",
//     expectedDelivery: "Delivered on 05 April 2026",
//     discount: 150,
//     totalAmount: 1899,
//     createdAt: "03 April 2026",
//     address: {
//       house: "14 Lake View Apartment",
//       city: "Indore",
//       pincode: "452001",
//       state: "Madhya Pradesh",
//       contact: "+91 9123456780",
//     },
//     items: [
//       {
//         quantity: 1,
//         price: 1899,
//         productDetails: {
//           name: "luxury perfume",
//           poster:
//             "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=500&auto=format&fit=crop",
//           brand: "bella vita",
//           category: "beauty",
//         },
//       },
//     ],
//   },
// ];

const statusIcon = {
  pending: <FaBoxOpen />,
  confirmed: <FaBoxOpen />,
  shipped: <FaTruck />,
  delivered: <FaCheckCircle />,
  "out for delivery": <FaTruck />,
  cancelled: <FaTimesCircle />,
};

export default function MyOrdersPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrdersApi()
      .then((response) => setOrders(response.data))
      .catch((error) => alert(error.message));
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f6f6] px-4 sm:px-6 py-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[3px] text-gray-500">
              Purchase History
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-1">My Orders</h1>
          </div>
          <p className="text-sm text-gray-500">
            Track, review and manage your orders seamlessly.
          </p>
        </div>

        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-[28px] shadow-[0_10px_28px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden"
          >
            <div
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="px-6 py-5 border-b bg-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex flex-wrap gap-5 text-sm">
                <span>
                  <strong>Order ID:</strong> {order.orderId}
                </span>
                <span>
                  <strong>Placed:</strong> {new Date(order.createdAt).toLocaleString()}
                </span>
                <span>
                  <strong>Total:</strong> ₹{order.totalAmount}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium capitalize bg-white px-4 py-2 rounded-full border">
                  {statusIcon[order.orderStatus]} {order.orderStatus}
                </div>
                <FaChevronDown
                  className={`transition ${openIndex === index ? "rotate-180" : ""}`}
                />
              </div>
            </div>

            {openIndex === index && (
              <div className="grid lg:grid-cols-[1.6fr_0.9fr] gap-6 p-6">
                <div className="space-y-5">
                  <div className="bg-gray-50 rounded-3xl p-5">
                    <p className="text-sm font-medium">
                      Expected Delivery:{" "}
                      <span className="text-green-600">
                        {order.expectedDelivery}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-xs sm:text-sm flex-wrap">
                      <span className="bg-black text-white px-3 py-1 rounded-full">
                        Order Placed
                      </span>
                      <span className="h-[2px] w-8 bg-gray-300"></span>
                      <span className="bg-black text-white px-3 py-1 rounded-full">
                        Confirmed
                      </span>
                      <span className="h-[2px] w-8 bg-gray-300"></span>
                      <span className="bg-black text-white px-3 py-1 rounded-full capitalize">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-center border border-gray-100 rounded-3xl p-4 hover:shadow-sm transition"
                    >
                      <img
                        src={item.productDetails.poster}
                        alt={item.productDetails.name}
                        className="w-20 h-20 rounded-2xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 uppercase">
                          {item.productDetails.brand} •{" "}
                          {item.productDetails.category}
                        </p>
                        <h3 className="font-semibold capitalize truncate mt-1">
                          {item.productDetails.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-3xl p-5">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <FaMapMarkerAlt /> Delivery Address
                    </h3>
                    <p className="text-sm text-gray-600 leading-6">
                      {order.address.house}, {order.address.city},{" "}
                      {order.address.state} - {order.address.pincode}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Contact: {order.address.contact}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-3xl p-5 text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Discount Applied</span>
                      <span className="text-green-600">
                        - ₹{order.discount}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-base pt-2 border-t">
                      <span>Payable Amount</span>
                      <span>₹{order.totalAmount}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="border py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50">
                      <FaFileDownload /> Invoice
                    </button>
                    <button className="bg-black text-white py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2">
                      <FaRedoAlt /> Reorder
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
