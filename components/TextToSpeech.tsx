import React, { useState } from 'react';

interface TextToSpeechProps {
  text: string; // Only need the text prop
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const token = '4bd79c39-9422-4129-bb29-ffdc444fa6c5'; // Fixed token
  const speed = 1;       // Fixed speed
  const voiceId = 'pita'; // Fixed voice ID

  const synthesizeSpeech = async () => {
    const apiUrl = 'https://api.papareo.io/reo/synthesize';
    
    const body = JSON.stringify({
      text: text,
      speed: speed,
      response_type: 'url',
      voice_id: voiceId,
    });

    console.log('Sending request to API with body:', body);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });

      console.log('API response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('API response data:', data);
        
        if (data.url) {
          console.log('Audio URL:', data.url);
          setAudioUrl(data.url); // Set the audio URL for playback
        } else {
          console.error('No audio URL returned in the response.');
          setAudioUrl(null);
        }
      } else {
        console.error('Error synthesizing speech:', response.statusText);
        setAudioUrl(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setAudioUrl(null);
    }
  };

  return (
    <div>
      <button onClick={synthesizeSpeech}>Generate Speech</button>
      {audioUrl && (
        <div>
          <h2>Audio Output</h2>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
