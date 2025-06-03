import React, { useState, useEffect } from 'react';
import { Contract, EmotionData, Transaction, User } from '../types';
import EmotionDetector from './EmotionDetector';
import ContractDisplay from './ContractDisplay';
import WalletConnect from './WalletConnect';
import EmotionHistory from './EmotionHistory';
import TransactionList from './TransactionList';
import { processEmotionOnContract } from '../utils/blockchain';
import { Brain } from 'lucide-react';

// Demo data
const demoUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  avatar: ''
};

const demoContracts: Contract[] = [
  {
    id: 'contract-1',
    name: 'Relationship Agreement',
    description: 'A contract that pauses when either party is angry, and continues when calm.',
    type: 'relationship',
    state: 'active',
    parties: [
      '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
    ],
    conditions: [
      { emotion: 'angry', action: 'pause' },
      { emotion: 'calm', action: 'continue' }
    ],
    history: [
      {
        timestamp: Date.now() - 86400000, // 1 day ago
        action: 'Contract created',
        txHash: '0x7c3ea01fc562aac8a3d25dd3ab2c9136f9791d3000f6271cca76263889657e5e'
      }
    ]
  },
  {
    id: 'contract-2',
    name: 'Mental Health Support',
    description: 'Alerts support system when sadness is detected, clears alerts when happiness is detected.',
    type: 'mental-health',
    state: 'active',
    parties: [
      '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      '0x9e4c14403d7d9a499dc5d361c212c2f3e7eabd61'
    ],
    conditions: [
      { emotion: 'sad', action: 'alert' },
      { emotion: 'happy', action: 'continue' }
    ],
    history: [
      {
        timestamp: Date.now() - 172800000, // 2 days ago
        action: 'Contract created',
        txHash: '0x29a75b9f332f6e61c45d2a350a3e8b052ee54b8b774bd47e3e11f716e9eccc7d'
      }
    ]
  },
  {
    id: 'contract-3',
    name: 'Freelance Payment',
    description: 'Approves payment when both parties are in a calm state.',
    type: 'freelance',
    state: 'active',
    parties: [
      '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      '0xdac17f958d2ee523a2206206994597c13d831ec7'
    ],
    conditions: [
      { emotion: 'calm', action: 'payout' },
      { emotion: 'angry', action: 'pause' }
    ],
    history: [
      {
        timestamp: Date.now() - 259200000, // 3 days ago
        action: 'Contract created',
        txHash: '0x83f27026219260952bc595008dd7156e054a8e6833aa5cf0705e4af7e9a76d98'
      }
    ]
  }
];

const EmotionContractDemo: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContractId, setSelectedContractId] = useState<string>('');
  const [emotions, setEmotions] = useState<EmotionData[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Initialize with demo data when wallet connects
  useEffect(() => {
    if (isWalletConnected) {
      setContracts(demoContracts);
      setSelectedContractId(demoContracts[0].id);
      setUserName(demoUser.name);
    } else {
      setContracts([]);
      setSelectedContractId('');
      setUserName('');
      setEmotions([]);
      setTransactions([]);
    }
  }, [isWalletConnected]);

  const handleConnectWallet = () => {
    // In a real app, this would connect to an actual wallet
    setIsWalletConnected(true);
    setWalletAddress(demoUser.walletAddress);
  };

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
  };

  const handleEmotionDetected = (emotionData: EmotionData, signature: string) => {
    // Add to emotions history
    setEmotions((prev) => [...prev, emotionData]);
    
    // If a contract is selected, automatically process it
    if (selectedContractId) {
      handleProcessEmotion(selectedContractId, emotionData);
    }
  };

  const handleProcessEmotion = async (contractId: string, emotionData?: EmotionData) => {
    if (!isWalletConnected || isProcessing) return;
    
    setIsProcessing(true);
    
    // Use the latest emotion if none provided
    const emotionToProcess = emotionData || (emotions.length > 0 
      ? emotions[emotions.length - 1] 
      : null);
    
    if (!emotionToProcess) {
      setIsProcessing(false);
      return;
    }
    
    try {
      // Process the emotion on the contract
      const { updatedContract, transaction } = await processEmotionOnContract(
        contractId,
        emotionToProcess,
        walletAddress,
        contracts
      );
      
      // Update the contract
      setContracts((prev) => 
        prev.map((c) => c.id === updatedContract.id ? updatedContract : c)
      );
      
      // Add the transaction
      setTransactions((prev) => [...prev, transaction]);
      
    } catch (error) {
      console.error('Error processing emotion on contract:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedContract = contracts.find((c) => c.id === selectedContractId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">Emotion<span className="text-indigo-600">Chain</span></h1>
            </div>
            
            <WalletConnect
              isConnected={isWalletConnected}
              walletAddress={walletAddress}
              onConnect={handleConnectWallet}
              onDisconnect={handleDisconnectWallet}
              userName={userName}
            />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isWalletConnected ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <EmotionDetector
                onEmotionDetected={handleEmotionDetected}
                walletAddress={walletAddress}
                isConnected={isWalletConnected}
              />
              
              {selectedContract && (
                <ContractDisplay
                  contract={selectedContract}
                  onProcess={(contractId) => {
                    setSelectedContractId(contractId);
                    if (emotions.length > 0) {
                      handleProcessEmotion(contractId);
                    }
                  }}
                />
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <EmotionHistory emotions={emotions} />
              <TransactionList transactions={transactions} />
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Available Contracts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contracts.map((contract) => (
                  <div
                    key={contract.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedContractId === contract.id
                        ? 'border-indigo-500 bg-indigo-50 shadow-md'
                        : 'border-gray-200 hover:border-indigo-300 bg-white'
                    }`}
                    onClick={() => setSelectedContractId(contract.id)}
                  >
                    <h3 className="font-medium">{contract.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{contract.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${
                        contract.state === 'active' ? 'bg-green-100 text-green-800' :
                        contract.state === 'paused' ? 'bg-amber-100 text-amber-800' :
                        contract.state === 'alerted' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {contract.state}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">{contract.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <Brain className="w-16 h-16 text-indigo-600 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to EmotionChain</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Experience how emotions can directly influence blockchain contracts in real-time.
            </p>
            
            <button
              onClick={handleConnectWallet}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
            >
              Connect Wallet to Begin
            </button>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-lg mb-3">Relationship Contracts</h3>
                <p className="text-gray-600">Automatically pause agreements when anger is detected, ensuring discussions happen in a calm state.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-lg mb-3">Mental Health Support</h3>
                <p className="text-gray-600">Trigger support systems when sadness is detected, ensuring timely intervention when needed.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-lg mb-3">Freelance Payments</h3>
                <p className="text-gray-600">Only execute payments when both parties are in a calm state, reducing dispute probability.</p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>EmotionChain &copy; 2025 - Blockchain contracts that respond to human emotions</p>
        </div>
      </footer>
    </div>
  );
};

export default EmotionContractDemo;