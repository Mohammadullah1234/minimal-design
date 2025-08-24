"use strict";

import { Chance } from "chance";
import {
  ColorOptions,
  COLORS,
  ColumnDataGenerator,
  COMMODITY_OPTIONS,
  CONTRACT_TYPE_OPTIONS,
  COUNTRY_ISO_OPTIONS,
  CountryIsoOption,
  CURRENCY_OPTIONS,
  INCOTERM_OPTIONS,
  RATE_TYPE_OPTIONS,
  STATUS_OPTIONS,
  TAXCODE_OPTIONS,
} from "./staticData";

let chance = new Chance();
/**
 * Wrap a data generator that returns a string and add a prefix if the value generated has already been given
 */
const uniquenessHandler =
  <T>(generator: ColumnDataGenerator<T>): ColumnDataGenerator<string> =>
  (data, context) => {
    const rawValue = generator(data, context) as string;
    if (!context.values) {
      return rawValue;
    }
    const valueCount = (context.values[rawValue] ?? 0) + 1;
    context.values[rawValue] = valueCount + 1;
    if (valueCount > 1) {
      return `${rawValue} ${valueCount}`;
    }

    return rawValue;
  };

function dateFuture(years?: number, refDate?: string): Date {
  let date = new Date();
  if (typeof refDate !== "undefined") {
    date = new Date(Date.parse(refDate));
  }
  const range = {
    min: 1000,
    max: (years || 1) * 365 * 24 * 3600 * 1000,
  };

  // some time from now to N years later, in milliseconds
  const past = date.getTime() + chance.integer(range);
  date.setTime(past);
  return date;
}

function dateRecent(days?: number, refDate?: string): Date {
  let date = new Date();
  if (typeof refDate !== "undefined") {
    date = new Date(Date.parse(refDate));
  }
  const range = {
    min: 1000,
    max: (days || 1) * 24 * 3600 * 1000,
  };

  // some time from now to N days ago, in milliseconds
  const past = date.getTime() - chance.integer(range);
  date.setTime(past);
  return date;
}

function datePast(years?: number, refDate?: string): Date {
  let date = new Date();
  if (typeof refDate !== "undefined") {
    date = new Date(Date.parse(refDate));
  }
  const range = {
    min: 1000,
    max: (years || 1) * 365 * 24 * 3600 * 1000,
  };

  // some time from now to N years ago, in milliseconds
  const past = date.getTime() - chance.integer(range);
  date.setTime(past);
  return date;
}

// exports --------------------------------------------------------------------
export const random: (min: number, max: number) => number = (min, max) =>
  chance.floating({
    min,
    max,
  });

export const randomInt: (min: number, max: number) => number = (min, max) =>
  chance.integer({
    min,
    max,
  });

export const randomPrice: (min?: number, max?: number) => number = (
  min = 0,
  max = 100000
) => Number(random(min, max).toFixed(2));

export const randomRate: () => number = () => random(0, 1);

export const randomDate: (start: Date, end: Date) => Date = (start, end) =>
  new Date(
    start.getTime() +
      chance.floating({
        min: 0,
        max: 1,
      }) *
        (end.getTime() - start.getTime())
  );

export const randomArrayItem: <T>(arr: T[]) => T = (arr) =>
  arr[randomInt(0, arr.length - 1)];

export const randomBoolean: () => boolean = () =>
  randomArrayItem([true, false]);

export const randomColor: () => ColorOptions = () => randomArrayItem(COLORS);

export const randomId: () => string = () => chance.guid();

export const randomDesk: () => string = () =>
  `D-${chance.integer({
    min: 0,
    max: 10000,
  })}`;

export const randomCommodity: () => string = () =>
  randomArrayItem(COMMODITY_OPTIONS);
export const randomTraderName: () => string = () => chance.name();

export const randomUserName: () => string = () => chance.twitter();

export const randomEmail: () => string = () => chance.email();

export const randomUrl: () => string = () => chance.url();

export const randomPhoneNumber: () => string = () => chance.phone();

export const randomUnitPrice: () => number = () => randomPrice(1, 100);

export const randomUnitPriceCurrency: () => string = () =>
  randomArrayItem(CURRENCY_OPTIONS);

export const randomQuantity: () => number = () => randomInt(1000, 100000);

export const randomFeeRate: () => number = () =>
  Number(random(0.1, 0.4).toFixed(3));

export const randomIncoterm: () => string = () =>
  randomArrayItem(INCOTERM_OPTIONS);

export const randomStatusOptions: () => string = () =>
  randomArrayItem(STATUS_OPTIONS);

export const randomPnL: () => number = () => random(-100000000, 100000000);

export const randomMaturityDate: () => Date = () => dateFuture();

export const randomTradeDate: () => Date = () => dateRecent();

export const randomBrokerId: () => string = () => chance.guid();

export const randomCompanyName: () => string = () => chance.company();

export const randomCountry: () => CountryIsoOption = () =>
  randomArrayItem<CountryIsoOption>(COUNTRY_ISO_OPTIONS);

export const randomCurrency: () => string = () =>
  randomArrayItem(CURRENCY_OPTIONS);

export const randomAddress: () => string = () => chance.address();

export const randomCity: () => string = () => chance.city();

export const randomTaxCode: () => string = () =>
  randomArrayItem(TAXCODE_OPTIONS);

export const randomContractType: () => string = () =>
  randomArrayItem(CONTRACT_TYPE_OPTIONS);

export const randomRateType: () => string = () =>
  randomArrayItem(RATE_TYPE_OPTIONS);

export const randomCreatedDate: () => Date = () => datePast();

export const randomUpdatedDate: () => Date = () => dateRecent();

export const randomJobTitle: () => string = () => chance.profession();

export const randomRating: () => number = () => randomInt(1, 5);

export const randomName: ColumnDataGenerator<string> =
  uniquenessHandler<string>(() => chance.name());

export const generateFilledQuantity: (data: { quantity: number }) => number = (
  data
) => Number((data.quantity * randomRate()).toFixed()) / data.quantity;

export const generateIsFilled: (data: {
  quantity: number;
  filledQuantity: number;
}) => boolean = (data) => data.quantity === data.filledQuantity;
