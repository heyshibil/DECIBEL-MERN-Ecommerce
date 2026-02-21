import React from 'react'
import SubHead from './SubHead'
import FeatureCard from './FeatureCard'
import { MdOutlineShield } from "react-icons/md";
import { LuTruck } from "react-icons/lu";
import { MdOutlineWorkspacePremium } from "react-icons/md";


const Features = () => {
  return (
    <div id='features-sec' className='w-full mt-6'>
     <SubHead head="Decibal Guarantee" sub="Trusted By Sound Lovers" showOnMobile={true} />

     <div id="features-grid" className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 lg:mt-12">

      <FeatureCard icon={<MdOutlineShield className='text-4xl' />} feature="3 Years Warranty" sub="Full Protection Coverage" />

      <FeatureCard icon={<LuTruck className='text-4xl' />} feature="Free Shipping" sub="For Every Order" />
      
      <FeatureCard icon={<MdOutlineWorkspacePremium className='text-4xl' />} feature="Premium Quality" sub="Certified Products" />
  
     </div>
    </div>
  )
}

export default Features