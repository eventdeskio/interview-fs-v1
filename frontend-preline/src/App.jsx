import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Initialize Preline components
    import('preline/dist/preline.js')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Frontend Preline
            </h1>
            
            {/* Preline Button */}
            <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Preline Card */}
          <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800">
              Welcome to Preline UI
            </h3>
            <p className="mt-2 text-gray-500">
              This is a sample application using Preline components instead of daisyUI.
            </p>
            <div className="mt-3">
              <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                Learn More
              </button>
            </div>
          </div>

          {/* Preline Alert */}
          <div className="mt-6 bg-blue-50 border border-blue-200 text-sm text-blue-800 rounded-lg p-4" role="alert">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div className="ms-3">
                <h3 className="text-sm font-semibold">
                  Successfully migrated from daisyUI to Preline!
                </h3>
                <p className="mt-1 text-sm text-blue-700">
                  Your application is now using Preline components.
                </p>
              </div>
            </div>
          </div>

          {/* Preline Form */}
          <div className="mt-6 max-w-sm">
            <label htmlFor="input-label" className="block text-sm font-medium mb-2">Email</label>
            <input type="email" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="you@site.com" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App