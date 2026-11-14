import { cn } from "@/lib/utils";

// Section heading of the creator profile (O mne, Moja tvorba, Moje balíky, Recenzie).
const ProfileSectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn("text-2xl sm:text-[1.75rem] font-bold tracking-tight text-base-color", className)}>{children}</h2>
);

export default ProfileSectionTitle;
