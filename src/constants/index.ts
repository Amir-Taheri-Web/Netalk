import { TSideLinks } from "@/types/types";

const SIDE_LINKS: TSideLinks = [
  { icon: "/assets/home.svg", label: "Home", link: "/" },
  { icon: "/assets/search.svg", label: "Search", link: "/search" },
  { icon: "/assets/heart.svg", label: "Activity", link: "/activity" },
  {
    icon: "/assets/create.svg",
    label: "Create Thread",
    link: "/create-thread",
  },
  {
    icon: "/assets/community.svg",
    label: "Communities",
    link: "/communities",
  },
  { icon: "/assets/user.svg", label: "Profile", link: "/profile" },
];

export { SIDE_LINKS };
