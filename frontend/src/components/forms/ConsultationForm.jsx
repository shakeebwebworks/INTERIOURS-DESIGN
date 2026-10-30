import { useEffect, useRef, useState } from "react";

import { submitConsultation } from "../../api/client.js";

// Values must match the choices in the Django model.
const PROJECT_TYPES = [
  ["interior_design", "Interior design"],
  ["home_renovation", "Home renovation"],
  ["modular_kitchen", "Modular kitchen"],
  ["living_room", "Living room design"],
  ["bedroom", "Bedroom design"],
  ["bathroom", "Bathroom renovation"],
  ["space_planning", "Space planning"],
  ["other", "Other"],
];

const BUDGETS = [
  ["under_5l", "Under \u20B95 lakh"],
  ["5_10l", "\u20B95 - 10 lakh"],
  ["10_25l", "\u20B910 - 25 lakh"],
  ["25_50l", "\u20B925 - 50 lakh"],
  ["above_50l", "Above \u20B950 lakh"],
  ["not_sure", "Not sure yet"],
];

const TIMELINES = [
  ["asap", "As soon as possible"],
  ["1_3_months", "1 - 3 months"],
  ["3_6_months", "3 - 6 months"],
  ["6_plus_months", "6+ months"],
  ["flexible", "Flexible"],
];

const FIELD_ORDER = ["name", "email", "phone", "location", "project_type", "budget", "timeline", "message"];

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  location: "",
  project_type: "",
  budget: "",
  timeline: "",
  message: "",
  website: "", // honeypot: real visitors never see or fill this
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;
const MAX_MESSAGE = 2000;
const DEFAULT_SUCCESS =
  "Thank you! Your consultation request has been received. We will contact you soon.";

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!PHONE_RE.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number (digits, spaces, +, -, brackets).";
  if (values.location.trim().length < 2) errors.location = "Please enter your project location.";
  if (!values.project_type) errors.project_type = "Please choose a project type.";
  if (!values.budget) errors.budget = "Please choose an approximate budget.";
  if (!values.timeline) errors.timeline = "Please choose a preferred timeline.";

  const message = values.message.trim();
  if (message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  else if (message.length > MAX_MESSAGE) errors.message = `Please keep your message under ${MAX_MESSAGE} characters.`;

  return errors;
}

function Field({ name, label, error, hint, children, className = "col-12" }) {
  return (
    <div className={className}>
      <label htmlFor={`consult-${name}`} className="field-label">
        {label} <span aria-hidden="true">*</span>
      </label>
      {children}
      {hint && !error && <div className="field-hint">{hint}</div>}
      {error && (
        <div id={`consult-${name}-error`} className="field-error">
          {error}
        </div>
      )}
    </div>
  );
}

export default function ConsultationForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState(DEFAULT_SUCCESS);

  const submittingRef = useRef(false); // blocks double submits before state updates
  const successRef = useRef(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };

  // Shared props for every input, so accessibility attributes stay consistent
  const bind = (name, base = "form-control") => ({
    id: `consult-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    required: true,
    disabled: status === "submitting",
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `consult-${name}-error` : undefined,
    className: `${base} hh-input${errors[name] ? " is-invalid" : ""}`,
  });

  const focusField = (key) => {
    setTimeout(() => document.getElementById(`consult-${key}`)?.focus(), 0);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (submittingRef.current) return;

    const found = validate(values);
    setErrors(found);
    setFormError("");

    const firstInvalid = FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      setStatus("idle");
      focusField(firstInvalid);
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");

    try {
      const data = await submitConsultation({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        location: values.location.trim(),
        project_type: values.project_type,
        budget: values.budget,
        timeline: values.timeline,
        message: values.message.trim(),
        website: values.website,
      });

      setSuccessMessage(data?.message || DEFAULT_SUCCESS);
      setValues(INITIAL);
      setErrors({});
      setStatus("success");
    } catch (error) {
      const serverFieldErrors = error.fieldErrors || {};
      setErrors(serverFieldErrors);
      setFormError(error.message || "Something went wrong. Please try again.");
      setStatus("error");

      const firstServerError = FIELD_ORDER.find((key) => serverFieldErrors[key]);
      if (firstServerError) focusField(firstServerError);
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <i className="bi bi-check-circle" aria-hidden="true" />
        <h3 ref={successRef} tabIndex={-1}>
          Request received
        </h3>
        <p>{successMessage}</p>
        <button type="button" className="btn-hh btn-hh-outline" onClick={() => setStatus("idle")}>
          Send another request
        </button>
      </div>
    );
  }

  const sending = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={sending}>
      {formError && (
        <div className="form-alert" role="alert">
          <i className="bi bi-exclamation-triangle" aria-hidden="true" /> {formError}
        </div>
      )}

      <div className="row g-3">
        <Field name="name" label="Full name" error={errors.name} className="col-md-6">
          <input type="text" autoComplete="name" {...bind("name")} />
        </Field>

        <Field name="email" label="Email" error={errors.email} className="col-md-6">
          <input type="email" autoComplete="email" {...bind("email")} />
        </Field>

        <Field name="phone" label="Phone" error={errors.phone} className="col-md-6">
          <input type="tel" autoComplete="tel" {...bind("phone")} />
        </Field>

        <Field name="location" label="Project location" error={errors.location} className="col-md-6">
          <input type="text" autoComplete="address-level2" placeholder="City or area" {...bind("location")} />
        </Field>

        <Field name="project_type" label="Project type" error={errors.project_type} className="col-md-6">
          <select {...bind("project_type", "form-select")}>
            <option value="">Select a project type</option>
            {PROJECT_TYPES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field name="budget" label="Approximate budget" error={errors.budget} className="col-md-6">
          <select {...bind("budget", "form-select")}>
            <option value="">Select a budget range</option>
            {BUDGETS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field name="timeline" label="Preferred timeline" error={errors.timeline}>
          <select {...bind("timeline", "form-select")}>
            <option value="">When would you like to start?</option>
            {TIMELINES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          name="message"
          label="Project description"
          error={errors.message}
          hint={`${values.message.length} / ${MAX_MESSAGE} characters`}
        >
          <textarea
            rows={5}
            maxLength={MAX_MESSAGE}
            placeholder="Tell us about your space, what you would like to change and any must-haves."
            {...bind("message")}
          />
        </Field>
      </div>

      {/* Honeypot spam trap: hidden from people and screen readers, bots tend to fill it */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="consult-website">Leave this field empty</label>
        <input
          type="text"
          id="consult-website"
          name="website"
          value={values.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="d-flex flex-wrap align-items-center gap-3 mt-4">
        <button type="submit" className="btn-hh btn-hh-accent" disabled={sending}>
          {sending ? (
            <>
              <span className="spinner-border spinner-border-sm" aria-hidden="true" /> Sending...
            </>
          ) : (
            "Request a Consultation"
          )}
        </button>
        <span className="form-privacy">We only use your details to respond to your request.</span>
      </div>
    </form>
  );
}