import LoginPage from "./pages/Login";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="text-lg font-bold">Welcome to Event Desk</div>
      <LoginPage />
    </div>
  );
}

export default App;
