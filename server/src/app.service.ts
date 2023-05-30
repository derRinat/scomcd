import { Injectable } from '@nestjs/common';
import { CalculateDto } from './dto/calculate.dto';
import { getDate } from './utils/date';
import { formatNumber } from './utils/number';

const MONTH_IN_YEAR = 12;

@Injectable()
export class AppService {
  calculate(dto: CalculateDto) {
    const { amount, interestRate, repaymentRate, period } = dto;

    const mCount = period * MONTH_IN_YEAR;
    const yPayment = amount * ((interestRate + repaymentRate) * 0.01);
    const mPayment = formatNumber(yPayment / MONTH_IN_YEAR);
    const mInterestRate = (interestRate * 0.01) / MONTH_IN_YEAR;

    const data = [
      {
        monthPayment: 0,
        fee: 0,
        payment: 0,
        restAmount: amount,
        date: getDate()
      }
    ];

    let rAmount = amount;
    let interestTotal = 0;
    let paymentTotal = 0;
    let repaymentTotal = 0;

    for (let i = 0; i < mCount; i++) {
      const interest = rAmount * mInterestRate;
      const repayment = mPayment - interest;
      interestTotal += interest;

      if (mPayment > rAmount) {
        paymentTotal += rAmount;
        repaymentTotal += repayment;
        data.push({
          monthPayment: formatNumber(rAmount),
          fee: formatNumber(rAmount * mInterestRate),
          payment: formatNumber(rAmount),
          restAmount: 0,
          date: getDate(i + 1)
        });
        rAmount = 0;
        break;
      }

      paymentTotal += mPayment;
      repaymentTotal += repayment;

      data.push({
        monthPayment: formatNumber(mPayment),
        fee: formatNumber(rAmount * mInterestRate),
        payment: formatNumber(repayment),
        restAmount: formatNumber(rAmount),
        date: getDate(i + 1)
      });

      rAmount -= repayment;
    }

    return {
      totals: {
        interest: formatNumber(interestTotal),
        payment: formatNumber(repaymentTotal),
        totalPayment: formatNumber(paymentTotal),
        restPayment: formatNumber(rAmount)
      },
      data
    };
  }
}
