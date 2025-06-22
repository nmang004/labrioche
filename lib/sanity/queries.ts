import { groq } from 'next-sanity';

export const PRODUCTS_QUERY = groq`
  *[_type == "product" && available == true] | order(category->displayOrder asc, name asc) {
    _id,
    name,
    slug,
    price,
    description,
    available,
    featured,
    ingredients,
    allergens,
    "image": image.asset->url,
    "category": category->{
      _id,
      title,
      slug
    }
  }
`;

export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "product" && featured == true && available == true] | order(name asc) [0...6] {
    _id,
    name,
    slug,
    price,
    description,
    "image": image.asset->url,
    "category": category->title
  }
`;

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(displayOrder asc) {
    _id,
    title,
    slug,
    description,
    displayOrder,
    "image": image.asset->url
  }
`;

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    body,
    seo
  }
`;

export const ACTIVE_PROMOTIONS_QUERY = groq`
  *[_type == "promotion" && active == true] | order(startDate desc) {
    _id,
    title,
    content,
    link,
    backgroundColor,
    startDate,
    endDate
  }
`;