import { FiBarChart2, FiBriefcase, FiDollarSign, FiLock, FiPieChart, FiShield, FiTarget, FiTrendingUp, FiUser, FiZap, FiSmartphone, FiCode, FiEdit3, FiShare2 } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Create Professional Catalogs in Minutes",
        description: "No design skills needed. Simply upload your existing catalog or create from scratch with our intuitive drag-and-drop editor. Go live instantly.",
        bullets: [
            {
                title: "OCR Import Technology",
                description: "Scan and import existing paper catalogs automatically with AI-powered OCR.",
                icon: <FiZap size={26} />
            },
            {
                title: "Drag & Drop Editor",
                description: "Intuitive interface that makes catalog creation as easy as using a word processor.",
                icon: <FiEdit3 size={26} />
            },
            {
                title: "Instant Publishing",
                description: "Changes go live immediately - no waiting for designers or developers.",
                icon: <FiTrendingUp size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.png"
    },
    {
        title: "Share Anywhere, Access Everywhere",
        description: "Your customers can access your catalog on any device, anytime. Share via QR codes, links, or embed directly on your website.",
        bullets: [
            {
                title: "QR Code Generation",
                description: "Generate QR codes for your entire catalog or individual items instantly.",
                icon: <FiCode size={26} />
            },
            {
                title: "Mobile-First Design",
                description: "Optimized for smartphones, tablets, and desktops - looks great everywhere.",
                icon: <FiSmartphone size={26} />
            },
            {
                title: "Easy Sharing",
                description: "Share your catalog with a single link or QR code - no app downloads required.",
                icon: <FiShare2 size={26} />
            }
        ],
        imageSrc: "/images/mockup-3.png"
    },
    {
        title: "Track Performance & Optimize Sales",
        description: "Get insights into how customers interact with your catalog. See which items are most viewed and optimize your offerings.",
        bullets: [
            {
                title: "Real-Time Analytics",
                description: "Track views, shares, and engagement with detailed analytics dashboard.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Customer Feedback",
                description: "Collect reviews and ratings directly from your digital catalog.",
                icon: <FiUser size={26} />
            },
            {
                title: "Secure & Reliable",
                description: "Enterprise-grade security keeps your data safe and your catalog always available.",
                icon: <FiShield size={26} />
            }
        ],
        imageSrc: "/images/mockup-2.png"
    },
]