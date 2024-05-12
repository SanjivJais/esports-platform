import React, { useEffect, useState } from 'react'

import { LoadReuqestModal } from './LoadRequestModal';
import { MdAddBox, MdInfo } from 'react-icons/md';
import { Modal } from '../Modal';


export const WalletMain = () => {
  const [loadRequestModal, setLoadRequestModal] = useState(false)


  const tabs = document.getElementsByClassName("walletTabs");
  let [activeTab, setActiveTab] = useState(0);
  const handleTabs = (event) => {
    const index = Array.from(tabs).indexOf(event.target);
    setActiveTab(index);
  }

  useEffect(() => (
    setActiveTab(activeTab)
  ), [activeTab])



  return (
    <>
      <div className=''>
        <div className="flex gap-4 md:text-base text-sm custom-scrollbar whitespace-nowrap overflow-x-auto">
          <label htmlFor="" onClick={(e) => handleTabs(e)} className={`walletTabs ${activeTab === 0 ? ' bg-secondaryLight md:text-offBlue' : 'text-inactive hover:text-offBlue hover:bg-secondaryLight'} transition-colors duration-150  p-2 px-3 rounded-[5px] font-semibold cursor-pointer`}>Load Wallet</label>
          <label htmlFor="" onClick={(e) => handleTabs(e)} className={`walletTabs ${activeTab === 1 ? ' bg-secondaryLight md:text-offBlue' : 'text-inactive hover:text-offBlue hover:bg-secondaryLight'} transition-colors duration-150  p-2 px-3 rounded-[5px] font-semibold cursor-pointer`}>Withdraw</label>
          <label htmlFor="" onClick={(e) => handleTabs(e)} className={`walletTabs ${activeTab === 2 ? ' bg-secondaryLight md:text-offBlue' : 'text-inactive hover:text-offBlue hover:bg-secondaryLight'} transition-colors duration-150  p-2 px-3 rounded-[5px] font-semibold cursor-pointer`}>Transaction History</label>
        </div>

        <div className="my-6">
          {activeTab === 0 &&
            <div className='grid grid-cols-2'>
              <div className="flex flex-col">
                <div className="flex"><button onClick={() => setLoadRequestModal(true)} className='bg-secondaryLight px-3 py-2 rounded hover:bg-slate-800 transition-colors duration-200 flex items-center gap-2'><MdAddBox /><span>Create Load Request</span> </button></div>
                <div className="flex flex-col">
                  {/* component for request preview */}


                </div>
              </div>
            </div>
          }
          {activeTab === 1 &&
            <>
              Withdraw
            </>
          }
          {activeTab === 2 &&
            <>
              Transaction History
            </>
          }
        </div>
      </div>


      <Modal isVisible={loadRequestModal} onClose={() => setLoadRequestModal(false)} closeButtonActive={false} outsideClose={false}>
        <LoadReuqestModal onClose={() => setLoadRequestModal(false)} />
      </Modal>


    </>
  )
}
