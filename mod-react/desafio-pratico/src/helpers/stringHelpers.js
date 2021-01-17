// prettier-ignore
const WITH_SPECIAL_CHARACTERS = 
  'áãâäàÁÃÂÄÀéêëèÉÊËÈíîïìÍÎÏÌóõôöòÓÕÔÖÒúûüùÚÛÜÙñÑçÇ'.split('');

// prettier-ignore
const WITHOUT_SPECIAL_CHARACTERS = 
  'aaaaaAAAAAeeeeEEEEiiiiIIIIoooooOOOOOuuuuUUUUnNcC'.split('');

const VOWELS = 'aáãâäàeéêëèiíîïìoóõôöòuúûüù'.split('');

export function isVowel(char) {
  return VOWELS.includes(char.toLowerCase());
}

export function isNumber(char) {
  return !isNaN(char);
}

export function isConsonant(char) {
  return !isVowel(char) && !isNumber(char);
}

export function removeSpecialCharacteres(text) {
  return text.split('').map(char => {
    const index = WITH_SPECIAL_CHARACTERS.indexOf(char);
    return index < 0 ? char : WITH_SPECIAL_CHARACTERS[index];
  })
  .join('');
}