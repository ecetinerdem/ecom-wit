import React from 'react'


import BrandsText from '../components/BrandsText'
import BannerAbout from '@/components/BannerAbout'
import AboutSeperator from '@/utils/AboutSeperator'
import StatsSeperator from '@/utils/StatSeperator'
import VideoPlayer from '@/components/VideoPlayer'
import BannerAboutTwo from '@/components/BannerAboutTwo'
import TeamContent from './TeamContent'



function AboutPageContent() {
  return (
    <div>
        <BannerAbout />
        <AboutSeperator />
        <StatsSeperator />
        <VideoPlayer />
        <TeamContent />
        <BrandsText />
        <BannerAboutTwo />
    </div>
  )
}

export default AboutPageContent