import { ITestimonial } from "@/types";
import { siteDetails } from "./siteDetails";

export const testimonials: ITestimonial[] = [
    {
        name: 'Maria Lopez',
        role: 'Owner, Bella Café',
        message: `${siteDetails.siteName} made it so easy to update our menu and share it with customers. The QR code feature is a game changer for our business!`,
        avatar: '/images/testimonial-1.webp',
    },
    {
        name: 'David Kim',
        role: 'Manager, TechMart',
        message: `We digitalized our entire product catalogue in a day. Our customers love the interactive experience and we love the analytics!`,
        avatar: '/images/testimonial-2.webp',
    },
    {
        name: 'Sophie Dubois',
        role: 'Marketing Lead, GreenLeaf Spa',
        message: `The ability to update our service list instantly and get feedback from clients has helped us grow. Highly recommended!`,
        avatar: '/images/testimonial-3.webp',
    },
];