import grifo from "../assets/images/products/grifo.png";
import leviosa from "../assets/images/products/leviosa.png";
import lolito from "../assets/images/products/lolito.png";
import muggo from "../assets/images/products/muggo.png";
import pingky from "../assets/images/products/pingky.png";
import potty from "../assets/images/products/potty.png";
import respira from "../assets/images/products/respira.png";
import syltherine from "../assets/images/products/syltherine.png";
import pic1 from "../assets/images/products/pic-1.png";
import pic2 from "../assets/images/products/pic-2.png";
import pic3 from "../assets/images/products/pic-3.png";
import pic4 from "../assets/images/products/pic-4.png";
import pic5 from "../assets/images/products/pic-5.png";
import pic6 from "../assets/images/products/pic-6.png";
import pic7 from "../assets/images/products/pic-7.png";
import pic8 from "../assets/images/products/pic-8.png";

const catalog = [
  {
    id: "syltherine",
    slug: "syltherine",
    name: "Syltherine",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: "Rp 3.500.000",
    image: syltherine,
    badge: { type: "discount", label: "-30%" },
  },
  {
    id: "leviosa",
    slug: "leviosa",
    name: "Leviosa",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    image: leviosa,
  },
  {
    id: "lolito",
    slug: "lolito",
    name: "Lolito",
    description: "Luxury big sofa",
    price: "Rp 7.000.000",
    oldPrice: "Rp 14.000.000",
    image: lolito,
    badge: { type: "discount", label: "-50%" },
  },
  {
    id: "respira",
    slug: "respira",
    name: "Respira",
    description: "Outdoor bar table and stool",
    price: "Rp 500.000",
    image: respira,
    badge: { type: "new", label: "New" },
  },
  {
    id: "grifo",
    slug: "grifo",
    name: "Grifo",
    description: "Night lamp",
    price: "Rp 1.500.000",
    image: grifo,
  },
  {
    id: "muggo",
    slug: "muggo",
    name: "Muggo",
    description: "Small mug",
    price: "Rp 150.000",
    image: muggo,
    badge: { type: "new", label: "New" },
  },
  {
    id: "pingky",
    slug: "pingky",
    name: "Pingky",
    description: "Cute bed set",
    price: "Rp 7.000.000",
    oldPrice: "Rp 14.000.000",
    image: pingky,
    badge: { type: "discount", label: "-50%" },
  },
  {
    id: "potty",
    slug: "potty",
    name: "Potty",
    description: "Minimalist flower pot",
    price: "Rp 500.000",
    image: potty,
    badge: { type: "new", label: "New" },
  },
  {
    id: "syltherine 2",
    slug: "syltherine 2",
    name: "Syltherine 2",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: "Rp 3.500.000",
    image: syltherine,
    badge: { type: "discount", label: "-30%" },
  },
  {
    id: "leviosa 2",
    slug: "leviosa 2",
    name: "Leviosa 2",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    image: leviosa,
  },
  {
    id: "lolito 2",
    slug: "lolito 2",
    name: "Lolito 2",
    description: "Luxury big sofa",
    price: "Rp 7.000.000",
    oldPrice: "Rp 14.000.000",
    image: lolito,
    badge: { type: "discount", label: "-50%" },
  },
  {
    id: "respira 2",
    slug: "respira 2",
    name: "Respira 2",
    description: "Outdoor bar table and stool",
    price: "Rp 500.000",
    image: respira,
    badge: { type: "new", label: "New" },
  },
  {
    id: "grifo 2",
    slug: "grifo 2",
    name: "Grifo 2",
    description: "Night lamp",
    price: "Rp 1.500.000",
    image: grifo,
  },
  {
    id: "muggo 2",
    slug: "muggo 2",
    name: "Muggo 2",
    description: "Small mug",
    price: "Rp 150.000",
    image: muggo,
    badge: { type: "new", label: "New" },
  },
  {
    id: "pingky 2",
    slug: "pingky 2",
    name: "Pingky 2",
    description: "Cute bed set",
    price: "Rp 7.000.000",
    oldPrice: "Rp 14.000.000",
    image: pingky,
    badge: { type: "discount", label: "-50%" },
  },
  {
    id: "potty 2",
    slug: "potty 2",
    name: "Potty 2",
    description: "Minimalist flower pot",
    price: "Rp 500.000",
    image: potty,
    badge: { type: "new", label: "New" },
  },
  {
    id: "syltherine 3",
    slug: "syltherine 3",
    name: "Syltherine 3",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: "Rp 3.500.000",
    image: syltherine,
    badge: { type: "discount", label: "-30%" },
  },
  {
    id: "leviosa 3",
    slug: "leviosa 3",
    name: "Leviosa 3",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    image: leviosa,
  },
  {
    id: "lolito 3",
    slug: "lolito 3",
    name: "Lolito 3",
    description: "Luxury big sofa",
    price: "Rp 7.000.000",
    oldPrice: "Rp 14.000.000",
    image: lolito,
    badge: { type: "discount", label: "-50%" },
  },
  {
    id: "respira 3",
    slug: "respira 3",
    name: "Respira 3",
    description: "Outdoor bar table and stool",
    price: "Rp 500.000",
    image: respira,
    badge: { type: "new", label: "New" },
  },
  {
    id: "grifo 3",
    slug: "grifo 3",
    name: "Grifo 3",
    description: "Night lamp",
    price: "Rp 1.500.000",
    image: grifo,
  },
  {
    id: "muggo 3",
    slug: "muggo 3",
    name: "Muggo 3",
    description: "Small mug",
    price: "Rp 150.000",
    image: muggo,
    badge: { type: "new", label: "New" },
  },
  {
    id: "pingky 3",
    slug: "pingky 3",
    name: "Pingky 3",
    description: "Cute bed set",
    price: "Rp 7.000.000",
    oldPrice: "Rp 14.000.000",
    image: pingky,
    badge: { type: "discount", label: "-50%" },
  },
  {
    id: "potty 3",
    slug: "potty 3",
    name: "Potty 3",
    description: "Minimalist flower pot",
    price: "Rp 500.000",
    image: potty,
    badge: { type: "new", label: "New" },
  },
  {
    id: "syltherine 4",
    slug: "syltherine 4",
    name: "Syltherine 4",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: "Rp 3.500.000",
    image: syltherine,
    badge: { type: "discount", label: "-30%" },
  },
  {
    id: "leviosa 4",
    slug: "leviosa 4",
    name: "Leviosa 4",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    image: leviosa,
  },
  {
    id: "lolito 4",
    slug: "lolito 4",
    name: "Lolito 4",
    description: "Luxury big sofa",
    price: "Rp 7.000.000",
    oldPrice: "Rp 14.000.000",
    image: lolito,
    badge: { type: "discount", label: "-50%" },
  },
  {
    id: "respira 4",
    slug: "respira 4",
    name: "Respira 4",
    description: "Outdoor bar table and stool",
    price: "Rp 500.000",
    image: respira,
    badge: { type: "new", label: "New" },
  },
  {
    id: "grifo 4",
    slug: "grifo 4",
    name: "Grifo 4",
    description: "Night lamp",
    price: "Rp 1.500.000",
    image: grifo,
  },
  {
    id: "muggo 4",
    slug: "muggo 4",
    name: "Muggo 4",
    description: "Small mug",
    price: "Rp 150.000",
    image: muggo,
    badge: { type: "new", label: "New" },
  },
  {
    id: "pingky 4",
    slug: "pingky 4",
    name: "Pingky 4",
    description: "Cute bed set",
    price: "Rp 7.000.000",
    oldPrice: "Rp 14.000.000",
    image: pingky,
    badge: { type: "discount", label: "-50%" },
  },
  {
    id: "potty 4",
    slug: "potty 4",
    name: "Potty 4",
    description: "Minimalist flower pot",
    price: "Rp 500.000",
    image: potty,
    badge: { type: "new", label: "New" },
  },
];

const otherImages = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

const fullDescription = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, at facilisis magna interdum a.",
  "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper aenean ultricies mi vitae est.",
].join("\n\n");

const AUTHORS = [
  "Emma Clarke",
  "Liam Brooks",
  "Olivia Bennett",
  "Noah Carter",
  "Ava Mitchell",
  "Ethan Parker",
  "Sophia Reed",
  "Mason Hughes",
  "Isabella Cooper",
  "Lucas Foster",
  "Mia Richardson",
  "James Wright",
  "Charlotte Hayes",
  "Benjamin Scott",
  "Amelia Turner",
  "Henry Collins",
  "Harper Evans",
  "Alexander Price",
  "Evelyn Ward",
  "Daniel Morgan",
];

const MESSAGES = [
  "The piece arrived carefully packed and looked exactly as shown. Assembly took one quiet evening, and the finish feels solid enough for everyday use in a busy room.",
  "We placed it in the living room and it immediately made the space feel calmer. The proportions are comfortable, and the material has held up well after several weeks of use.",
  "I was unsure about the color at first, but it sits beautifully against a light wall. Cleaning is simple, and the construction does not wobble when someone leans on it.",
  "This has become the seat everyone chooses. The cushion keeps its shape, the edges are neatly finished, and it is easy to move when we rearrange the room.",
  "A practical choice for a smaller apartment. It does not overwhelm the floor plan, yet it still feels generous enough for guests to sit and stay a while.",
  "The quality is better than I expected at this price. Joints are tight, the surface is even, and the color matches the rest of the furniture we already own.",
  "Delivery was smooth and the item was ready to use the same day. It looks understated in daylight and warmer in the evening, which is exactly what we wanted.",
  "We use it every day and have had no issues. The design is simple, the comfort is consistent, and it is easy to keep looking fresh with a quick wipe.",
];

function createRandom(seed) {
  let value = seed >>> 0;

  return () => {
    value = (value + 0x6d2b79f5) >>> 0;
    let next = Math.imul(value ^ (value >>> 15), value | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFrom(text) {
  return [...text].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pickReviews(random) {
  const count = 1 + Math.floor(random() * 6);
  const authors = [...AUTHORS];

  for (let index = authors.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [authors[index], authors[swap]] = [authors[swap], authors[index]];
  }

  return authors.slice(0, count).map((author) => ({
    author,
    rating: 1 + Math.floor(random() * 5),
    message: MESSAGES[Math.floor(random() * MESSAGES.length)],
  }));
}

export function productPath(product) {
  return `/product/${encodeURIComponent(product.slug)}`;
}

export function getRatingSummary(product) {
  const reviews = product.reviews ?? [];
  const count = reviews.length;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);

  return {
    count,
    value: count ? total / count : 0,
  };
}

export const products = catalog.map((product) => {
  const random = createRandom(seedFrom(product.id));

  return {
    ...product,
    fullDescription,
    reviews: pickReviews(random),
    otherImages,
  };
});
