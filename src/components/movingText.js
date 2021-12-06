import _ from "lodash";

export const getPunctuation = (word, level, text) => {
  const found = wordsWithPunc(text[level]).find((d) => stripPunc(d) === stripPunc(word));
  if (found && found.length > word.length) return found.charAt(found.length - 1);
  return null;
};

export const wordsWithPunc = (str) => {
  const simple = _.words(str);
  return simple.map((w) => {
    const followingChar = str.charAt(str.indexOf(w) + w.length);
    if (followingChar === "!" || followingChar === "." || followingChar === ",")
      return `${w}${followingChar}`;
    return w;
  });
};
export const stripPunc = (str) => str.replace(/[.!,]/g, "");
