"use strict";

module.exports.processPayment = async event => {
  const paymentResult = Number(Math.random().toFixed());

  let statusCode = 200;
  let response = {
    status: "succeeded",
    message: "Card successfully charged."
  };

  if (!paymentResult) {
    statusCode = 402;
    response = {
      status: "failed",
      code: "balance_insufficient",
      message: "Card has insufficient balance."
    };
  }

  return {
    statusCode: statusCode,
    body: JSON.stringify(response, null, 2)
  };
};
