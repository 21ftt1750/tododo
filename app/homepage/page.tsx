  'use client'
  import React, { useState } from 'react';
  import Image from 'next/image';
  import logo from '../../public/images/logo.png';
  import { ChevronLeft, Pen, Trash2 } from 'lucide-react';
  import Link from 'next/link';
  import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";

  import { Input } from '@/components/ui/input';
  import { Button } from '@/components/ui/button';
  import paper from '../../public/images/paper.png';

  const LandingPage = () => {
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
const [editProjectIndex, setEditProjectIndex] = useState(null);

const handleSubmit = (event) => {
  event.preventDefault();

  const updatedProjects = [...projects];
  
  if (editProjectIndex !== null) {
    // Editing existing project
    updatedProjects[editProjectIndex].name = projectName;
    setEditProjectIndex(null); // Reset edit index after successful edit
  } else {
    // Creating a new project
    const newProject = {
      id: new Date().getTime(),
      name: projectName,
    };
    updatedProjects.push(newProject);
  }

  setProjects(updatedProjects);
  setProjectName('');
  setIsDialogOpen(false);
};
const handleEditProject = (projectId) => {
  const projectIndex = projects.findIndex((project) => project.id === projectId);

  if (projectIndex !== -1) {
    const project = projects[projectIndex];
    setProjectName(project.name);
    setEditProjectIndex(projectIndex);
    setIsEditDialogOpen(true);
  }
};


    const handleRemoveProject = (projectId) => {
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
    };


    return (
      <div className='bg-[#00040D] w-screen h-screen relative  pt-8 text-white'>
       <div className='  flex justify-center items-center pb-28'>
        <div className='flex items-center w-1/3'>
          <Image src={logo} alt='' className='size-16' />
        </div>
          <p className='text-3xl w-1/4'>Welcome to Todo<a href="" className='text-[#D298FF]'>do</a>!</p>
        <div className='w-1/4 flex justify-end'>
        <Link href='/' className=' border rounded-md flex justify-center w-28 h-8 items-center'>
          <p className='text-sm font-mono'>Sign Out</p>
        </Link>
        </div>
</div>
        {/* ----------------------------------------- */}


        
        <div className='w-9/12 flex items-start ml-32'>
    {projects.map((project, index) => (
  <div key={index} className='project border rounded-2xl w-48 h-44 items-center justify-center bg-[#070019] mx-4'>
    <div className='flex flex-col justify-center items-center'>
      <Link href={`/project?name=${encodeURIComponent(project.name)}`} passHref>
        <Image src={paper} alt={'paper'} />
      </Link>
      <p className='flex justify-center text-lg'>
        {project.name} 
        <Dialog>
        <DialogTrigger onClick={() => handleEditProject(project.id)}>
          <div className='ml-2 cursor-pointer'>
          <Pen strokeWidth={1} />
          </div>
        </DialogTrigger>
  <DialogContent className="bg-[#070019] text-white font-mono h-80 flex items-center justify-center">
    <div className='w-full'>
      <DialogTitle className='justify-center flex'>Edit Project Name:</DialogTitle>
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
          <DialogClose type="submit" className='bg-[#10142c] h-6 w-14 text-[#D298FF] text-sm mr-4 ' >
            Ok
          </DialogClose>
          <DialogClose type="button" className='bg-[#10142c] h-6 w-14 text-[#D298FF] text-sm'>
            Cancel
          </DialogClose>
        </div>
      </form>
    </div>
  </DialogContent>
</Dialog>

        
        <Dialog>
        <DialogTrigger>
        <Trash2 className='ml-2 cursor-pointer'strokeWidth={1}/>
        </DialogTrigger>
        <DialogContent className="bg-[#070019] text-white font-mono h-40 flex items-center justify-center">
          <div>
            <DialogTitle className='text-center'>Confirm Deletion</DialogTitle>
            <p className='text-center text-sm mb-4'>Are you sure you want to delete this project?</p>
            <div className='w-full flex justify-center'>
              <DialogClose      
        onClick={() => handleRemoveProject(project.id)} type="button" className='bg-[#10142c] h-6 w-14 rounded-md text-[#D298FF] text-sm mr-4'>
                Yes
              </DialogClose>
              <DialogClose type="button" className='bg-[#10142c] h-6 w-14 rounded-md text-[#D298FF] text-sm'>
                No
              </DialogClose>
            </div>
          </div>
        </DialogContent>

       
        </Dialog>
      </p>
    </div>
  </div>
))}



          <React.Fragment>
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
    <DialogTrigger>
      <div className='border rounded-2xl w-48 h-44 flex items-center justify-center bg-[#070019] mx-4'   onClick={() => setIsDialogOpen(true)}>
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
