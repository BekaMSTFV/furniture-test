import FeatureBar from "../components/layout/FeatureBar/FeatureBar.jsx";
import PageBanner from "../components/layout/PageBanner/PageBanner.jsx";

export default function Comparison() {
  return (
    <>
      <PageBanner
        title="Product Comparison"
        items={[
          { label: "Home", to: "/" },
          { label: "Comparison" },
        ]}
      />
      <section className="page-section" aria-label="Product comparison" />
      <FeatureBar />
    </>
  );
}
