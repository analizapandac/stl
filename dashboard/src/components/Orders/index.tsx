// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { orderService } from '../../services/api';
import './Orders.styles.scss';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const orders = await orderService.getOrders();
        setOrders(orders);
      } catch (err) {
        setOrders([]);
        console.log(err);
      } finally {
        setLoading(false);
      };
    }
    getData();
  }, []);

  const renderOrders = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="4">Loading orders...</td>
        </tr>
      );
    }
    return orders.map(order => {
      return (
        <tr key={order.id} onClick={() => history.push(`/orders/${order.id}`)}>
          <td>{order.id}</td>
          <td>{order.total} MYR</td>
          <td>{order.status}</td>
          <td>{order.createdAt}</td>
        </tr>
      );
    })
  }

  return (
    <div className="ordersComponent">
      <header className="header">
        <div>My Orders</div>
        <Link to="/orders/new">+ Add New Order</Link>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date Ordered</th>
            </tr>
          </thead>
          <tbody>
            {renderOrders()}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Orders;