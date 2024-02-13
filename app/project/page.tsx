'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import background from '../../public/images/project.png';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import logo from '../../public/images/logo.png';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Page = () => {
  const [listItems, setListItems] = useState(['']);
  const [newItem, setNewItem] = useState('');
  const [isInputVisible, setIsDialogVisible] = useState(false);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
   
    const queryParams = new URLSearchParams(window.location.search);
    const projectNameParam = queryParams.get('name');
   
    setProjectName(projectNameParam);
    
    console.log('Project Name:', projectName);

  }, []);

  const handleAddListItem = () => {
    if (newItem.trim() !== '') {
   
      const newItemObject = {
        text: newItem,
        checkbox: <input type="checkbox" className='ml-2 flex items-center h-full' />,
      };
   
      setListItems((prevItems) => [...prevItems, newItemObject]);
  
      setNewItem('');
    }

    setIsDialogVisible(false);
  };

  const handleRemoveListItem = (index) => {
    const updatedList = [...listItems];
    updatedList.splice(index, 1);
    setListItems(updatedList);
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
        <div className='w-1/3 flex items-center justify-center'>{projectName}</div>
        <div className='w-1/3 flex items-center justify-end'>
          <Link href='/' className='mr-8 border rounded-md flex justify-center w-24 h-8 items-center'>
            <p className='text-sm font-mono'>Sign Out</p>
          </Link>
        </div>
      </div>
      <div className='relative'>
        <Image src={background} alt={'background'} />

        <div className='absolute top-0 left-0 ml-96 mt-32 text-white flex flex-col z-10'>
          <div className='custom-input-container flex flex-col'>
            {isInputVisible && (
              <Dialog open={isInputVisible} onClose={() => setIsDialogVisible(false)}>
                <DialogContent className="bg-[#070019] text-white font-mono h-80 flex items-center justify-center">
                  <div>
                    <DialogTitle className=' justify-center flex '>Add new item:</DialogTitle>
                    <input
                      type='text'
                      placeholder=''
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      className='custom-input bg-black border-white border w-80 mt-2  rounded-sm'
                    />
                    <div className='w-full flex justify-center mt-4'>
                      <Button onClick={handleAddListItem} type="button" className='mr-4 text-[#D298FF] text-sm'>
                        ok
                      </Button>
                      <Button onClick={() => setIsDialogVisible(false)} type="button" className='text-[#D298FF] text-sm'>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <button
              onClick={() => setIsDialogVisible(true)}
              className={`bg-black size-10 rounded-md ${isInputVisible ? 'hidden' : ''}`}
            >
              +
            </button>
            <button
              onClick={() => handleRemoveListItem(listItems.length - 1)}
              className='bg-black size-10 rounded-md mt-2'
            >
              -
            </button>
          </div>
        </div>
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
          <div className='list h-96 w-96'>
            <ul>
              {listItems.map((item, index) => (
                
                <li className='flex items-center h-full my-3 text-lg' key={index}>
                   {item.checkbox}
                  {item.text}
                 
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
