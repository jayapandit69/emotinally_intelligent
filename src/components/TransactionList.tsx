import React from 'react';
import { Transaction } from '../types';
import { ArrowRight, CheckCircle, XCircle, Clock } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  // Sort transactions by timestamp, most recent first
  const sortedTransactions = [...transactions].sort((a, b) => b.timestamp - a.timestamp);

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-600" />;
      default: return null;
    }
  };

  const getEmotionColor = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return 'bg-amber-100 text-amber-800';
      case 'sad': return 'bg-blue-100 text-blue-800';
      case 'angry': return 'bg-red-100 text-red-800';
      case 'calm': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Blockchain Transactions</h2>
        <p className="text-gray-500">No transactions yet. Process emotions on contracts to see transactions here.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Blockchain Transactions</h2>
      
      <div className="space-y-3">
        {sortedTransactions.map((tx) => (
          <div 
            key={tx.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-indigo-700">{tx.action}</div>
              <div className="flex items-center gap-1.5">
                {getStatusIcon(tx.status)}
                <span className="text-sm capitalize">{tx.status}</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mb-3">
              TX: {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 8)}
            </div>
            
            {tx.emotionData && (
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm">Emotion:</div>
                <div className={`px-2 py-0.5 rounded-md text-xs font-medium capitalize ${getEmotionColor(tx.emotionData.emotion)}`}>
                  {tx.emotionData.emotion}
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <div className="text-sm">Contract:</div>
                <div className="text-xs font-medium">{tx.contractId.substring(0, 8)}...</div>
              </div>
            )}
            
            <div className="text-xs text-gray-500">
              {new Date(tx.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;