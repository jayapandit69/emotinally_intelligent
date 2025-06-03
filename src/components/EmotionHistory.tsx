import React from 'react';
import { EmotionData } from '../types';

interface EmotionHistoryProps {
  emotions: EmotionData[];
}

const EmotionHistory: React.FC<EmotionHistoryProps> = ({ emotions }) => {
  // Sort emotions by timestamp, most recent first
  const sortedEmotions = [...emotions].sort((a, b) => b.timestamp - a.timestamp);

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return 'bg-amber-100 border-amber-300 text-amber-700';
      case 'sad': return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'angry': return 'bg-red-100 border-red-300 text-red-700';
      case 'calm': return 'bg-green-100 border-green-300 text-green-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'angry': return '😠';
      case 'calm': return '😌';
      default: return '😐';
    }
  };

  if (emotions.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Emotion History</h2>
        <p className="text-gray-500">No emotions detected yet. Try expressing yourself in the input field.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Emotion History</h2>
      
      <div className="space-y-3">
        {sortedEmotions.map((emotion, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg border ${getEmotionColor(emotion.emotion)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getEmotionIcon(emotion.emotion)}</span>
                <div>
                  <div className="font-medium capitalize">{emotion.emotion}</div>
                  <div className="text-xs">
                    {Math.round(emotion.confidence * 100)}% confidence
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {new Date(emotion.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionHistory;