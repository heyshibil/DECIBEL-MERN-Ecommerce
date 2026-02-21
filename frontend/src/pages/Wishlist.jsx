import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SubHead from "../components/SubHead";
import Footer from "../components/Footer";
import Card from "../components/Card";
import EmptyMessage from "../components/EmptyMessage";
import { useWishlistCart } from "../context/WishlistCartContext";
import { mirage } from "ldrs";
import { useAuth } from "../context/AuthContext";
import { useAppNavigation } from "../hooks/useAppNavigation";
mirage.register();

const Wishlist = () => {
  const { wishlist, loading: wishlistLoading } = useWishlistCart();
  const { user, loading: authLoading } = useAuth();
  const { goLogin } = useAppNavigation();

  if (wishlistLoading || authLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <l-mirage size="60" speed="2.5" color="black"></l-mirage>
      </div>
    );
  }

  if (!user) {
    goLogin();
    return null;
  }

  return (
    <div className="relative min-h-screen w-full lg:pt-24 pb-12 lg:pb-24">
      <Header />
      <div className="w-11/12 mx-auto pt-6 lg:pt-12">
        <div className="w-full flex justify-between items-center">
          <div className="w-fit">
            <SubHead head="My Wishlist" />
            <div className="bg-brand h-[1.5px]" />
          </div>
        </div>
        {wishlist.length == 0 && <EmptyMessage messageType="Wishlist" />}
        <div className="mt-6 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-10">
          {wishlist.map((item) => {
            return (
              <Card
                key={item._id}
                _id={item._id}
                productName={item.productName}
                type={item.type}
                price={item.price}
                img={item.image}
              />
            );
          })}
        </div>
        {/* 
        <div className="w-full mx-auto pt-12 lg:pt-24">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default Wishlist;
