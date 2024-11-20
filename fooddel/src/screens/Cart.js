import React from 'react';
import { Usecart, Usedispatch } from '../components/Contextreducer';
import config from '../config';
import { Link, useNavigate } from 'react-router-dom';
export default function Cart() {
  let navigate=useNavigate();
    let data = Usecart();
    let dispatch = Usedispatch();

    // Step 1: Retrieve the JWT token and decode it to get the username
    const getUsernameFromToken = () => {
        const token = localStorage.getItem('authToken'); // Get JWT token from localStorage
        if (!token) return null;

        const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token (assuming it's base64 encoded)
        return decoded.user.id; // Assuming the username is in the 'username' field
    };

    const username = getUsernameFromToken();

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-white'>
                    The Cart is Empty!
                </div>
            </div>
        );
    }

    let totalPrice = data.reduce((total, food) => total + food.price*food.qty, 0);

    // Step 2: Handle quantity change in cart
    const handleQuantityChange = (index, newQty) => {
        if (newQty < 1) {
            dispatch({ type: 'REMOVE', index: index });
        } else {
            dispatch({ type: 'UPDATE_QTY', index: index, newQty: newQty });
            //console.log(data)
            //totalPrice = data.reduce((total, food) => total + food.price, 0);
        }
    };

    // Step 3: Handle placing the order
    const handleOrder = async () => {
        const orderData = {
            id: username,
            items: data,
            totalAmount: totalPrice,
        };
        console.log(orderData);
        // Step 4: Send order data to the backend server
        try {
            const response = await fetch(`${config.SERVER_PATH}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            console.log(response.status);

            if (response.status != 200) {
                throw new Error('Failed to place order');
            }

            const responseData = await response.json();
            console.log(responseData.success)
            if (responseData.success) {
                alert('Your order has been placed successfully!');
                dispatch({ type: 'CLEAR_CART' }); // Clear the cart after successful order
                navigate("/my-orders");
            } else {
                alert('Failed to place the order, please try again.');
            }
        } catch (error) {
            alert('Error placing the order: ' + error.message);
        }
    };

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table'>
                    <thead className='text-white'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index} className='text-white'>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <button
                                            className="btn btn-sm btn-danger me-2"
                                            onClick={() => handleQuantityChange(index, food.qty - 1)}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={food.qty}
                                            className="form-control text-center"
                                            style={{ width: '60px' }}
                                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                        />
                                        <button
                                            className="btn btn-sm btn-success ms-2"
                                            onClick={() => handleQuantityChange(index, food.qty + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-warning text-white"
                                        onClick={() => dispatch({ type: 'REMOVE', index: index })}
                                    >
                                        Remove Item
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1>
                </div>
                <div className="mt-4">
                    <button
                        className="btn btn-lg btn-success"
                        onClick={handleOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
