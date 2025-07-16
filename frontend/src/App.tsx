import { useState } from 'react';
import { Button } from 'react-daisyui';


function App() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [msg, setMsg] = useState('');
  const fetchMessage = async () => {
    const res = await fetch('/api/message');
    const text = await res.text();
    setMessage(text);
  };

  const login = async () =>{
    const res = await fetch('/api/login');
    const data = await res.json();
    
  } 

  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();

    console.log(username, password)

    try {
      const res = await fetch('/api/login', {method:"POST", headers:{"Content-Type" :"application/json"}, body:JSON.stringify({username, password})});
      const data = await res.json();
      setSuccess(data.message);
      console.log(data.token)

      localStorage.setItem("token",data.token);
    } catch (error) {
      
    }


  }

  const handleClick = async () =>{
    try {
      const res = await fetch('/api/protected', {method:"GET", headers:{"authorization" :`Bearer ${localStorage.getItem("token")}`}});
      const data = await res.json();
      setMsg(data.message);

      localStorage.setItem("token",data.token);
    } catch (error) {
      
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Button color="primary" onClick={fetchMessage}>
        Get Welcome Message
      </Button>
      {message && <div className="text-lg font-bold">{message}</div>}

      <form onSubmit={handleSubmit}>
        <p>Username</p>
        <input type="text"  value={username} onChange={(e) => setUsername(e.target.value)} />
        <br></br>
        <p>Password</p>
        <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
        <br></br>
        <button type="submit">Submit</button>
        <p>{success}</p>
      </form>

      <button onClick={handleClick}>Call</button>
      <p>{msg}</p>
    </div>
  );
}

export default App;

