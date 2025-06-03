import { Contract, EmotionData, Transaction, Emotion } from '../types';

/**
 * Simulates sending emotion data to a blockchain contract
 */
export const processEmotionOnContract = async (
  contractId: string, 
  emotionData: EmotionData,
  walletAddress: string,
  contracts: Contract[]
): Promise<{ updatedContract: Contract, transaction: Transaction }> => {
  // Find the target contract
  const contract = contracts.find(c => c.id === contractId);
  if (!contract) {
    throw new Error(`Contract with ID ${contractId} not found`);
  }
  
  // Create transaction
  const transaction: Transaction = {
    id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    hash: `0x${Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')}`,
    timestamp: Date.now(),
    contractId,
    action: 'processEmotion',
    emotionData,
    status: 'pending'
  };
  
  // Clone the contract to avoid mutation
  const updatedContract = { ...contract };
  
  // Check contract conditions
  const relevantCondition = contract.conditions.find(
    c => c.emotion === emotionData.emotion
  );
  
  let newState = contract.state;
  let actionTaken = 'No action';
  
  if (relevantCondition) {
    // Apply condition based on contract type
    switch (contract.type) {
      case 'relationship':
        if (emotionData.emotion === 'angry' && contract.state === 'active') {
          newState = 'paused';
          actionTaken = 'Contract paused due to anger detected';
        } else if (emotionData.emotion === 'calm' && contract.state === 'paused') {
          newState = 'active';
          actionTaken = 'Contract resumed due to calmness detected';
        }
        break;
        
      case 'mental-health':
        if (emotionData.emotion === 'sad' && contract.state === 'active') {
          newState = 'alerted';
          actionTaken = 'Support alert triggered due to sadness detected';
        } else if (emotionData.emotion === 'happy' && contract.state === 'alerted') {
          newState = 'active';
          actionTaken = 'Alert cleared due to happiness detected';
        }
        break;
        
      case 'freelance':
        if (emotionData.emotion === 'calm' && contract.state === 'active') {
          // In a real scenario, we'd check if all parties are calm
          newState = 'completed';
          actionTaken = 'Payment approved due to calm state detected';
        }
        break;
        
      default:
        actionTaken = 'Contract processed emotion with no state change';
    }
  }
  
  // Update contract state
  updatedContract.state = newState;
  
  // Add to history
  updatedContract.history = [
    ...updatedContract.history,
    {
      timestamp: Date.now(),
      action: actionTaken,
      emotion: emotionData.emotion,
      party: walletAddress,
      txHash: transaction.hash
    }
  ];
  
  // Simulate blockchain delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Update transaction status
  transaction.status = 'confirmed';
  
  return { updatedContract, transaction };
};

/**
 * Creates a new contract on the blockchain
 */
export const createContract = async (
  name: string,
  description: string,
  type: Contract['type'],
  parties: string[],
  conditions: Contract['conditions']
): Promise<Contract> => {
  // Simulate blockchain delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const contract: Contract = {
    id: `contract-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name,
    description,
    type,
    state: 'active',
    parties,
    conditions,
    history: [
      {
        timestamp: Date.now(),
        action: 'Contract created',
        txHash: `0x${Array.from({length: 64}, () => 
          Math.floor(Math.random() * 16).toString(16)).join('')}`
      }
    ]
  };
  
  return contract;
};

/**
 * Gets the appropriate action for an emotion based on contract type
 */
export const getActionForEmotion = (emotion: Emotion, contractType: Contract['type']): string => {
  switch (contractType) {
    case 'relationship':
      if (emotion === 'angry') return 'Pause contract';
      if (emotion === 'calm') return 'Continue contract';
      if (emotion === 'happy') return 'Continue contract';
      return 'No action';
      
    case 'mental-health':
      if (emotion === 'sad') return 'Alert support';
      if (emotion === 'happy') return 'Clear alerts';
      return 'No action';
      
    case 'freelance':
      if (emotion === 'calm') return 'Approve payment';
      if (emotion === 'angry') return 'Hold payment';
      return 'No action';
      
    default:
      return 'No action';
  }
};