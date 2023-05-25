import * as yup from "yup";

export const validationSchema = yup
  .object()
  .shape({
    amount: yup
      .number()
      .typeError("Ungültiger Wert")
      .required()
      .min(1000)
      .max(1000000),
    interestRate: yup
      .number()
      .typeError("Ungültiger Wert")
      .required()
      .min(1)
      .max(10),
    repaymentRate: yup
      .number()
      .typeError("Ungültiger Wert")
      .required()
      .min(1)
      .max(10),
    period: yup.number().typeError("Ungültiger Wert").required().min(1).max(30),
  })
  .required();
