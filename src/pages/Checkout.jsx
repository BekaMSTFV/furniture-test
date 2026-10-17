import CheckoutForm from "../components/checkout/CheckoutForm/CheckoutForm.jsx";
import FeatureBar from "../components/layout/FeatureBar/FeatureBar.jsx";
import PageBanner from "../components/layout/PageBanner/PageBanner.jsx";

export default function Checkout() {
  return (
    <>
      <PageBanner
        title="Checkout"
        items={[
          { label: "Home", to: "/" },
          { label: "Checkout" },
        ]}
      />
      <CheckoutForm />
      <FeatureBar />
    </>
  );
}
