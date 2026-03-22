import React from 'react'

function Intrigation() {
  const steps = [
    { number: 1, text: 'Scan your documentation URL' },
    { number: 2, text: 'Copy the embed snippet' },
    { number: 3, text: 'Auto-resolve tickets' }
  ]

  return (
    <section id='integration' className='py-32 px-6 max-w-6xl mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
        {/* Left side - Text content */}
        <div>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            Drop-in simplicity.
          </h2>
          <p className='text-zinc-400 text-lg mb-12'>
            No complex SDKs or user syncing. Just add our script tag and you're live. We inherit your CSS variables automatically.
          </p>

          <div className='space-y-6'>
            {steps.map((step) => (
              <div key={step.number} className='flex items-center gap-4'>
                <div className='flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 text-sm font-medium'>
                  {step.number}
                </div>
                <p className='text-zinc-300 text-base'>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Code snippet */}
        <div className='relative'>
          <div className='bg-[#0a0f1e] border border-white/10 rounded-xl p-6 overflow-hidden'>
            {/* Code editor header */}
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-3 h-3 rounded-full bg-red-500'></div>
              <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
              <div className='w-3 h-3 rounded-full bg-green-500'></div>
            </div>

            {/* Code content */}
            <pre className='text-sm font-mono overflow-x-auto'>
              <code className='text-zinc-400'>
                <span className='text-zinc-600'>{'<!-- OneMinute Support --->'}</span>{'\n'}
                <span className='text-purple-400'>{'<script'}</span>{'\n'}
                {'  '}<span className='text-blue-400'>src</span>=<span className='text-green-400'>"https://vybe-ev36.onrender.com"</span>{'\n'}
                {'  '}<span className='text-blue-400'>data-id</span>=<span className='text-green-400'>"01b83d83-18ca-47b0-ba8e-c02d0e3065b5"</span>{'\n'}
                <span className='text-purple-400'>{'defer>'}</span>{'\n'}
                <span className='text-purple-400'>{'</script>'}</span>
              </code>
            </pre>
          </div>

          {/* Glow effect */}
          <div className='absolute -inset-20 bg-blue-500/10 blur-3xl rounded-full -z-10'></div>
        </div>
      </div>
    </section>
  )
}

export default Intrigation