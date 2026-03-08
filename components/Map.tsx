"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface MapProps {
    location: string;
}

export default function Map({ location }: MapProps) {
    // Using a mock coordinate for demonstration, since we don't have lat/lng in the DB yet.
    // In a real app, we would use a geocoding service based on the `location` string.
    const position: [number, number] = [37.4419, -122.1430]; // Palo Alto, CA

    return (
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
            className="rounded-lg"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}></Marker>
        </MapContainer>
    );
}
