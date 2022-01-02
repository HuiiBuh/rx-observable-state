import * as fs from 'fs';
import { deepEquals } from './equals';

const json1: { feeds: any[] } = JSON.parse(fs.readFileSync('assets/json1.json').toString());
const json1Copy = JSON.parse(JSON.stringify(json1));
const json2 = JSON.parse(fs.readFileSync('assets/json2.json').toString());

test('Check if null and null are equal', () => {
  expect(deepEquals(null, null)).toBe(true);
});

test('Check if null and undefined are equal', () => {
  expect(deepEquals(null, undefined)).toBe(false);
});

test('Check if two equal primitives are equal', () => {
  expect(deepEquals('my string', 'my string')).toBe(true);
});

test('Check if two equal primitives are equal', () => {
  expect(deepEquals('my string', 'my string')).toBe(true);
});

test('Check if two different primitives are equal', () => {
  expect(deepEquals(1, 'my string')).toBe(false);
});

test('Check if two different primitives are equal', () => {
  expect(deepEquals(1, 'my string')).toBe(false);
});

test('Check if two different primitives are equal', () => {
  expect(deepEquals(1, 'my string')).toBe(false);
});

test('Check if the same json objects are equal', () => {
  expect(deepEquals(json1, json1Copy)).toBe(true);
});

test('Check if the different json objects are equal', () => {
  expect(deepEquals(json1, json2)).toBe(false);
});

test('Make the object really large and check if still the same', () => {
  const huge = { a: new Array(50).fill(json1), b: new Array(50).fill(json1) };
  const object1 = JSON.parse(JSON.stringify(huge));
  const object2 = JSON.parse(JSON.stringify(huge));
  expect(deepEquals(object1, object2)).toBe(true);
});
