import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";

import { IStats } from "@/types";

export const stats: IStats[] = [
    {
        title: "10K+",
        icon: <BsBarChartFill size={34} className="text-blue-500" />,
        description: "Catalogues created by businesses worldwide."
    },
    {
        title: "99%",
        icon: <BsFillStarFill size={34} className="text-yellow-500" />,
        description: "Customer satisfaction rate with our digital catalogue platform."
    },
    {
        title: "50K+ ",
        icon: <PiGlobeFill size={34} className="text-green-600" />,
        description: "Products and services managed through Quicktalog."
    }
];