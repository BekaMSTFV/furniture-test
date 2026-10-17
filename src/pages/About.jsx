import PageBanner from "../components/layout/PageBanner/PageBanner.jsx";

export default function About() {
  return (
    <>
      <PageBanner
        title="About"
        items={[
          { label: "Home", to: "/" },
          { label: "About" },
        ]}
      />
      <section className="page-section" aria-label="About" />
    </>
  );
}
