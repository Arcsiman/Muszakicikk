import { PricePipe } from './price.pipe';

describe('PricePipe', () => {
  const pipe = new PricePipe();

  it('should format numbers with thousand separators and currency', () => {
    expect(pipe.transform(299999)).toBe('299 999 Ft');
    expect(pipe.transform(1000)).toBe('1 000 Ft');
    expect(pipe.transform(123456789)).toBe('123 456 789 Ft');
  });

  it('should return an empty string for null or undefined', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });
});