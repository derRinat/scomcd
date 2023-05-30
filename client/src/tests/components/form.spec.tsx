import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { Form } from "../../components/form";

describe("Form component", () => {
  const formSubmitMock = jest.fn();
  const renderForm = () => render(<Form onSubmit={formSubmitMock} />);

  it("should render form with fields", async () => {
    renderForm();

    expect(
      await screen.findByLabelText(/Darlehensbetrag/i)
    ).toBeInTheDocument();
    expect(await screen.findByLabelText(/Sollzins/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Tilgung/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Laufzeit/i)).toBeInTheDocument();
    expect(await screen.findByText(/Berechnen/i)).toBeInTheDocument();
  });

  it("should able to submit form by valid fields", async () => {
    renderForm();

    const amountField = await screen.findByLabelText(/Darlehensbetrag/i);
    const rate = await screen.findByLabelText(/Sollzins/i);
    const repaymentRate = await screen.findByLabelText(/Tilgung/i);
    const period = await screen.findByLabelText(/Laufzeit/i);
    const button = await screen.findByText(/Berechnen/i);

    expect(await button).toBeDisabled();

    await userEvent.type(amountField, "250000");
    await userEvent.type(rate, "2");
    await userEvent.type(repaymentRate, "3");
    await userEvent.type(period, "10");

    expect(await button).toBeEnabled();
    await userEvent.click(button);
    expect(formSubmitMock).toHaveBeenCalledTimes(1);
  });

  it("should render errors by invalid fields", async () => {
    renderForm();

    const amountField = screen.getByLabelText(/Darlehensbetrag/i);
    const rate = screen.getByLabelText(/Sollzins/i);
    const repaymentRate = screen.getByLabelText(/Tilgung/i);
    const period = screen.getByLabelText(/Laufzeit/i);
    const button = screen.getByText(/Berechnen/i);

    expect(button).toBeDisabled();

    await userEvent.type(amountField, "100");
    await userEvent.type(rate, "15");
    await userEvent.type(repaymentRate, "15");
    await userEvent.type(period, "50");

    expect(amountField).toBeInvalid();
    expect(rate).toBeInvalid();
    expect(repaymentRate).toBeInvalid();
    expect(period).toBeInvalid();

    expect(
      screen.getByText("amount must be greater than or equal to 1000")
    ).toBeVisible();

    expect(
      screen.getByText("interestRate must be less than or equal to 10")
    ).toBeVisible();

    expect(
      screen.getByText("repaymentRate must be less than or equal to 10")
    ).toBeVisible();

    expect(
      screen.getByText("period must be less than or equal to 30")
    ).toBeVisible();

    expect(await button).toBeDisabled();
  });
});
