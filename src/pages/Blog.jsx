import FeatureBar from "../components/layout/FeatureBar/FeatureBar.jsx";
import PageBanner from "../components/layout/PageBanner/PageBanner.jsx";

export default function Blog() {
  return (
    <>
      <PageBanner
        title="Blog"
        items={[
          { label: "Home", to: "/" },
          { label: "Blog" },
        ]}
      />
      <section className="page-section" aria-label="Blog" />
      <FeatureBar />
    </>
  );
}
