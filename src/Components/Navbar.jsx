    import React from 'react'
    import { BrainCircuit , Sun} from 'lucide-react';
  
    const Navbar = () => {
      return (
        
        
        <div className='nav  flex items-center justify-between px-9rem h-[90px] bg-zinc-900 ' style={{padding:"0px 150px"}}> 
        {/* <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />; */}
          <div className="logo flex items-center gap-[10px]">
          <BrainCircuit size={30} color='#9333ea' />
          <span className='text-2xl font-bold text-white ml-2'>Codefy</span>
          </div>
          <div className="icons flex items-center gap-[20px]">
            <i className='cursor-pointer transition-all hover:text-[#9333ea]'><Sun /></i>
          </div>
        </div>
        
      )
    }
    
    export default Navbar
    