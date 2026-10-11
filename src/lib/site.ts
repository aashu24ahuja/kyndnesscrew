export const SITE = {
  name: "Kyndness Crew",
  description:
    "A community-driven platform to identify and assist underprivileged individuals. Report someone in need and our volunteers will evaluate on the ground.",
  instagram: "https://www.instagram.com/thekyndnesscrew/",
  instagramHandle: "@thekyndnesscrew",
  phone: "+91 98606 79558",
  phoneHref: "tel:+919860679558",
};

export const NEED_TYPES = [
  { value: "food", label: "Food" },
  { value: "shelter", label: "Shelter" },
  { value: "medical", label: "Medical care" },
  { value: "clothing", label: "Clothing" },
  { value: "elderly", label: "Elderly support" },
  { value: "child", label: "Child welfare" },
  { value: "livelihood", label: "Livelihood" },
  { value: "other", label: "Something else" },
] as const;

export const URGENCY = [
  { value: "today", label: "Needs help today" },
  { value: "week", label: "Within a week" },
  { value: "ongoing", label: "Ongoing need" },
] as const;

// Latest four reels from instagram.com/thekyndnesscrew (reel shortcodes).
// Each needs a 9:16 cover at public/reels/<code>.webp.
export const REELS = ["DeV-NMpIZ-w", "DZS0Z9sOyTn", "DZHW_OYOhYc", "DZBBN0vN1yV"];

// TODO: replace with the real crew. Drop photos in /public/crew and set `photo`.
export const CREW: { name: string; role: string; photo?: string }[] = [
  { name: "Crew member", role: "Founder" },
  { name: "Crew member", role: "Field operations lead" },
  { name: "Crew member", role: "Volunteer coordinator" },
  { name: "Crew member", role: "Medical outreach" },
  { name: "Crew member", role: "Partnerships" },
  { name: "Crew member", role: "Community & social" },
];
