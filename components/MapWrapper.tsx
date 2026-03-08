"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./Map"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-slate-100 dark:bg-white/5 animate-pulse flex items-center justify-center">
            <span className="material-icons text-mosque/40 text-4xl">map</span>
        </div>
    ),
});

interface MapWrapperProps {
    location: string;
}

export default function MapWrapper({ location }: MapWrapperProps) {
    return <DynamicMap location={location} />;
}
