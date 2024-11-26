import Validator from './src/Validator.js';

const v = new Validator();

// Пример 1: Валидация строки
console.log('--- String Validation ---');
const stringSchema = v.string().startsFromUpperCase().hasExclamation();
console.log(stringSchema.isValid('Hello!')); // true
console.log(stringSchema.isValid('hello!')); // false
console.log(stringSchema.isValid('Hello')); // false
console.log(stringSchema.isValid('!Hello')); // false
console.log(stringSchema.isValid('')); // false

// Пример 2: Валидация массива
console.log('--- Array Validation ---');
const arraySchema = v.array().maxDepth(2);
console.log(arraySchema.isValid([1, [2, 3]])); // true
console.log(arraySchema.isValid([1, [2, [3, [4]]]])); // false
console.log(arraySchema.isValid('Not an array')); // false
console.log(arraySchema.isValid([])); // true

// Пример 3: Валидация объекта
console.log('--- Object Validation ---');
const objectSchema = v.object().shape({
  name: v.string().startsFromUpperCase(),
  friends: v.array().maxDepth(1),
});
console.log(objectSchema.isValid({ name: 'John', friends: ['Paul', 'George'] })); // true
console.log(objectSchema.isValid({ name: 'john', friends: ['Paul', ['George']] })); // false
console.log(objectSchema.isValid({ name: 'John', friends: 'Not an array' })); // false

// Пример 4: Валидация с несколькими уровнями
console.log('--- Complex Object Validation ---');
const complexSchema = v.object().shape({
  user: v.object().shape({
    name: v.string().startsFromUpperCase(),
    age: v.string().length(2),
  }),
  friends: v.array().maxDepth(1),
});
console.log(complexSchema.isValid({
  user: { name: 'Alex', age: '25' },
  friends: ['Mike', 'Lucy'],
})); // true

console.log(complexSchema.isValid({
  user: { name: 'alex', age: '25' },
  friends: ['Mike', ['Lucy']],
})); // false
