"use client"
import { motion, Variants } from 'framer-motion';
import { ctaDetails } from "@/data/cta"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowRight, FiCheck, FiShield, FiClock, FiGift } from "react-icons/fi";

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
        y: 50,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            bounce: 0.2,
            duration: 0.8,
        }
    },
};

const CTA: React.FC = () => {
    return (
        <section id="cta" className="mt-10 mb-5 lg:my-20">
            <div className="relative h-full w-full z-10 mx-auto py-12 sm:py-20">
                <div className="h-full w-full">
                    <div className="rounded-3xl opacity-95 absolute inset-0 -z-10 h-full w-full bg-[#050a02] bg-[linear-gradient(to_right,#12170f_1px,transparent_1px),linear-gradient(to_bottom,#12170f_1px,transparent_1px)] bg-[size:6rem_4rem]">
                        <div className="rounded-3xl absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_500px,#1C1C02,transparent)]"></div>
                    </div>

                    <motion.div 
                        className="h-full flex flex-col items-center justify-center text-white text-center px-5"
                        variants={containerVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true }}
                    >
                        <motion.h2 
                            className="text-2xl sm:text-3xl md:text-5xl md:leading-tight font-semibold mb-4 max-w-3xl"
                            variants={childVariants}
                        >
                            {ctaDetails.heading}
                        </motion.h2>

                        <motion.p 
                            className="mx-auto max-w-2xl md:px-5 text-lg mb-8"
                            variants={childVariants}
                        >
                            {ctaDetails.subheading}
                        </motion.p>

                        {/* Early access benefits */}
                        <motion.div 
                            className="mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto"
                            variants={childVariants}
                        >
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <FiGift className="w-5 h-5 text-product-primary" />
                                <span className="font-semibold text-product-primary">Early Access Benefits</span>
                            </div>
                            <div className="text-sm space-y-1">
                                <p>• Lifetime 20% discount</p>
                                <p>• Priority support access</p>
                                <p>• Early feature access</p>
                            </div>
                        </motion.div>

                        {/* Strong CTA button */}
                        <motion.div 
                            className="flex flex-col sm:flex-row items-center gap-4 mb-6"
                            variants={childVariants}
                        >
                            <Link href="/auth?mode=signup">
                                <Button variant="cta" className="text-lg px-8 py-4 h-14">
                                    Join Early Access List
                                    <FiArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/playground">
                                <Button variant="outline" className="text-lg px-8 py-4 h-14 border-2 border-white text-white hover:bg-white hover:text-black">
                                    See Demo
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Trust indicators for pre-launch */}
                        <motion.div 
                            className="flex items-center justify-center gap-6 text-sm text-gray-300"
                            variants={childVariants}
                        >
                            <div className="flex items-center gap-2">
                                <FiCheck className="w-4 h-4 text-product-primary" />
                                <span>No commitment required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiClock className="w-4 h-4 text-product-primary" />
                                <span>Launching September 2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiShield className="w-4 h-4 text-product-primary" />
                                <span>We'll notify you first</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default CTA