import React from "react";
import CardType1 from "./CardType1";
import CardType2 from "./CardType2";
import CardType3 from "./CardType3";
import CardType4 from "./CardType4";
import { SwiperSlide } from "swiper/react";
import { Record } from "@/types";

const CardsSwitcher = ({
  variant,
  record,
  currency,
  i,
}: {
  variant: string;
  record: Record;
  currency: string;
  i: number;
}) => {
  switch (variant) {
    case "variant_1":
      return <CardType1 key={i} record={record} currency={currency} />;
    case "variant_2":
      return <CardType2 key={i} record={record} currency={currency} />;
    case "variant_3":
      return <CardType3 key={i} record={record} currency={currency} />;
    case "variant_4":
      return (
          <CardType4 key={i} record={record} currency={currency} />
      );
    default:
      return <CardType1 key={i} record={record} currency={currency} />;
  }
};

export default CardsSwitcher;