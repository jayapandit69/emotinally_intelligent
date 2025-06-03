import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { detectEmotion, signEmotionData } from '../utils/emotionDetection';
import { EmotionData } from '../types';

interface EmotionDetectorProps {
  onEmotionDetected: (emotionData: EmotionData, signature: string) => void;
  walletAddress: string;
  isConnected: boolean;
}

const EmotionDetector: React.FC<EmotionDetectorProps> = ({
  onEmotionDetected,
  walletAddress,
  isConnected
}) => {
  const [text, setText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [lastEmotion, setLastEmotion] = useState<EmotionData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || !isConnected) return;
    
    setIsProcessing(true);
    
    try {
      // Detect emotion
      const emotionData = await detectEmotion(text);
      setLastEmotion(emotionData);
      
      // Sign the emotion data
      const signature = await signEmotionData(emotionData, walletAddress);
      
      // Pass the emotion data and signature up
      onEmotionDetected(emotionData, signature);
      
      // Clear the input
      setText('');
    } catch (error) {
      console.error('Error detecting emotion:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getEmotionColor = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return 'bg-amber-100 border-amber-400 text-amber-700';
      case 'sad': return 'bg-blue-100 border-blue-400 text-blue-700';
      case 'angry': return 'bg-red-100 border-red-400 text-red-700';
      case 'calm': return 'bg-green-100 border-green-400 text-green-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getEmotionIcon = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'angry': return '😠';
      case 'calm': return '😌';
      default: return '😐';
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Emotion Detection Input</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isConnected 
              ? "Express yourself here... (e.g., 'I'm feeling so happy today!')" 
              : "Please connect your wallet first"}
            className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
            disabled={!isConnected || isProcessing}
          />
          <button
            type="submit"
            disabled={!text.trim() || isProcessing || !isConnected}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
      
      {lastEmotion && (
        <div className={`mt-6 p-4 rounded-lg border ${getEmotionColor(lastEmotion.emotion)}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Detected Emotion:</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl">{getEmotionIcon(lastEmotion.emotion)}</span>
                <span className="capitalize font-semibold">{lastEmotion.emotion}</span>
                <span className="text-sm opacity-70">
                  ({Math.round(lastEmotion.confidence * 100)}% confidence)
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(lastEmotion.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Try expressing different emotions in your text to see how the contract responds.</p>
      </div>
    </div>
  );
};

export default EmotionDetector;