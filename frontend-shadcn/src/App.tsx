import { useState } from 'react';
import { Button } from '@/components/ui/button';

function App() {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    const res = await fetch('/api/message');
    const text = await res.text();
    setMessage(text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Button onClick={fetchMessage} size="lg">
        Get Welcome Message
      </Button>
      {message && (
        <div className="text-lg font-bold text-center">
          {message}
        </div>
      )}
    </div>
  );
}

export default App;