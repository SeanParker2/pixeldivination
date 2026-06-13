import { describe, it, expect } from 'vitest';
import {
  calculateNumerology,
  generateNumerologyReport,
} from '../../../packages/shared/data/numerology-calculator';

describe('Numerology Calculator', () => {
  describe('calculateNumerology', () => {
    it('should return life path number', () => {
      const result = calculateNumerology('1990-01-15', '张三');
      expect(result).toBeDefined();
      expect(result.lifePathNumber).toBeDefined();
      expect(typeof result.lifePathNumber).toBe('number');
      expect(result.lifePathNumber).toBeGreaterThanOrEqual(1);
      expect(result.lifePathNumber).toBeLessThan(10);
    });

    it('should return talent numbers as array', () => {
      const result = calculateNumerology('1990-01-15', '张三');
      expect(result.talentNumbers).toBeDefined();
      expect(Array.isArray(result.talentNumbers)).toBe(true);
    });

    it('should return meaning object', () => {
      const result = calculateNumerology('1990-01-15', '张三');
      expect(result.meaning).toBeDefined();
      expect(result.meaning.name).toBeDefined();
      expect(result.meaning.keywords).toBeDefined();
    });

    it('should calculate soul urge number when name provided', () => {
      const withName = calculateNumerology('1990-01-15', '张三');
      const withoutName = calculateNumerology('1990-01-15');
      expect(withName.soulUrgeNumber).toBeDefined();
      expect(withoutName.soulUrgeNumber).toBeNull();
    });

    it('should produce consistent results for same input', () => {
      const result1 = calculateNumerology('1990-01-15', '张三');
      const result2 = calculateNumerology('1990-01-15', '张三');
      expect(result1.lifePathNumber).toBe(result2.lifePathNumber);
    });

    it('should produce different results for different dates', () => {
      const result1 = calculateNumerology('1990-01-15');
      const result2 = calculateNumerology('2000-06-20');
      // Life path numbers are very likely different for these dates
      expect(result1.lifePathNumber).not.toBe(result2.lifePathNumber);
    });
  });

  describe('generateNumerologyReport', () => {
    it('should generate a markdown report', () => {
      const profile = calculateNumerology('1990-01-15', '张三');
      const report = generateNumerologyReport(profile);
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report).toContain('数字命理');
      expect(report.length).toBeGreaterThan(100);
    });
  });
});
