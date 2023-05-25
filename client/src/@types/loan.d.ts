type CalcInput = {
  amount: number;
  interestRate: number;
  repaymentRate: number;
  period: number;
};

type CalcData = {
  totals: {
    interest: number;
    payment: number;
    totalPayment: number;
    restPayment: number;
  };
  data: {
    monthPayment: number;
    fee: number;
    payment: number;
    restAmount: number;
    date: string;
  }[];
};
