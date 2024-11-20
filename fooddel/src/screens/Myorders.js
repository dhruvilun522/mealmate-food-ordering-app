import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import for v6
import config from '../config';
import Navbar from '../components/Navbar'

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);  // Added state to handle selected order
  const navigate = useNavigate(); // Using useNavigate for navigation in v6

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          // Redirect if no authToken
          navigate('/login'); // Redirecting using useNavigate
          return;
        }

        const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token (base64)
        const id = decoded.user.id; // Get user ID from token
        const Data = { id };

        const response = await fetch(`${config.SERVER_PATH}/my_orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Data),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const ordersData = await response.json();
        console.log(ordersData)
        setOrders(ordersData); // Set the fetched orders
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Could not fetch orders.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]); // Added navigate as a dependency

  const handleOrderClick = (orderId) => {
    setSelectedOrder(orderId);  // Set the selected order to view details
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);  // Go back to the list of orders
  };

  if (loading) return <div>Loading your orders...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="my-orders">
        <div>
        <Navbar />
        </div>
      <style>
        {`
          .my-orders {
            padding: 20px;
            background-color: #f8f9fa;
            min-height: 100vh;
          }

          .order-table {
            width: 100%;
            margin: 0 auto;
            border-collapse: collapse;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }

          .order-table th, .order-table td {
            padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
          }

          .order-table th {
            background-color: green;
            color: white;
          }

          .order-table tbody tr:hover {
            background-color: #f1f1f1;
          }

          .order-table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
          }

          .order-header {
            text-align: center;
            margin-bottom: 20px;
            font-size: 2rem;
            color: #343a40;
          }

          .order-status {
            font-weight: bold;
            color: green;
          }

          .order-total {
            font-size: 1.2rem;
            color: #28a745;
          }

          .order-details {
            padding: 20px;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }

          .back-button {
            margin-top: 20px;
            padding: 10px 15px;
            background-color: green;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
          }

          .back-button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
      <h2>My Orders</h2>
      {selectedOrder ? (
        // Display order details if selected
        <div className="order-details">
          <button className="back-button" onClick={handleBackToOrders}>Back to Orders</button>
          <h3>Order Details</h3>
          <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
          <p><strong>Total Price:</strong> {selectedOrder.totalPrice} /-</p>
          <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
          <h4>Items:</h4>
          <ul>
            {selectedOrder.items.map(item => (
              <li key={item.id}>
                <strong>{item.name}</strong>({item.size}) - {item.qty} x {item.price} /- 
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>You have not placed any orders yet.</p>
          ) : (
            <table className="order-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order Date</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} onClick={() => handleOrderClick(order)}>
                    <td>{index + 1}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>{order.totalPrice} /-</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
