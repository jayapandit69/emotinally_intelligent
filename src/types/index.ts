export type Emotion = 'happy' | 'sad' | 'angry' | 'calm' | 'neutral';

export interface EmotionData {
  emotion: Emotion;
  confidence: number;
  timestamp: number;
}

export interface Contract {
  id: string;
  name: string;
  description: string;
  type: 'relationship' | 'mental-health' | 'freelance';
  state: 'active' | 'paused' | 'alerted' | 'completed';
  parties: string[];
  conditions: {
    emotion: Emotion;
    action: 'pause' | 'alert' | 'continue' | 'payout';
    threshold?: number;
  }[];
  history: {
    timestamp: number;
    action: string;
    emotion?: Emotion;
    party?: string;
    txHash?: string;
  }[];
}

export interface User {
  id: string;
  name: string;
  walletAddress: string;
  avatar: string;
}

export interface Transaction {
  id: string;
  hash: string;
  timestamp: number;
  contractId: string;
  action: string;
  emotionData?: EmotionData;
  status: 'pending' | 'confirmed' | 'failed';
}