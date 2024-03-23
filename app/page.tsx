"use client"
import Booking from "@/components/Booking/Booking";
import { DestinationCoordinatesContext } from "@/components/context/DestinationCoordinatesContext";
import { SourceCoordinatesContext } from "@/components/context/SourceCoordinatesContext";
import { UserLocationContext } from "@/components/context/UserLocationContext";
import MapBoxMap from "@/components/Map/MapBoxMap";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setuserLocation] = useState<any>()
  const [sourceCoordinates, setsourceCoordinates] = useState<any>()
  const [destinationCoordinates, setdestinationCoordinates] = useState<any>()

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setuserLocation(
        {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }
      )
    })
  }
  useEffect(() => {
    getUserLocation()
  }, [])
  return (
    <div>

      <UserLocationContext.Provider value={{ userLocation, setuserLocation }}>
        <DestinationCoordinatesContext.Provider value={{ destinationCoordinates, setdestinationCoordinates }}>
          <SourceCoordinatesContext.Provider value={{ sourceCoordinates, setsourceCoordinates }}>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className=""><Booking /></div>
              <div className="col-span-2"><MapBoxMap /></div>
            </div>
          </SourceCoordinatesContext.Provider>
        </DestinationCoordinatesContext.Provider>
      </UserLocationContext.Provider>

    </div >
  );
}
