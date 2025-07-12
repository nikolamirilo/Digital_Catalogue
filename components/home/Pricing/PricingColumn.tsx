"use client"
import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useState } from "react";

import { IPricing } from "@/types";

interface Props {
    tier: IPricing;
    highlight?: boolean;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight }: Props) => {
    const { name, price, features } = tier;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={clsx(
                "group relative w-full max-w-sm mx-auto bg-white text-product-foreground rounded-xl border border-gray-200 lg:max-w-full transition-all duration-300 ease-out",
                { 
                    "shadow-xl": highlight,
                    "shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1": !highlight,
                    "shadow-2xl scale-110 -translate-y-2": highlight && isHovered,
                    "shadow-xl scale-105 -translate-y-1": !highlight && isHovered
                }
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200 rounded-t-xl">
                <h3 className={clsx(
                    "text-2xl font-semibold mb-4 transition-colors duration-300",
                    { "text-product-primary": highlight && isHovered }
                )}>
                    {name}
                </h3>
                
                <p className={clsx(
                    "text-3xl md:text-5xl font-bold mb-6 transition-all duration-300",
                    { 
                        "text-product-secondary": highlight,
                        "text-product-primary": highlight && isHovered,
                        "scale-105": isHovered
                    }
                )}>
                    <span className="inline-block transition-transform duration-300">
                        {typeof price === 'number' ? `$${price}` : price}
                    </span>
                    {typeof price === 'number' && (
                        <span className="text-lg font-normal text-gray-600 ml-1 transition-colors duration-300 group-hover:text-product-foreground-accent">
                            /mo
                        </span>
                    )}
                </p>

                <button className={clsx(
                    "relative w-full py-3 px-4 rounded-full font-semibold transition-all duration-300 transform overflow-hidden group/btn",
                    { 
                        "bg-product-primary hover:bg-product-primary-accent text-product-foreground shadow-lg hover:shadow-xl": highlight,
                        "bg-hero-product-background hover:bg-product-primary text-product-foreground shadow-md hover:shadow-lg": !highlight
                    }
                )}>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Get Started
                        <svg 
                            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </button>
            </div>

            {/* Features Section */}
            <div className="p-6">
                <p className="font-bold mb-2 text-sm uppercase tracking-wider text-product-foreground transition-colors duration-300 group-hover:text-product-primary">
                    FEATURES
                </p>
                <p className="text-product-foreground-accent mb-5 text-sm transition-colors duration-300 group-hover:text-product-foreground">
                    Everything in basic, plus...
                </p>
                
                <ul className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                        <li 
                            key={index} 
                            className="flex items-center transition-all duration-300 hover:translate-x-2"
                        >
                            <BsFillCheckCircleFill className={clsx(
                                "h-5 w-5 mr-3 transition-all duration-300",
                                { 
                                    "text-home-secondary": !isHovered,
                                    "text-product-primary scale-110": isHovered
                                }
                            )} />
                            <span className={clsx(
                                "text-product-foreground-accent transition-all duration-300",
                                { "text-product-foreground font-medium": isHovered }
                            )}>
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Popular badge for highlighted plan */}
                {highlight && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-product-primary to-product-secondary text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg transition-all duration-300 group-hover:scale-105">
                            Most Popular
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PricingColumn