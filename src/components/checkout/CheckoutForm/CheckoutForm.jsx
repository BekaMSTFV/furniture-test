import { useEffect, useRef, useState } from "react";
import { cartAmount, itemAmount } from "../../../data/cart.js";
import { useCart } from "../../../context/useCart.js";
import { isEmail } from "../../../utils/email.js";
import { formatPrice } from "../../../utils/price.js";
import Button from "../../ui/Button/Button.jsx";
import Input from "../../ui/Input/Input.jsx";
import Select from "../../ui/Select/Select.jsx";
import OrderPopup from "../OrderPopup/OrderPopup.jsx";
import "./CheckoutForm.scss";

const REQUIRED_FIELDS = ["firstName", "lastName", "country", "street", "town", "province", "zip", "phone", "email"];

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  company: "",
  country: "",
  street: "",
  town: "",
  province: "",
  zip: "",
  phone: "",
  email: "",
  additional: "",
};

const COUNTRIES = [
  { value: "", label: "Select" },
  { value: "USA", label: "USA" },
  { value: "Russia", label: "Russia" },
];

const PROVINCES = [
  { value: "", label: "Select" },
  { value: "Western Province", label: "Western Province" },
  { value: "Eastren Province", label: "Eastren Province" },
];

function validate(values) {
  const next = {};

  REQUIRED_FIELDS.forEach((name) => {
    if (!values[name].trim()) {
      next[name] = true;
    }
  });

  if (values.email.trim() && !isEmail(values.email)) {
    next.email = true;
  }

  return next;
}

function fieldClass(invalid, empty = false) {
  return [invalid ? "field--invalid" : "", empty ? "field--empty" : ""].filter(Boolean).join(" ");
}

export default function CheckoutForm() {
  const { items, clear } = useCart();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState("bank");
  const [notice, setNotice] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderedItems, setOrderedItems] = useState(null);
  const focusName = useRef(null);
  const checked = useRef(false);

  const shownItems = orderedItems ?? items;
  const total = formatPrice(cartAmount(shownItems));

  useEffect(() => {
    const name = focusName.current;

    if (!name) {
      return;
    }

    focusName.current = null;
    const element = document.getElementById(name);

    if (!element) {
      return;
    }

    element.focus({ preventScroll: true });
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [errors]);

  function update(name, value) {
    const next = { ...values, [name]: value };
    setValues(next);

    if (checked.current) {
      setErrors(validate(next));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (placed) {
      return;
    }

    const nextErrors = validate(values);
    checked.current = true;
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setNotice(true);
      focusName.current = REQUIRED_FIELDS.find((name) => nextErrors[name]) ?? null;
      return;
    }

    setNotice(false);
    setOrderedItems(items.map((item) => ({ ...item })));
    clear();
    setPlaced(true);
  }

  return (
    <>
      <form className="checkout" aria-label="Checkout" noValidate onSubmit={handleSubmit}>
        <div className="checkout-billing">
          <h2 className="checkout-billing__title">Billing details</h2>
          <div className="checkout-billing__fields">
            <div className="checkout-billing__names">
              <Input
                id="firstName"
                name="firstName"
                label="First Name"
                autoComplete="given-name"
                value={values.firstName}
                aria-invalid={errors.firstName || undefined}
                className={fieldClass(errors.firstName)}
                onChange={(event) => update("firstName", event.target.value)}
              />
              <Input
                id="lastName"
                name="lastName"
                label="Last Name"
                autoComplete="family-name"
                value={values.lastName}
                aria-invalid={errors.lastName || undefined}
                className={fieldClass(errors.lastName)}
                onChange={(event) => update("lastName", event.target.value)}
              />
            </div>
            <Input
              id="company"
              name="company"
              label="Company Name (Optional)"
              autoComplete="organization"
              value={values.company}
              onChange={(event) => update("company", event.target.value)}
            />
            <Select
              id="country"
              name="country"
              label="Country / Region"
              autoComplete="country-name"
              value={values.country}
              options={COUNTRIES}
              aria-invalid={errors.country || undefined}
              className={fieldClass(errors.country, !values.country)}
              onChange={(event) => update("country", event.target.value)}
            />
            <Input
              id="street"
              name="street"
              label="Street address"
              autoComplete="street-address"
              value={values.street}
              aria-invalid={errors.street || undefined}
              className={fieldClass(errors.street)}
              onChange={(event) => update("street", event.target.value)}
            />
            <Input
              id="town"
              name="town"
              label="Town / City"
              autoComplete="address-level2"
              value={values.town}
              aria-invalid={errors.town || undefined}
              className={fieldClass(errors.town)}
              onChange={(event) => update("town", event.target.value)}
            />
            <Select
              id="province"
              name="province"
              label="Province"
              autoComplete="address-level1"
              value={values.province}
              options={PROVINCES}
              aria-invalid={errors.province || undefined}
              className={fieldClass(errors.province, !values.province)}
              onChange={(event) => update("province", event.target.value)}
            />
            <Input
              id="zip"
              name="zip"
              label="ZIP code"
              autoComplete="postal-code"
              value={values.zip}
              aria-invalid={errors.zip || undefined}
              className={fieldClass(errors.zip)}
              onChange={(event) => update("zip", event.target.value)}
            />
            <Input
              id="phone"
              name="phone"
              type="tel"
              label="Phone"
              autoComplete="tel"
              value={values.phone}
              aria-invalid={errors.phone || undefined}
              className={fieldClass(errors.phone)}
              onChange={(event) => update("phone", event.target.value)}
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              autoComplete="email"
              value={values.email}
              aria-invalid={errors.email || undefined}
              className={fieldClass(errors.email)}
              onChange={(event) => update("email", event.target.value)}
            />
            <Input
              id="additional"
              name="additional"
              label="Additional information"
              placeholder="Additional information"
              value={values.additional}
              onChange={(event) => update("additional", event.target.value)}
            />
          </div>
        </div>
        <div className="checkout-order">
          <div className="checkout-summary__head">
            <span>Product</span>
            <span>Subtotal</span>
          </div>
          <div className="checkout-summary__items">
            {shownItems.map((item) => (
              <div className="checkout-summary__item" key={item.id}>
                <p className="checkout-summary__product">
                  <span className="checkout-summary__name">{item.name}</span>
                  <span className="checkout-summary__qty">x {item.quantity}</span>
                </p>
                <span className="checkout-summary__amount">{formatPrice(itemAmount(item))}</span>
              </div>
            ))}
          </div>
          <div className="checkout-summary__totals">
            <p className="checkout-summary__row">
              <span>Subtotal</span>
              <span>{total}</span>
            </p>
            <p className="checkout-summary__row checkout-summary__row--total">
              <span>Total</span>
              <strong>{total}</strong>
            </p>
          </div>
          <hr className="checkout-order__divider" />
          <fieldset className="checkout-pay">
            <div className="checkout-pay__group">
              <label className="checkout-pay__option">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={payment === "bank"}
                  onChange={() => setPayment("bank")}
                />
                <span className="checkout-pay__mark" />
                <span>Direct Bank Transfer</span>
              </label>
              <div className={`checkout-pay__note${payment === "bank" ? " is-open" : ""}`} aria-hidden={payment !== "bank"}>
                <div className="checkout-pay__note-inner">
                  <p>
                    Make your payment directly into our bank account. Please use your Order ID as the payment
                    reference. Your order will not be shipped until the funds have cleared in our account.
                  </p>
                </div>
              </div>
            </div>
            <label className="checkout-pay__option">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={payment === "cash"}
                onChange={() => setPayment("cash")}
              />
              <span className="checkout-pay__mark" />
              <span>Cash On Delivery</span>
            </label>
          </fieldset>
          <p className="checkout-order__privacy">
            Your personal data will be used to support your experience throughout this website, to manage access to
            your account, and for other purposes described in our privacy policy.
          </p>
          <div className="checkout-order__submit">
            <div className={`checkout-order__notice${notice ? " is-visible" : ""}`} aria-live="polite">
              <div className="checkout-order__notice-inner">
                <p>Incorrect or not enough information</p>
              </div>
            </div>
            <Button className="checkout-order__place" type="submit">
              Place Order
            </Button>
          </div>
        </div>
      </form>
      {placed && <OrderPopup />}
    </>
  );
}
