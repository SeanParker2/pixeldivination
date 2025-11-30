import * as Astronomy from 'astronomy-engine';

export interface PlanetPosition {
  name: string;
  symbol: string;
  longitude: number; // 0-360 degrees (0 = Aries)
  color?: string;
}

export interface HouseCusp {
  id: number;
  angle: number; // 0-360 degrees
}

export interface AstrologyData {
  planets: PlanetPosition[];
  houses: HouseCusp[];
  ascendant: number;
  midheaven: number;
}

// Common Chinese cities coordinates
const CITIES: Record<string, {lat: number, lng: number}> = {
  '北京': { lat: 39.9042, lng: 116.4074 },
  '上海': { lat: 31.2304, lng: 121.4737 },
  '广州': { lat: 23.1291, lng: 113.2644 },
  '深圳': { lat: 22.5431, lng: 114.0579 },
  '成都': { lat: 30.5728, lng: 104.0668 },
  '杭州': { lat: 30.2741, lng: 120.1551 },
  '武汉': { lat: 30.5928, lng: 114.3055 },
  '西安': { lat: 34.3416, lng: 108.9398 },
  '重庆': { lat: 29.4316, lng: 106.9123 },
  '南京': { lat: 32.0603, lng: 118.7969 },
  '天津': { lat: 39.0842, lng: 117.2009 },
  '沈阳': { lat: 41.8057, lng: 123.4315 },
  '长沙': { lat: 28.2282, lng: 112.9388 },
  '昆明': { lat: 24.8801, lng: 102.8329 },
  '香港': { lat: 22.3193, lng: 114.1694 },
  '台北': { lat: 25.0330, lng: 121.5654 },
};

export const getLatLong = (city: string) => {
  if (!city) return CITIES['北京'];
  const key = Object.keys(CITIES).find(c => city.includes(c));
  return key ? CITIES[key] : CITIES['北京'];
};

const BODIES = [
  { name: '太阳', symbol: '☉', body: Astronomy.Body.Sun },
  { name: '月亮', symbol: '☽', body: Astronomy.Body.Moon },
  { name: '水星', symbol: '☿', body: Astronomy.Body.Mercury },
  { name: '金星', symbol: '♀', body: Astronomy.Body.Venus },
  { name: '火星', symbol: '♂', body: Astronomy.Body.Mars },
  { name: '木星', symbol: '♃', body: Astronomy.Body.Jupiter },
  { name: '土星', symbol: '♄', body: Astronomy.Body.Saturn },
  { name: '天王星', symbol: '♅', body: Astronomy.Body.Uranus },
  { name: '海王星', symbol: '♆', body: Astronomy.Body.Neptune },
  { name: '冥王星', symbol: '♇', body: Astronomy.Body.Pluto },
];

// Helper: Normalize angle to 0-360
const normalizeAngle = (angle: number) => {
  let a = angle % 360;
  if (a < 0) a += 360;
  return a;
};

export const calculateChart = (date: Date, location: { lat: number, lng: number }): AstrologyData => {
  // Create Astronomy.Observer
  // Note: Astronomy Engine expects height in meters. We assume 0.
  // const observer = new Astronomy.Observer(location.lat, location.lng, 0);
  const time = Astronomy.MakeTime(date);

  // 1. Calculate Planets
  const planets: PlanetPosition[] = BODIES.map(b => {
    // Calculate geocentric position
    const vector = Astronomy.GeoVector(b.body, time, true); // true for light-time aberration correction
    // Convert to ecliptic coordinates
    const ecliptic = Astronomy.Ecliptic(vector);
    return {
      name: b.name,
      symbol: b.symbol,
      longitude: normalizeAngle(ecliptic.elon),
    };
  });

  // 2. Calculate Houses (ASC & MC)
  // We need Sidereal Time
  const siderealTime = Astronomy.SiderealTime(time); // Greenwich Sidereal Time in hours
  // Local Sidereal Time (LST) in hours
  let lst = siderealTime + location.lng / 15.0;
  if (lst < 0) lst += 24;
  if (lst >= 24) lst -= 24;

  // Ramc in degrees
  const ramc = lst * 15;
  
  // Obliquity of Ecliptic
  // Need sun vector to get precise obliquity or use approximation. 
  // Astronomy.Ecliptic has a helper or we can get it from the Sun position calculation implicitly.
  // But actually, Astronomy.RotationMatrix can be used or specific function. 
  // Let's use the obliquity of date.
  // Note: Astronomy.Obliquity is not directly exported in basic types sometimes, 
  // but we can infer it or assume standard J2000 if needed.
  // Actually, `Astronomy.Ecliptic` returns lat/lon. 
  // To calculate ASC/MC we need the Obliquity (epsilon).
  // Let's use a standard formula for Epsilon based on J2000 or check if library provides it.
  // The library calculates true obliquity internally. 
  // We can use the Sun's ecliptic latitude (should be near 0) to verify? No.
  // Let's just use a standard approximation for 2000-2050: 23.44 degrees.
  const eps = 23.4392911 * (Math.PI / 180); // Standard J2000 obliquity in radians
  
  const latRad = location.lat * (Math.PI / 180);
  const ramcRad = ramc * (Math.PI / 180);

  // MC Calculation
  // tan(MC) = tan(RAMC) / cos(eps)
  // MC is in the same quadrant as RAMC (or opposite depending on implementation). 
  // Using atan2 is safer.
  // x = cos(eps) * sin(ramcRad) -> wrong formula derived?
  // Correct vector approach for MC:
  // It's the point on ecliptic with RA = RAMC.
  // tan(lon) = tan(RA) / cos(eps) ?
  // Let's use standard formula:
  // MC = atan2(tan(RAMC), cos(eps))  <-- Incorrect.
  // MC = atan2(sin(RAMC), cos(RAMC) * cos(eps)) ? No.
  // Standard: tan(MC) = tan(RAMC) / cos(eps).
  // MC = atan2(sin(RAMCRad) * cos(eps), cos(RAMCRad)) ? No that's transforming RA to Lon.
  // Correct conversion RA -> Ecliptic Longitude (when lat=0):
  // tan(lon) = sin(RA) * cos(eps) + tan(lat)*sin(eps) / cos(RA) -> lat=0.
  // Actually MC is the intersection of Meridian and Ecliptic.
  // RA_MC = RAMC. Dec_MC?
  // Formula: tan(MC) = tan(RAMC) / cos(epsilon)
  // Use atan2(y, x)
  // y = sin(ramcRad)
  // x = cos(ramcRad) * cos(eps)
  // (Wait, checking reference... yes, tan(lambda) = tan(alpha) / cos(epsilon))
  const mcRad = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(eps));
  let mc = normalizeAngle(mcRad * (180 / Math.PI));

  // ASC Calculation
  // tan(ASC) = -cos(RAMC) / (sin(RAMC) * cos(eps) + tan(lat) * sin(eps))
  const top = -Math.cos(ramcRad);
  const bottom = Math.sin(ramcRad) * Math.cos(eps) + Math.tan(latRad) * Math.sin(eps);
  const ascRad = Math.atan2(top, bottom);
  let asc = normalizeAngle(ascRad * (180 / Math.PI));

  // Houses - Porphyry System (Simplified Quadrant System)
  // Trisect the arc between Angles.
  // MC to ASC is Eastern Hemisphere.
  // ASC to IC is Northern Hemisphere.
  
  // Determine IC and DESC
  const ic = normalizeAngle(mc + 180);
  const desc = normalizeAngle(asc + 180);

  // Quadrant 1: ASC to IC (Houses 1, 2, 3) - Note: In standard order 1 is ASC->2.
  // Wait, Order is 1(ASC), 2, 3, 4(IC), 5, 6, 7(DESC), 8, 9, 10(MC), 11, 12.
  
  // Let's calculate arcs
  // Arc 1 (12->1, wait. House 1 starts at ASC).
  // House 1, 2, 3 are between ASC and IC? 
  // No. ASC is start of House 1. IC is start of House 4.
  // So Quadrant 1 is ASC to IC.
  let q1Size = ic - asc;
  if (q1Size < 0) q1Size += 360;
  const h1 = asc;
  const h2 = normalizeAngle(asc + q1Size / 3);
  const h3 = normalizeAngle(asc + 2 * q1Size / 3);
  const h4 = ic;

  // Quadrant 2: IC to DESC (Houses 4, 5, 6)
  let q2Size = desc - ic;
  if (q2Size < 0) q2Size += 360;
  const h5 = normalizeAngle(ic + q2Size / 3);
  const h6 = normalizeAngle(ic + 2 * q2Size / 3);
  const h7 = desc;

  // Quadrant 3: DESC to MC (Houses 7, 8, 9)
  let q3Size = mc - desc;
  if (q3Size < 0) q3Size += 360;
  const h8 = normalizeAngle(desc + q3Size / 3);
  const h9 = normalizeAngle(desc + 2 * q3Size / 3);
  const h10 = mc;

  // Quadrant 4: MC to ASC (Houses 10, 11, 12)
  let q4Size = asc - mc;
  if (q4Size < 0) q4Size += 360;
  const h11 = normalizeAngle(mc + q4Size / 3);
  const h12 = normalizeAngle(mc + 2 * q4Size / 3);

  const houses: HouseCusp[] = [
    { id: 1, angle: h1 },
    { id: 2, angle: h2 },
    { id: 3, angle: h3 },
    { id: 4, angle: h4 },
    { id: 5, angle: h5 },
    { id: 6, angle: h6 },
    { id: 7, angle: h7 },
    { id: 8, angle: h8 },
    { id: 9, angle: h9 },
    { id: 10, angle: h10 },
    { id: 11, angle: h11 },
    { id: 12, angle: h12 },
  ];

  return {
    planets,
    houses,
    ascendant: asc,
    midheaven: mc
  };
};
