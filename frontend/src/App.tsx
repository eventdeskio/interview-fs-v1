import { useState, useEffect } from 'react';
import { Button, Input, Card } from 'react-daisyui';


function App() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [protectedMsg, setProtectedMsg] = useState('');
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | '' }>({ message: '', type: '' });


  const fetchMessage = async () => {
    const res = await fetch('/api/message');
    const text = await res.text();
    setMessage(text);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setToast({ message: '', type: '' });

    console.log(username, password)

    try {
      const res = await fetch('/api/login',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
      const data = await res.json();

      if (!res.ok) {
        setToast({ message: data.message || "Login failed", type: 'error' });
        setUsername("");
        setPassword("");
        return;
      }

      setToast({ message: `Welcome, ${data.username}!`, type: 'success' });
      localStorage.setItem("token", data.token);
      setLoggedIn(true);

    } catch (error) {
      setToast({ message: 'An error occurred during login.', type: 'error' });
      setUsername("");
      setPassword("");
      console.log(error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUsername("");
    setPassword("");

    setProtectedMsg("");
    setToast({ message: 'User logged out successfully!', type: 'info' });
  };

  const handleClick = async () => {
    try {
      const res = await fetch('/api/protected',
        {
          method: "GET",
          headers: { "authorization": `Bearer ${localStorage.getItem("token")}` }
        });
      const data = await res.json();

      if (!res.ok) {
        setToast({ message: data.message, type: 'error' });
        return;
      }

      setProtectedMsg(data.message);
      setToast({ message: data.message, type: 'success' });

    } catch (error) {
      setToast({ message: 'Failed to fetch protected message.', type: 'error' });
      console.log(error)
    }
  }

  // Toast auto-dismiss effect
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Toast component
  const Toast = ({ message, type, onClose }: { message: string; type: string; onClose: () => void }) => (
    message ? (
      <div className={`toast toast-bottom toast-center z-50`}>
        <div className={`alert alert-${type} shadow-lg flex items-center gap-2`}>
          <span>{message}</span>
          <button className="btn btn-sm btn-ghost ml-2" onClick={onClose} aria-label="Close">✕</button>
        </div>
      </div>
    ) : null
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-base-200">
      {/* Toast notification */}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      <Card className="w-full max-w-sm shadow-xl bg-base-100">
        <Card.Body>
          <Button color="primary" className="w-full mb-4" onClick={fetchMessage}>
            Get Welcome Message
          </Button>
          {message && <div className="text-lg font-bold text-center mb-4">{message}</div>}

          {/* Conditionally render login form or logout button */}
          {!loggedIn ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="font-semibold">Username</label>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input input-bordered" placeholder="Enter username" />

              <label className="font-semibold">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered" placeholder="Enter password" />

              <Button type="submit" color="success" className="mt-2">Submit</Button>

              {/* Error message is now shown as toast */}
            </form>
          ) : (
            <div className="flex flex-col items-center gap-3 mt-4">

              {/* Welcome message is now shown as toast */}
              <Button color="error" className="w-full" onClick={handleLogout}>Logout</Button>
            </div>
          )}

          <Button color="secondary" className="w-full mt-6" onClick={handleClick}>Call Protected API</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;

