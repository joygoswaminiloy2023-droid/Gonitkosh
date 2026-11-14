import { SIG } from './gk';
// id, বাংলা নাম, English, বর্ণনা, description, args, return type, example inputs
const R = [
['jog','জোগ','Add','দুটি সংখ্যা যোগ করে।','Returns a + b.','a b','double','10 5'],
['biyog','বিয়োগ','Subtract','প্রথম সংখ্যা থেকে দ্বিতীয়টি বিয়োগ করে।','Returns a - b.','a b','double','10 5'],
['gun','গুণ','Multiply','দুটি সংখ্যা গুণ করে।','Returns a * b.','a b','double','10 5'],
['bhag','ভাগ','Divide','ভাগফল দেয়। ০ দিয়ে ভাগ করলে ত্রুটি।','Returns a / b. Throws domain_error if b is 0.','a b','double','10 4'],
['bhagshesh','ভাগশেষ','Modulus','ভাগ করার পর যা বাকি থাকে।','Remainder of a / b (fmod). b = 0 throws.','a b','double','10 3'],
['ghat','ঘাত','Power','base-কে exponent বার গুণ করে (২^১০)।','base raised to exponent. Rejects 0^negative and non-real results.','base exponent','double','2 10'],
['borgomul','বর্গমূল','Square root','বর্গমূল বের করে। ঋণাত্মক হলে ত্রুটি।','Square root; negative input throws domain_error.','n','double','81'],
['ghonokfol','ঘনফল','Cube','সংখ্যার ঘন (n×n×n)।','Returns n * n * n.','n','double','3'],
['borgo','বর্গ','Square','সংখ্যার বর্গ (n×n)।','Returns n * n.','n','double','7'],
['gorh','গড়','Average','তালিকার সংখ্যাগুলোর গড়। কমা দিয়ে লেখো।','Mean of a non-empty list.','numbers','double','2,4,6,8'],
['sarbadhik','সর্বাধিক','Maximum','তালিকার সবচেয়ে বড় সংখ্যা।','Largest element of a list.','numbers','double','3,9,4'],
['sarbonimno','সর্বনিম্ন','Minimum','তালিকার সবচেয়ে ছোট সংখ্যা।','Smallest element of a list.','numbers','double','3,9,4'],
['guniyo','গুণিয়ো','Factorial','n! বের করে (০–২০)। ২০-এর বেশি হলে overflow।','n! for 0..20. Larger values throw overflow_error.','n','unsigned long long','5'],
['jorno','জোড়','Is even','সংখ্যা জোড় হলে true।','True when n is even.','n','bool','8'],
['bijorno','বিজোড়','Is odd','সংখ্যা বিজোড় হলে true।','True when n is odd.','n','bool','8'],
['moulik','মৌলিক','Is prime','সংখ্যা মৌলিক হলে true।','True when n is prime.','n','bool','97'],
['gosagu','গসাগু','GCD','গরিষ্ঠ সাধারণ গুণনীয়ক।','Greatest common divisor.','a b','long long','48 36'],
['losagu','লসাগু','LCM','লঘিষ্ঠ সাধারণ গুণিতক।','Least common multiple.','a b','long long','4 6'],
['niropekkho','নিরপেক্ষ','Absolute value','ঋণ চিহ্ন বাদ দিয়ে মান দেয়।','Returns |n|.','n','double','-5.5'],
['nikotomo','নিকটতম','Round','নিকটতম পূর্ণসংখ্যায় রাউন্ড করে।','Rounds to nearest integer.','n','long long','2.6'],
['nichetol','নিচেতল','Floor','নিচের দিকের পূর্ণসংখ্যা।','Rounds down.','n','long long','2.9'],
['upertol','উপরতল','Ceil','উপরের দিকের পূর্ণসংখ্যা।','Rounds up.','n','long long','2.1'],
['shotangsho','শতাংশ','Percent','number-এর percent% বের করে।','Returns number * percent / 100.','number percent','double','500 12'],
['ultasonkha','উল্টা সংখ্যা','Reverse digits','অঙ্কগুলো উল্টে দেয় (১২৩ → ৩২১)।','Reverses the digits of n.','n','long long','12345'],
['onkojog','অঙ্কযোগ','Digit sum','সব অঙ্কের যোগফল।','Sum of all digits.','n','long long','12345'],
['ghurpaksonkha','প্রতিসম সংখ্যা','Palindrome','সামনে-পিছনে একই হলে true।','True when n reads the same backwards.','n','bool','12321'],
];
export const FUNCS = R.map(([id, bn, en, d, de, names, ret, ex]) => ({
  id, bn, en, d, de, ret, args: names.split(' ').map((n, i) => ({ n, k: SIG[id][i] })), ex: ex.split(' '),
}));
export const byId = Object.fromEntries(FUNCS.map((f) => [f.id, f]));

export const LEVELS = [
{ id: 1, icon: 'fa-plus', bn: 'জোগ দ্বীপ', en: 'Island of Basics', fns: ['jog','biyog','gun','bhag'],
  t: 'এখানে চার অপারেশন শিখবে। ফাংশনের নাম লিখে বন্ধনীর ভেতর সংখ্যা দাও, যেমন jog(2, 3)। ফাংশনের ভেতরে ফাংশনও বসানো যায়!',
  ch: [
   { q: 'jog দিয়ে ২৫ বানাও — make 25 with jog', e: '25', u: ['jog'], h: 'jog(10, 15)' },
   { q: 'gun দিয়ে ১২ বানাও — make 12 with gun', e: '12', u: ['gun'], h: 'gun(3, 4)' },
   { q: 'biyog আর jog একসাথে ব্যবহার করে ৭ বানাও — make 7 using both', e: '7', u: ['biyog','jog'], h: 'biyog(jog(5, 5), 3)' } ] },
{ id: 2, icon: 'fa-bolt', bn: 'ঘাত দ্বীপ', en: 'Island of Powers', fns: ['bhagshesh','ghat','borgo','ghonokfol','borgomul'],
  t: 'ঘাত, বর্গ, ঘন আর বর্গমূল — সংখ্যার শক্তি! ভাগশেষ দিয়ে জোড়-বিজোড়ের রহস্যও ধরা যায়।',
  ch: [
   { q: 'bhagshesh দিয়ে ১ বানাও — make 1 with bhagshesh', e: '1', u: ['bhagshesh'], h: 'bhagshesh(10, 3)' },
   { q: 'ghat দিয়ে ১০২৪ বানাও — make 1024 with ghat', e: '1024', u: ['ghat'], h: 'ghat(2, 10)' },
   { q: 'borgomul দিয়ে ৯ বানাও — make 9 with borgomul', e: '9', u: ['borgomul'], h: 'borgomul(81)' } ] },
{ id: 3, icon: 'fa-chart-simple', bn: 'তালিকা দ্বীপ', en: 'Island of Lists', fns: ['gorh','sarbadhik','sarbonimno'],
  t: 'একাধিক সংখ্যা লিখতে কোঁকড়া বন্ধনী ব্যবহার করো: gorh({2, 4, 6}). এই দ্বীপে গড়, সর্বাধিক ও সর্বনিম্ন শিখবে।',
  ch: [
   { q: 'gorh দিয়ে ৫ বানাও — average = 5', e: '5', u: ['gorh'], h: 'gorh({4, 5, 6})' },
   { q: 'sarbadhik দিয়ে ৯ বানাও — maximum = 9', e: '9', u: ['sarbadhik'], h: 'sarbadhik({3, 9, 4})' },
   { q: 'sarbonimno দিয়ে ১ বানাও — minimum = 1', e: '1', u: ['sarbonimno'], h: 'sarbonimno({7, 1, 5})' } ] },
{ id: 4, icon: 'fa-bullseye', bn: 'ঠিকঠাক দ্বীপ', en: 'Island of Rounding', fns: ['niropekkho','nikotomo','nichetol','upertol','shotangsho'],
  t: 'দশমিক সংখ্যাকে পূর্ণসংখ্যা বানানো আর শতাংশ বের করা শিখবে।',
  ch: [
   { q: 'shotangsho দিয়ে ৬০ বানাও — make 60 with shotangsho', e: '60', u: ['shotangsho'], h: 'shotangsho(500, 12)' },
   { q: 'upertol দিয়ে ৩ বানাও — ceil to 3', e: '3', u: ['upertol'], h: 'upertol(2.1)' },
   { q: 'nichetol দিয়ে ২ বানাও — floor to 2', e: '2', u: ['nichetol'], h: 'nichetol(2.9)' } ] },
{ id: 5, icon: 'fa-hashtag', bn: 'জোড়-বিজোড় দ্বীপ', en: 'Island of Number Kinds', fns: ['jorno','bijorno','moulik'],
  t: 'এই ফাংশনগুলো true বা false ফেরত দেয়। সংখ্যা জোড়, বিজোড় নাকি মৌলিক — যাচাই করো!',
  ch: [
   { q: 'jorno দিয়ে true পাও — get true', e: 'true', u: ['jorno'], h: 'jorno(8)' },
   { q: 'moulik দিয়ে true পাও — get true', e: 'true', u: ['moulik'], h: 'moulik(97)' },
   { q: 'bijorno দিয়ে false পাও — get false', e: 'false', u: ['bijorno'], h: 'bijorno(8)' } ] },
{ id: 6, icon: 'fa-puzzle-piece', bn: 'গসাগু দ্বীপ', en: 'Island of GCD & LCM', fns: ['gosagu','losagu'],
  t: 'দুটি সংখ্যার সাধারণ গুণনীয়ক ও গুণিতক খোঁজার দ্বীপ।',
  ch: [
   { q: 'gosagu দিয়ে ৬ বানাও — GCD = 6', e: '6', u: ['gosagu'], h: 'gosagu(12, 18)' },
   { q: 'losagu দিয়ে ১২ বানাও — LCM = 12', e: '12', u: ['losagu'], h: 'losagu(4, 6)' },
   { q: 'losagu(gosagu(...), ...) নেস্ট করে ১২ বানাও — nest them to get 12', e: '12', u: ['losagu','gosagu'], h: 'losagu(gosagu(12, 18), 12)' } ] },
{ id: 7, icon: 'fa-repeat', bn: 'অঙ্ক দ্বীপ', en: 'Island of Digits', fns: ['ultasonkha','onkojog','ghurpaksonkha'],
  t: 'সংখ্যার অঙ্ক নিয়ে খেলা: উল্টানো, যোগ করা আর প্রতিসম কিনা দেখা।',
  ch: [
   { q: 'ultasonkha দিয়ে ৩২১ বানাও — reverse to 321', e: '321', u: ['ultasonkha'], h: 'ultasonkha(123)' },
   { q: 'onkojog দিয়ে ১৫ বানাও — digit sum = 15', e: '15', u: ['onkojog'], h: 'onkojog(12345)' },
   { q: 'ghurpaksonkha দিয়ে true পাও — get true', e: 'true', u: ['ghurpaksonkha'], h: 'ghurpaksonkha(12321)' } ] },
{ id: 8, icon: 'fa-dragon', bn: 'বস দ্বীপ', en: 'Boss Island: Errors & Factorial', fns: ['guniyo','bhag','borgomul'],
  t: 'শেষ দ্বীপ! ভুল ইনপুট দিলে GonitKosh ত্রুটি (exception) ছুড়ে দেয়। এবার ইচ্ছে করে ত্রুটি ঘটাতে হবে।',
  ch: [
   { q: 'guniyo দিয়ে ৭২০ বানাও — 6! = 720', e: '720', u: ['guniyo'], h: 'guniyo(6)' },
   { q: 'bhag দিয়ে "Division by zero" ত্রুটি ঘটাও', err: 'Division by zero', h: 'bhag(1, 0)' },
   { q: 'borgomul দিয়ে "Square root of a negative" ত্রুটি ঘটাও', err: 'Square root of a negative', h: 'borgomul(-4)' } ] },
];

export const PROBLEMS = [
 { q: '৮০-এর ২৫% কত? — What is 25% of 80?', e: '20', s: 'shotangsho(80, 25)' },
 { q: '৯১ কি মৌলিক? — Is 91 prime?', e: 'false', s: 'moulik(91)' },
 { q: '৪০৭৫ উল্টালে কত? — Reverse 4075', e: '5704', s: 'ultasonkha(4075)' },
 { q: '৯৯৯৯-এর অঙ্কগুলোর যোগফল — Digit sum of 9999', e: '36', s: 'onkojog(9999)' },
 { q: '১০, ২০, ৩০, ৪০-এর গড় — Average of 10,20,30,40', e: '25', s: 'gorh({10, 20, 30, 40})' },
 { q: '১২ ও ১৮-এর গসাগু — GCD of 12 and 18', e: '6', s: 'gosagu(12, 18)' },
 { q: '১২ বাহুর বর্গের ক্ষেত্রফল — Area of square, side 12', e: '144', s: 'borgo(12)', u: ['borgo'] },
 { q: '১২৩২১ কি প্রতিসম? — Is 12321 a palindrome?', e: 'true', s: 'ghurpaksonkha(12321)' },
 { q: '৭.৫ কে রাউন্ড করো — Round 7.5', e: '8', s: 'nikotomo(7.5)' },
 { q: '৭! কত? — 7 factorial', e: '5040', s: 'guniyo(7)' },
];
