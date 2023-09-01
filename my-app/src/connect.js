import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import DeviceControllere from '@espruino-tools/core';

const ConnectPage = () => {
  const [connectionStatus, setConnectionStatus] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const connectToCurio = async () => {
    const curio = new DeviceControllere();

    try {
      await curio.connect();
      setConnectionStatus('Connected');
      setIsConnected(true);
    } catch (error) {
      setConnectionStatus('Connection Failed');
      console.error('Connection Error:', error);
    }
  };

  const goToNextPage = () => {
    if (isConnected) {
      navigate('/speechToText'); // Use the navigate function to change route
    }
  };

  return (
    <div className="container">
      { <h1>Curio Voice Controller</h1>}
    
      <div className="form-group">
        <button onClick={connectToCurio} id="connect-btn" className="btn btn-primary">
          Connect to Curio
        </button>
      
      <div className="center-container">
        <p id="conn-updates">{connectionStatus}</p>
        
        {isConnected && (
          <div>
            <button onClick={goToNextPage} className="btn btn-secondary">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ConnectPage;
