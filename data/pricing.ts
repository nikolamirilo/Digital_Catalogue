import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Starter',
        price: 19,
        features: [
            '1 digital catalogue',
            'Up to 50 products/services',
            'Basic analytics',
            'QR code sharing',
            'Email support',
        ],
    },
    {
        name: 'Pro',
        price: 59,
        features: [
            'Up to 10 catalogues',
            'Up to 1,000 products/services',
            'Advanced analytics',
            'Custom branding',
            'Priority email & chat support',
        ],
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        features: [
            'Unlimited catalogues',
            'Unlimited products/services',
            'Full analytics suite',
            'Dedicated account manager',
            'Custom integrations',
            '24/7 support',
        ],
    },
]