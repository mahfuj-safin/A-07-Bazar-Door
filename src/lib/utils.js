// src/lib/utils.js
// This file is used for converting English numerals into Bengali numerals, and Bengali numerals into mathematical (standard) numerals.

const engToBnMap = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

const bnToEngMap = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
};

//Function to convert any number or string into Bengali numerals
export function toBengaliNumber(value) {
  if (value === null || value === undefined) return '০';

  const formatted = typeof value === 'number'
    ? value.toLocaleString('en-IN')
    : String(value);

  return formatted.replace(/[0-9]/g, (digit) => engToBnMap[digit] || digit);
}


export function parsePriceToNumber(priceValue) {
  if (typeof priceValue === 'number') return priceValue;
  if (!priceValue) return 0;


  const englishStr = String(priceValue)
    .replace(/[০-৯]/g, (digit) => bnToEngMap[digit] || digit)
    .replace(/,/g, '')
    .replace(/[^\d.-]/g, '');

  const parsed = parseFloat(englishStr);
  return isNaN(parsed) ? 0 : parsed;
}

//Function to display dates in Bengali format
export function getBanglaDate() {
  try {
    return new Intl.DateTimeFormat('bn-BD', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());
  } catch {
    return 'মঙ্গলবার, ৬ অক্টোবর, ২০২৬';
  }
}