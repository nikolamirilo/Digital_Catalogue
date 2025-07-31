"use client"
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FiCheck, FiClock, FiDollarSign, FiUsers, FiSmartphone, FiEye, FiTrendingUp } from 'react-icons/fi';

const containerVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 100
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            bounce: 0.2,
            duration: 0.9,
            delayChildren: 0.2,
            staggerChildren: 0.15,
        }
    }
};

const cardVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 50,
        scale: 0.9,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            bounce: 0.3,
            duration: 0.8,
        }
    },
};

const ProblemSection: React.FC = () => {
    const problems = [
        {
            problem: "Losing $500+ monthly on printed catalogs",
            description: "Spending hours updating printed catalogs every time prices change, only to reprint and redistribute them. This affects any business that offers services.",
            solution: "Update your digital catalogue in minutes, not hours. Save 90% on printing costs—no matter your industry.",
            icon: <FiDollarSign className="w-8 h-8" />,
        },
        {
            problem: "Missing 40% of potential sales when closed",
            description: "Customers can't see your services when you're closed, losing potential sales and revenue. This is a challenge for all service businesses.",
            solution: "Your catalogue is available 24/7 on any device. Never miss a potential customer again, whatever your business.",
            icon: <FiSmartphone className="w-8 h-8" />,
        },
        {
            problem: "Wasting 10+ hours weekly on catalog updates",
            description: "Spending hours updating printed catalogs every time prices change.",
            solution: "Update your digital catalog in minutes, not hours. Changes go live instantly.",
            icon: <FiClock className="w-7 h-7" />,
        },
        {
            problem: "Losing customers to competitors with better online presence",
            description: "Modern customers expect digital solutions and choose businesses with better online presence.",
            solution: "Professional digital catalogs that impress customers and build trust.",
            icon: <FiUsers className="w-7 h-7" />,
        },
        {
            problem: "Poor customer sharing - missing word-of-mouth marketing",
            description: "Customers can't easily share your services with others, missing word-of-mouth marketing opportunities.",
            solution: "One-click sharing via QR codes and links. Your catalog spreads organically.",
            icon: <FiEye className="w-7 h-7" />,
        },
        {
            problem: "No customer insights - flying blind",
            description: "No way to track which services are most popular or understand customer preferences.",
            solution: "Get insights into customer behavior and optimize your offerings with analytics.",
            icon: <FiTrendingUp className="w-7 h-7" />,
        }
    ];

    // Highlight numbers/statistics in product primary color
    const highlightNumbers = (text: string) => {
        return text.replace(/(\$[\d,]+|\d+%)/g, '<span class="font-bold text-product-primary">$1</span>');
    };

    return (
        <motion.div 
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {problems.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className="group relative"
                        variants={cardVariants}
                        whileHover={{
                            scale: 1.005,
                            boxShadow: "var(--product-hover-shadow)",
                            transition: { duration: 0.15, ease: 'easeOut' }
                        }}
                    >
                        <div className="relative bg-product-background text-product-foreground rounded-xl border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow hover:scale-[var(--product-hover-scale)] transition-all duration-300 ease-out h-full flex flex-col">
                            {/* Problem Section */}
                            <div className="p-6 pb-4 flex gap-4 items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-product-primary/10 rounded-xl flex items-center justify-center text-product-primary">
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-product-foreground leading-tight mb-1">
                                        <span dangerouslySetInnerHTML={{ __html: highlightNumbers(item.problem) }} />
                                    </h4>
                                    <p className="text-product-foreground-accent text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            {/* Solution Section */}
                            <div className="bg-product-hover-background rounded-b-xl p-6 pt-4 flex gap-3 items-start mt-auto">
                                <div className="flex-shrink-0 w-12 h-12 bg-product-primary/10 rounded-xl flex items-center justify-center text-product-primary">
                                    <FiCheck className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-product-primary font-semibold text-xs mb-1 uppercase tracking-wider">Our Solution</p>
                                    <p className="text-product-foreground text-sm leading-relaxed">
                                        {item.solution}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ProblemSection; 