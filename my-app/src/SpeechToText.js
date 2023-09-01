import React, { useState, useEffect } from 'react';
import { Robot } from './robot';

const SpeechToTextApp = () => {
  const [commands, setCommands] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState('webkitSpeechRecognition' in window);

  const recognition = new window.webkitSpeechRecognition();
  const robot = new Robot();
 
  const StopCurio = () => {
    console.log('Stop button clicked');
    setIsListening(false);
    robot.stop();
    recognition.stop();
  };

  useEffect(() => {
    var commandsLength = 0;
    if (isListening) {
      recognition.continuous = true;
      recognition.interimResults = true;
  
      recognition.onresult = event => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('//');
        const transcriptx = transcript.split("//");
        
        if (transcriptx.length === commandsLength || /^\p{Lu}/u.test(transcriptx[transcriptx.length - 1]) === false) {
          return;
        }
        
        commandsLength = transcriptx.length;
        setCommands([transcript]);
      
        if (transcriptx[transcriptx.length - 1].toLowerCase().includes('stop')) {
          robot.stop();
        } else if (transcriptx[transcriptx.length - 1].toLowerCase().includes('turn right')) {
          robot.right(2100);
        } else if (transcriptx[transcriptx.length - 1].toLowerCase().includes('slight right')) {
          robot.slightright(900);
        } else if (transcriptx[transcriptx.length - 1].toLowerCase().includes('reverse')) {
          robot.back(55000);
        } else if (transcriptx[transcriptx.length - 1].toLowerCase().includes('turn left')) {
          robot.left(2100);
        } else if (transcriptx[transcriptx.length - 1].toLowerCase().includes('slight left')) {
          robot.slightleft(900);
        } else if (transcriptx[transcriptx.length - 1].toLowerCase().includes('go straight')) {  
          robot.forward(55000);
        } else if (transcriptx[transcriptx.length - 1].toLowerCase().includes('turn around')) {  
          robot.turnAround(2100);
        } else if (transcriptx[transcriptx.length - 1].toLowerCase().includes('left u-turn')) {  
          robot.leftu(17250);
        } else if (transcriptx[transcriptx.length - 1].toLowerCase().includes('right u-turn')) {  
          robot.rightu(17250);
        }
        robot.getDistanceTraveled();
    };
    
 

      recognition.onend = () => {
        setIsListening(false);
      };
  
      recognition.start();
    }


  }, [isListening]);
  
  
  

  const handleSpeechStart = () => {
    setIsListening(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Speech to Text Converter</h1>
      {!isSupported ? (
        <p>Speech recognition is not supported in this browser.</p>
      ) : (
        <>
          <div>
            <textarea
              rows="15"
              cols="80"
              readOnly
              value={commands.join('\n')}
              style={{ marginBottom: '20px' }}
            />
          </div>
          <p>
           Please keep the room silent when using the voice controler
          </p>
          {isListening ? (
            <button onClick={StopCurio} disabled={!isSupported}>
              Stop
            </button>
          ) : (
            <button onClick={handleSpeechStart} disabled={!isSupported}>
              Go
            </button>
          )}
         
<div id="updates" style={{ textAlign: 'left' }}>
    <p style={{ textAlign: 'center' }}>Press <b>GO</b> to start.</p>
    <p>
        <b>GO STRAIGHT</b> to keep moving.
        <br />
        <b>TURN RIGHT</b> to make a right turn.
        <br />
        <b> RIGHT U-TURN</b> to make u-turn from right side .
        <br />
        <b>SLIGHT RIGHT</b> to make a slight right turn.
        <br />
        <b>TURN LEFT</b> to make a left turn.
        <br />
        <b> RIGHT U-TURN</b> to make u-turn from right side .
        <br />
        <b>SLIGHT LEFT</b> to make a slight left turn.
        <br />
        <b>REVERSE</b> to go backwards.
        <br />
        <b>TURN AROUND</b> to turn 180 degrees.
        <br />
        <b>STOP</b> to stop.
    </p>
</div>


        </>
      )}
    </div>
  );
};

export default SpeechToTextApp;
