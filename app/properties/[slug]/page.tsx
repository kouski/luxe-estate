import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { getPropertyBySlug } from "@/lib/properties";
import { Metadata } from "next";
import MapWrapper from "@/components/MapWrapper";

interface PropertyPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const property = await getPropertyBySlug(resolvedParams.slug);

    if (!property) {
        return {
            title: "Property Not Found | LuxeEstate",
        };
    }

    return {
        title: `${property.title} | LuxeEstate`,
        description: `Stunning ${property.beds} bed, ${property.baths} bath property in ${property.location} for $${property.price}${property.price_suffix || ''}.`,
        openGraph: {
            images: [{ url: property.images[0] }],
        },
    };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
    const resolvedParams = await params;
    const property = await getPropertyBySlug(resolvedParams.slug);

    if (!property) {
        notFound();
    }

    // Use the images array directly — first image is the hero, rest form the gallery
    const galleryImages = property.images;

    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                    {/* Main Visual Section */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm group">
                            <Image
                                src={property.images[0]}
                                alt={property.image_alt || property.title}
                                fill
                                priority
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                                {property.featured && (
                                    <span className="bg-mosque text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                        Featured
                                    </span>
                                )}
                                {property.tag && (
                                    <span className="bg-white/90 backdrop-blur text-nordic-dark text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                        {property.tag}
                                    </span>
                                )}
                            </div>
                            <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic-dark px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2">
                                <span className="material-icons text-sm">grid_view</span>
                                View All Photos
                            </button>
                        </div>

                        {/* Gallery Carousel Thumbnail */}
                        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
                            {galleryImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`flex-none w-48 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer snap-start transition-opacity ${idx === 0 ? 'ring-2 ring-mosque ring-offset-2 ring-offset-clear-day' : 'opacity-70 hover:opacity-100'}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Property image ${idx + 1}`}
                                        width={192}
                                        height={144}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sticky Sidebar Info */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white dark:bg-nordic-dark/10 p-6 rounded-xl shadow-sm border border-mosque/5">
                                <div className="mb-4">
                                    <h1 className="text-4xl font-display font-light text-nordic-dark dark:text-white mb-2">
                                        ${Number(property.price).toLocaleString()}
                                        {property.price_suffix && <span className="text-lg text-nordic-muted ml-1 relative -top-3">/{property.price_suffix}</span>}
                                    </h1>
                                    <p className="text-nordic-muted font-medium flex items-center gap-1">
                                        <span className="material-icons text-mosque text-sm">location_on</span>
                                        {property.location}
                                    </p>
                                </div>
                                <div className="h-px bg-slate-100 dark:bg-white/10 my-6"></div>
                                <div className="flex items-center gap-4 mb-6">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        alt="Sarah Jenkins"
                                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-nordic-dark dark:text-white">Sarah Jenkins</h3>
                                        <div className="flex items-center gap-1 text-xs text-mosque font-medium">
                                            <span className="material-icons text-[14px]">star</span>
                                            <span>Top Rated Agent</span>
                                        </div>
                                    </div>
                                    <div className="ml-auto flex gap-2">
                                        <button className="p-2 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors">
                                            <span className="material-icons text-sm">chat</span>
                                        </button>
                                        <button className="p-2 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors">
                                            <span className="material-icons text-sm">call</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button className="w-full bg-mosque hover:bg-primary-hover text-white py-4 px-6 rounded-lg font-medium transition-all shadow-lg shadow-mosque/20 flex items-center justify-center gap-2 group">
                                        <span className="material-icons text-xl group-hover:scale-110 transition-transform">calendar_today</span>
                                        Schedule Visit
                                    </button>
                                    <button className="w-full bg-transparent border border-nordic-dark/10 hover:border-mosque text-nordic-dark/80 dark:text-white/80 hover:text-mosque py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                                        <span className="material-icons text-xl">mail_outline</span>
                                        Contact Agent
                                    </button>
                                </div>
                            </div>

                            {/* Map Section */}
                            <div className="bg-white dark:bg-nordic-dark/10 p-2 rounded-xl shadow-sm border border-mosque/5">
                                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 dark:bg-white/5">
                                    <MapWrapper location={property.location} />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                        <div className="w-8 h-8 bg-mosque rounded-full border-4 border-white shadow-lg animate-bounce flex items-center justify-center">
                                            <span className="material-icons text-white text-sm">home</span>
                                        </div>
                                    </div>
                                    <a
                                        className="absolute bottom-2 right-2 bg-white/90 text-xs font-medium px-2 py-1 rounded shadow-sm text-nordic-dark hover:text-mosque z-10"
                                        href="#"
                                    >
                                        View on Map
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section below initial fold */}
                <div className="lg:col-span-8 lg:row-start-2 space-y-8">
                    <div className="bg-white dark:bg-nordic-dark/10 p-8 rounded-xl shadow-sm border border-mosque/5">
                        <h2 className="text-lg font-semibold mb-6 text-nordic-dark dark:text-white">Property Features</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                                <span className="material-icons text-mosque text-2xl mb-2">square_foot</span>
                                <span className="text-xl font-bold text-nordic-dark dark:text-white">{property.area}</span>
                                <span className="text-xs uppercase tracking-wider text-nordic-muted">Square Meters</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                                <span className="material-icons text-mosque text-2xl mb-2">bed</span>
                                <span className="text-xl font-bold text-nordic-dark dark:text-white">{property.beds}</span>
                                <span className="text-xs uppercase tracking-wider text-nordic-muted">Bedrooms</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                                <span className="material-icons text-mosque text-2xl mb-2">shower</span>
                                <span className="text-xl font-bold text-nordic-dark dark:text-white">{property.baths}</span>
                                <span className="text-xs uppercase tracking-wider text-nordic-muted">Bathrooms</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                                <span className="material-icons text-mosque text-2xl mb-2">directions_car</span>
                                <span className="text-xl font-bold text-nordic-dark dark:text-white">2</span>
                                <span className="text-xs uppercase tracking-wider text-nordic-muted">Garage</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-nordic-dark/10 p-8 rounded-xl shadow-sm border border-mosque/5">
                        <h2 className="text-lg font-semibold mb-4 text-nordic-dark dark:text-white">About this home</h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-nordic-muted leading-relaxed">
                            <p className="mb-4">
                                Experience modern luxury in this architecturally stunning home located in {property.location}.
                                Designed with an emphasis on indoor-outdoor living, the residence features high ceilings, premium finishes, and
                                exceptional natural light spanning across its {property.area} square meters of living space.
                            </p>
                            <p>
                                The open-concept kitchen is equipped with top-of-the-line appliances and custom cabinetry, perfect for culinary enthusiasts. Retreat to the primary suite, a sanctuary of relaxation with a spa-inspired bath and panoramic views.
                            </p>
                        </div>
                        <button className="mt-4 text-mosque font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                            Read more
                            <span className="material-icons text-sm">arrow_forward</span>
                        </button>
                    </div>

                    <div className="bg-white dark:bg-nordic-dark/10 p-8 rounded-xl shadow-sm border border-mosque/5">
                        <h2 className="text-lg font-semibold mb-6 text-nordic-dark dark:text-white">Amenities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {['Smart Home System', 'Swimming Pool', 'Central Heating & Cooling', 'Electric Vehicle Charging', 'Private Gym', 'Wine Cellar'].map((amenity, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-nordic-muted">
                                    <span className="material-icons text-mosque/60 text-sm">check_circle</span>
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-mosque/5 p-6 rounded-xl border border-mosque/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-nordic-dark rounded-full text-mosque shadow-sm">
                                <span className="material-icons">calculate</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-nordic-dark dark:text-white">Estimated Payment</h3>
                                <p className="text-sm text-nordic-muted">
                                    Starting from <strong className="text-mosque">${(Number(property.price) * 0.005).toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo</strong> with 20% down
                                </p>
                            </div>
                        </div>
                        <button className="whitespace-nowrap px-4 py-2 bg-white dark:bg-nordic-dark border border-nordic-dark/10 dark:border-white/10 rounded-lg text-sm font-semibold hover:border-mosque transition-colors text-nordic-dark dark:text-white">
                            Calculate Mortgage
                        </button>
                    </div>
                </div>
            </main>
            <footer className="bg-white dark:bg-nordic-dark/5 border-t border-slate-200 dark:border-white/5 mt-12 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm text-nordic-muted">
                        © 2026 LuxeEstate Inc. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <a className="text-nordic-muted hover:text-mosque transition-colors" href="#">
                            <span className="sr-only">Facebook</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
                        </a>
                        <a className="text-nordic-muted hover:text-mosque transition-colors" href="#">
                            <span className="sr-only">Twitter</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
