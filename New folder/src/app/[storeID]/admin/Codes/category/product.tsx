import { useState } from "react";
import { Product } from "@/api/types/product/getProduct";
import { Pencil, Trash } from "lucide-react";
import DeleteProductApi from "@/api/lib/product/DeleteProduct/DeleteProduct";
import { useRouter } from "next/navigation";

export default function ProductCard({
  storeID,
  product,
  onDeleteSuccess,
}: {
  storeID?: string;
  product: Product;
  onDeleteSuccess?: () => void;
}) {
  const router = useRouter();
  const { productName, description, discount, images, variants } = product;

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [productID, setProductID] = useState("");

  // Default price from first variant
  const defaultAmount = variants?.[0]?.variantValues?.[0]?.amount
    ? Number(variants[0].variantValues[0].amount)
    : 0;

  const discountedAmount =
    defaultAmount - defaultAmount * (Number(discount) / 100);

  const deleteProduct = async (ID: string) => {
    const token = localStorage.getItem("token");
    const formData = {
      productID: ID,
    };
    const response = await DeleteProductApi(formData, String(token));
    if (response.status === 200 || response.status === 201) {
      console.log(response.data);
      onDeleteSuccess?.();
    } else if (response.status === 401) {
      router.push("/sellerlogin");
    }
  };

  return <></>;
}
