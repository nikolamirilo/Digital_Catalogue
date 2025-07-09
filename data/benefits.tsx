import { FiBarChart2, FiBriefcase, FiDollarSign, FiLock, FiPieChart, FiShield, FiTarget, FiTrendingUp, FiUser } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Instant Catalogue Creation",
        description: "Design and launch your digital catalogue in minutes. No technical skills required—just add your products or services and go live!",
        bullets: [
            {
                title: "Easy Product Management",
                description: "Add, edit, or remove items with a simple interface.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Customizable Layouts",
                description: "Choose from beautiful templates to match your brand.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Real-Time Updates",
                description: "Changes are instantly reflected for your customers.",
                icon: <FiTrendingUp size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.png"
    },
    {
        title: "Seamless Sharing & Access",
        description: "Reach your customers anywhere. Share your catalogue via QR code, link, or embed it on your website.",
        bullets: [
            {
                title: "QR Code Generation",
                description: "Instantly create QR codes for your catalogue or individual items.",
                icon: <FiDollarSign size={26} />
            },
            {
                title: "Multi-Device Support",
                description: "Your catalogue looks great on phones, tablets, and computers.",
                icon: <FiBriefcase size={26} />
            },
            {
                title: "Offline Access",
                description: "Customers can save your catalogue for offline viewing.",
                icon: <FiPieChart size={26} />
            }
        ],
        imageSrc: "/images/mockup-3.png"
    },
    {
        title: "Analytics & Engagement",
        description: "Track how customers interact with your catalogue and optimize your offerings.",
        bullets: [
            {
                title: "Visitor Analytics",
                description: "See which products are most viewed and shared.",
                icon: <FiLock size={26} />
            },
            {
                title: "Customer Feedback",
                description: "Collect reviews and ratings directly from your catalogue.",
                icon: <FiUser size={26} />
            },
            {
                title: "Secure & Reliable",
                description: "Your data is protected with industry-standard security.",
                icon: <FiShield size={26} />
            }
        ],
        imageSrc: "/images/mockup-2.png"
    },
]