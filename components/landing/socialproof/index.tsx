import React from 'react'

function SocialProof() {
  const companies = [
    { name: 'ACME', logo: 'ACME' },
    { name: 'Sphere', logo: '● Sphere' },
    { name: 'NEXUS', logo: 'NEXUS' },
    { name: 'Vantage', logo: 'Vantage.' },
    { name: 'HORIZON', logo: 'HORIZON' }
  ]

  return (
    <section className='py-12 border-y border-white/5 bg-black/20'>
      <div className='max-w-6xl mx-auto px-6 text-center'>
        <p className='text-xs font-medium text-zinc-500 uppercase tracking-widest mb-8'>
          Trusted by modern product teams
        </p>
        <div className='flex items-center justify-center gap-12 flex-wrap'>
          {companies.map((company, index) => (
            <div 
              key={index} 
              className='text-zinc-600 font-medium text-lg tracking-wide'
              style={{ 
                fontFamily: company.name === 'Vantage' ? 'serif' : 'inherit',
                fontStyle: company.name === 'Vantage' ? 'italic' : 'normal'
              }}
            >
              {company.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof