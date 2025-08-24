const assetsUrl: string = "/assets/minimal";

const generateImagePaths = <Key extends string>(
  folderName: string,
  key: string,
  arrayCount: number
): Record<Key, string> => {
  const result = {} as Record<Key, string>;

  Array.from(new Array(arrayCount)).map((_, i) => {
    result[`${key}-${i + 1}` as Key] = `${assetsUrl}/${folderName}/${key}-${
      i + 1
    }.webp`;
  });

  return result;
};

const generateFlagPaths = <Key extends string>(
  folderName: string,
  keys: string[]
): Record<Key, string> => {
  const result = {} as Record<Key, string>;
  keys.map((elm) => {
    result[elm as Key] = `${assetsUrl}/${folderName}/${elm}.svg`;
  });

  return result;
};

const flags = [
  "arabic",
  "china",
  "germany",
  "england",
  "french",
  "korean",
  "usa",
  "vietnamese",
];

export const minimalImages: MinimalImages = {
  logo: `${assetsUrl}/logo.svg`,
  shapeAvatar: `${assetsUrl}/shape-avatar.svg`,
  rocketSmall: `${assetsUrl}/rocket-small.webp`,
  rocketLarge: `${assetsUrl}/rocket-large.webp`,
  apps: {
    "microsoft-office": `${assetsUrl}/apps/microsoft-office.webp`,
    opera: `${assetsUrl}/apps/opera.webp`,
    "adobe-acrobat": `${assetsUrl}/apps/adobe-acrobat.webp`,
    joplin: `${assetsUrl}/apps/joplin.webp`,
    topaz: `${assetsUrl}/apps/topaz.webp`,
  },
  avatars: generateImagePaths<ImageKeys<"avatar">>("avatars", "avatar", 25),
  covers: generateImagePaths<ImageKeys<"cover">>("covers", "cover", 24),
  flags: generateFlagPaths<FlagKeys>("flags", flags),
  products: generateImagePaths<ImageKeys<"product">>("products", "product", 24),
  workspaces: {
    "logo-1": `${assetsUrl}/workspaces/logo-1.webp`,
    "logo-2": `${assetsUrl}/workspaces/logo-2.webp`,
    "logo-3": `${assetsUrl}/workspaces/logo-3.webp`,
  },
};

export type MinimalImages = {
  logo: string;
  shapeAvatar: string;
  rocketSmall: string;
  rocketLarge: string;
  apps: {
    "microsoft-office": string;
    opera: string;
    "adobe-acrobat": string;
    joplin: string;
    topaz: string;
  };
  avatars: Record<ImageKeys<"avatar">, string>;
  covers: Record<ImageKeys<"cover">, string>;
  flags: Record<FlagKeys, string>;
  products: Record<ImageKeys<"product">, string>;
  workspaces: {
    "logo-1": string;
    "logo-2": string;
    "logo-3": string;
  };
};

type FlagKeys =
  | "arabic"
  | "china"
  | "germany"
  | "england"
  | "french"
  | "korean"
  | "usa"
  | "vietnamese";
type ImageKeys<Key extends string> =
  | `${Key}-1`
  | `${Key}-2`
  | `${Key}-3`
  | `${Key}-4`
  | `${Key}-5`
  | `${Key}-6`
  | `${Key}-7`
  | `${Key}-8`
  | `${Key}-9`
  | `${Key}-10`
  | `${Key}-11`
  | `${Key}-12`
  | `${Key}-13`
  | `${Key}-14`
  | `${Key}-15`
  | `${Key}-16`
  | `${Key}-17`
  | `${Key}-18`
  | `${Key}-19`
  | `${Key}-20`
  | `${Key}-21`
  | `${Key}-22`
  | `${Key}-23`
  | `${Key}-24`
  | `${Key}-25`;
