import PricingColumn from "./PricingColumn";

import { tiers } from "@/data/pricing";

const Pricing: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
                <div 
                    key={tier.name} 
                    className="animate-fade-in"
                    style={{ 
                        animationDelay: `${index * 150}ms`,
                        animationFillMode: 'both'
                    }}
                >
                    <PricingColumn tier={tier} highlight={index === 1} />
                </div>
            ))}
        </div>
    )
}

export default Pricing