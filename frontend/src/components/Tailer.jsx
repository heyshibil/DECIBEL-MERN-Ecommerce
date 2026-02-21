import React from "react";
import { useAppNavigation } from "../hooks/useAppNavigation";

const Tailer = () => {
  const { goProducts } = useAppNavigation();
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-gradient-to-r from-black via-black/85 to-black/70 rounded-xl sm:rounded-2xl min-h-0 sm:min-h-0 lg:min-h-[400px] p-6 sm:p-8 lg:px-12 xl:px-20 lg:py-8 gap-4 sm:gap-6 lg:gap-8">
      <div
        id="left"
        className="flex flex-col lg:justify-center gap-4 lg:w-[45%] xl:w-[50%] items-start px-2 sm:px-0 min-h-0 sm:min-h-0 lg:min-h-[400px] order-1"
      >
        <h1 className="hh1 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-wide leading-tight">
          Upgrade With Us To Experience <br /> Sound The Way It’s Meant To Be.
        </h1>
      </div>

      <div id="right" className="w-full lg:w-[35%] xl:w-[30%] h-auto lg:h-full flex items-center justify-center overflow-hidden lg:overflow-visible max-h-[280px] sm:max-h-[320px] lg:max-h-none order-2">
        <img
          className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-none h-auto max-h-[280px] sm:max-h-[320px] lg:max-h-none object-contain rotate-6 lg:scale-110 xl:scale-125"
          src="/src/assets/tail.png"
          alt=""
        />
      </div>

      <button
        onClick={goProducts}
        className="bg-brand w-full sm:w-fit px-6 sm:px-8 py-2.5 sm:py-2 rounded-3xl sm:rounded-4xl text-sm sm:text-base font-semibold mt-auto lg:hidden order-3"
      >
        Shop Now
      </button>

      {/* Desktop button - hidden on mobile */}
      <div className="hidden lg:flex lg:w-[20%] items-center justify-end order-3">
        <button
          onClick={goProducts}
          className="bg-brand px-8 xl:px-10 py-3 rounded-4xl text-base font-semibold whitespace-nowrap lg:hover:scale-105 transition-transform"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Tailer;
