import React, { useState } from 'react'
import CarList from '../CarList'
import Image from 'next/image'

const Cars = () => {
    const [selectedCar, setselectedCar] = useState<any>()

    return (
        <div>
            <h2 className='font-semibold pt-2.5'>Select Car</h2>
            <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 '>
                {
                    CarList.map((car: any, index: any) => {
                        return (
                            <div onClick={() => {
                                setselectedCar(index)
                            }} key={index} className={`m-1 p-1 border-[2px] rounded-md hover:border-yellow-400 cursor-pointer ${index == selectedCar ? "border-yellow-500 border-[2px]" : ""}`}>
                                <Image
                                    src={car.image_url}
                                    alt={car.name}
                                    width={75}
                                    height={90}
                                    className='w-full'
                                />
                                <h2 className='text-[12px] font-semibold text-gray-400'>{car.model}
                                    <span className='float-right text-black font-medium'>{car.charge} $</span></h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cars