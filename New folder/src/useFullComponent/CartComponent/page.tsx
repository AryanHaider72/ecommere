import { CreditCard, ShoppingCart, Trash } from "lucide-react";

export default function CartComponent() {
  const checkOut = () => {
    window.location.href = "/checkOut";
  };
  return (
    <div className="w-full h-[100vh] bg-white p-4 flex flex-col">
      <h1 className="text-xl font-bold">My Cart (3)</h1>
      <hr className="mt-2 mb-1 text-gray-300" />
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col">
          <h3 className="text-md text-gray-600 mt-4 mb-1 ">
            Spend Rs:2000-/ More and enjoy Free Shipping !
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1 mb-2 ">
            <div
              className="bg-orange-400 h-2 rounded-full w-3/4"
              role="progressbar"
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <hr className="mt-3 mb-3 text-gray-300" />
          <h1
            className="text-lg flex justify-end text-end text-gray-900 "
            style={{ cursor: "pointer" }}
          >
            Clear Cart
          </h1>

          <div className="mt-5">
            <div className="flex justify-between p-2 rounded">
              <div className="flex">
                <div>
                  <img src={"/fashion_103.jpg"} width={80} height={50} />
                </div>
                <div className="ml-4 flex flex-col">
                  <h3 className="text-lg mt-2">Versatile Shacket</h3>
                  <p className="text-gray-500">2500-/</p>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <div>
                  <button className="bg-gray-100 p-1 text-lg font-bold rounded">
                    <Trash className="w-4 h-4 text-gray-800 hover:text-gray-900" />
                  </button>
                </div>
                <div className="flex gap-2 item-center bg-gray-100 p-2 gap-3">
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 text-center">
                    -
                  </button>
                  <span className="text-center">1</span>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 text-center">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr className="mt-2 mb-2 text-gray-300" />

          <div className="mt-5">
            <div className="flex justify-between p-2 rounded">
              <div className="flex">
                <div>
                  <img src={"/fashion_83.webp"} width={80} height={50} />
                </div>
                <div className="ml-4 flex flex-col">
                  <h3 className="text-lg mt-2">Chic Damn</h3>
                  <p className="text-gray-500">1500-/</p>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <div>
                  <button className="bg-gray-100 p-1 text-lg font-bold rounded">
                    <Trash className="w-4 h-4 text-gray-800 hover:text-gray-900" />
                  </button>
                </div>
                <div className="flex gap-2 item-center bg-gray-100 p-2 gap-3">
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 text-center">
                    -
                  </button>
                  <span className="text-center">1</span>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 text-center">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col ">
          <hr className="mt-1 text-gray-300" />
          <div className="flex justify-between mt-2">
            <span className="text-lg text-gray-800">Sub Total: </span>
            <span className="text-lg text-gray-900 font-extrabold">3500-/</span>
          </div>
          <hr className="mt-1 mb-2 text-gray-300" />

          <div className="flex justify-between mt-4 mb-4 gap-2">
            <button className="w-3/5 bg-black border border-black-400 text-white py-3 rounded hover:bg-white hover:text-black transition-all duration-300">
              <div className="flex justify-center items-center gap-2">
                <ShoppingCart />
                <span>View Cart</span>
              </div>
            </button>
            <button
              onClick={checkOut}
              className="w-3/5 bg-black border border-black-400 text-white py-3 rounded hover:bg-white hover:text-black transition-all duration-300"
            >
              <div className="flex justify-center items-center gap-2">
                <CreditCard />
                <span>CheckOut</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
