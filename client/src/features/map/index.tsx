import { useRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import LocatonMaker from '@/components/LocationMarker'
import MinimapControl from '@/components/MinimapControl'

function MapScreen() {
    const mapRef = useRef(null);
    const latitude = 51.505;
    const longitude = -0.09;
    return (
        <div className='overflow-hidden'>
            <MapContainer center={[latitude, longitude]} zoom={10} ref={mapRef} style={{ height: "100vh", width: "100vw" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MinimapControl position="topright" zoom={1} />
                <LocatonMaker />
            </MapContainer>
        </div>
    )
}

export default MapScreen