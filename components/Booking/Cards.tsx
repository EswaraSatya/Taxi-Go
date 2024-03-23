import React, { useState } from 'react'
import CardsList from '../CardsList'
import Image from 'next/image'

const Cards = () => {
    const [selectActivePayment, setselectActivePayment] = useState<any>()
    return (
        <div>
            <h2 className='font-semibold text-[14px] pt-7'>
                Payment Methods
            </h2>
            <div className='grid grid-cols-5 mt-2'>
                {
                    CardsList.map((card, index) => {
                        return (
                            <div onClick={() => {
                                setselectActivePayment(index)
                            }} className={`w-[50px] border-[1px] flex item-center justify-center hover:border-yellow-500 rounded-md hover:scale-110 transition-all ${selectActivePayment == index ? `border-yellow-500 border-[2px]` : ""}`}>
                                <Image alt={card.name} width={30} height={50} src={card.image_url} />


                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cards