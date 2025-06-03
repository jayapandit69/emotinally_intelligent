import React from 'react';
import { Wallet, User } from 'lucide-react';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string;
  onConnect: () => void;
  onDisconnect: () => void;
  userName: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
  userName
}) => {
  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
            <User className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium">{userName}</span>
          </div>
          
          <div className="flex items-center gap-2 bg-indigo-100 px-3 py-1.5 rounded-full">
            <Wallet className="w-4 h-4 text-indigo-700" />
            <span className="text-sm font-medium text-indigo-700">
              {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
            </span>
          </div>
          
          <button
            onClick={onDisconnect}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={onConnect}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Wallet className="w-5 h-5" />
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;