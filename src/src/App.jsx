import React, { useState, useEffect } from 'react';
import { Wallet, Send, ArrowDownLeft, ArrowUpRight, Settings, Shield, Globe, Copy, Eye, EyeOff, RefreshCw, Plus, Minus, QrCode, Smartphone, CreditCard, TrendingUp, History, Lock, Unlock, Network, Zap } from 'lucide-react';

const USDTWALLET = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedNetwork, setSelectedNetwork] = useState('nexora');
  const [balance, setBalance] = useState(15432.89);
  const [isConnected, setIsConnected] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'received', amount: 500, network: 'nexora', hash: '0x742d35...', time: '2 min ago', status: 'confirmed' },
    { id: 2, type: 'sent', amount: 250, network: 'ethereum', hash: '0x8f3c21...', time: '1 hora ago', status: 'confirmed' },
    { id: 3, type: 'received', amount: 1000, network: 'tron', hash: '0x9d4f67...', time: '3 horas ago', status: 'pending' },
    { id: 4, type: 'sent', amount: 75, network: 'bsc', hash: '0x1a5b89...', time: '1 día ago', status: 'confirmed' }
  ]);

  const [sendForm, setSendForm] = useState({
    recipient: '',
    amount: '',
    network: 'nexora',
    gasPrice: 'standard'
  });

  const networks = [
    { id: 'nexora', name: 'Nexora Network', color: 'from-purple-500 to-pink-500', icon: '🚀', fee: '0.01' },
    { id: 'ethereum', name: 'Ethereum', color: 'from-blue-500 to-indigo-500', icon: '⟐', fee: '0.02' },
    { id: 'tron', name: 'Tron', color: 'from-red-500 to-red-600', icon: '⚡', fee: '0.001' },
    { id: 'bsc', name: 'BSC', color: 'from-yellow-500 to-orange-500', icon: '🔶', fee: '0.005' },
    { id: 'polygon', name: 'Polygon', color: 'from-purple-600 to-blue-500', icon: '🟣', fee: '0.003' },
    { id: 'arbitrum', name: 'Arbitrum', color: 'from-blue-400 to-cyan-400', icon: '🔵', fee: '0.001' }
  ];

  const connectWallet = () => {
    setIsConnected(true);
    // Simulación de conexión
  };

  const disconnectWallet = () => {
    setIsConnected(false);
  };

  const handleSend = () => {
    if (sendForm.recipient && sendForm.amount) {
      const newTransaction = {
        id: transactions.length + 1,
        type: 'sent',
        amount: parseFloat(sendForm.amount),
        network: sendForm.network,
        hash: `0x${Math.random().toString(16).substr(2, 8)}...`,
        time: 'Ahora',
        status: 'pending'
      };
      setTransactions([newTransaction, ...transactions]);
      setBalance(balance - parseFloat(sendForm.amount));
      setSendForm({ recipient: '', amount: '', network: 'nexora', gasPrice: 'standard' });
    }
  };

  const NetworkSelector = () => (
    <div className="bg-gray-800 rounded-xl p-4 mb-6">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Network className="w-5 h-5" />
        Seleccionar Red
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {networks.map(network => (
          <button
            key={network.id}
            onClick={() => setSelectedNetwork(network.id)}
            className={`p-3 rounded-lg transition-all duration-200 border-2 ${
              selectedNetwork === network.id 
                ? 'border-blue-500 bg-blue-500/20' 
                : 'border-gray-600 bg-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{network.icon}</span>
              <div className="text-left">
                <div className="text-white font-medium text-sm">{network.name}</div>
                <div className="text-gray-400 text-xs">Fee: {network.fee} USDT</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const HomeTab = () => (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-medium opacity-90">Balance Total</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-bold">${balance.toLocaleString()}</span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">USDT</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-75">Red Activa</div>
            <div className="font-semibold">{networks.find(n => n.id === selectedNetwork)?.name}</div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => setActiveTab('send')}
            className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center justify-center gap-2 hover:bg-white/30 transition-all"
          >
            <ArrowUpRight className="w-5 h-5" />
            Enviar
          </button>
          <button 
            onClick={() => setActiveTab('receive')}
            className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center justify-center gap-2 hover:bg-white/30 transition-all"
          >
            <ArrowDownLeft className="w-5 h-5" />
            Recibir
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-xl p-3 hover:bg-white/30 transition-all">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <NetworkSelector />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-gray-800 rounded-xl p-4 text-left hover:bg-gray-700 transition-all">
          <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
          <div className="text-white font-medium">Trading</div>
          <div className="text-gray-400 text-sm">Intercambiar tokens</div>
        </button>
        <button className="bg-gray-800 rounded-xl p-4 text-left hover:bg-gray-700 transition-all">
          <Zap className="w-6 h-6 text-yellow-500 mb-2" />
          <div className="text-white font-medium">Staking</div>
          <div className="text-gray-400 text-sm">Generar rewards</div>
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold">Transacciones Recientes</h3>
          <button 
            onClick={() => setActiveTab('history')}
            className="text-blue-400 text-sm hover:text-blue-300"
          >
            Ver todas
          </button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 3).map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'received' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  {tx.type === 'received' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-white font-medium">
                    {tx.type === 'received' ? '+' : '-'}${tx.amount}
                  </div>
                  <div className="text-gray-400 text-sm">{tx.network} • {tx.time}</div>
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                tx.status === 'confirmed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
              }`}>
                {tx.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SendTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-white text-xl font-bold mb-6">Enviar USDT</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">Red de destino</label>
            <select 
              value={sendForm.network}
              onChange={(e) => setSendForm({...sendForm, network: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            >
              {networks.map(network => (
                <option key={network.id} value={network.id}>{network.name} (Fee: {network.fee} USDT)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">Dirección del destinatario</label>
            <div className="relative">
              <input
                type="text"
                value={sendForm.recipient}
                onChange={(e) => setSendForm({...sendForm, recipient: e.target.value})}
                placeholder="0x... o dirección de la red seleccionada"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white focus:border-blue-500 focus:outline-none"
              />
              <button className="absolute right-3 top-3 text-gray-400 hover:text-white">
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">Cantidad</label>
            <div className="relative">
              <input
                type="number"
                value={sendForm.amount}
                onChange={(e) => setSendForm({...sendForm, amount: e.target.value})}
                placeholder="0.00"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-16 text-white focus:border-blue-500 focus:outline-none"
              />
              <span className="absolute right-4 top-3 text-gray-400">USDT</span>
            </div>
            <div className="text-gray-400 text-sm mt-1">
              Balance disponible: ${balance.toLocaleString()} USDT
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">Velocidad de transacción</label>
            <div className="grid grid-cols-3 gap-3">
              {['slow', 'standard', 'fast'].map(speed => (
                <button
                  key={speed}
                  onClick={() => setSendForm({...sendForm, gasPrice: speed})}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    sendForm.gasPrice === speed 
                      ? 'border-blue-500 bg-blue-500/20' 
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="text-white font-medium capitalize">{speed}</div>
                  <div className="text-gray-400 text-xs">
                    {speed === 'slow' ? '~5 min' : speed === 'standard' ? '~2 min' : '~30 seg'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleSend}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Enviar Transacción
          </button>
        </div>
      </div>
    </div>
  );

  const ReceiveTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-white text-xl font-bold mb-6">Recibir USDT</h2>
        
        <NetworkSelector />

        <div className="text-center">
          <div className="bg-white p-6 rounded-xl mb-4 inline-block">
            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            <div className="text-gray-300 text-sm mb-2">Tu dirección en {networks.find(n => n.id === selectedNetwork)?.name}:</div>
            <div className="text-white font-mono text-sm break-all">
              0x742d35Cc6B5aA5C1A4E6b8d7F9e2A8b3C4d5E6f7G8h9
            </div>
            <button className="mt-2 text-blue-400 hover:text-blue-300 flex items-center gap-1 mx-auto">
              <Copy className="w-4 h-4" />
              Copiar dirección
            </button>
          </div>

          <div className="text-gray-400 text-sm">
            Solo envía USDT en la red {networks.find(n => n.id === selectedNetwork)?.name} a esta dirección.
            Enviar otros tokens puede resultar en pérdida permanente.
          </div>
        </div>
      </div>
    </div>
  );

  const HistoryTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-white text-xl font-bold mb-6">Historial de Transacciones</h2>
        
        <div className="space-y-3">
          {transactions.map(tx => (
            <div key={tx.id} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'received' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                    {tx.type === 'received' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {tx.type === 'received' ? 'Recibido' : 'Enviado'}
                    </div>
                    <div className="text-gray-400 text-sm">{tx.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${tx.type === 'received' ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.type === 'received' ? '+' : '-'}${tx.amount}
                  </div>
                  <div className="text-gray-400 text-sm">{tx.network}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400 font-mono">{tx.hash}</div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  tx.status === 'confirmed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {tx.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-white text-xl font-bold mb-6">Configuración de Wallet</h2>
        
        <div className="space-y-6">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isConnected ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {isConnected ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-white font-medium">Estado de Conexión</div>
                <div className="text-gray-400 text-sm">
                  {isConnected ? 'Wallet conectada' : 'Wallet desconectada'}
                </div>
              </div>
            </div>
            <button
              onClick={isConnected ? disconnectWallet : connectWallet}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isConnected 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isConnected ? 'Desconectar' : 'Conectar'}
            </button>
          </div>

          {/* Security Settings */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Seguridad
            </h3>
            
            <div className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-white font-medium">Clave Privada</div>
                  <div className="text-gray-400 text-sm">Mantén segura tu clave privada</div>
                </div>
                <button
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {showPrivateKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {showPrivateKey && (
                <div className="bg-gray-800 p-3 rounded border border-yellow-500">
                  <div className="text-yellow-500 text-xs mb-2 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    CONFIDENCIAL - No compartir
                  </div>
                  <div className="text-white font-mono text-sm break-all">
                    0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5
                  </div>
                  <button className="mt-2 text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm">
                    <Copy className="w-4 h-4" />
                    Copiar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Network Settings */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Configuración de Red
            </h3>
            
            <div className="space-y-3">
              {networks.map(network => (
                <div key={network.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{network.icon}</span>
                    <div>
                      <div className="text-white font-medium">{network.name}</div>
                      <div className="text-gray-400 text-sm">Fee: {network.fee} USDT</div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    selectedNetwork === network.id ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* App Settings */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Configuración de la App</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <div className="text-white font-medium">Notificaciones</div>
                  <div className="text-gray-400 text-sm">Recibir alertas de transacciones</div>
           
