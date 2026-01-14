import React from 'react';

export const BlogStatCard = () => <div data-testid="blog-stat-card">Stat Card</div>;
export const CategoryFilter = () => <div data-testid="category-filter">Category Filter</div>;
export const EmptyState = () => <div data-testid="empty-state">Empty State</div>;
export const FeaturedPostsSection = () => (
  <div data-testid="featured-posts">Featured Posts</div>
);
export const NewsletterBox = () => <div data-testid="newsletter-box">Newsletter</div>;
export const PostCard = () => <div data-testid="post-card">Post Card</div>;
export const SearchBar = () => <div data-testid="search-bar">Search Bar</div>;
export const SortControls = () => <div data-testid="sort-controls">Sort Controls</div>;

export default {
  BlogStatCard,
  CategoryFilter,
  EmptyState,
  FeaturedPostsSection,
  NewsletterBox,
  PostCard,
  SearchBar,
  SortControls,
};
