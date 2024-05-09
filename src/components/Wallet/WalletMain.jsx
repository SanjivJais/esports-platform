import React, { useEffect, useState } from 'react'

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
            <>
              Load Balance
            </>
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
    </>
  )
}
