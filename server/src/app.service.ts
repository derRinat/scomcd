import { Injectable } from '@nestjs/common';
import { CalculateDto } from './dto/calculate.dto';

const MONTH_IN_YEAR = 12;

@Injectable()
export class AppService {
  private getDate(month = 0): string {
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth() + (month + 1),
      0
    ).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  private formatNumber(value: number, dig = 2) {
    return Number(value.toFixed(dig));
  }

  calculate(dto: CalculateDto) {
    const { amount, interestRate, repaymentRate, period } = dto;

    const mCount = period * MONTH_IN_YEAR;
    const yPayment = amount * ((interestRate + repaymentRate) * 0.01);
    const mPayment = this.formatNumber(yPayment / MONTH_IN_YEAR);
    const mInterestRate = (interestRate * 0.01) / MONTH_IN_YEAR;

    const data = [
      {
        monthPayment: 0,
        fee: 0,
        payment: 0,
        restAmount: amount,
        date: this.getDate()
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
          monthPayment: this.formatNumber(rAmount),
          fee: this.formatNumber(rAmount * mInterestRate),
          payment: this.formatNumber(rAmount),
          restAmount: 0,
          date: this.getDate(i + 1)
        });
        rAmount = 0;
        break;
      }

      paymentTotal += mPayment;
      repaymentTotal += repayment;

      data.push({
        monthPayment: this.formatNumber(mPayment),
        fee: this.formatNumber(rAmount * mInterestRate),
        payment: this.formatNumber(repayment),
        restAmount: this.formatNumber(rAmount),
        date: this.getDate(i + 1)
      });

      rAmount -= repayment;
    }

    return {
      totals: {
        interest: this.formatNumber(interestTotal),
        payment: this.formatNumber(repaymentTotal),
        totalPayment: this.formatNumber(paymentTotal),
        restPayment: this.formatNumber(rAmount)
      },
      data
    };
  }
}
