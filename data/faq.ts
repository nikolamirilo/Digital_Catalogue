import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
    {
        question: `Is ${siteDetails.siteName} secure?`,
        answer: 'Absolutely. We use industry-standard encryption to protect your data and ensure your catalogues are safe and private.',
    },
    {
        question: `Can I update my catalogue anytime?`,
        answer: 'Yes! You can add, edit, or remove items from your catalogue at any time. Updates are reflected instantly for your customers.',
    },
    {
        question: 'How do customers access my digital catalogue?',
        answer: 'Share your catalogue via a unique link or QR code. Customers can view it on any device, no app download required.'
    },
    {
        question: 'Can I see how customers interact with my catalogue?',
        answer: 'Yes! Our analytics dashboard shows you views, popular items, and customer feedback to help you improve your offerings.',
    },
    {
        question: 'What if I need help using the platform?',
        answer: 'Our support team is available 24/7 via chat or email. We also offer tutorials and guides to help you get started quickly.'
    }
];