import { Link } from "react-router-dom";

// variant: primary | accent | outline | light
export default function Button({ to, variant = "primary", className = "", children, ...rest }) {
  const classes = `btn-hh btn-hh-${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}