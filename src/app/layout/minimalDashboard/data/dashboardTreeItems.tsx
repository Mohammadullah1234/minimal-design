"use client";

import { NavItemDef } from "@/UI/material/NavigationBar";
import Label from "@/UI/material/Label";
import {
  Analytic,
  Bank,
  Blank,
  Blog,
  Booking,
  Calendar,
  Chat,
  Course,
  Disabled,
  Ecommerce,
  Envelope,
  External,
  ExternalStandard,
  File,
  Folder,
  Invoice,
  Job,
  Kanban,
  Lock,
  Mail,
  Menu,
  Order,
  Params,
  Product,
  Speed,
  Stars,
  SubPaths,
  Tour,
  User,
} from "@/UI/icons/minimal";

const generateManageMentChildren = (id: string): NavItemDef[] => [
  {
    id: `${id}-list`,
    element: "List",
    type: "sub",
    href: "/list",
  },
  {
    id: `${id}-details`,
    element: "Details",
    type: "sub",
    href: "/details",
  },
  {
    id: `${id}-create`,
    element: "Create",
    type: "sub",
    href: "/create",
  },
  {
    id: `${id}-edit`,
    element: "Edit",
    type: "sub",
    href: "/edit",
  },
];

const lessLevelItems: NavItemDef[] = [
  {
    id: "Level 1a",
    type: "sub",
    element: "Level 1a",
    children: [
      {
        id: "Level 2a",
        type: "sub",
        element: "Level 2a",
      },
      {
        id: "Level 2b",
        type: "sub",
        element: "Level 2b",
        children: [
          {
            id: "Level 3a",
            disabled: true,
            type: "sub",
            element: "Level 3a",
          },
          {
            id: "Level 3b",
            type: "sub",
            element: "Level 3b",
          },
        ],
      },
    ],
  },
  {
    id: "Level 1b",
    element: "Level 1b",
    type: "sub",
  },
];

const largeLevelItems: NavItemDef[] = [
  {
    id: "Level 2a",
    type: "sub",
    element: "Level 2a",
    startIcon: <User />,
    caption: "Lorem Ipsum is simply dummy in the world",
    children: [
      {
        id: "Level 3a",
        type: "sub",
        element: "Level 3a",
      },
      {
        id: "Level 3b",
        type: "sub",
        element: "Level 3b",
        children: [
          {
            id: "Level 4a",
            disabled: true,
            type: "sub",
            element: "Level 4a",
          },
          {
            id: "Level 4b",
            type: "sub",
            element: "Level 4b",
          },
        ],
      },
      {
        id: "Level 3c",
        element: "Level 3c",
        type: "sub",
      },
    ],
  },
  {
    id: "Level 2b",
    element: "Level 2b",
    type: "sub",
    startIcon: <Envelope />,
  },
  {
    id: "Level 2c",
    element: "Level 2c",
    type: "sub",
    startIcon: <Calendar />,
  },
];

export const ITEMS: () => NavItemDef[] = () => {
  const rootHref = "/dashboard";

  return [
    {
      id: "overview",
      element: "OVERVIEW",
      variant: "header",
      expanded: true,
      href: rootHref,
      children: [
        {
          id: "app",
          element: "App",
          href: "/app",
          startIcon: <Speed />,
        },
        {
          id: "ecommerce",
          element: "Ecommerce",
          href: "/ecommerce",
          startIcon: <Ecommerce />,
        },
        {
          id: "analytics",
          element: "Analytics",
          href: "/analytics",
          startIcon: <Analytic />,
        },
        {
          id: "banking",
          element: "Banking",
          href: "/banking",
          startIcon: <Bank />,
        },
        {
          id: "booking",
          element: "Booking",
          href: "/booking",
          startIcon: <Booking />,
        },
        {
          id: "file",
          element: "File",
          href: "/file",
          startIcon: <File />,
        },
        {
          id: "course",
          element: "Course",
          href: "/course",
          startIcon: <Course />,
        },
      ],
    },
    {
      id: "management",
      element: "MANAGEMENT",
      variant: "header",
      href: rootHref,
      expanded: true,
      children: [
        {
          id: "user",
          element: "User",
          href: "/user",
          startIcon: <User />,
          children: [
            {
              id: "user-profile",
              element: "Profile",
              href: "/profile",
              type: "sub",
            },
            {
              id: "user-cards",
              element: "Cards",
              href: "/cards",
              type: "sub",
            },
            {
              id: "user-list",
              element: "List",
              href: "/list",
              type: "sub",
            },
            {
              id: "user-create",
              element: "Create",
              href: "/create",
              type: "sub",
            },
            {
              id: "user-edit",
              element: "Edit",
              href: "/edit",
              type: "sub",
            },
            {
              id: "user-account",
              element: "Account",
              href: "/account",
              type: "sub",
            },
          ],
        },
        {
          id: "product",
          element: "Product",
          href: "/product",
          startIcon: <Product />,
          children: generateManageMentChildren("product"),
        },
        {
          id: "order",
          element: "Order",
          href: "/order",
          startIcon: <Order />,
          children: [
            {
              id: "order-list",
              element: "List",
              href: "/list",
              type: "sub",
            },
            {
              id: "order-details",
              element: "Details",
              href: "/details",
              type: "sub",
            },
          ],
        },
        {
          id: "invoice",
          element: "Invoice",
          href: "/invoice",
          startIcon: <Invoice />,
          children: generateManageMentChildren("invoice"),
        },
        {
          id: "blog",
          element: "Blog",
          href: "/blog",
          startIcon: <Blog />,
          children: generateManageMentChildren("blog"),
        },
        {
          id: "job",
          element: "Job",
          href: "/job",
          startIcon: <Job />,
          children: generateManageMentChildren("job"),
        },
        {
          id: "tour",
          element: "Tour",
          href: "/tour",
          startIcon: <Tour />,
          children: generateManageMentChildren("tour"),
        },
        {
          id: "file-manager",
          element: "File Manager",
          href: "/fileManager",
          startIcon: <Folder />,
        },
        {
          id: "mail",
          element: "Mail",
          href: "/mail",
          startIcon: <Mail />,
          endIcon: <Label color="error">+32</Label>,
        },
        {
          id: "chat",
          element: "Chat",
          href: "/chat",
          startIcon: <Chat />,
        },
        {
          id: "kanban",
          element: "Kanban",
          href: "/kanban",
          startIcon: <Kanban />,
        },
      ],
    },
    {
      id: "misc",
      element: "MISC",
      variant: "header",
      expanded: true,
      href: rootHref,
      children: [
        {
          id: "permission",
          element: "Permission",
          caption: "Only admin can see this item",
          href: "/permission",
          startIcon: <Lock />,
        },
        {
          id: "level",
          element: "Level",
          startIcon: <Menu />,
          children: lessLevelItems,
        },
        {
          id: "disabled",
          element: "Disabled",
          disabled: true,
          startIcon: <Disabled />,
        },
        {
          id: "label",
          element: "Label",
          startIcon: <Stars />,
          endIcon: <Label color="info">Label</Label>,
        },
        {
          id: "caption",
          element: "Caption",
          typdffe: "div",
          startIcon: <Menu />,
          caption:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia obcaecati cumque omnis autem perferendis dolorem deserunt in, voluptates vitae.",
        },
        {
          id: "params",
          element: "Params",
          startIcon: <Params />,
          href: "/params/e99f09a7-dd88-40d5-b1c8-1daf80c2d7b1",
        },
        {
          id: "subpaths",
          element: "Subpaths",
          startIcon: <SubPaths />,
          href: "/subpaths",
        },
        {
          id: "external-link",
          element: "External link",
          href: "https://www.google.com",
          startIcon: <External />,
          endIcon: <ExternalStandard style={{ width: 16, height: 16 }} />,
          external: true,
        },
        {
          id: "blank",
          element: "Blank",
          href: "/blank",
          startIcon: <Blank />,
        },
      ],
    },
  ];
};
