import React from 'react'
import { FaClock } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { FaPhoneAlt, FaShareAlt  } from "react-icons/fa";
import { FaSquareFacebook, FaSquareInstagram, FaSquareWhatsapp  } from "react-icons/fa6";

import Locations from '@/components/user/Locations';



const ContactPage = () => {
    return (
    <>
    <h1 className='text-5xl font-bold -mt-10 mb-8 text-background text-center'>ابقى على تواصل</h1>
    <div
        className="flex flex-col gap-4 md:flex-row md:[&>div]:w-1/3
                [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:bg-background/70 [&>div]:backdrop-blur-md
                [&>div]:shadow-lg [&>div]:p-2 [&>div]:rounded-lg [&>div]:gap-2 
        "
    >
        <div className=''>
            <FaClock className='text-accent w-6 h-6' />
            <h2 className='text-primary font-bold'>ساعات العمل</h2>
            <p className='flex gap-2 text-text'> 8:00 ص <FaArrowLeft /> 4:00 م</p>
        </div>
        <div className=''>
            <FaPhoneAlt  className='text-accent w-6 h-6' />
            <h2 className='text-primary font-bold'>الهاتف</h2>
            <p className='text-text' dir='ltr'> +963  997 882 244</p>
            <p className='text-text' dir='ltr'> +963 955 955 511</p>
        </div>
        <div className=''>
            <FaShareAlt   className='text-accent w-6 h-6' />
            <h2 className='text-primary font-bold'>تابع أعمالنا على السوشيال</h2>
            <div className='flex gap-4 [&>a]:text-primary  [&>a]:duration-300 [&>a:hover]:text-accent'>
                
                <a href="https://www.instagram.com/emerald_for_marble_and_granite/"  target='_blank'><FaSquareInstagram className='w-8 h-8' /></a>
                <a href="https://wa.me/963997882244"><FaSquareWhatsapp className='w-8 h-8' /></a>
                <a href="https://www.facebook.com/profile.php?id=61576690771137" target='_blank'><FaSquareFacebook className='w-8 h-8' /></a>
            </div>
            
        </div>
    </div>
    <Locations/>
    </>
    )
}

export default ContactPage