const COMMON_WORDS = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'hello', 'world', 'thank', 'please', 'yes', 'no', 'maybe', 'good', 'great', 'nice'
];

const AUTOCORRECT_MAP: Record<string, string> = {
  'teh': 'the',
  'taht': 'that',
  'waht': 'what',
  'yuo': 'you',
  'youre': "you're",
  'thier': 'their',
  'dont': "don't",
  'cant': "can't",
  'wont': "won't",
  'recieve': 'receive',
  'beleive': 'believe',
};

export const getAutocorrect = (word: string): string => {
  const lowerWord = word.toLowerCase();
  return AUTOCORRECT_MAP[lowerWord] || word;
};

export const getAutocompleteSuggestions = (currentWord: string, count: number = 3): string[] => {
  if (!currentWord || currentWord.length < 2) return [];

  const lowerWord = currentWord.toLowerCase();
  const suggestions = COMMON_WORDS
    .filter(word => word.startsWith(lowerWord) && word !== lowerWord)
    .slice(0, count);

  return suggestions;
};

export const countWords = (text: string): number => {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
};

export const countCharacters = (text: string): number => {
  return text.length;
};

export const applyAutocorrect = (text: string): string => {
  const words = text.split(' ');
  const correctedWords = words.map(word => {
    if (word.length === 0) return word;
    const punctuation = word.match(/[.,!?;:]$/);
    const cleanWord = word.replace(/[.,!?;:]$/, '');
    const corrected = getAutocorrect(cleanWord);
    return punctuation ? corrected + punctuation[0] : corrected;
  });
  return correctedWords.join(' ');
};
