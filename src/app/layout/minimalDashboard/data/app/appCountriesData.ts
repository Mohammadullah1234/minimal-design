export type AppCountriesProps = {
  countryImg: string;
  countryName: string;
  personValue: string;
  windowValue: string;
  appleValue: string;
};

export const appCountriesData: AppCountriesProps[] = [
  {
    countryImg: "/flags/de.svg",
    countryName: "Germany",
    personValue: "0.91k",
    windowValue: "1.95k",
    appleValue: "9.12k",
  },
  {
    countryImg: "/flags/en.svg",
    countryName: "England",
    personValue: "1.95k",
    windowValue: "9.12k",
    appleValue: "6.98k",
  },
  {
    countryImg: "/flags/fr.svg",
    countryName: "France",
    personValue: "9.12k",
    windowValue: "6.98k",
    appleValue: "8.49k",
  },
  {
    countryImg: "/flags/ko.svg",
    countryName: "Korean",
    personValue: "6.98k",
    windowValue: "8.49k",
    appleValue: "2.03k",
  },
  {
    countryImg: "/flags/us.svg",
    countryName: "USA",
    personValue: "8.49k",
    windowValue: "2.03k",
    appleValue: "3.36k",
  },
];
