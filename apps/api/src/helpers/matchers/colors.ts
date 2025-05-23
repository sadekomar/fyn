export const colors: Record<string, string[]> = {
  black: ["black", "charcoal", "kohl"],
  white: ["white", "vanilla", "snow"],
  red: ["brick", "burgandy", "burgundy", "maroon", "red", "wine"],
  blue: [
    "aqua",
    "babyblue",
    "blue",
    "blues",
    "ice",
    "navy",
    "teal",
    "turquoise",
    "electric",
    "denim",
    "sky",
    "nile",
    "electra",
    "azure",
  ],
  green: [
    "emerald",
    "green",
    "greens",
    "jade",
    "lime",
    "matcha",
    "mint",
    "pistachio",
    "sage",
    "hazel",
    "lush",
    "limoncello",
  ],
  cream: ["cream", "creme", "offwhite", "crepe"],
  beige: ["beige", "biege", "dune", "ecru"],
  nude: ["nude"],
  tan: ["camal", "camel", "tan", "havane"],
  brown: [
    "brown",
    "coffee",
    "marron",
    "cinnamon",
    "cacao",
    "cafe",
    "mocha",
    "khaki",
  ],
  yellow: ["cuman", "cumin", "lemonade", "mustard", "yellow", "sand"],
  gold: ["gold"],
  gray: ["butter", "gray", "grey"],
  olive: ["army", "olive"],
  orange: ["orange", "peach", "coral"],
  pink: [
    "bubblegum",
    "fuchia",
    "fuchsia",
    "fushia",
    "pink",
    "rose",
    "simon",
    "cotton candy",
  ],
  purple: [
    "lavendar",
    "lavender",
    "lilac",
    "magneta",
    "purple",
    "eggplant",
    "indigo",
  ],
  silver: ["silver"],
  other: [
    "kashmir",
    "leopard",
    "multicolor",
    "printed",
    "rainbow",
    "transparent",
  ],
};

enum C {
  Black = "black",
  White = "white",
  Red = "red",
  Blue = "blue",
  Green = "green",
  Cream = "cream",
  Beige = "beige",
  Nude = "nude",
  Tan = "tan",
  Brown = "brown",
  Yellow = "yellow",
  Gold = "gold",
  Gray = "gray",
  Olive = "olive",
  Orange = "orange",
  Pink = "pink",
  Purple = "purple",
  Silver = "silver",
  Other = "other",
}

export const colorMatcher: Record<string, C> = {
  // Black
  black: C.Black,
  charcoal: C.Black,
  kohl: C.Black,

  // White
  white: C.White,
  vanilla: C.White,
  snow: C.White,

  // Red
  brick: C.Red,
  burgandy: C.Red,
  burgundy: C.Red,
  maroon: C.Red,
  red: C.Red,
  wine: C.Red,

  // Blue
  aqua: C.Blue,
  babyblue: C.Blue,
  blue: C.Blue,
  blues: C.Blue,
  ice: C.Blue,
  navy: C.Blue,
  teal: C.Blue,
  turquoise: C.Blue,
  electric: C.Blue,
  denim: C.Blue,
  sky: C.Blue,
  nile: C.Blue,
  electra: C.Blue,
  azure: C.Blue,

  // Green
  emerald: C.Green,
  green: C.Green,
  greens: C.Green,
  jade: C.Green,
  lime: C.Green,
  matcha: C.Green,
  mint: C.Green,
  pistachio: C.Green,
  sage: C.Green,
  hazel: C.Green,
  lush: C.Green,
  limoncello: C.Green,

  // Cream
  cream: C.Cream,
  creme: C.Cream,
  offwhite: C.Cream,
  crepe: C.Cream,

  // Beige
  beige: C.Beige,
  biege: C.Beige,
  dune: C.Beige,
  ecru: C.Beige,

  // Nude
  nude: C.Nude,

  // Tan
  camal: C.Tan,
  camel: C.Tan,
  tan: C.Tan,
  havane: C.Tan,

  // Brown
  brown: C.Brown,
  coffee: C.Brown,
  marron: C.Brown,
  cinnamon: C.Brown,
  cacao: C.Brown,
  cafe: C.Brown,
  mocha: C.Brown,
  khaki: C.Brown,

  // Yellow
  cuman: C.Yellow,
  cumin: C.Yellow,
  lemonade: C.Yellow,
  mustard: C.Yellow,
  yellow: C.Yellow,
  sand: C.Yellow,

  // Gold
  gold: C.Gold,

  // Gray
  butter: C.Gray,
  gray: C.Gray,
  grey: C.Gray,

  // Olive
  army: C.Olive,
  olive: C.Olive,

  // Orange
  orange: C.Orange,
  peach: C.Orange,
  coral: C.Orange,

  // Pink
  bubblegum: C.Pink,
  fuchia: C.Pink,
  fuchsia: C.Pink,
  fushia: C.Pink,
  pink: C.Pink,
  rose: C.Pink,
  simon: C.Pink,
  "cotton candy": C.Pink,

  // Purple
  lavendar: C.Purple,
  lavender: C.Purple,
  lilac: C.Purple,
  magneta: C.Purple,
  purple: C.Purple,
  eggplant: C.Purple,
  indigo: C.Purple,

  // Silver
  silver: C.Silver,

  // Other
  kashmir: C.Other,
  leopard: C.Other,
  multicolor: C.Other,
  printed: C.Other,
  rainbow: C.Other,
  transparent: C.Other,
};
