import { describe, it, expect } from 'vitest';
import { calculateChart, getLatLong, type AstrologyData } from '../astrology';

describe('Astrology Engine', () => {
  describe('getLatLong', () => {
    it('should return coordinates for known cities', () => {
      const beijing = getLatLong('北京');
      expect(beijing).toBeDefined();
      expect(typeof beijing.lat).toBe('number');
      expect(typeof beijing.lng).toBe('number');
    });

    it('should fallback to Beijing for unknown cities', () => {
      const unknown = getLatLong('未知城市');
      const beijing = getLatLong('北京');
      expect(unknown.lat).toBe(beijing.lat);
    });

    it('should handle city with 市 suffix', () => {
      const result = getLatLong('上海市');
      expect(result).toBeDefined();
      expect(typeof result.lat).toBe('number');
    });
  });

  describe('calculateChart', () => {
    const testDate = new Date(1990, 0, 15, 14, 30); // 1990-01-15 14:30
    const testLocation = { lat: 39.9042, lng: 116.4074 }; // Beijing

    it('should return a valid astrology chart', () => {
      const chart = calculateChart(testDate, testLocation);

      expect(chart).toBeDefined();
      expect(chart.planets).toBeDefined();
      expect(chart.houses).toBeDefined();
      expect(chart.ascendant).toBeDefined();
      expect(chart.midheaven).toBeDefined();
    });

    it('should calculate 10 planets', () => {
      const chart = calculateChart(testDate, testLocation);

      expect(chart.planets.length).toBe(10);
      expect(chart.planets.map(p => p.name)).toEqual([
        '太阳', '月亮', '水星', '金星', '火星',
        '木星', '土星', '天王星', '海王星', '冥王星'
      ]);
    });

    it('should return planet longitudes in 0-360 range', () => {
      const chart = calculateChart(testDate, testLocation);

      chart.planets.forEach(planet => {
        expect(planet.longitude).toBeGreaterThanOrEqual(0);
        expect(planet.longitude).toBeLessThan(360);
      });
    });

    it('should calculate 12 houses', () => {
      const chart = calculateChart(testDate, testLocation);

      expect(chart.houses.length).toBe(12);
      chart.houses.forEach((house, index) => {
        expect(house.id).toBe(index + 1);
        expect(house.angle).toBeGreaterThanOrEqual(0);
        expect(house.angle).toBeLessThan(360);
      });
    });

    it('should return ASC and MC in 0-360 range', () => {
      const chart = calculateChart(testDate, testLocation);

      expect(chart.ascendant).toBeGreaterThanOrEqual(0);
      expect(chart.ascendant).toBeLessThan(360);
      expect(chart.midheaven).toBeGreaterThanOrEqual(0);
      expect(chart.midheaven).toBeLessThan(360);
    });

    it('should produce consistent results for same input', () => {
      const chart1 = calculateChart(testDate, testLocation);
      const chart2 = calculateChart(testDate, testLocation);

      expect(chart1.ascendant).toBe(chart2.ascendant);
      expect(chart1.midheaven).toBe(chart2.midheaven);
      chart1.planets.forEach((planet, i) => {
        expect(planet.longitude).toBe(chart2.planets[i].longitude);
      });
    });

    it('should produce different results for different dates', () => {
      const chart1 = calculateChart(new Date(1990, 0, 1), testLocation);
      const chart2 = calculateChart(new Date(2000, 5, 15), testLocation);

      // At least the Moon should be in a very different position
      const moonDiff = Math.abs(chart1.planets[1].longitude - chart2.planets[1].longitude);
      expect(moonDiff).toBeGreaterThan(10); // Moon moves ~13 degrees/day
    });

    it('should produce different results for different locations', () => {
      const beijing = { lat: 39.9, lng: 116.4 };
      const shanghai = { lat: 31.2, lng: 121.5 };

      const chart1 = calculateChart(testDate, beijing);
      const chart2 = calculateChart(testDate, shanghai);

      // ASC should differ between Beijing and Shanghai (different latitudes)
      const ascDiff = Math.abs(chart1.ascendant - chart2.ascendant);
      expect(ascDiff).toBeGreaterThan(0.5);
    });
  });
});
