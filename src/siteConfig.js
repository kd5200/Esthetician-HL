export const SITE = {
  phone: "3373782049",
  phoneTel: "+13373782049",
  phoneDisplay: "(337) 378-2049",
  email: "hajimel@icloud.com",
  location: "Fort Lauderdale, FL 33308",
  hours: "By appointment · Tue – Sat",
  bookingUrl: import.meta.env.VITE_BOOKING_URL?.trim() || "",
};

/**
 * Deposit policy — percentage scales with service price.
 * Override in .env: VITE_BOOKING_DEPOSIT_PERCENT, VITE_BOOKING_DEPOSIT_MINIMUM
 */
export const BOOKING_POLICY = {
  depositPercent: import.meta.env.VITE_BOOKING_DEPOSIT_PERCENT?.trim() || "50",
  depositMinimum: import.meta.env.VITE_BOOKING_DEPOSIT_MINIMUM?.trim() || "10",
  cancelNoticeHours: 24,
};

export function depositLabel() {
  const pct = BOOKING_POLICY.depositPercent;
  const min = BOOKING_POLICY.depositMinimum;
  if (!pct) return "a deposit based on your selected service";
  if (min) return `${pct}% of your service price (minimum $${min})`;
  return `${pct}% of your service price`;
}

export function bookingHref() {
  return SITE.bookingUrl || "#book";
}

export function isExternalBooking() {
  return Boolean(SITE.bookingUrl);
}
