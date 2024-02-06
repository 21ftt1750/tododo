'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import background from '../../public/images/project.png';
import Link from 'next/link';
import { ChevronLeft, Dot } from 'lucide-react';
import logo from '../../public/images/logo.png';

const Page = () => {
  const [listItems, setListItems] = useState(['']);

  const handleAddListItem = () => {
    const newItem = prompt('Enter a new item:');
    if (newItem) {
      setListItems((prevItems) => [...prevItems, newItem]);
    }
  };

  return (
    <>
      <div className='relative w-full h-24 flex bg-[#00040D] text-white font-mono'>
        <div className='w-1/3 flex items-center justify-start'>
          <Link href='/homepage' className='ml-8 flex items-center'>
            <ChevronLeft className='size-8' />
            <Image src={logo} alt='' className='size-16' />
          </Link>
        </div>
        <div className='w-1/3 flex items-center justify-center'>project name</div>
        <div className='w-1/3 flex items-center justify-end'>
          <Link href='/' className='mr-8 border rounded-md flex justify-center w-24 h-8 items-center'>
            <p className='text-sm font-mono'>Sign Out</p>
          </Link>
        </div>
      </div>
      <div className='relative'>
        <Image src={background} alt={'background'} />
        <div className='absolute top-20 left-20 ml-80 text-white flex flex-col z-10'>
          <button onClick={handleAddListItem} className='bg-black size-10 rounded-md mb-2'>
            +
          </button>
          <button className='bg-black size-10 rounded-md'>-</button>
        </div>
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
          <div className='list overflow-y-auto h-96 w-96'>
            <ul>
              {listItems.map((item, index) => (
                <li className='my-3 flex items-center' key={index}><Dot strokeWidth={1} size={36} />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
