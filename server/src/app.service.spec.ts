import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { CalculateDto } from './dto/calculate.dto';

const testDto: CalculateDto = {
  period: 10,
  repaymentRate: 3,
  interestRate: 2,
  amount: 250000
};

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AppService]
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('calculate is working', () => {
    const result = service.calculate(testDto);
    expect(result).toHaveProperty('totals');
    expect(result).toHaveProperty('data');
  });
});
