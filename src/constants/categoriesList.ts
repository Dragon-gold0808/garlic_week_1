/* eslint-disable prettier/prettier */
export type CategoryType =
  | 'Farm'
  | "Farmers' Market"
  | 'Restaurant'
  | 'Special Activity'
  | 'Community Organization'
  | 'Independent Grocer';

export interface Category {
  name: CategoryType;
  title: string;
}

export const categoriesList: Category[] = [
  {
    name: 'Farm',
    title: 'Farm',
  },
  {
    name: "Farmers' Market",
    title: "Farmers' Market",
  },
  {
    name: 'Restaurant',
    title: 'Garlicky Food & Beverage',
  },
  {
    name: 'Special Activity',
    title: 'Garlic Spotlight',
  },
  {
    name: 'Community Organization',
    title: 'Community Organization',
  },
  {
    name: 'Independent Grocer',
    title: 'Independent Retail',
  },
];
