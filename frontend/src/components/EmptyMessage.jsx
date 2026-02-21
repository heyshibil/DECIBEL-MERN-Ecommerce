import React from "react";
import { useAppNavigation } from "../hooks/useAppNavigation";

const EmptyMessage = ({ messageType }) => {
  const { goProducts } = useAppNavigation();
  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 w-64 sm:w-auto">
      <button
        onClick={goProducts}
        className="bg-black text-white px-4 py-3 rounded-2xl font-medium"
      >
        Browse products
      </button>
      <p className="text-gray-400 text-center">{messageType} is empty. Browse products to add items.</p>
    </div>
  );
};

export default EmptyMessage;
