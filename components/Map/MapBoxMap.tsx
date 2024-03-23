"use client"
import React, { useContext, useEffect, useRef } from 'react'
import Map, { Marker } from 'react-map-gl';
import { UserLocationContext } from '../context/UserLocationContext';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapPin from "./MapPin.svg"
import Markes from './Markes';
import { SourceCoordinatesContext } from '../context/SourceCoordinatesContext';
import { DestinationCoordinatesContext } from '../context/DestinationCoordinatesContext';

const MapBoxMap = () => {
    const { userLocation, setuserLocation } = useContext(UserLocationContext);
    const { sourceCoordinates, setsourceCoordinates } = useContext(SourceCoordinatesContext);
    const { destinationCoordinates, setdestinationCoordinates } = useContext(DestinationCoordinatesContext);

    const mapRef = useRef<any>()
    useEffect(() => {
        if (sourceCoordinates) {
            mapRef.current?.flyTo(
                {
                    center: [
                        sourceCoordinates.longitude,
                        sourceCoordinates.latitude,
                    ],
                    duration: 2500
                }
            )
        }

    }, [sourceCoordinates])

    useEffect(() => {
        if (destinationCoordinates) {
            mapRef.current?.flyTo(
                {
                    center: [
                        destinationCoordinates.longitude,
                        destinationCoordinates.latitude,
                    ],
                    duration: 2500
                }
            )
        }

    }, [destinationCoordinates])

    return (
        <div className='p-3'>
            <h2 className='text-[20px] font-semibold'>Map</h2>
            <div className='rounded-lg overflow-hidden'>
                {userLocation ?
                    <Map
                        ref={mapRef}
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                        initialViewState={{
                            longitude: userLocation.longitude,
                            latitude: userLocation.latitude,
                            zoom: 14
                        }}
                        style={{ width: "100%", height: 560, borderRadius: 10 }}
                        mapStyle="mapbox://styles/mapbox/streets-v9">
                        {/* <Marker
                            longitude={userLocation.longitude}
                            latitude={userLocation.latitude}
                            anchor="bottom" >
                            <div className='w-10 h-10'>
                                <svg
                                    height="50px"
                                    width="50px"
                                    version="1.1"
                                    id="Capa_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 293.334 293.334"
                                    xmlSpace="preserve"
                                >
                                    <g>
                                        <g>
                                            <path fill="#010002" d="M146.667,0C94.903,0,52.946,41.957,52.946,93.721c0,22.322,7.849,42.789,20.891,58.878
                    c4.204,5.178,11.237,13.331,14.903,18.906c21.109,32.069,48.19,78.643,56.082,116.864c1.354,6.527,2.986,6.641,4.743,0.212
                    c5.629-20.609,20.228-65.639,50.377-112.757c3.595-5.619,10.884-13.483,15.409-18.379c6.554-7.098,12.009-15.224,16.154-24.084
                    c5.651-12.086,8.882-25.466,8.882-39.629C240.387,41.962,198.43,0,146.667,0z M146.667,144.358
                    c-28.892,0-52.313-23.421-52.313-52.313c0-28.887,23.421-52.307,52.313-52.307s52.313,23.421,52.313,52.307
                    C198.98,120.938,175.559,144.358,146.667,144.358z"/>
                                            <circle fill="#010002" cx="146.667" cy="90.196" r="21.756" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </Marker> */}

                        <Markes />
                    </Map> : null}
            </div>
        </div>
    )
}

export default MapBoxMap