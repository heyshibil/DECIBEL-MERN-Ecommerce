import React, { useEffect, useState } from "react";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import Card from "./Card";
import SubHead from "./SubHead";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { useProducts } from "../context/ProductContext"

const Bestsellers = () => {

  // custom hook to navigate
  const {goProducts} = useAppNavigation();

  const { bestsellers } = useProducts();

  return (
    <div id="bestseller-sec">
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 sm:gap-0">
        <SubHead head="Bestsellers" sub="Our Most Loved Sounds" showOnMobile={true} />

        <button onClick={goProducts} className="flex items-center justify-between w-full sm:w-[160px] px-4 sm:px-6 py-2 rounded-full border-2 text-gray-700 border-gray-300 font-medium text-sm sm:text-base">View all
          <HiMiniArrowLongRight className="text-xl sm:text-2xl" />
        </button>
      </div>

      <div id="product-grid" className="mt-6 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {
          bestsellers.map((product) => {
            return (<Card key={product._id} _id={product._id} productName={product.productName} type={product.type} price={product.price} img={product.image} />)
          })
        }
        
        
      </div>
    </div>
  );
};

export default Bestsellers;
