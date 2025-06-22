# Sanity CMS Schema Setup for La Brioche

Your Sanity project is configured with ID: `57zueqie`

## Setting up Sanity Schemas

To set up the content schemas for your bakery, you'll need to create the following schema files in your Sanity Studio.

### 1. Product Schema

Create `schemas/product.js`:

```javascript
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
      validation: Rule => Rule.required()
    },
    {
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'allergens',
      title: 'Allergens',
      type: 'array',
      of: [{type: 'string'}]
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'category.title'
    }
  }
}
```

### 2. Category Schema

Create `schemas/category.js`:

```javascript
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [
        {field: 'displayOrder', direction: 'asc'}
      ]
    }
  ]
}
```

### 3. Page Schema (for Our Story page)

Create `schemas/page.js`:

```javascript
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {hotspot: true}
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'metaKeywords',
          title: 'Meta Keywords',
          type: 'array',
          of: [{type: 'string'}]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
```

### 4. Promotion Schema

Create `schemas/promotion.js`:

```javascript
export default {
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url'
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime'
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime'
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: 'bg-blue-600'},
          {title: 'Green', value: 'bg-green-600'},
          {title: 'Red', value: 'bg-red-600'},
          {title: 'Yellow', value: 'bg-yellow-600'},
          {title: 'Purple', value: 'bg-purple-600'},
          {title: 'Pink', value: 'bg-pink-600'}
        ]
      },
      initialValue: 'bg-blue-600'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'active'
    },
    prepare(selection) {
      const {title, active} = selection
      return {
        title,
        subtitle: active ? 'Active' : 'Inactive'
      }
    }
  }
}
```

### 5. Schema Index File

Update your `schemas/index.js`:

```javascript
import product from './product'
import category from './category'
import page from './page'
import promotion from './promotion'

export const schemaTypes = [
  product,
  category,
  page,
  promotion
]
```

## Sample Data

After setting up the schemas, you can create some sample content:

### Categories
1. **Croissants & Viennoiserie** - Traditional French pastries
2. **Artisan Breads** - Fresh baked daily
3. **Cakes & Desserts** - Special occasion treats
4. **Savory Items** - Quiches, sandwiches, and more

### Sample Products
1. **Classic Croissant** - Buttery, flaky, authentic French croissant
2. **Pain de Campagne** - Traditional French country bread
3. **Chocolate Éclairs** - Classic choux pastry with chocolate
4. **Quiche Lorraine** - Traditional French savory tart

### Pages
Create an "Our Story" page with slug "our-story" that matches the route in your Next.js application.

## Quick Setup Commands

If you need to set up a Sanity Studio locally:

```bash
# Create a new Sanity Studio (if needed)
npm create sanity@latest -- --project 57zueqie --dataset production --template clean

# Or add to existing project
cd your-sanity-studio
npm install
sanity deploy
```

Your Sanity Studio will be available at: `https://57zueqie.sanity.studio/`