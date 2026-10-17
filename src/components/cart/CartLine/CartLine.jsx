import { itemAmount } from "../../../data/cart.js";
import { formatPrice } from "../../../utils/price.js";
import Icon from "../../ui/Icon/Icon.jsx";
import Quantity from "../../ui/Quantity/Quantity.jsx";
import "./CartLine.scss";

export default function CartLine({ item, onQuantityChange, onRemove }) {
  return (
    <article className="cart-line">
      <div className="cart-line__product">
        <img className="cart-line__image" src={item.image} alt="" />
        <span className="cart-line__name">{item.name}</span>
      </div>
      <p className="cart-line__price">
        <span>{item.price}</span>
        {item.oldPrice && <span className="cart-line__old-price">{item.oldPrice}</span>}
      </p>
      <div className="cart-line__quantity">
        <Quantity
          variant="field"
          value={item.quantity}
          onChange={(quantity) => onQuantityChange?.(item.id, quantity)}
        />
      </div>
      <span className="cart-line__subtotal">{formatPrice(itemAmount(item))}</span>
      <button
        className="cart-line__remove"
        type="button"
        aria-label={`Remove ${item.name}`}
        onClick={() => onRemove?.(item.id)}
      >
        <Icon name="delete" size={22} />
      </button>
    </article>
  );
}
