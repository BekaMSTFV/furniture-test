import { useEffect, useRef, useState } from "react";
import { isEmail } from "../../../utils/email.js";
import OrderPopup from "../../checkout/OrderPopup/OrderPopup.jsx";
import Button from "../../ui/Button/Button.jsx";
import Icon from "../../ui/Icon/Icon.jsx";
import Input from "../../ui/Input/Input.jsx";
import "./ContactSection.scss";

const REQUIRED_FIELDS = ["name", "email", "message"];

const INITIAL_VALUES = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const DETAILS = [
  {
    icon: "contactAddress",
    width: 22,
    height: 28,
    title: "Address",
    lines: ["236 5th SE Avenue, New", "York NY10000, United", "States"],
  },
  {
    icon: "contactPhone",
    width: 23,
    height: 22,
    title: "Phone",
    lines: ["Mobile: +(84) 546-6789", "Hotline: +(84) 456-6789"],
  },
  {
    icon: "contactClock",
    width: 23,
    height: 23,
    title: "Working Time",
    lines: ["Monday-Friday: 9:00 -", "22:00", "Saturday-Sunday: 9:00 -", "21:00"],
  },
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

export default function ContactSection() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const focusName = useRef(null);
  const checked = useRef(false);

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

    if (sent) {
      return;
    }

    const nextErrors = validate(values);
    checked.current = true;
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      focusName.current = REQUIRED_FIELDS.find((name) => nextErrors[name]) ?? null;
      return;
    }

    setSent(true);
  }

  return (
    <>
      <section className="contact" aria-label="Contact">
        <header className="contact__intro">
          <h2 className="contact__title">Get In Touch With Us</h2>
          <p className="contact__lead">
            For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always
            Be There To Help You Out. Do Not Hesitate!
          </p>
        </header>
        <div className="contact__body">
          <ul className="contact-info">
            {DETAILS.map((item) => (
              <li className="contact-info__item" key={item.title}>
                <Icon name={item.icon} width={item.width} height={item.height} />
                <div>
                  <p className="contact-info__title">{item.title}</p>
                  <p className="contact-info__text">
                    {item.lines.map((line, index) => (
                      <span key={line}>
                        {line}
                        {index < item.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <form className="contact__form" noValidate onSubmit={handleSubmit}>
            <div className="contact__fields">
              <Input
                id="name"
                name="name"
                label="Your name"
                autoComplete="name"
                placeholder="Abc"
                value={values.name}
                aria-invalid={errors.name || undefined}
                className={errors.name ? "field--invalid" : ""}
                onChange={(event) => update("name", event.target.value)}
              />
              <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                autoComplete="email"
                placeholder="Abc@def.com"
                value={values.email}
                aria-invalid={errors.email || undefined}
                className={errors.email ? "field--invalid" : ""}
                onChange={(event) => update("email", event.target.value)}
              />
              <Input
                id="subject"
                name="subject"
                label="Subject"
                placeholder="This is an optional"
                value={values.subject}
                onChange={(event) => update("subject", event.target.value)}
              />
              <Input
                id="message"
                name="message"
                label="Message"
                placeholder="Hi! I'd like to ask about"
                multiline
                value={values.message}
                aria-invalid={errors.message || undefined}
                className={`contact__message${errors.message ? " field--invalid" : ""}`}
                onChange={(event) => update("message", event.target.value)}
              />
            </div>
            <Button className="contact__submit" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </section>
      {sent && <OrderPopup title="Your request has been sent!" shopLabel="Go Shopping" />}
    </>
  );
}
