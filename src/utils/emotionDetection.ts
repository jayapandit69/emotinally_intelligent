import { Emotion, EmotionData } from '../types';

// In a real implementation, this would use a proper emotion detection model
// For this demo, we'll simulate emotion detection

const EMOTIONS: Emotion[] = ['happy', 'sad', 'angry', 'calm', 'neutral'];

/**
 * Analyzes text input and returns detected emotion
 * This is a simplified simulation - in production this would use a proper AI model
 */
export const detectEmotion = async (text: string): Promise<EmotionData> => {
  // Simple keyword-based detection for demo purposes
  const lowerText = text.toLowerCase();
  
  const emotionKeywords = {
    happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'love', 'like', ':)', '😊', '😁'],
    sad: ['sad', 'unhappy', 'depressed', 'down', 'miserable', 'sorry', ':(', '😢', '😭'],
    angry: ['angry', 'mad', 'furious', 'annoyed', 'upset', 'hate', 'dislike', 'frustrated', '😠', '😡'],
    calm: ['calm', 'peaceful', 'relaxed', 'content', 'satisfied', 'okay', 'fine', 'good', '😌'],
    neutral: ['neutral', 'indifferent', 'whatever', 'ok', 'alright', '😐'],
  };

  // Check for each emotion keyword
  let detectedEmotion: Emotion = 'neutral';
  let highestCount = 0;
  
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    const count = keywords.filter(keyword => lowerText.includes(keyword)).length;
    if (count > highestCount) {
      highestCount = count;
      detectedEmotion = emotion as Emotion;
    }
  });
  
  // If no keywords matched strongly, use more sophisticated analysis
  // This simulates more complex NLP that would be used in production
  if (highestCount === 0) {
    // For simulation, analyze sentence structure and length
    if (text.includes('!')) {
      if (text.length < 20) detectedEmotion = 'happy';
      else detectedEmotion = 'angry';
    } else if (text.includes('?')) {
      detectedEmotion = 'neutral';
    } else if (text.length < 10) {
      detectedEmotion = 'neutral';
    } else if (text.split(' ').length > 15) {
      detectedEmotion = 'calm';
    }
  }
  
  // Simulate confidence score
  const confidence = Math.min(0.5 + (highestCount * 0.1) + Math.random() * 0.3, 0.98);
  
  // Simulate processing delay for realism
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return {
    emotion: detectedEmotion,
    confidence,
    timestamp: Date.now()
  };
};

/**
 * Simulates signing the emotion data with a wallet
 */
export const signEmotionData = async (data: EmotionData, walletAddress: string): Promise<string> => {
  // In production, this would use actual wallet signing
  // For this demo, we'll create a mock signature
  const mockSignature = `0x${Array.from({length: 64}, () => 
    Math.floor(Math.random() * 16).toString(16)).join('')}`;
  
  // Simulate signing delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockSignature;
};