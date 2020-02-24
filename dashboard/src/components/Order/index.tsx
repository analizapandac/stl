// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { orderService } from '../../services/api';
import './Order.styles.scss';

export const Order = () => {
  let { orderId } = (useParams() as any) as { orderId: number };
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const order = await orderService.getOrder(orderId);
        setOrder(order);
      } catch (err) {
        setOrder([]);
        console.log(err);
      } finally {
        setLoading(false);
      };
    }
    getData();
  }, [orderId]);

  if (loading) {
    return <p>Loading order details...</p>
  }

  return (
    <div className="orderComponent">
      <header className="header">
        <div>
          <Link to="/">Back</Link>
          <div>Order Details</div>
        </div>
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
            <tr>
              <td>{order.id}</td>
              <td>{order.total} MYR</td>
              <td>{order.status}</td>
              <td>{order.createdAt}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Order;