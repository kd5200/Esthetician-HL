import { bookingHref, isExternalBooking } from "../siteConfig";

export default function BookLink({ className, children, ...props }) {
  const external = isExternalBooking();

  return (
    <a
      href={bookingHref()}
      className={className}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
    >
      {children}
    </a>
  );
}
