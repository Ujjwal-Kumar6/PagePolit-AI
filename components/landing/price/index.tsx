import React from 'react'

function Price() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: '/mo',
      features: [
        '100 conversations/mo',
        '1 Knowledge Source',
        'Community Support'
      ],
      buttonText: 'Start Free',
      buttonStyle: 'bg-transparent border border-white/20 text-white hover:bg-white/10'
    },
    {
      name: 'Popular',
      badge: 'Pro',
      price: '$49',
      period: '/mo',
      features: [
        'unlimited conversations',
        'unlimited Knowledge Sources',
        'Community Support',
        'Custom Branding'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'bg-white text-black hover:bg-white/90',
      isPopular: true
    }
  ]

  return (
    <section id='pricing' className='py-32 px-6 max-w-6xl mx-auto relative'>
      {/* Background glow effects */}
      <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full -z-10'></div>
      <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full -z-10'></div>

      {/* Header */}
      <div className='text-center mb-16'>
        <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
          Fair, usage-based pricing.
        </h2>
        <p className='text-zinc-400 text-lg'>
          Start free, upgrade as you grow
        </p>
      </div>

      {/* Pricing cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`bg-zinc-900/50 border rounded-2xl p-8 ${
              plan.isPopular ? 'border-white/20' : 'border-white/5'
            }`}
          >
            {/* Plan header */}
            <div className='mb-6'>
              <div className='flex items-center gap-2 mb-2'>
                <h3 className='text-zinc-400 text-sm font-medium'>
                  {plan.name}
                </h3>
                {plan.badge && (
                  <span className='bg-white/10 text-white text-xs px-2 py-1 rounded'>
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className='flex items-baseline gap-1'>
                <span className='text-5xl font-bold text-white'>
                  {plan.price}
                </span>
                <span className='text-zinc-500 text-lg'>
                  {plan.period}
                </span>
              </div>
            </div>

            {/* Features list */}
            <ul className='space-y-3 mb-8'>
              {plan.features.map((feature, idx) => (
                <li key={idx} className='flex items-start gap-3 text-zinc-300 text-sm'>
                  <svg 
                    className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' 
                    fill='none' 
                    stroke='currentColor' 
                    viewBox='0 0 24 24'
                  >
                    <path 
                      strokeLinecap='round' 
                      strokeLinejoin='round' 
                      strokeWidth={2} 
                      d='M5 13l4 4L19 7' 
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${plan.buttonStyle}`}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Price