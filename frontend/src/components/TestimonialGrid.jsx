import React from "react";

const TestimonialGrid = () => {
  const testimonials = [
    {
      user: "Sarah John",
      profession: "Music Producer",
      userImg: "src/assets/blackman.png",
      feed: "Never experienced sound this pure. The clarity, the bass, everything feels balanced. Definitely worth every rupee!",
    },
    {
      user: "Shafi Vilayil",
      profession: "Philosopher",
      userImg: "src/assets/shafi.jpeg",
      feed: "Exceptional clarity and comfort. The sound feels rich and balanced, and the noise cancellation makes a huge difference during travel. It’s easily one of the best audio experiences I’ve had premium build, premium sound.",
    },
    {
      user: "Parague Marc",
      profession: "Music Listener",
      userImg: "src/assets/bb.jpeg",
      feed: "These earbuds completely elevated my editing and daily listening. Clean vocals, deep bass, and a smooth overall tone. Super comfortable and reliable. Definitely worth it for anyone who loves high-quality sound.",
    },
  ];

  return (
    <div className="lg:mt-10">
      {/* Header */}
      <div className="w-full flex flex-col gap-2 sm:gap-3 items-center text-center px-4">
        <h1 className="hh1 font-semibold text-2xl sm:text-3xl lg:text-4xl">What Our Customers Say</h1>
        <p className="text-base sm:text-lg text-gray-500">Join Thousands Of Satisfied</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-8 sm:mt-12 lg:mt-20">
        {testimonials.map((item, i) => {
          return (
            <div key={i} className="relative flex flex-col gap-3 sm:gap-4 items-start justify-center shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl sm:rounded-3xl py-4 sm:py-6 px-4 sm:px-6 lg:px-8">

              <div className="absolute -top-4 sm:-top-5 right-6 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden">
                <img className="opacity-70 w-full h-full object-cover" src="src/assets/qquote.png" alt="" />
              </div>

              <div className="flex gap-3 sm:gap-4 items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={item.userImg}
                    alt=""
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base">{item.user}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{item.profession}</p>
                </div>
              </div>

              <div className="">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.feed}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestimonialGrid;
