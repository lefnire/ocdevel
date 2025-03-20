import React from "react";
import type { Product } from './types';
import columnInfo from './columns';

/**
 * Helper function to safely access attribute values
 */
export const getAttributeValue = <T extends any>(attr: any): T | undefined => {
  if (attr && typeof attr === 'object' && 'value' in attr) {
    return attr.value as T;
  }
  return undefined;
};

/**
 * Helper function to safely check for attribute notes
 */
export const hasAttributeNotes = (attr: any): boolean => {
  return attr && typeof attr === 'object' && 'notes' in attr && typeof attr.notes === 'function';
};

/**
 * Helper function to safely get attribute flag
 */
export const getAttributeFlag = (attr: any): string | undefined => {
  if (attr && typeof attr === 'object' && 'flag' in attr) {
    return attr.flag as string;
  }
  return undefined;
};

/**
 * Helper function to format dimensions
 */
export const formatDimensions = (value: any): string => {
  const dimensions = getAttributeValue<[number, number, number]>(value);
  if (!dimensions) return '';
  const [d, w, h] = dimensions;
  return `${d}"D x ${w}"W x ${h}"H`;
};

/**
 * Helper function to format rating
 */
export const formatRating = (value: any): string => {
  const rating = getAttributeValue<[[number, number], [number, number, number, number, number]]>(value);
  if (!rating) return '';
  const [[avg, count], distribution] = rating;
  return `${avg.toFixed(1)} (${count} reviews)`;
};

/**
 * Helper function to format fakespot
 */
export const formatFakespot = (value: any): string => {
  const fakespot = getAttributeValue<[string, string]>(value);
  if (!fakespot) return '';
  const [product, company] = fakespot;
  return `P: ${product}, C: ${company}`;
};

/**
 * Helper function to format pickedBy
 */
export const formatPickedBy = (value: any): string => {
  const pickedBy = getAttributeValue<string[]>(value);
  if (!pickedBy) return '';
  return pickedBy.join(', ');
};

/**
 * Helper function to format countries
 */
export const formatCountries = (value: any): string => {
  const countries = getAttributeValue<string[]>(value);
  if (!countries) return '';
  return countries.join(', ');
};

/**
 * Helper function to format age
 */
export const formatAge = (value: any): string => {
  const age = getAttributeValue<string>(value);
  if (!age) return '';
  return age;
};

/**
 * Helper function to format the final score
 */
export const formatFinalScore = (score: number): string => {
  return score.toFixed(1);
};

/**
 * Helper function to get cell value
 */
export const getCellValue = (row: Product, columnId: string): any => {
  const value = row[columnId as keyof Product];
  return getAttributeValue(value) ?? value;
};

/**
 * Helper function to get cell display value
 */
export const getCellDisplayValue = (row: Product, columnId: string): string => {
  const value = row[columnId as keyof Product];
  if (!value) return '';
  
  // Handle specific column types
  if (columnId === 'dimensions') {
    return formatDimensions(value);
  } else if (columnId === 'rating') {
    return formatRating(value);
  } else if (columnId === 'fakespot') {
    return formatFakespot(value);
  } else if (columnId === 'pickedBy') {
    return formatPickedBy(value);
  } else if (columnId === 'countries') {
    return formatCountries(value);
  } else if (columnId === 'age') {
    return formatAge(value);
  } else if (columnInfo[columnId]?.dtype === 'boolean') {
    return getAttributeValue<boolean>(value) ? '✓' : '';
  }
  
  // Default handling
  const attributeValue = getAttributeValue(value);
  if (attributeValue !== undefined) {
    return String(attributeValue);
  }
  
  return String(value);
};

/**
 * Helper function to get cell style based on flag
 */
export const getCellStyle = (row: Product, columnId: string): React.CSSProperties => {
  const value = row[columnId as keyof Product];
  const flag = getAttributeFlag(value);
  
  if (flag === 'green') return { backgroundColor: '#e6ffe6' };
  if (flag === 'yellow') return { backgroundColor: '#ffffcc' };
  if (flag === 'red') return { backgroundColor: '#ffcccc' };
  
  return {};
};

/**
 * Helper to determine if a column is numeric
 */
export const isNumericColumn = (columnId: string): boolean => {
  // Check if the column is one of the known numeric columns
  const numericColumns = ['weight', 'maxWeight', 'maxSpeed', 'horsePower', 'price'];
  if (numericColumns.includes(columnId)) return true;
  
  // Check if the column info indicates it's a number
  return columnInfo[columnId]?.dtype === 'number';
};

/**
 * Helper to determine if a column is boolean
 */
export const isBooleanColumn = (columnId: string): boolean => {
  // Check if the column info indicates it's a boolean
  return columnInfo[columnId]?.dtype === 'boolean';
};