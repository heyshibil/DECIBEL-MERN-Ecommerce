import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SubHead from "../components/SubHead";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useWishlistCart } from "../context/WishlistCartContext";
import EmptyMessage from "../components/EmptyMessage";
import { mirage } from "ldrs";
import { useAppNavigation } from "../hooks/useAppNavigation";
mirage.register();

const Cart = () => {
  const {
    cart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    subTotal,
    total,
    loading,
    gst,
  } = useWishlistCart();

  const { goCheckout, goDetails } = useAppNavigation();

  const onDelete = async (productId) => {
    await handleRemoveFromCart(productId);
  };

  // increment count of quantity
  const onInc = async (productId, quantity) => {
    await handleUpdateQuantity(productId, quantity + 1);
  };

  const onDec = async (productId, quantity) => {
    if (quantity === 1) return;
    await handleUpdateQuantity(productId, quantity - 1);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <l-mirage size="60" speed="2.5" color="black"></l-mirage>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full lg:pt-24 pb-12 lg:pb-24">
      <Header />
      <div className="w-11/12 mx-auto pt-6 lg:pt-12">
        <div className="w-full flex justify-between items-center">
          <div className="w-fit">
            <SubHead head="My Cart" />
            <div className="bg-brand h-[1.5px]" />
          </div>
        </div>

        {cart.length == 0 && <EmptyMessage messageType={"Cart"} />}

        {cart.length > 0 && (
          <div className="mt-6 lg:mt-12 flex flex-col lg:flex-row justify-between gap-6 lg:gap-8">
            <div className="w-full lg:w-[75%] flex flex-col gap-4" id="left">
              {/* item */}
              {cart.map((item) => {
                return (
                  <div
                    key={item.product._id}
                    id="item"
                    className="w-full flex flex-col sm:flex-row justify-between p-3 sm:p-4 items-start sm:items-center border-2 border-gray-200/70 rounded-xl gap-4 sm:gap-0"
                  >
                    <div id="l" className="flex gap-4 sm:gap-6 items-center w-full sm:w-auto">
                      <div id="img-box" className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-xl sm:rounded-2xl flex-shrink-0">
                        <img
                          className="h-full w-full object-cover rounded-xl sm:rounded-2xl cursor-pointer"
                          src={item.product.image}
                          alt={item.product.image}
                          onClick={() => goDetails(item.product._id)}
                        />
                      </div>

                      <div id="item-details" className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-semibold line-clamp-2">
                          {item.product.productName}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400">
                          {item.product.type}
                        </p>
                        <p className="text-sm sm:text-base font-semibold">
                          ₹{item.product.price}
                        </p>
                      </div>
                    </div>
                    <div id="r" className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-4 sm:gap-6">
                      {/* counter */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex justify-between items-center gap-2 border border-gray-300 rounded-lg">
                          <button
                            className={`${item.quantity <= 1 ? "text-black/10 rounded-l-lg p-2 sm:p-3" : "hover:bg-gray-100 rounded-l-lg p-2 sm:p-3"}`}
                            onClick={() =>
                              onDec(item.product._id, item.quantity)
                            }
                            disabled={item.quantity <= 1 && true}
                          >
                            <FiMinus className="text-sm sm:text-base" />
                          </button>
                          <span className="px-2 text-sm sm:text-base">{item.quantity}</span>
                          <button
                            className="hover:bg-gray-100 rounded-r-lg p-2 sm:p-3"
                            onClick={() =>
                              onInc(item.product._id, item.quantity)
                            }
                          >
                            <FiPlus className="text-sm sm:text-base" />
                          </button>
                        </div>

                        <MdDeleteOutline
                          onClick={() => onDelete(item.product._id)}
                          className="text-xl sm:text-2xl text-red-400 cursor-pointer"
                        />
                      </div>

                      <div className="w-auto sm:w-full flex items-center sm:justify-end">
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                          ₹{item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              id="right"
              className="w-full lg:w-[25%] max-h-none lg:max-h-80 p-4 sm:p-6 border-2 border-gray-200/70 rounded-xl sticky top-24 lg:sticky"
            >
              <h3 className="hh1 text-xl sm:text-2xl font-semibold">Order Summary</h3>

              <div className="mt-4 sm:mt-6 flex flex-col gap-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <p>Subtotal</p>
                  <p className="font-semibold">₹{subTotal}</p>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <p>Shipping</p>
                  <p className="text-gray-500">Free</p>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <p>GST (18%)</p>
                  <p className="text-gray-500">+ ₹{gst.toFixed(2)}</p>
                </div>

                <div className="h-[2px] w-full bg-gray-100"></div>

                <div className="flex justify-between">
                  <p className="hh1 text-xl sm:text-2xl font-semibold">Total</p>
                  <p className="hh1 text-xl sm:text-2xl font-semibold">₹{total}</p>
                </div>

                <button
                  onClick={goCheckout}
                  className="mt-3 bg-yellow-300 p-2.5 sm:p-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-yellow-300/90"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <div className="w-full mx-auto pt-12 lg:pt-60">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default Cart;
