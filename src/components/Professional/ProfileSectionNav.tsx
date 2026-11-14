"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// In-page links to the profile sections. The labels are the section titles themselves. The link of
// the section currently on screen is underlined.
export const PROFILE_SECTIONS = [
  { id: "about", label: "O mne" },
  { id: "work", label: "Moja tvorba" },
  { id: "packages", label: "Moje balíky" },
  { id: "reviews", label: "Recenzie" },
];

const ProfileSectionNav = () => {
  const [active, setActive] = useState(PROFILE_SECTIONS[0].id);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      // A section counts as "current" when it crosses the upper part of the screen.
      { rootMargin: "-25% 0px -65% 0px" }
    );
    PROFILE_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="-mb-px flex gap-6 overflow-x-auto sm:gap-8">
      {PROFILE_SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={() => setActive(id)}
          aria-current={active === id ? "true" : undefined}
          className={cn(
            "shrink-0 whitespace-nowrap border-b-2 py-4 text-sm sm:text-base font-semibold transition-colors",
            active === id
              ? "border-secondary-color text-base-color"
              : "border-transparent text-base-color/55 hover:text-base-color"
          )}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default ProfileSectionNav;
