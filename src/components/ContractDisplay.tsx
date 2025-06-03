import React from 'react';
import { Contract } from '../types';
import { getActionForEmotion } from '../utils/blockchain';
import { Clock, AlertTriangle, CheckCircle2, PauseCircle } from 'lucide-react';

interface ContractDisplayProps {
  contract: Contract;
  onProcess: (contractId: string) => void;
}

const ContractDisplay: React.FC<ContractDisplayProps> = ({ contract, onProcess }) => {
  const getStateColor = (state: Contract['state']) => {
    switch (state) {
      case 'active': return 'bg-green-100 text-green-800 border-green-300';
      case 'paused': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'alerted': return 'bg-red-100 text-red-800 border-red-300';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStateIcon = (state: Contract['state']) => {
    switch (state) {
      case 'active': return <CheckCircle2 className="w-5 h-5" />;
      case 'paused': return <PauseCircle className="w-5 h-5" />;
      case 'alerted': return <AlertTriangle className="w-5 h-5" />;
      case 'completed': return <CheckCircle2 className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getConditionItems = () => {
    return contract.conditions.map((condition, index) => (
      <div 
        key={index}
        className="flex items-center gap-2 text-sm p-2 rounded-lg bg-gray-50"
      >
        <div className="flex items-center gap-1.5">
          <span className="font-medium">If</span>
          <span className="capitalize px-2 py-0.5 rounded-md bg-gray-200">
            {condition.emotion}
          </span>
          <span className="font-medium">then</span>
          <span className="capitalize px-2 py-0.5 rounded-md bg-gray-200">
            {condition.action}
          </span>
        </div>
      </div>
    ));
  };

  const getHistoryItems = () => {
    // Show only the 5 most recent history items
    return [...contract.history]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5)
      .map((item, index) => (
        <div key={index} className="border-b border-gray-100 py-2 last:border-0">
          <div className="flex justify-between items-start">
            <div className="text-sm">
              <div className="font-medium">{item.action}</div>
              {item.emotion && (
                <div className="text-xs text-gray-500 mt-0.5">
                  Emotion: <span className="capitalize">{item.emotion}</span>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(item.timestamp).toLocaleTimeString()}
            </div>
          </div>
          {item.txHash && (
            <div className="text-xs text-gray-500 mt-1 truncate">
              TX: {item.txHash.substring(0, 10)}...{item.txHash.substring(item.txHash.length - 8)}
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{contract.name}</h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${getStateColor(contract.state)}`}>
          {getStateIcon(contract.state)}
          <span className="capitalize">{contract.state}</span>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        {contract.description}
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Contract Type</h3>
        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-md capitalize">
          {contract.type}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Conditions</h3>
        <div className="space-y-2">
          {getConditionItems()}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">History</h3>
        <div className="border rounded-lg divide-y">
          {getHistoryItems()}
        </div>
      </div>
      
      <button
        onClick={() => onProcess(contract.id)}
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
      >
        Process Emotion on This Contract
      </button>
    </div>
  );
};

export default ContractDisplay;