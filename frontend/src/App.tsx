import { useState } from 'react';
import { Button, Input } from 'react-daisyui';

function App() {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      localStorage.setItem('authToken', data.token);
      setMessage(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const callProcted = async () => {
    try {
      const res = await fetch('/api/protected', {
        method: 'GET',
        headers: {
          authorization: localStorage.getItem('authToken') || '',
        },
      });
      const data = await res.json();
      console.log(data);
      console.log('protected');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <Input
        type='email'
        placeholder='Email'
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Input
        type='password'
        placeholder='Password'
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <Button color='primary' onClick={handleLogin}>
        Login
      </Button>
      <Button color='primary' onClick={callProcted}>
        Call Procted
      </Button>
      {message && <div className='text-lg font-bold'>{message}</div>}
    </div>
  );
}

export default App;
