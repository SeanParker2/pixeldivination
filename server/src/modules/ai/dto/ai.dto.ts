export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface PlanetData {
  name: string;
  symbol: string;
  longitude: number;
  sign?: string;
  house?: number;
}

export interface HouseData {
  id: number;
  angle: number;
}

export interface AspectData {
  planet1: string;
  planet2: string;
  type: string;
  angle: number;
}

export class ChatCompletionDto {
  messages: ChatMessage[] = [];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  persona?: string;
  provider?: string;
}

export class TarotReadingDto {
  question: string;
  cards: string[];
  persona?: string;
  provider?: string;
}

export class NatalReadingDto {
  chartData: {
    planets: PlanetData[];
    houses: HouseData[];
    aspects: AspectData[];
  };
  persona?: string;
  provider?: string;
}

export class SynastryReadingDto {
  chartA: PlanetData[];
  chartB: PlanetData[];
  partnerName: string;
  persona?: string;
  provider?: string;
}

export class SwitchProviderDto {
  provider: string;
}
