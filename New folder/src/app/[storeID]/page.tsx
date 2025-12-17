import SellerDashboardPanel from "./admin/dashboard/page";

export default async function StoreID({
  params,
}: {
  params: { storeID: string };
}) {
  const storeID = (await params).storeID;
  return (
    <>
      <SellerDashboardPanel storeID={storeID} />
    </>
  );
}
