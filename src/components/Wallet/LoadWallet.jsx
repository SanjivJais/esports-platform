import React, { useState } from 'react'
import { MdAddBox, MdInfo } from 'react-icons/md';
import { Modal } from '../Modal'
import { Tooltip } from '../Tooltip'
import { CgArrowsExchange } from 'react-icons/cg';

export const LoadWallet = () => {
    const [loadRequestModal, setLoadRequestModal] = useState(false)

    return (
        <>

            <div className='grid grid-cols-2'>
                <div className="flex flex-col">
                    <div className="flex"><button onClick={() => setLoadRequestModal(true)} className='bg-secondaryLight px-3 py-2 rounded hover:bg-slate-800 transition-colors duration-200 flex items-center gap-2'><MdAddBox /><span>Create Load Request</span> </button></div>
                    <div className="flex flex-col">
                        {/* component for request preview */}


                    </div>
                </div>
            </div>






            <Modal isVisible={loadRequestModal} onClose={() => setLoadRequestModal(false)} closeButtonActive={false} outsideClose={false}>
                <div className='md:w-[60vw] w-[90vw] max-h-[90vh] '>
                    <div className='m-5 p-4 flex flex-col justify-center items-center'>
                        <h3 className='text-xl mb-4 text-offBlue font-bold'>Create Wallet Load Request</h3>
                        <div className="flex flex-col gap-6 w-full">
                            <fieldset className="flex flex-col gap-2 px-6 py-4 border-[1px] border-inactive border-opacity-20 rounded-[5px] bg-secondaryLight">
                                <legend className='text-offBlue px-2 flex gap-1 items-center'><span>Load Amount</span><Tooltip children={<MdInfo />} content={"Amount of EG Coins you want to load"} /></legend>
                                <div className='grid md:grid-cols-11 grid-cols-1 gap-y-2'>
                                    <div className="flex items-center col-span-5 h-12 bg-frameBG rounded-[5px]">
                                        <div className='px-3 h-full flex justify-center items-center rounded-[5px] bg-secondary'>EG Coin</div>
                                        <input name='coin' type="number" placeholder='eg. 50' min={50} className='h-full w-auto bg-transparent py-2 px-3 rounded-[5px] placeholder:text-sm placeholder:text-inactive focus:outline-none' />
                                    </div>
                                    <div className='col-span-1 flex items-center justify-center'><CgArrowsExchange className='text-2xl' /></div>
                                    <div className="flex items-center col-span-5 h-12 bg-frameBG rounded-[5px]">
                                        <div className='px-3 h-full flex justify-center items-center rounded-[5px] bg-secondary'>NPR</div>
                                        <input name='transaction_amount' type="number" placeholder='eg. 50' className='h-full w-full bg-transparent py-2 px-3 rounded-[5px] placeholder:text-sm placeholder:text-inactive focus:outline-none' />
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
                                            <select defaultValue={'esewa'} name="payer_payment_method" id="payer_payment_method" className='custom-dropdown bg-frameBG text-offBlue border-[0.8px] border-inactive border-opacity-30 h-full focus:outline-none'>
                                                <option value="esewa">Esewa</option>
                                                <option value="khalti">Khalti</option>
                                                <option value="mobile_banking">Mobile Banking</option>
                                            </select>
                                        </div>


                                        {/* Input fields based on payment method */}
                                        <div className="flex flex-col gap-3">
                                            <div className="relative">
                                                <input type="text" id="payer_name" name='payer_name' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus  peer" placeholder=" " />
                                                <label for="payer_name" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10 origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Payer Name (as in Payment Method)</label>
                                            </div>

                                            {/* Particular to payment method -- start */}
                                            <div className="relative">
                                                <input type="text" id="payer_esewa_id" name='payer_esewa_id' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus peer" placeholder="" />
                                                <label for="payer_esewa_id" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10 origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Payer Esewa ID (number/email)</label>
                                            </div>
                                            <div className="relative">
                                                <input type="text" id="esewa_transaction_id" name='esewa_transaction_id' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus peer" placeholder=" " />
                                                <label for="esewa_transaction_id" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10 origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center gap-1"><span>Transaction ID</span><Tooltip children={<MdInfo />} content={"Enter Transaction ID obtained after payment confirmation."} /></label>
                                            </div>
                                            <div className="relative">
                                                <input type="text" id="esewa_remarks" name='esewa_remarks' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus peer" placeholder=" " />
                                                <label for="esewa_remarks" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10 origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center gap-1"><span>Remarks</span><Tooltip children={<MdInfo />} content={"Enter Remarks you put when making payment. (Recommended remark is 'EG Topup')"} /></label>
                                            </div>
                                            {/* Particular to payment method -- end */}

                                            <div className="relative">
                                                <input type="date" id="transaction_date" name='transaction_date' className="block px-2.5 py-4 w-full text-base  bg-transparent rounded-[5px] border-[0.8px] border-inactive border-opacity-30 appearance-none focus:outline-none focus:ring-0 focus:border-openStatus peer" placeholder=" " />
                                                <label for="transaction_date" className="absolute text-sm duration-150 transform -translate-y-3 scale-90 top-1 z-10 origin-[0] bg-secondary px-2 peer-focus:px-2 peer-focus:text-offBlue text-offBlue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-[.80] peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center gap-1"><span>Transaction Date</span><Tooltip children={<MdInfo />} content={"Date when you made the payment."} /></label>
                                            </div>

                                        </div>

                                    </fieldset>


                                    <fieldset className="col-span-1 flex flex-col gap-3 bg-secondary p-3 pt-2 rounded-[5px]">
                                        <legend className='bg-primary text-secondary text-sm px-3 py-1 rounded-3xl font-semibold flex items-center gap-1'><span>To</span> <span>(Payee Details)</span><Tooltip children={<MdInfo />} content={"This is how we receive your payment."} /></legend>

                                        <div className="flex flex-col">
                                            <label htmlFor="payee_payment_method" className='text-sm my-2 text-offBlue'>Pay To This Account </label>
                                            <select defaultValue={'esewa'} name="payee_payment_method" id="payee_payment_method" className='custom-dropdown border-[0.8px] border-inactive border-opacity-30 bg-frameBG text-offBlue h-full focus:outline-none'>
                                                <option value="esewa">Esewa</option>
                                                <option value="khalti">Khalti</option>
                                                <option value="bank_transfer">Bank Transfer</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-6 my-2">
                                            <div className='text-offBlue'><span className='text-inactive'>Esewa ID (email):</span> <strong className='bg-secondaryLight px-2 py-1 rounded-[5px]'>jsanjiv926@gmail.com</strong></div>
                                            <div className='text-offBlue'><span className='text-inactive'>Payee Esewa Name:</span> <strong className='bg-secondaryLight px-2 py-1 rounded-[5px]'>Ra*** Jaiswal</strong></div>
                                        </div>

                                    </fieldset>

                                </div>
                                <p className='text-[15px] text-inactive my-2'><strong>Note:</strong> We recommend you to keep a screenshot of payment made in case any issue arrives.</p>
                            </fieldset>

                        </div>
                        <div className="flex mt-6 justify-center gap-10">
                            <button onClick={() => setLoadRequestModal(false)} className='bg-secondaryLight rounded-[5px] px-3 py-2'>Cancel</button>
                            <button className='bg-primary text-secondary font-semibold rounded-[5px] px-3 py-2'>Submit</button>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    )
}
