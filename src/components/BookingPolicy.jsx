import { BOOKING_POLICY, depositLabel } from "../siteConfig";

function depositExample() {
  const pct = Number(BOOKING_POLICY.depositPercent) || 50;
  const samplePrice = 60;
  const sampleDeposit = Math.round((samplePrice * pct) / 100);
  return `a $${samplePrice} facial requires a $${sampleDeposit} deposit at ${pct}%`;
}

export default function DepositNotice({ compact = false }) {
  const deposit = depositLabel();
  const hours = BOOKING_POLICY.cancelNoticeHours;

  if (compact) {
    return (
      <p className="deposit-notice deposit-notice--compact">
        <strong>Deposit required.</strong> {deposit} due upfront to hold your
        spot — applied to your service total. No-shows and cancellations with
        less than {hours} hours&apos; notice forfeit the deposit.{" "}
        <a href="#policies">Full policy →</a>
      </p>
    );
  }

  return (
    <div className="deposit-notice">
      <p className="promo-tag">Booking policy</p>
      <p>
        A <strong>non-refundable deposit of {deposit}</strong> is required
        upfront to secure your appointment. The deposit is applied toward your
        service total at checkout.
      </p>
      <p>
        Cancellations with less than <strong>{hours} hours&apos; notice</strong>,
        no-shows, and late arrivals may forfeit the deposit.
      </p>
    </div>
  );
}

export const POLICY_SECTIONS = [
  {
    title: "Deposit required",
    body: () =>
      `All appointments require a deposit of ${depositLabel()} upfront at booking. Because services vary in price, the deposit scales with your appointment — for example, ${depositExample()}. The deposit is applied to your service total.`,
  },
  {
    title: "Cancellations & rescheduling",
    body: () =>
      `Please provide at least ${BOOKING_POLICY.cancelNoticeHours} hours' notice to cancel or reschedule. With proper notice, your deposit may be transferred to a new appointment. Late cancellations may forfeit the deposit.`,
  },
  {
    title: "No-shows & late arrivals",
    body: () =>
      "Missed appointments without notice forfeit the deposit. If you are running late, please call or text — appointments may need to be shortened or rescheduled to stay on time for other clients.",
  },
  {
    title: "How payment works",
    body: () =>
      "When online booking is enabled, your deposit is collected at checkout through the booking platform. For appointments arranged by message or phone, Hajime will confirm your deposit before your visit is finalized.",
  },
];
