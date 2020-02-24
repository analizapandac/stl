// @ts-nocheck
import React from "react";
import { Machine } from "xstate";
import { useMachine } from "@xstate/react";
import { Link } from 'react-router-dom';
import { orderService } from '../../services/api';
import './OrderForm.styles.scss';

const chart = {
  id: "orderForm",
  initial: "idle",
  states: {
    idle: {
      on: { SUBMIT: "submitting" }
    },
    submitting: {
      on: {
        SUCCEED: "success",
        FAIL: "failure"
      }
    },
    success: {
      on: { RESET: "idle" }
    },
    failure: {
      on: { SUBMIT: "submitting" }
    }
  }
};

const orderFormMachine = Machine(chart);

export const OrderForm = () => {
  const [current, send] = useMachine(orderFormMachine);

  React.useEffect(() => {
    console.log(current.value);
  }, [current]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      send("SUBMIT");
      await orderService.createOrder();
      send("SUCCEED");
    } catch(err) {
      console.log(err);
      send("FAIL");
    }
  };

  const reset = () => {
    send("RESET");
  };

  return (
    <div className="orderFormComponent">
      <Link to="/">Back</Link>
      {current.matches("success") ? (
        <div className="successWrapper">
          <div>Order successfully created</div>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h4>Add a new order</h4>

          {current.matches("failure") ? (
            <div className="errorWrapper">Failed to create order</div>
          ) : null}

          <p>Click the order button to trigger the order creation API</p>

          <button disabled={current.matches("submitting")} type="submit">
            Order
          </button>
        </form>
      )}
    </div>
  );
}

export default OrderForm;