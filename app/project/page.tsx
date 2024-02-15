'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import background from '../../public/images/project.png';
import Link from 'next/link';
import { ChevronLeft, Pen, Trash } from 'lucide-react';
import logo from '../../public/images/logo.png';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';

const Page = () => {
  const [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [checkedCount, setCheckedCount] = useState(0); 
  const [user, setUser] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userFromParams = queryParams.get('user');
    console.log('User:', userFromParams);
    setUser(userFromParams);
    const projectNameParam = queryParams.get('name');
    setProjectName(projectNameParam);
    console.log('Project Name:', projectName);
  }, [projectName], );
  const handleCheckboxChange = (index) => {
    const updatedList = [...listItems];
    updatedList[index].checkbox = !updatedList[index].checkbox;
    
    setCheckedCount((prevCount) => (updatedList[index].checkbox ? prevCount + 1 : prevCount - 1));

    setListItems(updatedList);
  };

  const onConfirm = () => {
    setIsConfirmationVisible(false);
  };

  const onClose = () => {
    setIsConfirmationVisible(false); 
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setIsDialogVisible(true);
    setNewItem(listItems[index].text);
  };

  const handleDeleteItem = (index) => {
    if (isConfirmationVisible) {
      const updatedList = [...listItems];
  
    
      const deleteIndex = editingIndex !== null ? editingIndex : index;
  
      updatedList.splice(deleteIndex, 1);
      setListItems(updatedList);
      setIsConfirmationVisible(false); 
      setEditingIndex(null);
    } else {
  
      setIsConfirmationVisible(true);
    }
  };
  
  const handleAddListItem = () => {
    if (newItem.trim() !== '') {
      const newItemObject = {
        checkbox: false,
        text: newItem,
        edit: <button onClick={() => handleEditItem(editingIndex)}><Pen className='size-4 ml-2' /></button>,
        delete: <button onClick={() => handleDeleteItem(editingIndex)}><Trash className='size-4 ml-2'/></button>,
      };
  
      if (editingIndex !== null) {
       
        const updatedList = [...listItems];
        updatedList[editingIndex] = newItemObject;
        setListItems(updatedList);
        setEditingIndex(null); 
      } else {
        
        setListItems((prevItems) => [...prevItems, newItemObject]);
      }

      setNewItem('');
    }
  
    setIsDialogVisible(false);
    setIsConfirmationVisible(false);
  };
  
  
  return (
    <>
      <div className='relative w-full h-24 flex bg-[#00040D] text-white font-mono'>
        <div className='w-1/3 flex items-center justify-start'>
          <Link href={`/homepage?user=${encodeURIComponent(user)}`}  className='ml-8 flex items-center'>
            <ChevronLeft className='size-8' />
            <Image src={logo} alt='' className='size-16' />
          </Link>
        </div>
        <div className='w-1/3 flex items-center justify-center'><p className='text-2xl'>{projectName}</p></div>
        <div className='w-1/3 flex items-center justify-end'>
        <p className='mr-4 flex items-end'>Hello, {user}!</p>
          <Link href='/' className='mr-8 border rounded-md flex justify-center w-24 h-8 items-center'>
            
            <p className='text-sm font-mono'>Sign Out</p>
          </Link>
        </div>
      </div>
      <div className='relative bg-[#f5f5f5] h-96'>
        
        <Image src={background} alt={'background'} />
        
       
       
        <div className='absolute top-0 left-0 ml-96 mt-32 text-white flex flex-col z-10 '>
          
          
          <div className='custom-input-container flex flex-col'>
            
            {isDialogVisible && (
           <Dialog open={isDialogVisible} onClose={() => setIsDialogVisible(false)}>
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
  className={`bg-black size-10 rounded-md ${isDialogVisible ? 'hidden' : ''}`}
>
  +
</button>

          </div>
        </div>
        <div className='text-black absolute top-0 left-0 w-full h-full flex mt-36 justify-center'>  {checkedCount} <p>/</p> {listItems.length} <p className='ml-1 font-semibold'>Done</p></div>
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
          
          <div className='list h-96 w-96 mt-80 pt-3 overflow-y-auto'>
            
            <ul>
                 {listItems.map((item, index) => (  

                  
              <li className='flex items-center h-full  my-3 text-lg' key={index}>
                <span className='mr-2'>{index + 1}.</span>
                {item.text}
                <div className='flex justify-end w-full'>
                <input
              type="checkbox"
              checked={item.checkbox}
              onChange={() => handleCheckboxChange(index)}
              className='ml-6 size-5'
            />
                <button onClick={() => handleEditItem(index)}>
                  <Pen className='size-5 ml-2' />
                </button>
                <Dialog>
                <DialogTrigger  onClick={() => handleDeleteItem(index)}>
                <Trash className='size-5 ml-2'/>
                </DialogTrigger>
                
             
        <DialogContent className="bg-[#070019] text-white font-mono h-40 flex items-center justify-center">
          <div>
            <DialogTitle className='text-center mb-2'>Confirm Deletion</DialogTitle>
            <p className='text-center text-sm mb-4'>Are you sure you want to delete this item?</p>
            <div className='w-full flex justify-center'>
              <DialogClose onClick={() => {onConfirm();handleDeleteItem(index);}} type="button" className='bg-[#10142c]  h-10 w-16 rounded-md text-[#D298FF] text-sm mr-4'>
                Yes
              </DialogClose>
              <DialogClose onClick={onClose} type="button" className='bg-[#10142c]  h-10 w-16 rounded-md text-[#D298FF] text-sm'>
                No
              </DialogClose>
            </div>
          </div>
        </DialogContent>
     
                 
                </Dialog>
                </div>
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