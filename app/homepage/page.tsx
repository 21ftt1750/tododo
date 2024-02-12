  'use client'
  import React, { useState } from 'react';
  import Image from 'next/image';
  import logo from '../../public/images/logo.png';
  import { ChevronLeft, Trash2 } from 'lucide-react';
  import Link from 'next/link';
  import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

  import { Input } from '@/components/ui/input';
  import { Button } from '@/components/ui/button';
  import paper from '../../public/images/paper.png';

  const LandingPage = () => {
    const [projectName, setProjectName] = useState<string>('');
    const [projects, setProjects] = useState<string[]>([]);
    
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const handleSubmit = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
    
      const newProject = {
        id: new Date().getTime(),
        name: projectName,
      };
    
      setProjects([...projects, newProject]);
    
      setProjectName('');
    
      setIsDialogOpen(false);
    };
    

    const handleRemoveProject = (projectId) => {
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
    };


    return (
      <div className='bg-[#00040D] w-screen h-screen relative flex-col justify-center items-start pt-6 text-white'>
       
        <div className='  flex justify-center items-center pb-28'>
        <div className='flex items-center w-1/3'>
          <Image src={logo} alt='' className='size-16' />
        </div>
          <p className='text-3xl w-1/3'>Welcome to Todo<a href="" className='text-[#D298FF]'>do</a>!</p>
        <div className='w-1/4 flex justify-end'>
        <Link href='/' className=' border rounded-md flex justify-center w-28 h-8 items-center'>
          <p className='text-sm font-mono'>Sign Out</p>
        </Link>
        </div>
</div>
        {/* ----------------------------------------- */}
        
        <div className='w-9/12 flex items-start ml-24 '>
          {projects.map((project, index) => (
            <div key={index} className='project border rounded-2xl w-48 h-44  items-center justify-center bg-[#070019] mx-4'>
              
              <div className='flex flex-col justify-center items-center'>
              <Link href='/project'>
                <Image src={paper} alt={'paper'}></Image>
                </Link>
                <p className='flex justify-center'>{project.name} 
    <Trash2
        className='ml-2 cursor-pointer'
        strokeWidth={1}
        onClick={() => handleRemoveProject(project.id)}
    />
</p>

              </div>
            </div>
          ))}
          <React.Fragment>
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
    <DialogTrigger>
      <div className='border rounded-2xl w-48 h-44 flex items-center justify-center bg-[#070019] mx-4' onClick={() => setIsDialogOpen(true)}>
        <p
          className='text-xl font-mono w-4 flex justify-center cursor-pointer'
          
        >
          New Project
        </p>
      </div>
    </DialogTrigger>
    <DialogContent className="bg-[#070019] text-white font-mono h-80 flex items-center justify-center">
    <div className='w-full'>
      <DialogTitle className=' justify-center flex'>Project Name:</DialogTitle>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center my-6">
          <Input
            id="name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-black border rounded-sm h-6 w-10/12"
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className='text-[#D298FF] text-sm mr-4 w-20' >
            Ok
          </Button>

          <Button onClick={() => setIsDialogOpen(false)} type="button" className='text-[#D298FF] text-sm'>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  </DialogContent>

  </Dialog>

          </React.Fragment>
        </div>
      </div>
    );
  };

  export default LandingPage;
