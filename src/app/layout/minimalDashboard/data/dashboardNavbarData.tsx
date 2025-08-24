"use client";

import { ButtonProps } from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { usePageLoader } from "../MinimalDashboardLayout";
import {
  Home,
  Project,
  Security,
  Subscription,
  User,
} from "@/UI/icons/minimal";

export type NotificationMembersDataProps = {
  title: string[];
  caption: string;
  buttons: string[];
  message?: string;
};

export const notificationMembersData: NotificationMembersDataProps[] = [
  {
    title: ["Deja Brady", "sent you a friend request"],
    caption: "2 minutes - Communication",
    buttons: ["Accept", "Decline"],
  },
  {
    title: ["Jayvon Hull", "mentioned you in", "Minimal UI"],
    caption: "a day - Project UI",
    buttons: ["Reply"],
    message:
      "@Jaydon Frankie feedback by asking questions or just leave a note of appreciation.",
  },
  {
    title: ["Lainey Davidson", "added file to", "File manager"],
    caption: "2 days - File Manager",
    buttons: ["Reply"],
    message: "design-surinam-2015.mp3.",
  },
];

export type CountriesDataProps = {
  image: string;
  name: string;
  caption?: string;
  status?: "active" | "failed" | "none" | "pending";
};

export const countriesData: CountriesDataProps[] = [
  {
    image: "/flags/en.svg",
    name: "English",
  },
  {
    image: "/flags/fr.svg",
    name: "French",
  },
  {
    image: "/flags/vi.svg",
    name: "Vietnamese",
  },
  {
    image: "/flags/ch.svg",
    name: "Chinese",
  },
  {
    image: "/flags/ar.svg",
    name: "Arabic",
  },
];

export type ContactsDataProps = {
  gender: "male" | "female";
  category: "man" | "woman" | "kid";
} & CountriesDataProps;

export const contactsData: ContactsDataProps[] = [
  {
    image: "/avatar/avatar-1.webp",
    name: "Jayvion Simon",
    gender: "female",
    category: "kid",
    status: "failed",
  },
  {
    image: "/avatar/avatar-2.webp",
    name: "Lucian Obrien",
    gender: "male",
    category: "kid",
    status: "active",
  },
  {
    image: "/avatar/avatar-3.webp",
    name: "Deja Barady",
    gender: "female",
    caption: "2 days",
    category: "woman",
    status: "none",
  },
  {
    image: "/avatar/avatar-4.webp",
    name: "Harrison Stein",
    gender: "male",
    category: "kid",
    status: "active",
  },
  {
    image: "/avatar/avatar-5.webp",
    name: "Reece Chung",
    gender: "female",
    caption: "4 days",
    category: "kid",
    status: "none",
  },
  {
    image: "/avatar/avatar-6.webp",
    name: "Lainey Davidson",
    gender: "male",
    category: "man",
    status: "pending",
  },
  {
    image: "/avatar/avatar-7.webp",
    name: "Cristopher Cardenas",
    gender: "female",
    category: "woman",
    status: "active",
  },
  {
    image: "/avatar/avatar-8.webp",
    name: "Melanie Noble",
    gender: "female",
    category: "woman",
    status: "none",
  },
  {
    image: "/avatar/avatar-9.webp",
    name: "Chase Day",
    gender: "male",
    caption: "8 days",
    category: "man",
    status: "active",
  },
  {
    image: "/avatar/avatar-10.webp",
    name: "Shawn Manning",
    gender: "male",
    category: "man",
    status: "none",
  },
  {
    image: "/avatar/avatar-11.webp",
    name: "Soren Durham",
    gender: "female",
    caption: "10 days",
    category: "woman",
    status: "active",
  },
  {
    image: "/avatar/avatar-12.webp",
    name: "Cortez Herring",
    gender: "male",
    category: "man",
    status: "none",
  },
  {
    image: "/avatar/avatar-13.webp",
    name: "Brycen Jimenez",
    gender: "female",
    category: "woman",
    status: "active",
  },
  {
    image: "/avatar/avatar-14.webp",
    name: "Giana Brandt",
    gender: "female",
    category: "woman",
    status: "pending",
  },
  {
    image: "/avatar/avatar-15.webp",
    name: "Aspen Schmit",
    caption: "15 days",
    gender: "male",
    category: "kid",
    status: "active",
  },
  {
    image: "/avatar/avatar-16.webp",
    name: "Colten Aguillar",
    gender: "female",
    category: "kid",
    status: "active",
  },
  {
    image: "/avatar/avatar-17.webp",
    name: "Angelique Morse",
    gender: "female",
    caption: "17 days",
    category: "woman",
    status: "none",
  },
  {
    image: "/avatar/avatar-18.webp",
    name: "Selina Boyer",
    gender: "male",
    category: "kid",
    status: "active",
  },
  {
    image: "/avatar/avatar-19.webp",
    name: "Lawson Bass",
    gender: "male",
    category: "kid",
    status: "pending",
  },
  {
    image: "/avatar/avatar-20.webp",
    name: "Ariana Lang",
    gender: "male",
    category: "kid",
    status: "active",
  },
  {
    image: "/avatar/avatar-21.webp",
    name: "Jhon Smils",
    gender: "male",
    category: "man",
    status: "active",
  },
  {
    image: "/avatar/avatar-22.webp",
    name: "Aric Fara",
    gender: "female",
    category: "woman",
    status: "none",
  },
  {
    image: "/avatar/avatar-23.webp",
    name: "Eric James",
    gender: "male",
    category: "kid",
    status: "active",
  },
  {
    image: "/avatar/avatar-24.webp",
    name: "Nawson Mass",
    gender: "male",
    category: "kid",
    status: "pending",
  },
  {
    image: "/avatar/avatar-25.webp",
    name: "Jaydon Frankie",
    gender: "male",
    category: "kid",
    status: "active",
  },
];

export type DashboardNavbartButtonsProps = Omit<ButtonProps, "children"> & {
  element: React.ReactNode;
};

export const dashboardNavbarButtons: () => DashboardNavbartButtonsProps[] =
  () => {
    const router = useRouter();
    const { startLoading } = usePageLoader();

    return [
      {
        element: "Home",
        href: "/",
        startIcon: <Home />,
        onClick: startLoading,
      },
      {
        element: "About",
        href: "/about",
        startIcon: <User />,
        onClick: startLoading,
      },
      {
        element: "Projects",
        href: "/projects",
        startIcon: <Project />,
        onClick: startLoading,
      },
      {
        element: "Subscription",
        startIcon: <Subscription />,
      },
      {
        element: "Security",
        startIcon: <Security />,
      },
    ];
  };
