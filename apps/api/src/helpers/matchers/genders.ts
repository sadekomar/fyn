export const genders: Record<string, string[]> = {
  male: [
    "male",
    "men",
    "man",
    "mens",
    "masculine",
    "boy",
    "boys",
    "guys",
    "guy",
  ],
  female: [
    "female",
    "women",
    "woman",
    "womens",
    "feminine",
    "girl",
    "girls",
    "ladies",
    "lady",
    "gals",
  ],
  unisex: [
    "unisex",
    "gender neutral",
    "neutral",
    "both",
    "everyone",
    "all genders",
  ],
  kids: [
    "kids",
    "children",
    "child",
    "toddler",
    "toddlers",
    "baby",
    "babies",
    "infant",
    "infants",
    "junior",
    "youth",
  ],
};

enum G {
  Male = "male",
  Female = "female",
  Unisex = "unisex",
  Kids = "kids",
}

export const genderMatcher: Record<string, G> = {
  // Male
  male: G.Male,
  men: G.Male,
  man: G.Male,
  mens: G.Male,
  masculine: G.Male,
  boy: G.Male,
  boys: G.Male,
  guys: G.Male,
  guy: G.Male,

  // Female
  female: G.Female,
  women: G.Female,
  woman: G.Female,
  womens: G.Female,
  feminine: G.Female,
  girl: G.Female,
  girls: G.Female,
  ladies: G.Female,
  lady: G.Female,
  gals: G.Female,

  // Unisex
  unisex: G.Unisex,
  "gender neutral": G.Unisex,
  neutral: G.Unisex,
  both: G.Unisex,
  everyone: G.Unisex,
  "all genders": G.Unisex,

  // Kids
  kids: G.Kids,
  children: G.Kids,
  child: G.Kids,
  toddler: G.Kids,
  toddlers: G.Kids,
  baby: G.Kids,
  babies: G.Kids,
  infant: G.Kids,
  infants: G.Kids,
  junior: G.Kids,
  youth: G.Kids,
};
