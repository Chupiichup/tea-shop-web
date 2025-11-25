
import React from 'react';
import { Hero } from './Hero';
import { CategoryGrid } from './CategoryGrid';
import { TrendingSection } from './TrendingSection';
import { BrandStory } from './BrandStory';
import { Newsletter } from './Newsletter';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <TrendingSection />
      <BrandStory />
      <Newsletter />
    </>
  );
};
