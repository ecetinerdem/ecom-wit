import React from 'react'

import TeamPage from '@/pages/TeamPage'
import BrandsText from '../components/BrandsText'
import BannerAbout from '@/components/BannerAbout'



function AboutPageContent() {
  return (
    <div>
        <BannerAbout />
        <TeamPage />
        <BrandsText />
    </div>
  )
}

export default AboutPageContent