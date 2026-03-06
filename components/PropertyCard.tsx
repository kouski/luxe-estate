import React from "react";
import { Property } from "../lib/properties";
import { togglePropertyFeatured } from "@/app/actions";

export function PropertyCard({ property, hiddenClass }: { property: Property, hiddenClass?: string }) {
    const getTagColor = (tag?: string) => {
        if (tag === "FOR RENT") return "bg-mosque/90";
        return "bg-nordic-dark/90";
    };

    const toggleAction = togglePropertyFeatured.bind(null, property.id, property.featured);

    return (
        <article className={`bg-white dark:bg-white/5 rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 group cursor-pointer h-full flex flex-col ${hiddenClass || ""}`}>
            <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt={property.image_alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={property.image_url}
                />
                <form action={toggleAction} className="absolute top-3 right-3 z-10">
                    <button type="submit" className={`p-2 rounded-full transition-colors ${property.featured ? 'bg-mosque text-white' : 'bg-white/90 dark:bg-black/50 text-nordic-dark hover:bg-mosque hover:text-white'}`}>
                        <span className="material-icons text-lg">{property.featured ? 'favorite' : 'favorite_border'}</span>
                    </button>
                </form>
                {property.tag && (
                    <div className={`absolute bottom-3 left-3 ${getTagColor(property.tag)} text-white text-xs font-bold px-2 py-1 rounded`}>
                        {property.tag}
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-lg text-nordic-dark dark:text-white">
                        {property.price}
                        {property.price_suffix && <span className="text-sm font-normal text-nordic-muted">{property.price_suffix}</span>}
                    </h3>
                </div>
                <h4 className="text-nordic-dark dark:text-gray-200 font-medium truncate mb-1">{property.title}</h4>
                <p className="text-nordic-muted text-xs mb-4">{property.location}</p>
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/10">
                    <div className="flex items-center gap-1 text-nordic-muted text-xs">
                        <span className="material-icons text-sm text-mosque/80">king_bed</span> {property.beds}
                    </div>
                    <div className="flex items-center gap-1 text-nordic-muted text-xs">
                        <span className="material-icons text-sm text-mosque/80">bathtub</span> {property.baths}
                    </div>
                    <div className="flex items-center gap-1 text-nordic-muted text-xs">
                        <span className="material-icons text-sm text-mosque/80">square_foot</span> {property.area}m²
                    </div>
                </div>
            </div>
        </article>
    );
}
