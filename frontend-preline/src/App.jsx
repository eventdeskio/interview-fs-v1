import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Initialize Preline components
    import('preline/dist/preline.js')
  }, [])

  const fetchMessage = async () => {
    const res = await fetch('/api/message')
    const text = await res.text()
    setMessage(text)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <button 
        type="button" 
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        onClick={fetchMessage}
      >
        Get Welcome Message
      </button>
      {message && (
        <div className="text-lg font-bold text-center">
          {message}
        </div>
      )}
    </div>
  )
}

export default App