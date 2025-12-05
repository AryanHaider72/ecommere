"use client";
import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

export default function PurchaseForm() {
  const [supplier, setSupplier] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [products, setProducts] = useState([
    { productName: "", quantity: 1, unitPrice: 0 },
  ]);
  const [amountPaid, setAmountPaid] = useState(0);

  const handleAddRow = () => {
    setProducts([...products, { productName: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveRow = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleProductChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newProducts = [...products];
    (newProducts[index] as any)[field] = value;
    setProducts(newProducts);
  };

  const totalBill = products.reduce(
    (sum, p) => sum + p.quantity * p.unitPrice,
    0
  );
  const remaining = totalBill - amountPaid;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Purchase Entry
      </h2>

      {/* Supplier and Date */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Supplier Name
          </label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="Enter supplier name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Purchase Date
          </label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg mb-4">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="p-2 text-left">Product Name</th>
              <th className="p-2 text-center">Quantity</th>
              <th className="p-2 text-center">Unit Price</th>
              <th className="p-2 text-center">Subtotal</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="p-2">
                  <input
                    type="text"
                    value={p.productName}
                    onChange={(e) =>
                      handleProductChange(index, "productName", e.target.value)
                    }
                    placeholder="Product name"
                    className="w-full border border-gray-300 rounded p-1"
                  />
                </td>
                <td className="p-2 text-center">
                  <input
                    type="number"
                    value={p.quantity}
                    min={1}
                    onChange={(e) =>
                      handleProductChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    className="w-20 border border-gray-300 rounded p-1 text-center"
                  />
                </td>
                <td className="p-2 text-center">
                  <input
                    type="number"
                    value={p.unitPrice}
                    min={0}
                    onChange={(e) =>
                      handleProductChange(
                        index,
                        "unitPrice",
                        Number(e.target.value)
                      )
                    }
                    className="w-24 border border-gray-300 rounded p-1 text-center"
                  />
                </td>
                <td className="p-2 text-center">
                  {(p.quantity * p.unitPrice).toFixed(2)}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleAddRow}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
        >
          <PlusCircle className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* Payment Details */}
      <div className="mt-6 border-t pt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Total Bill:</span>
          <span>Rs. {totalBill.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Amount Paid:</span>
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(Number(e.target.value))}
            className="w-32 border border-gray-300 rounded p-1 text-right"
          />
        </div>
        <div className="flex justify-between font-semibold text-gray-800">
          <span>Remaining Balance:</span>
          <span>Rs. {remaining.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
          Save Purchase
        </button>
      </div>
    </div>
  );
}
