import React, { useEffect, useState } from 'react'
import { MdAddBox, MdInfo } from 'react-icons/md';
import { Modal } from '../Modal'
import { Tooltip } from '../Tooltip'
import { CgArrowsExchange } from 'react-icons/cg';

export const WalletMain = () => {

  const tabs = document.getElementsByClassName("walletTabs");
  let [activeTab, setActiveTab] = useState(0);
  const handleTabs = (event) => {
    const index = Array.from(tabs).indexOf(event.target);
    setActiveTab(index);
  }

  useEffect(() => (
    setActiveTab(activeTab)
  ), [activeTab])


  const [loadRequestModal, setLoadRequestModal] = useState(false)


  // sample data structure (JSON) for load balance 
  // {
  //   "id": "transaction_id",
  //   "transaction_type": "load",
  //   "user": {
  //     "id": "dbuqfgp4628",
  //     "username": "esportsgravity"
  //   },
  //   "transaction_details": {
  //     "payment_method": "esewa_to_esewa",
  //     "transaction_id": "biuef86jf",
  //     "remarks": "EG Topup",
  //     "sender_name": "Rajiv Jaiswal",
  //     "esewa_id": "9862495033",
  //     "transaction_amount": 50,
  //     "transaction_date": "2024-05-09"
  //   },
  //   "coin": 50,
  //   "status": "draft/pending/success/failed",
  //   "note": "null OR Based on your transaction amount, you can claim 50 EG coins",
  //   "claim_status": false
  // }


  // sample data structure (JSON) for withdrawal requests 
  // {
  //   "id": "transaction_id",
  //   "transaction_type": "withdraw",
  //   "user": {
  //     "id": "dbuqfgp4628",
  //     "username": "esportsgravity"
  //   },

  //   "transaction_details": {
  //     "payment_method": "esewa_to_esewa",
  //     "transaction_id": "biuef86jf",
  //     "remarks": "EG Withdrawal",
  //     "sender_name": "Sanjiv Jaiswal",
  //     "esewa_id": "9862495033",
  //     "transaction_amount": 50,
  //     "transaction_date": "2024-06-3"
  //   }, 

  //   "coin": 50,
  //   "status": "draft/pending/success/failed",
  //   "note": "null OR Based on your transaction amount, you can claim 50 EG coins",
  //   "claim_status": null
  // }


  return (
    <>
      <div className=''>
        <div className="flex max-md:justify-between gap-4 md:text-base text-sm custom-scrollbar whitespace-nowrap overflow-x-auto">
          <label htmlFor="" onClick={(e) => handleTabs(e)} className={`walletTabs ${activeTab === 0 ? ' bg-secondaryLight md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue hover:bg-secondaryLight'} transition-colors duration-150  p-2 px-3 rounded-[5px] font-semibold cursor-pointer`}>Load Wallet</label>
          <label htmlFor="" onClick={(e) => handleTabs(e)} className={`walletTabs ${activeTab === 1 ? ' bg-secondaryLight md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue hover:bg-secondaryLight'} transition-colors duration-150  p-2 px-3 rounded-[5px] font-semibold cursor-pointer`}>Withdraw</label>
          <label htmlFor="" onClick={(e) => handleTabs(e)} className={`walletTabs ${activeTab === 2 ? ' bg-secondaryLight md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue hover:bg-secondaryLight'} transition-colors duration-150  p-2 px-3 rounded-[5px] font-semibold cursor-pointer`}>Transaction History</label>
        </div>

        <div className="my-6">
          {activeTab === 0 &&
            <div className='grid grid-cols-2'>
              <div className="flex flex-col">
                <div className="flex justify-end"><button onClick={() => setLoadRequestModal(true)} className='bg-secondaryLight px-3 py-2 rounded hover:bg-slate-800 transition-colors duration-200 flex items-center gap-2'><MdAddBox /><span>Create Wallet Load Request</span> </button></div>
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


      <Modal isVisible={loadRequestModal} onClose={() => setLoadRequestModal(false)} closeButtonActive={false}>
        <div className='p-10 flex justify-center items-center'>
          <div className="flex flex-col gap-6">
            <fieldset className="flex flex-col gap-2 px-6 py-4 border-[1px] border-inactive border-opacity-40 rounded-[5px] bg-secondaryLight">
              <legend className='text-offBlue px-2 flex gap-1 items-center'><span>Load Amount</span><Tooltip children={<MdInfo />} content={"Amount of EG Coins you want to load"} /></legend>
              <div className="flex gap-4 items-center ">
                <div className="flex items-center h-12 bg-frameBG rounded-[5px]">
                  <div className='px-3 h-full flex justify-center items-center rounded-[5px] bg-secondary'>EG Coin</div>
                  <input name='coin' type="number" placeholder='eg. 50' className='h-full bg-transparent py-2 px-3 rounded-[5px] placeholder:text-sm placeholder:text-inactive focus:outline-none' />
                </div>
                <CgArrowsExchange className='text-2xl' />
                <div className="flex items-center h-12 bg-frameBG rounded-[5px]">
                  <div className='px-3 h-full flex justify-center items-center rounded-[5px] bg-secondary'>NPR</div>
                  <input name='transaction_amount' type="number" placeholder='eg. 50' className='h-full bg-transparent py-2 px-3 rounded-[5px] placeholder:text-sm placeholder:text-inactive focus:outline-none' />
                </div>
              </div>
              <p className='text-sm text-inactive'>*Minimum load amount is 50</p>
            </fieldset>

            <fieldset className="flex flex-col gap-2 px-6 py-4 border-[1px] border-inactive border-opacity-40 rounded-[5px] bg-secondaryLight">
              <legend className='text-offBlue px-2 flex gap-1 items-center'><span>Payment Method</span><Tooltip children={<MdInfo />} content={"Choose how you want to pay us"} /></legend>
              <div className="flex gap-4 justify-between items-center ">
                <div className="flex items-center w-full h-12 bg-frameBG rounded-[5px]">
                  <div className='px-3 h-full flex justify-center items-center rounded-[5px] bg-secondary'>From </div>
                  <select defaultValue={'esewa'} name="source_payment_method" id="" className='custom-dropdown bg-frameBG border-none h-full focus:outline-none'>
                    <option value="esewa">Esewa</option>
                    <option value="khalti">Khalti</option>
                    <option value="mobile_banking">Mobile Banking</option>
                  </select>
                </div>
                <div className="flex items-center w-full h-12 bg-frameBG rounded-[5px]">
                  <div className='px-3 h-full flex justify-center items-center rounded-[5px] bg-secondary'>To </div>
                  <select defaultValue={'esewa'} name="destination_payment_method" id="" className='custom-dropdown bg-frameBG border-none h-full focus:outline-none'>
                    <option value="esewa">Esewa</option>
                    <option value="khalti">Khalti</option>
                    <option value="bank_account">Bank Account</option>
                  </select>
                </div>

              </div>

            </fieldset>

          </div>
        </div>
      </Modal>

    </>
  )
}
