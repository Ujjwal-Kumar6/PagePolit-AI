import React from 'react'

function Feature() {
  const features = [
    {
      icon: '📊',
      title: 'Knowledge Graph',
      description: 'We crawl your site and docs to build a structured understanding of your product. No manual training required.'
    },
    {
      icon: '🛡️',
      title: 'Strict Guardrails',
      description: 'Define exactly what the AI can and cannot say. It will politely decline out-of-scope questions.'
    },
    {
      icon: '🎯',
      title: 'Tone Matching',
      description: 'Whether you\'re professional, quirky, or concise, the AI mimics your brand voice perfectly.'
    }
  ]

  return (
    <section id='features' className='py-32 px-6 max-w-6xl mx-auto'>
      <div className='text-center mb-16'>
        <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
          Designed for trust.
        </h2>
        <p className='text-zinc-400 text-lg max-w-2xl mx-auto'>
          Most AI support tools hallucinate. Ours is strictly grounded in your content, with a personality you control.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {features.map((feature, index) => (
          <div 
            key={index}
            className='bg-zinc-900/50 border border-white/5 rounded-xl p-8 hover:border-white/10 transition-colors'
          >
            <div className='text-4xl mb-4'>{feature.icon}</div>
            <h3 className='text-white text-xl font-semibold mb-3'>
              {feature.title}
            </h3>
            <p className='text-zinc-400 text-sm leading-relaxed'>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Feature