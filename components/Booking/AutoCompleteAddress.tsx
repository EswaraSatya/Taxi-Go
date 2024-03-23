import React, { useContext, useEffect, useState } from 'react'
import { SourceCoordinatesContext } from '../context/SourceCoordinatesContext';
import { DestinationCoordinatesContext } from '../context/DestinationCoordinatesContext';


export function debounce(func: any, delay: any): any {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}



const AutoCompleteAddress = () => {
    const SESSION_TOKEN = "0d3f8be6-e3c4-4bd1-88e3-dafa3f304778"
    const MAPBOX_RETRIEVE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/"

    const [source, setSource] = useState<any>()
    const [addressList, setaddressList] = useState<any>()
    const [sourceChange, setsourceChange] = useState<any>(false)
    const [destinationChange, setdestinationChange] = useState<any>(false)
    const [destination, setdestination] = useState<any>()

    const { sourceCoordinates, setsourceCoordinates } = useContext(SourceCoordinatesContext);
    const { destinationCoordinates, setdestinationCoordinates } = useContext(DestinationCoordinatesContext);


    const getAddress = async () => {
        const res = await fetch(`/api/search-address?q=${source}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const searchResult = await res.json();
        setaddressList(searchResult)
        console.log(searchResult, "searchResultsearchResult")
    }

    useEffect(() => {
        debounce(getAddress(), 300);
    }, [source])

    const onSourceAddressClick = async (item: any) => {
        setSource(item.full_address);
        setaddressList([])
        setsourceChange(false)
        const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token=" + SESSION_TOKEN + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
        const result = await res.json()
        setsourceCoordinates({
            latitude: result.features[0].geometry.coordinates[1],
            longitude: result.features[0].geometry.coordinates[0]
        })
        console.log(result, "resultresult")
    }


    const onDestinationAddressClick = async (item: any) => {
        setdestination(item.full_address);
        setaddressList([])
        setdestinationChange(false)
        const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token=" + SESSION_TOKEN + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
        const result = await res.json()
        setdestinationCoordinates({
            latitude: result.features[0].geometry.coordinates[1],
            longitude: result.features[0].geometry.coordinates[0]
        })
    }

    return (
        <div className='mt-2'>
            <div>
                <div>
                    <label className='text-gray-400'>Where from ?</label>
                    <input value={source} onChange={(e) => {
                        setSource(e.target.value); setsourceChange(true)
                    }} className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-100' type='text'></input>
                    {addressList?.suggestions && sourceChange && (
                        <div>
                            {addressList.suggestions
                                .map((item: any, index: any) => (
                                    <h2
                                        onClick={() => {
                                            onSourceAddressClick(item);
                                        }}
                                        className="p-3 hover:bg-gray-100 cursor-pointer"
                                        key={index}
                                    >
                                        {item.place_formatted ? item.place_formatted : item.full_address}
                                    </h2>
                                ))}
                        </div>
                    )}
                </div>
                <div className='mt-2'>
                    <label className='text-gray-400'>Where to ?</label>
                    <input value={destination} onChange={(e) => {
                        setdestination(e.target.value);
                        setdestinationChange(true)
                    }} className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-100' type='text'></input>
                    {addressList?.suggestions && destinationChange && <div>
                        {
                            addressList?.suggestions
                                .map((item: any, index: any) => {
                                    return (
                                        <h2 onClick={() => {
                                            onDestinationAddressClick(item)
                                        }} className='p-3 hover:bg-gray-100 cursor-pointer' key={index}>
                                            {item.place_formatted ? item.place_formatted : item.full_address}
                                        </h2>
                                    )
                                })
                        }
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default AutoCompleteAddress