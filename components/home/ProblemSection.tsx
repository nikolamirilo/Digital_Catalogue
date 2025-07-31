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
            staggerChildren: 0.1,
        }
    }
};

const childVariants = {
    offscreen: {
        opacity: 0,
        x: -50,
    },
    onscreen: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            bounce: 0.2,
            duration: 1,
        }
    },
};

const ProblemSection: React.FC = () => {
    const problems = [
        {
            problem: "Spending hours updating printed catalogs every time prices change",
            solution: "Update your digital catalog in minutes, not hours. Changes go live instantly.",
            icon: <FiPrinter className="w-6 h-6" />
        },
        {
            problem: "Customers can't see your services when you're closed",
            solution: "Your catalog is available 24/7 on any device. Never miss a potential customer.",
            icon: <FiSmartphone className="w-6 h-6" />
        },
        {
            problem: "Losing customers to competitors with better online presence",
            solution: "Professional digital catalogs that impress customers and build trust.",
            icon: <FiUsers className="w-6 h-6" />
        },
        {
            problem: "High printing costs and environmental waste",
            solution: "Go digital and save money while helping the environment. No more wasted paper.",
            icon: <FiDollarSign className="w-6 h-6" />
        },
        {
            problem: "Customers can't easily share your services with others",
            solution: "One-click sharing via QR codes and links. Your catalog spreads organically.",
            icon: <FiEye className="w-6 h-6" />
        },
        {
            problem: "No way to track which services are most popular",
            solution: "Get insights into customer behavior and optimize your offerings with analytics.",
            icon: <FiClock className="w-6 h-6" />
        }
    ];

    return (
        <motion.div 
            className="grid gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
        >
            <motion.div 
                className="text-center mb-8"
                variants={childVariants}
            >
                <h3 className="text-2xl font-semibold text-product-foreground mb-4">
                    Sound Familiar? These Problems Cost You Money Every Day
                </h3>
                <p className="text-product-foreground-accent max-w-2xl mx-auto">
                    Small businesses lose thousands every year due to outdated catalog management.
                    Here's how digital catalogs solve the most common problems:
                </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
                {problems.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className="bg-white rounded-xl p-6 shadow-sm border border-product-border hover:shadow-md transition-shadow"
                        variants={childVariants}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-product-foreground mb-3">
                                    {item.problem}
                                </h4>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mt-1">
                                        <FiCheck className="w-4 h-4" />
                                    </div>
                                    <p className="text-product-foreground-accent leading-relaxed">
                                        {item.solution}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                className="text-center mt-8 p-6 bg-product-primary/5 rounded-xl"
                variants={childVariants}
            >
                <h4 className="text-xl font-semibold text-product-foreground mb-2">
                    Ready to Solve These Problems?
                </h4>
                <p className="text-product-foreground-accent">
                    Join our early access list and be among the first to transform your business catalog.
                </p>
            </motion.div>
        </motion.div>
    );
};

export default ProblemSection; 