import { categoryMatcher } from "./matchers/categories";
import { brandMatcher } from "./matchers/brands";
import { materialMatcher } from "./matchers/materials";
import { colorMatcher } from "./matchers/colors";
import { genderMatcher } from "./matchers/genders";

interface MatchResult {
  categories: string[];
  brands: string[];
  materials: string[];
  colors: string[];
  genders: string[];
  remainingQuery: string;
}

/**
 * Generates n-grams of size n from an array of words
 */
function generateNGrams(words: string[], n: number): string[] {
  const ngrams: string[] = [];
  for (let i = 0; i <= words.length - n; i++) {
    const ngram = words.slice(i, i + n).join(" ");
    ngrams.push(ngram);
  }
  return ngrams;
}

/**
 * Attempts to match an n-gram against all matchers
 */
function matchNGram(ngram: string): {
  category?: string;
  brand?: string;
  material?: string;
  color?: string;
  gender?: string;
} {
  const normalizedNgram = ngram.toLowerCase();
  return {
    category: categoryMatcher[normalizedNgram],
    brand: brandMatcher[normalizedNgram],
    material: materialMatcher[normalizedNgram],
    color: colorMatcher[normalizedNgram],
    gender: genderMatcher[normalizedNgram],
  };
}

/**
 * Removes matched words from the remaining words array
 */
function removeMatchedWords(words: string[], matchedNgram: string): string[] {
  const matchedWords = matchedNgram.split(" ");
  const result = [...words];

  // Find the starting index of the matched n-gram
  for (let i = 0; i <= words.length - matchedWords.length; i++) {
    let isMatch = true;
    for (let j = 0; j < matchedWords.length; j++) {
      if (words[i + j]?.toLowerCase() !== matchedWords[j]?.toLowerCase()) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      // Remove the matched words
      result.splice(i, matchedWords.length);
      break;
    }
  }

  return result;
}

/**
 * Implements the n-gram sliding window algorithm for search query parsing
 */
export function parseSearchQuery(searchQuery: string): MatchResult {
  if (!searchQuery?.trim()) {
    return {
      categories: [],
      brands: [],
      materials: [],
      colors: [],
      genders: [],
      remainingQuery: "",
    };
  }

  const result: MatchResult = {
    categories: [],
    brands: [],
    materials: [],
    colors: [],
    genders: [],
    remainingQuery: "",
  };

  // Split and clean the search query
  let words = searchQuery
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0);

  // Generate all n-grams (up to 4-grams)
  const maxNGramSize = Math.min(4, words.length);

  // Process n-grams from largest to smallest (to avoid false positives)
  for (let n = maxNGramSize; n >= 1; n--) {
    const ngrams = generateNGrams(words, n);

    for (const ngram of ngrams) {
      const matches = matchNGram(ngram);

      // Check if we found any matches
      if (
        matches.category ||
        matches.brand ||
        matches.material ||
        matches.color ||
        matches.gender
      ) {
        // Add unique matches to results
        if (matches.category && !result.categories.includes(matches.category)) {
          result.categories.push(matches.category);
        }

        if (matches.brand && !result.brands.includes(matches.brand)) {
          result.brands.push(matches.brand);
        }

        if (matches.material && !result.materials.includes(matches.material)) {
          result.materials.push(matches.material);
        }

        if (matches.color && !result.colors.includes(matches.color)) {
          result.colors.push(matches.color);
        }

        if (matches.gender && !result.genders.includes(matches.gender)) {
          result.genders.push(matches.gender);
        }

        // Remove matched words from remaining words
        words = removeMatchedWords(words, ngram);
      }
    }
  }

  // Join remaining words as the final search query
  result.remainingQuery = words.join(" ").trim();

  return result;
}
