import * as Astronomy from 'astronomy-engine';

export interface PlanetPosition {
  name: string;
  symbol: string;
  longitude: number;
}

export interface HouseCusp {
  id: number;
  angle: number;
}

export interface AstrologyData {
  planets: PlanetPosition[];
  houses: HouseCusp[];
  ascendant: number;
  midheaven: number;
}

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

function normalizeAngle(angle: number): number {
  let a = angle % 360;
  if (a < 0) a += 360;
  return a;
}

export function calculateChart(
  date: Date,
  location: { lat: number; lng: number },
): AstrologyData {
  const time = Astronomy.MakeTime(date);

  const planets: PlanetPosition[] = BODIES.map((b) => {
    const vector = Astronomy.GeoVector(b.body, time, true);
    const ecliptic = Astronomy.Ecliptic(vector);
    return {
      name: b.name,
      symbol: b.symbol,
      longitude: normalizeAngle(ecliptic.elon),
    };
  });

  const siderealTime = Astronomy.SiderealTime(time);
  let lst = siderealTime + location.lng / 15.0;
  if (lst < 0) lst += 24;
  if (lst >= 24) lst -= 24;

  const ramc = lst * 15;
  const eps = 23.4392911 * (Math.PI / 180);
  const latRad = location.lat * (Math.PI / 180);
  const ramcRad = ramc * (Math.PI / 180);

  const mcRad = Math.atan2(
    Math.sin(ramcRad),
    Math.cos(ramcRad) * Math.cos(eps),
  );
  const mc = normalizeAngle((mcRad * 180) / Math.PI);

  const top = -Math.cos(ramcRad);
  const bottom =
    Math.sin(ramcRad) * Math.cos(eps) + Math.tan(latRad) * Math.sin(eps);
  const ascRad = Math.atan2(top, bottom);
  const asc = normalizeAngle((ascRad * 180) / Math.PI);

  const ic = normalizeAngle(mc + 180);
  const desc = normalizeAngle(asc + 180);

  let q1Size = ic - asc;
  if (q1Size < 0) q1Size += 360;
  const h1 = asc;
  const h2 = normalizeAngle(asc + q1Size / 3);
  const h3 = normalizeAngle(asc + (2 * q1Size) / 3);
  const h4 = ic;

  let q2Size = desc - ic;
  if (q2Size < 0) q2Size += 360;
  const h5 = normalizeAngle(ic + q2Size / 3);
  const h6 = normalizeAngle(ic + (2 * q2Size) / 3);
  const h7 = desc;

  let q3Size = mc - desc;
  if (q3Size < 0) q3Size += 360;
  const h8 = normalizeAngle(desc + q3Size / 3);
  const h9 = normalizeAngle(desc + (2 * q3Size) / 3);
  const h10 = mc;

  let q4Size = asc - mc;
  if (q4Size < 0) q4Size += 360;
  const h11 = normalizeAngle(mc + q4Size / 3);
  const h12 = normalizeAngle(mc + (2 * q4Size) / 3);

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
    midheaven: mc,
  };
}
