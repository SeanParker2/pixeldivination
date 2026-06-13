import { describe, it, expect } from 'vitest';
import { calculateBazi, generateBaziReport } from '../../../packages/shared/data/bazi-calculator';

describe('BaZi Calculator', () => {
  describe('calculateBazi', () => {
    it('should calculate four pillars for a known date', () => {
      // 1990-01-15, hour 14 (未时)
      const result = calculateBazi(new Date(1990, 0, 15), 14);

      expect(result).toBeDefined();
      expect(result.fourPillars).toBeDefined();
      expect(result.fourPillars.year).toBeDefined();
      expect(result.fourPillars.month).toBeDefined();
      expect(result.fourPillars.day).toBeDefined();
      expect(result.fourPillars.hour).toBeDefined();

      // 1990 is 庚午 year
      expect(result.fourPillars.year.stem).toBe('庚');
      expect(result.fourPillars.year.branch).toBe('午');
    });

    it('should identify day master correctly', () => {
      const result = calculateBazi(new Date(1990, 0, 15), 12);
      expect(result.dayMaster).toBeDefined();
      expect(typeof result.dayMaster).toBe('string');
      expect(result.dayMaster.length).toBe(1);
    });

    it('should calculate five elements distribution', () => {
      const result = calculateBazi(new Date(1990, 0, 15), 12);
      expect(result.fiveElements).toBeDefined();
      expect(typeof result.fiveElements['木']).toBe('number');
      expect(typeof result.fiveElements['火']).toBe('number');
      expect(typeof result.fiveElements['土']).toBe('number');
      expect(typeof result.fiveElements['金']).toBe('number');
      expect(typeof result.fiveElements['水']).toBe('number');
    });

    it('should judge strong/weak', () => {
      const result = calculateBazi(new Date(1990, 0, 15), 12);
      expect(result.strongWeak).toBeDefined();
      expect(['身强', '身弱', '中和']).toContain(result.strongWeak);
    });

    it('should provide personality and career analysis', () => {
      const result = calculateBazi(new Date(1990, 0, 15), 12);
      expect(result.personality).toBeDefined();
      expect(typeof result.personality).toBe('string');
      expect(result.career).toBeDefined();
      expect(typeof result.career).toBe('string');
    });

    it('should handle different hours correctly', () => {
      const morning = calculateBazi(new Date(1990, 0, 15), 6);  // 卯时
      const evening = calculateBazi(new Date(1990, 0, 15), 22); // 亥时

      // Hour pillar should be different
      expect(morning.fourPillars.hour.stem).not.toBe(evening.fourPillars.hour.stem);
    });
  });

  describe('generateBaziReport', () => {
    it('should generate a markdown report', () => {
      const bazi = calculateBazi(new Date(1990, 0, 15), 12);
      const report = generateBaziReport(bazi);

      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report).toContain('# 八字命理专业分析报告');
      expect(report).toContain('四柱');
    });
  });
});
