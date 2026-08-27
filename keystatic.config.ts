import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'shieldifyip/shieldifyipai',
  },
  ui: {
    brand: { name: 'Shieldify IP CMS' },
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      columns: ['title', 'category', 'publishedDate'],
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            description: 'The public article title.',
            validation: { isRequired: true },
          },
          slug: {
            label: 'URL slug',
            description: 'Used in /blog/url-slug. Avoid changing it after publication.',
          },
        }),
        seoTitle: fields.text({
          label: 'SEO title',
          description: 'Optional. Keep it at 60 characters or fewer.',
        }),
        description: fields.text({
          label: 'Meta description',
          description: 'A concise summary for search results and article cards.',
          multiline: true,
          validation: { isRequired: true },
        }),
        publishedDate: fields.date({
          label: 'Published date',
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({
          label: 'Updated date',
          description: 'Optional. Complete this only when the article is materially updated.',
        }),
        image: fields.image({
          label: 'Cover image',
          description: 'Recommended size: 1200 × 630 px.',
          directory: 'public/images',
          publicPath: '/images/',
          validation: { isRequired: true },
        }),
        imageAlt: fields.text({
          label: 'Image alt text',
          description: 'Describe the image for accessibility and search engines.',
          validation: { isRequired: true },
        }),
        imageWidth: fields.integer({
          label: 'Image width',
          description: 'Optional intrinsic width in pixels.',
        }),
        imageHeight: fields.integer({
          label: 'Image height',
          description: 'Optional intrinsic height in pixels.',
        }),
        author: fields.text({
          label: 'Author',
          defaultValue: 'Shieldify IP',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Trademark Protection', value: 'Trademark Protection' },
            { label: 'Copyright Protection', value: 'Copyright Protection' },
            { label: 'Brand Monitoring', value: 'Brand Monitoring' },
            { label: 'Counterfeit Detection', value: 'Counterfeit Detection' },
            { label: 'Evidence & Enforcement', value: 'Evidence & Enforcement' },
          ],
          defaultValue: 'Trademark Protection',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: ({ value }) => value || 'New tag',
        }),
        featured: fields.checkbox({
          label: 'Featured article',
          description: 'Highlights the article in featured blog placements.',
          defaultValue: false,
        }),
        content: fields.mdx({
          label: 'Article content',
          extension: 'md',
          options: {
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
  },
});
