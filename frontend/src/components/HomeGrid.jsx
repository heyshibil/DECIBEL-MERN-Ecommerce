import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { useSearch } from "../context/SearchContext";

const HomeGrid = () => {
  const { goProducts } = useAppNavigation();
  const { setSearchTerm } = useSearch();

  const handleImgSearch = (e) => {
    const imgName = e.target.name;

    if (imgName) {
      setSearchTerm(imgName);
      goProducts();
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          id="main-box"
          className="bg-white/60 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6 rounded-2xl sm:rounded-3xl lg:col-span-3 flex flex-col sm:flex-row justify-between items-center min-h-[400px] sm:h-[450px] lg:h-[500px] gap-4 sm:gap-0 relative"
        >
          <div id="left" className="flex flex-col w-full sm:w-auto flex-1">
            <div className="py-1 px-2 sm:px-3 border w-fit rounded-full border-gray-300">
              <p className="pp text-[10px] sm:text-[12px]">Music is Classic</p>
            </div>

            <h1 className="hh1 pt-4 sm:pt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight">
              Musico Beyond <br className="hidden sm:block" />
              Boundaries
            </h1>

            <div className="pt-4 sm:pt-6 lg:pt-8 flex flex-col gap-1">
              <h3 className="hh1 text-lg sm:text-xl lg:text-2xl font-medium">Clear Sounds</h3>
              <p className="text-sm sm:text-base text-gray-500">
                Every beat Every note crafted to move you.
              </p>
            </div>

            {/* Button for desktop/tablet */}
            <button
              onClick={goProducts}
              className="hidden sm:flex bg-[#D2FA45] w-fit px-4 sm:px-6 lg:px-8 py-2 rounded-4xl text-sm sm:text-base font-medium items-center gap-2 sm:gap-3 group mt-6 sm:mt-8 lg:mt-10"
            >
              View All Products
              <BiRightArrowAlt
                className="text-lg sm:text-xl transform transition-transform duration-300 
               group-hover:translate-x-1"
              />
            </button>
          </div>

          <div id="right" className="w-full sm:w-auto flex justify-center sm:justify-end flex-shrink-0">
            <img 
              src="\src\assets\cover3.png" 
              alt="" 
              className="w-full sm:w-auto max-w-[200px] sm:max-w-none h-auto object-contain"
            />
          </div>

          {/* Button moved to bottom for mobile */}
          <button
            onClick={goProducts}
            className="sm:hidden bg-[#D2FA45] w-full px-6 py-2.5 rounded-4xl text-base font-medium flex items-center justify-center gap-3 group mt-auto"
          >
            View All Products
            <BiRightArrowAlt
              className="text-xl transform transition-transform duration-300 
               group-hover:translate-x-1"
            />
          </button>
        </div>

        <div
          id="feature-box"
          className="relative w-full bg-white/60 rounded-2xl sm:rounded-3xl flex flex-col gap-3 sm:gap-4 items-center pt-4 sm:pt-6 min-h-[350px] sm:h-[450px] lg:h-[500px]"
        >
          <div id="upper" className="h-auto sm:h-[20%] text-center sm:text-left px-4">
            <h2 className="hh1 text-lg sm:text-xl lg:text-2xl font-medium">
              Black Surface Headphones
            </h2>
            <p className="border-b-2 border-brand w-fit mt-2 mx-auto sm:mx-0 text-sm sm:text-base">
              Boosted with Bass
            </p>
          </div>
          <div
            id="lower"
            className="relative w-full flex-1 overflow-hidden rounded-2xl sm:rounded-4xl flex items-center justify-center"
          >
            <img
              className="w-full h-full max-h-[250px] sm:max-h-none object-contain sm:object-cover"
              src="src/assets/product1.png"
              alt=""
            />
          </div>

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-brand p-1.5 sm:p-2 rounded-full group">
            <a href="#">
              <FaArrowRightLong
                className="-rotate-45 text-lg sm:text-xl transform transition-transform duration-300 
               group-hover:rotate-0"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div
          id="item1-box"
          className="bg-white/60 rounded-2xl sm:rounded-3xl min-h-[250px] sm:h-[280px] lg:h-[300px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6"
        >
          <h3 className="hh1 font-medium text-lg sm:text-xl lg:text-2xl text-center mb-3 sm:mb-4">
            Premium Headphones
          </h3>
          <div id="img-box" className="w-full h-[85%] sm:h-[90%] group flex items-center justify-center">
            <img
              name="headphone"
              onClick={handleImgSearch}
              className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105 cursor-pointer"
              src="/src/assets/headphones.png"
              alt=""
            />
          </div>
        </div>

        <div
          id="item2-box"
          className="bg-white/60 rounded-2xl sm:rounded-3xl min-h-[250px] sm:h-[280px] lg:h-[300px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6"
        >
          <h3 className="hh1 font-medium text-lg sm:text-xl lg:text-2xl text-center mb-3 sm:mb-4">
            Elite Speakers
          </h3>
          <div
            id="img-box"
            className="w-full flex items-center justify-center h-[85%] sm:h-[90%] group"
          >
            <img
              className="h-[180px] sm:h-[200px] lg:h-[230px] mb-2 sm:mb-4 transition-transform duration-300 ease-in-out group-hover:scale-105 cursor-pointer object-contain"
              name="speaker"
              onClick={handleImgSearch}
              src="/src/assets/speaker.png"
              alt=""
            />
          </div>
        </div>

        <div
          id="item3-box"
          className="bg-white/60 rounded-2xl sm:rounded-3xl min-h-[250px] sm:h-[280px] lg:h-[300px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6 sm:col-span-2 lg:col-span-1"
        >
          <h3 className="hh1 font-medium text-lg sm:text-xl lg:text-2xl text-center mb-3 sm:mb-4">
            True Beats
          </h3>
          <div
            id="img-box"
            className="w-full flex items-center justify-center h-[85%] sm:h-[90%] group"
          >
            <img
              className="mb-2 sm:mb-4 h-auto max-h-[250px] sm:max-h-[220px] lg:max-h-none transition-transform duration-300 ease-in-out group-hover:scale-105 cursor-pointer object-contain"
              name="tws"
              onClick={handleImgSearch}
              src="/src/assets/tws.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGrid;
