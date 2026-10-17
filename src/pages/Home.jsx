import BrowseRange from "../components/home/BrowseRange/BrowseRange.jsx";
import Hero from "../components/home/Hero/Hero.jsx";
import Inspiration from "../components/home/Inspiration/Inspiration.jsx";
import OurProducts from "../components/home/OurProducts/OurProducts.jsx";
import ShareSetup from "../components/home/ShareSetup/ShareSetup.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <BrowseRange />
      <OurProducts limit={8} />
      <Inspiration />
      <ShareSetup />
    </>
  );
}
