import React from 'react';
import Image from 'next/image';
import logo from '../public/images/logo.png';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className='bg-[#00040D] w-screen h-screen flex flex-col justify-center items-center text-white'>
      <div className='flex flex-col items-center'>
        <div className='mb-4'>
          <Image src={logo} alt='' />
        </div>
        <Link href="/login" className='border h-10 text-xs px-2 rounded-md flex items-center'>
          <p className='ml-2'>Get Started!</p>
          <ChevronRight />
        </Link>
      </div>
      <div className='mt-4 text-4xl'>
        Welcome to Todo
        <a className='text-[#D298FF]'>do</a>!
      </div>
      <div className='font-mono w-72 text-center flex items-start justify-center mt-6'>
        <ul className='list-none' style={{ listStyle: 'inside', color: '#ffffff' }}>
          <li>     
            a website where you can write your checklists for free
          </li>         
        </ul>
        <input type="checkbox" className="size-8 custom-checkbox" checked={true} readOnly />
        </div>
    </div>
  );
};

export default LandingPage;
