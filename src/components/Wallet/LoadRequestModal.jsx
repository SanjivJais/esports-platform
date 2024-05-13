import React, { useEffect, useState } from 'react'
import { MdInfo } from 'react-icons/md';
import { Tooltip } from '../Tooltip'
import { CgArrowsExchange } from 'react-icons/cg';
import { useAuth } from '../../utils/AuthContext'

export const LoadReuqestModal = ({ onClose }) => {

    const { userDetails } = useAuth()
    const [transactionDetails, setTransactionDetails] = useState({
        payer_payment_method: "esewa",
        payee_payment_method: "esewa",
        remarks: "",
        transaction_date: "",
    })

    const [loadWalletData, setLoadWalletData] = useState({
        transaction_type: "load",
        user: {
            id: userDetails.$id,
            username: userDetails.username
        },
        transaction_details: JSON.stringify(transactionDetails),
        coin: 0,
        status: "pending",
        note: "",
    })



    const handleInputChange = (e) => {
        let { name, value, type } = e.target;
        setLoadWalletData((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : value,
        }))

    }


    const handleTxnDetailsChange = (e) => {
        let { name, value, type } = e.target;
        setTransactionDetails((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : value,
        }))

    }

    useEffect(() => {
        setLoadWalletData((prevData) => ({
            ...prevData,
            transaction_details: JSON.stringify(transactionDetails),
        }))
    }, [transactionDetails])




    const handleInputSubmit = async () => {
        console.log(loadWalletData);
        console.log(JSON.parse(loadWalletData.transaction_details));
    }


    return (
        <>
            <div className='lg:w-[60vw] md:w-[80vw]  w-[90vw] max-h-[90vh] '>
                <div className='m-5 p-4 flex flex-col justify-center items-center'>
                    <h3 className='text-xl mb-4 text-offBlue font-bold'>Create Wallet Load Request</h3>
                    <div className="flex flex-col gap-6 w-full">
                        <fieldset className="flex flex-col gap-2 px-6 py-4 border-[1px] border-inactive border-opacity-20 rounded-[5px] bg-secondaryLight">
                            <legend className='text-offBlue px-2 flex gap-1 items-center'><span>Load Amount</span><Tooltip children={<MdInfo />} content={"Amount of EG Coins you want to load"} /></legend>
                            <div className='grid md:grid-cols-11 grid-cols-1 gap-y-2'>
                                <div className="flex items-center col-span-5 h-12 bg-frameBG rounded-[5px]">
                                    <div className='px-3 h-full flex justify-center items-center rounded-[5px] bg-secondary w-fit text-nowrap'>EG Coin</div>
                                    <input value={loadWalletData.coin || 0} onChange={(e) => handleInputChange(e)} name='coin' type="number" placeholder='eg. 50' min={50} step={1} className='h-full w-full bg-transparent py-2 px-3 rounded-[5px] placeholder:text-sm placeholder:text-inactive focus:outline-none' />
                                </div>
                                <div className='col-span-1 flex items-center justify-center'><CgArrowsExchange className='text-2xl' /></div>
                                <div className="flex items-center col-span-5 h-12 bg-frameBG rounded-[5px]">
                                    <div className='px-3 h-full flex justify-center items-center rounded-[5px] bg-secondary'>NPR</div>
                                    <div className='h-full w-full flex items-center bg-slate-800 py-2 px-3 rounded-tr-[5px] rounded-br-[5px]'>{loadWalletData.coin || 0}</div>
                                </div>
                            </div>
                            <p className='text-sm text-inactive'>*Minimum load amount is 50</p>
                        </fieldset>

                        <fieldset className="flex flex-col gap-2 px-6 py-4 border-[1px] border-inactive border-opacity-20 rounded-[5px] bg-secondaryLight">
                            <legend className='text-offBlue px-2 flex gap-1 items-center'><span>Payment</span><Tooltip children={<MdInfo />} content={"Choose how you want to pay us"} /></legend>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                                <fieldset className="col-span-1 flex flex-col gap-3 bg-secondary p-3 pt-2 rounded-[5px]">
                                    <legend className='bg-openStatus text-secondary text-sm px-3 py-1 rounded-3xl font-semibold flex items-center gap-1'><span>From</span><span>(Payer Details)</span><Tooltip children={<MdInfo />} content={"This is how you pay us."} /></legend>

                                    <div className="flex flex-col">
                                        <label htmlFor="payer_payment_method" className='text-sm my-2 text-offBlue'>Payment Method </label>
                                        <select onChange={handleTxnDetailsChange} defaultValue={'esewa'} name="payer_payment_method" id="payer_payment_method" className='custom-dropdown bg-frameBG text-offBlue border-[0.8px] border-inactive border-opacity-30 h-full focus:outline-none'>
                                            <option value="esewa">Esewa</option>
                                            <option value="khalti">Khalti</option>
                                            <option value="mobile_banking">Mobile Banking</option>
                                        </select>
                                    </div>


                                    {/* Input fields based on payment method */}
                                    <div className="flex flex-col gap-3">

                                        {transactionDetails.payer_payment_method === "esewa" &&
                                            <>
                                                <div className="relative">
                                                    <input onChange={handleTxnDetailsChange} type="text" id="payer_name" name='payer_name' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus  peer" placeholder=" " />
                                                    <label htmlFor="payer_name" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10 origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Payer Name (as in Payment Method)</label>
                                                </div>
                                                <div className="relative">
                                                    <input onChange={handleTxnDetailsChange} type="text" id="payer_esewa_id" name='payer_esewa_id' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus peer" placeholder="" />
                                                    <label htmlFor="payer_esewa_id" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10  origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Payer Esewa ID (number/email)</label>
                                                </div>
                                                <div className="relative">
                                                    <input onChange={handleTxnDetailsChange} type="text" id="esewa_transaction_id" name='esewa_transaction_id' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus peer" placeholder=" " />
                                                    <label htmlFor="esewa_transaction_id" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10  origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center gap-1"><span>Transaction ID</span><Tooltip children={<MdInfo />} content={"Enter Transaction ID obtained after payment confirmation."} /></label>
                                                </div>
                                            </>
                                        }
                                        {transactionDetails.payer_payment_method === "khalti" &&
                                            <>
                                                <div className="relative">
                                                    <input onChange={handleTxnDetailsChange} type="text" id="payer_name" name='payer_name' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus  peer" placeholder=" " />
                                                    <label htmlFor="payer_name" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10 origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Payer Name (as in Payment Method)</label>
                                                </div>
                                                <div className="relative">
                                                    <input onChange={handleTxnDetailsChange} type="text" id="payer_khalti_id" name='payer_khalti_id' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus peer" placeholder="" />
                                                    <label htmlFor="payer_khalti_id" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10  origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Payer Khalti Mobile Number</label>
                                                </div>
                                                <div className="relative">
                                                    <input onChange={handleTxnDetailsChange} type="text" id="khalti_transaction_id" name='khalti_transaction_id' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus peer" placeholder=" " />
                                                    <label htmlFor="khalti_transaction_id" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10  origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center gap-1"><span>Transaction ID</span><Tooltip children={<MdInfo />} content={"Enter Transaction ID obtained after payment confirmation."} /></label>
                                                </div>
                                            </>
                                        }
                                        {transactionDetails.payer_payment_method === "mobile_banking" &&
                                            <>
                                                <div className="relative">
                                                    <input onChange={handleTxnDetailsChange} type="text" id="payer_name" name='payer_name' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus  peer" placeholder=" " />
                                                    <label htmlFor="payer_name" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10 origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Payer Name (as in Payment Method)</label>
                                                </div>
                                                <div className="relative">
                                                    <input onChange={handleTxnDetailsChange} type="text" id="payer_account_no" name='payer_account_no' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus peer" placeholder="" />
                                                    <label htmlFor="payer_account_no" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10  origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Payer Account Number (last 3 digits)</label>
                                                </div>
                                            </>
                                        }




                                        <div className="relative">
                                            <input onChange={handleTxnDetailsChange} type="text" id="remarks" name='remarks' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus peer" placeholder=" " />
                                            <label htmlFor="remarks" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10  origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center gap-1"><span>Remarks</span><Tooltip children={<MdInfo />} content={"Enter Remarks you put when making payment. (Recommended remark is 'EG Topup')"} /></label>
                                        </div>

                                        <div className="relative">
                                            <input onChange={handleTxnDetailsChange} type="date" id="transaction_date" name='transaction_date' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus peer" placeholder=" " />
                                            <label htmlFor="transaction_date" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10 origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center gap-1"><span>Transaction Date</span><Tooltip children={<MdInfo />} content={"Date when you made the payment."} /></label>
                                        </div>

                                    </div>

                                </fieldset>


                                <fieldset className="col-span-1 flex flex-col gap-3 bg-secondary p-3 pt-2 rounded-[5px]">
                                    <legend className='bg-primary text-secondary text-sm px-3 py-1 rounded-3xl font-semibold flex items-center gap-1'><span>To</span> <span>(Payee Details)</span><Tooltip children={<MdInfo />} content={"This is where we receive your payment."} /></legend>

                                    <div className="flex flex-col">
                                        <label htmlFor="payee_payment_method" className='text-sm my-2 text-offBlue'>Pay To This Account </label>
                                        <select onChange={handleTxnDetailsChange} defaultValue={'esewa'} name="payee_payment_method" id="payee_payment_method" className='custom-dropdown border-[0.8px] border-inactive border-opacity-30 bg-frameBG text-offBlue h-full focus:outline-none'>
                                            <option disabled={transactionDetails.payer_payment_method === "khalti"} value="esewa">Esewa</option>
                                            <option disabled={transactionDetails.payer_payment_method === "esewa"} value="khalti">Khalti</option>
                                            <option value="bank_transfer">Bank Transfer</option>
                                        </select>
                                    </div>

                                    {transactionDetails.payee_payment_method === "esewa" && <div className="flex flex-col gap-6 my-2">
                                        <div className='text-offBlue'><span className='text-inactive'>Esewa ID (email):</span> <strong className='bg-secondaryLight px-2 py-1 rounded-[5px]'>jsanjiv926@gmail.com</strong></div>
                                        <div className='text-offBlue'><span className='text-inactive'>Payee Name (in Esewa):</span> <strong className='bg-secondaryLight px-2 py-1 rounded-[5px]'>Ra*** Jaiswal</strong></div>
                                    </div>}

                                    {transactionDetails.payee_payment_method === "khalti" && <div className="flex flex-col gap-6 my-2">
                                        <div className='text-offBlue'><span className='text-inactive'>Khalti Mobile Number:</span> <strong className='bg-secondaryLight px-2 py-1 rounded-[5px]'>sanjivjaiswal04@gmail.com</strong></div>
                                        <div className='text-offBlue'><span className='text-inactive'>Payee Name (in Khalti):</span> <strong className='bg-secondaryLight px-2 py-1 rounded-[5px]'>Sanjiv Jaiswal</strong></div>
                                    </div>}

                                    {transactionDetails.payee_payment_method === "bank_transfer" && <div className="flex flex-col gap-6 my-2">
                                        <div className='text-primary cursor-pointer self-center'>Click to see QR code</div>
                                        <div className='text-offBlue self-center'><span className='text-inactive'>Payee Name:</span> <strong className='bg-secondaryLight px-2 py-1 rounded-[5px]'>Sanjiv Jaiswal</strong></div>

                                    </div>}

                                </fieldset>

                            </div>
                            <p className='text-[15px] text-inactive my-2'><strong>Note:</strong> Please keep a screenshot of payment made to resolve any potential issues.</p>
                        </fieldset>

                    </div>
                    <div className="flex mt-6 justify-center gap-10">
                        <button onClick={() => onClose()} className='bg-secondaryLight rounded-[5px] px-3 py-2'>Cancel</button>
                        <button onClick={() => handleInputSubmit()} className='bg-primary text-secondary font-semibold rounded-[5px] px-3 py-2'>Submit</button>
                    </div>
                </div>

            </div>
        </>
    )
}
