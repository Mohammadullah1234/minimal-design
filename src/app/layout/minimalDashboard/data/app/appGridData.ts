export type AppGridDataProps = {
  invoiceID: string;
  category: string;
  price: number;
  status: "Paid" | "Out of date" | "Progress" | "Pending";
};

export const appGridData: AppGridDataProps[] = [
  {
    invoiceID: "INV-1990",
    category: "Android",
    price: 83.74,
    status: "Paid",
  },
  {
    invoiceID: "INV-1991",
    category: "Mac",
    price: 98.14,
    status: "Out of date",
  },
  {
    invoiceID: "INV-1992",
    category: "Windows",
    price: 65.72,
    status: "Progress",
  },
  {
    invoiceID: "INV-1993",
    category: "Microsoft",
    price: 84.22,
    status: "Paid",
  },
  {
    invoiceID: "INV-1994",
    category: "Apple",
    price: 120.17,
    status: "Pending",
  },
];
