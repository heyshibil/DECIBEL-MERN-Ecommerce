import React from "react";

const SubHead = ({head, sub, showOnMobile = false}) => {
  return (
    <div className={`flex flex-col gap-2 sm:gap-3 ${showOnMobile ? 'visible' : 'invisible sm:visible'}`}>
      <h1 className="hh1 font-medium text-2xl sm:text-3xl lg:text-4xl">{head}</h1>
      {sub && <p className="text-base sm:text-lg text-gray-500">{sub}</p>}
    </div>
  );
};

export default SubHead;
