import { useState } from "react";
import { Button } from "react-daisyui";
import LoginPage from "./pages/Login";

function App() {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    const res = await fetch("/api/message");
    const text = await res.text();
    setMessage(text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="text-lg font-bold">{message}</div>
      <LoginPage />
    </div>
  );
}

export default App;
