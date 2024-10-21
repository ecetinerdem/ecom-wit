import React from 'react'

import TeamPage from '@/pages/TeamPage'
import BrandsText from '../components/BrandsText'
import BannerAbout from '@/components/BannerAbout'
import AboutSeperator from '@/utils/AboutSeperator'
import StatsSeperator from '@/utils/StatSeperator'
import VideoPlayer from '@/components/VideoPlayer'



function AboutPageContent() {
  return (
    <div>
        <BannerAbout />
        <AboutSeperator />
        <StatsSeperator />
        <VideoPlayer />
        <TeamPage />
        <BrandsText />
    </div>
  )
}

export default AboutPageContent