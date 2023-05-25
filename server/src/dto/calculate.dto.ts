import { IsNumber, Max, Min } from 'class-validator';

export class CalculateDto {
  @Min(1000)
  @Max(1000000)
  @IsNumber()
  amount: number;

  @Min(1)
  @Max(10)
  @IsNumber()
  repaymentRate: number;

  @Min(1)
  @Max(10)
  @IsNumber()
  interestRate: number;

  @Min(1)
  @Max(30)
  @IsNumber()
  period: number;
}
