import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { PaymentPlan } from "../../components/payment-plan";

describe("Payment plan component", () => {
  const dataMock = {
    totals: {
      interest: 100,
      payment: 200,
      totalPayment: 300,
      restPayment: 500,
    },
    data: [
      {
        monthPayment: 150,
        fee: 50,
        payment: 100,
        restAmount: 150,
        date: "30.05.2023",
      },
      {
        monthPayment: 150,
        fee: 50,
        payment: 100,
        restAmount: 150,
        date: "30.06.2023",
      },
    ],
  };

  const renderPaymentPlan = () => render(<PaymentPlan data={dataMock} />);

  it("should render payment totals", async () => {
    renderPaymentPlan();

    const totals = screen.getByTestId("payment-totals");

    expect(totals).toBeVisible();

    const totalPayment = totals.childNodes[0];
    const fees = totals.childNodes[1];
    const repayment = totals.childNodes[2];
    const restAmount = totals.childNodes[3];

    expect(totalPayment.childNodes[1].textContent).toContain("300");
    expect(fees.childNodes[1].textContent).toContain("100");
    expect(repayment.childNodes[1].textContent).toContain("200");
    expect(restAmount.childNodes[1].textContent).toContain("500");
  });

  it("should render payment table", async () => {
    renderPaymentPlan();

    const table = screen.getByTestId("payment-plan");
    expect(table).toBeVisible();
    // eslint-disable-next-line testing-library/no-node-access
    expect(table.querySelectorAll("tbody > tr").length).toBe(2);
  });
});
