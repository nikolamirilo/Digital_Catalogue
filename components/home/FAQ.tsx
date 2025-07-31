"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";

import { faqs } from "@/data/faq";

const FAQ: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="border-b">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`mb-7 transition-all duration-700 ease-out ${
                            isVisible 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <Disclosure>
                            {({ open }) => (
                                <div className="group">
                                    <DisclosureButton className="flex items-center justify-between w-full px-4 pt-7 text-lg text-left border-t hover:bg-product-hover-background/50 transition-all duration-300 ease-out rounded-lg">
                                        <span className="text-xl font-semibold text-product-foreground group-hover:text-product-primary transition-colors duration-300">
                                            {faq.question}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {open ? (
                                                <BiMinus className="w-5 h-5 text-product-primary transition-all duration-300 ease-out transform rotate-0" />
                                            ) : (
                                                <BiPlus className="w-5 h-5 text-product-primary transition-all duration-300 ease-out transform rotate-0 group-hover:scale-110" />
                                            )}
                                        </div>
                                    </DisclosureButton>
                                    <DisclosurePanel className="px-4 pt-4 pb-2 text-product-foreground-accent overflow-hidden">
                                        <div className="animate-fadeIn">
                                            {faq.answer}
                                        </div>
                                    </DisclosurePanel>
                                </div>
                            )}
                        </Disclosure>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;