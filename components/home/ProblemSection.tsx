"use client"
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FiX, FiCheck, FiClock, FiDollarSign, FiUsers, FiSmartphone, FiPrinter, FiEye } from 'react-icons/fi';

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
            problem: "Spending hours updating printed catalogs every time prices change",
            solution: "Update your digital catalog in minutes, not hours. Changes go live instantly.",
            icon: <FiPrinter className="w-6 h-6" />,
            color: "from-product-primary/20 to-product-primary/10",
            iconColor: "text-product-primary",
            iconBg: "bg-product-primary/10"
        },
        {
            problem: "Customers can't see your services when you're closed",
            solution: "Your catalog is available 24/7 on any device. Never miss a potential customer.",
            icon: <FiSmartphone className="w-6 h-6" />,
            color: "from-product-secondary/20 to-product-secondary/10",
            iconColor: "text-product-secondary",
            iconBg: "bg-product-secondary/10"
        },
        {
            problem: "Losing customers to competitors with better online presence",
            solution: "Professional digital catalogs that impress customers and build trust.",
            icon: <FiUsers className="w-6 h-6" />,
            color: "from-product-primary/20 to-product-primary-accent/10",
            iconColor: "text-product-primary-accent",
            iconBg: "bg-product-primary-accent/10"
        },
        {
            problem: "High printing costs and environmental waste",
            solution: "Go digital and save money while helping the environment. No more wasted paper.",
            icon: <FiDollarSign className="w-6 h-6" />,
            color: "from-product-primary/15 to-product-primary/5",
            iconColor: "text-product-primary",
            iconBg: "bg-product-primary/10"
        },
        {
            problem: "Customers can't easily share your services with others",
            solution: "One-click sharing via QR codes and links. Your catalog spreads organically.",
            icon: <FiEye className="w-6 h-6" />,
            color: "from-product-secondary/15 to-product-secondary/5",
            iconColor: "text-product-secondary",
            iconBg: "bg-product-secondary/10"
        },
        {
            problem: "No way to track which services are most popular",
            solution: "Get insights into customer behavior and optimize your offerings with analytics.",
            icon: <FiClock className="w-6 h-6" />,
            color: "from-product-primary-accent/20 to-product-primary-accent/10",
            iconColor: "text-product-primary-accent",
            iconBg: "bg-product-primary-accent/10"
        }
    ];

    return (
        <motion.div 
            className="max-w-7xl mx-auto"
            variants={containerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
        >
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {problems.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className="group relative"
                        variants={cardVariants}
                        whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        
                        {/* Card content */}
                        <div className="relative bg-product-background rounded-2xl p-8 shadow-[0_2px_6px_rgba(0,0,0,0.06)] border border-product-border hover:shadow-[0_4px_10px_rgba(229,194,48,0.15)] transition-all duration-300 h-full">
                            <div className="flex items-start gap-6">
                                <div className={`flex-shrink-0 w-16 h-16 ${item.iconBg} rounded-xl flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-semibold text-product-foreground mb-4 leading-tight">
                                        {item.problem}
                                    </h4>
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-product-primary/10 rounded-lg flex items-center justify-center text-product-primary mt-1 group-hover:scale-110 transition-transform duration-300">
                                            <FiCheck className="w-5 h-5" />
                                        </div>
                                        <p className="text-product-foreground-accent leading-relaxed text-lg">
                                            {item.solution}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA Section */}
            <motion.div 
                className="text-center p-12 bg-gradient-to-r from-product-primary/10 via-product-primary/5 to-product-primary/10 rounded-3xl border border-product-primary/20 relative overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
                variants={cardVariants}
            >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,193,7,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,193,7,0.1),transparent_50%)]"></div>
                
                <div className="relative">
                    <h4 className="text-3xl font-semibold text-product-foreground mb-4">
                        Ready to Solve These Problems?
                    </h4>
                    <p className="text-product-foreground-accent text-xl max-w-2xl mx-auto leading-relaxed">
                        Join our early access list and be among the first to transform your business catalog.
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProblemSection; 