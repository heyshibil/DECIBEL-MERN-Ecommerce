import React from "react";
import { useSearch } from "../context/SearchContext";
import { useAppNavigation } from "../hooks/useAppNavigation";

const ProductGrid = () => {
  const { setSearchTerm } = useSearch();
  const { goProducts } = useAppNavigation();

  const handleSearch = (type) => {
    setSearchTerm(type);
    goProducts();
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-6 lg:mt-8">
      <div
        id="left"
        className="flex flex-col items-start min-h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-orange-500 via-orange-600 to-red-600/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8"
      >
        <div className="py-1 px-3 sm:px-4 border w-fit rounded-full border-gray-50/20 bg-white/30">
          <p className="text-[10px] sm:text-[12px] text-gray-100">Flash Sale</p>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl mt-4 sm:mt-6 lg:mt-8 font-semibold text-white/90 leading-tight">
          20% off on Bose Headsets
        </h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-white/90">
          Level up your hearing experiance with Bose.
        </p>

        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end mt-auto gap-4 sm:gap-0 group">
          <img
            className="h-[200px] sm:h-[300px] lg:h-[420px] w-auto mx-auto sm:mx-0 rotate-6 transition-all duration-500 group-hover:-translate-y-4 object-contain order-1 lg:order-2"
            src="\src\assets\Products\Bose_H2_No.png"
            alt="bose"
          />
          <button
            onClick={() => handleSearch("bose")}
            className="bg-brandlight w-full sm:w-fit px-4 sm:px-6 py-2 rounded-4xl text-sm sm:text-base font-medium cursor-pointer hover:shadow-[0_0_15px_#E6F8AA] transition-all duration-300 order-2 lg:order-1 lg:mb-4 lg:ml-2"
          >
            Shop Now
          </button>
        </div>
      </div>

      <div
        id="right"
        className="flex flex-col items-start min-h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-green-600/90 via-green-400 to-cyan-700/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8"
      >
        <div className="py-1 px-3 sm:px-5 border w-fit rounded-full border-gray-50/20 bg-white/30">
          <p className="text-[10px] sm:text-[12px] text-gray-100">New Arrival</p>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl mt-4 sm:mt-6 lg:mt-8 font-semibold text-white/90 leading-tight">
          Sony Signature ANC for Pure Silence
        </h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-white/90">Silence perfected by Sony.</p>

        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end mt-auto gap-4 sm:gap-0 group">
          <img
            className="h-[200px] sm:h-[300px] lg:h-[420px] w-auto mx-auto sm:mx-0 rotate-6 transition-all duration-500 group-hover:-translate-y-4 object-contain order-1 lg:order-2"
            src="\src\assets\Products\x.png"
            alt="sony"
          />
          <button
            onClick={() => handleSearch("sony")}
            className="bg-brandlight w-full sm:w-fit px-4 sm:px-6 py-2 rounded-4xl text-sm sm:text-base font-medium cursor-pointer hover:shadow-[0_0_15px_#E6F8AA] transition-all duration-300 order-2 lg:order-1 lg:mb-4 lg:ml-2"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
