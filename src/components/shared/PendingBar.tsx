"use client";
import SpinLoader from "@/components/ui/SpinLoader";

interface Props {
  pending: boolean;
  label?: string;
}

/**
 * Clear "something is loading" feedback for URL-driven fetches (tabs, pagination, search).
 * A server navigation keeps the old screen visible until the new data arrives, so without this
 * a tap looks like it did nothing.
 *
 * Fixed-position, so it is visible wherever the visitor has scrolled to.
 */
const PendingBar = ({ pending, label = "Načítava sa…" }: Props) => {
  if (!pending) return null;

  return (
    <>
      <div
        role="progressbar"
        aria-label={label}
        className="fixed inset-x-0 top-0 z-[10000] h-1 overflow-hidden bg-secondary-color/20 pointer-events-none"
      >
        <div className="h-full w-1/3 rounded-full bg-secondary-color animate-pending-bar" />
      </div>
      <div
        role="status"
        className="fixed top-20 left-1/2 z-[10000] flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-base-color shadow-lg pointer-events-none"
      >
        <SpinLoader />
        {label}
      </div>
    </>
  );
};

export default PendingBar;
