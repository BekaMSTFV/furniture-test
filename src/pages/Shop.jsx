import FeatureBar from "../components/layout/FeatureBar/FeatureBar.jsx";
import PageBanner from "../components/layout/PageBanner/PageBanner.jsx";
import ShopCatalog from "../components/shop/ShopCatalog/ShopCatalog.jsx";

export default function Shop() {
  return (
    <>
      <PageBanner
        title="Shop"
        items={[
          { label: "Home", to: "/" },
          { label: "Shop" },
        ]}
      />
      <ShopCatalog />
      <FeatureBar />
    </>
  );
}
