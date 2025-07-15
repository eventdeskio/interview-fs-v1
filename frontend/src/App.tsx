import { useState } from 'react';
import { Button } from 'react-daisyui';

type RsvpType = {
  yes: number;
  no: number;
  maybe: number;
};

function App() {
  const [message, setMessage] = useState<string>('');
  const [rsvp, setRsvp] = useState<RsvpType | null>(null);

  const fetchMessage = async (): Promise<void> => {
    const res = await fetch('/api/message');
    const text = await res.text();
    setMessage(text);
  };

  const fetchRsvp = async (): Promise<void> => {
    const res = await fetch('/api/rsvp');
    const result: RsvpType = await res.json();
    setRsvp(result);
  };

  const submitRsvp = async (responseType: 'yes' | 'no' | 'maybe'): Promise<void> => {
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response: responseType }),
    });

    if (res.ok) {
      await fetchRsvp();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Button color="primary" onClick={fetchMessage}>
        Get Welcome Message
      </Button>
      {message && <div className="text-lg font-bold">{message}</div>}

      <div className="flex gap-2">
        <Button color="success" onClick={() => submitRsvp('yes')}>
          RSVP Yes
        </Button>
        <Button color="error" onClick={() => submitRsvp('no')}>
          RSVP No
        </Button>
        <Button color="warning" onClick={() => submitRsvp('maybe')}>
          RSVP Maybe
        </Button>
      </div>

      <Button color="secondary" onClick={fetchRsvp}>
        Get RSVP Counts
      </Button>

      {rsvp && (
        <div className="text-center">
          <p> Yes: {rsvp.yes}</p>
          <p> No: {rsvp.no}</p>
          <p> Maybe: {rsvp.maybe}</p>
        </div>
      )}
    </div>
  );
}

export default App;
