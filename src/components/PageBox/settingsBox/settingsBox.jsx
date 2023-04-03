import React from 'react';
import './settingsBox.css'
const SettingsBox = () => {
  return (
    <>
      <div className=' w-full add-box mt-[40px] mx-auto pb-[120px] h-full flex justify-center items-start'>
        <div className="box   w-full add-shadow max-w-[600px] gap-[30px] flex flex-col justify-start items-start  py-[60px]  px-[20px] ">
          <div className=' flex flex-col justify-start items-start w-full gap-[10px]'>
            <h6 className=' text-[17px]   font-[500] capitalize  '>
              facebook :
            </h6>
            <input type="text" placeholder='Link' />
          </div>
          <div className=' flex flex-col justify-start items-start w-full gap-[10px]'>
            <h6 className=' text-[17px]   font-[500] capitalize  '>
              instagram :
            </h6>
            <input type="text" placeholder='Link' />
          </div>
          <div className=' flex flex-col justify-start items-start w-full gap-[10px]'>
            <h6 className=' text-[17px]   font-[500] capitalize  '>
              whatsapp :
            </h6>
            <input type="text" placeholder='Link' />
          </div>
          <div className=' flex flex-col justify-start items-start w-full gap-[10px]'>
            <h6 className=' text-[17px]   font-[500] capitalize  '>
              youtube :
            </h6>
            <input type="text" placeholder='Link' />
          </div>
          <div className=' flex flex-col justify-start items-start w-full gap-[10px]'>
            <h6 className=' text-[17px]   font-[500] capitalize  '>
              Phones :
            </h6>
            <textarea className='min-h-[150px]' ></textarea>
          </div>
          <div className=' flex flex-col justify-start items-start w-full gap-[10px]'>
            <h6 className=' text-[17px]   font-[500] capitalize  '>
              address :
            </h6>
            <textarea className='min-h-[150px]' ></textarea>
          </div>


        </div>
      </div>
    </>
  );
}

export default SettingsBox;
