import ContactSection from "../components/contact/ContactSection/ContactSection.jsx";
import FeatureBar from "../components/layout/FeatureBar/FeatureBar.jsx";
import PageBanner from "../components/layout/PageBanner/PageBanner.jsx";

export default function Contact() {
  return (
    <>
      <PageBanner
        title="Contact"
        items={[
          { label: "Home", to: "/" },
          { label: "Contact" },
        ]}
      />
      <ContactSection />
      <FeatureBar />
    </>
  );
}
