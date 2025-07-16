import React from "react";
import { ScaleLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center w-full bg-product-background">
      <ScaleLoader height={50} width={8} className="!text-product-primary" color="#ffc107"/>
    </div>
  );
};

export default Loader;
