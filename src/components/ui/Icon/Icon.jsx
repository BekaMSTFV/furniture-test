import account from "../../../assets/icons/account.svg";
import arrow from "../../../assets/icons/arrow.svg";
import cart from "../../../assets/icons/cart.svg";
import chevron from "../../../assets/icons/chevron.svg";
import close from "../../../assets/icons/close.svg";
import compare from "../../../assets/icons/compare.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import filter from "../../../assets/icons/filter.svg";
import grid from "../../../assets/icons/grid.svg";
import guarantee from "../../../assets/icons/guarantee.svg";
import heart from "../../../assets/icons/heart.svg";
import like from "../../../assets/icons/like.svg";
import list from "../../../assets/icons/list.svg";
import search from "../../../assets/icons/search.svg";
import share from "../../../assets/icons/share.svg";
import shipping from "../../../assets/icons/shipping.svg";
import star from "../../../assets/icons/star.svg";
import support from "../../../assets/icons/support.svg";
import trophy from "../../../assets/icons/trophy.svg";
import cartSidebarClear from "../../../assets/icons/cart-sidebar-clear.svg";
import cartSidebarRemove from "../../../assets/icons/cart-sidebar-remove.svg";
import contactAddress from "../../../assets/icons/contact-address.svg";
import contactClock from "../../../assets/icons/contact-clock.svg";
import contactPhone from "../../../assets/icons/contact-phone.svg";
import "./Icon.scss";

const ICONS = {
  account,
  arrow,
  cart,
  chevron,
  close,
  compare,
  delete: deleteIcon,
  filter,
  grid,
  guarantee,
  heart,
  like,
  list,
  search,
  share,
  shipping,
  star,
  support,
  trophy,
  cartSidebarClear,
  cartSidebarRemove,
  contactAddress,
  contactClock,
  contactPhone,
};

export default function Icon({ name, size = 24, width, height, className = "" }) {
  const src = ICONS[name];

  if (!src) {
    return null;
  }

  return (
    <img
      className={`icon ${className}`.trim()}
      src={src}
      width={width ?? size}
      height={height ?? size}
      alt=""
    />
  );
}
