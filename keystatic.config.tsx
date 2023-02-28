import { collection, config, fields, singleton } from '@keystatic/core'
import { ComponentBlocks } from './components/ComponentBlocks'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
      name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
    },
  },
  singletons: {
    home: singleton({
      label: 'Home',
      directory: 'content/pages/home',
      schema: {
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
          label: 'Content',
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
    about: singleton({
      label: 'About',
      directory: 'content/pages/about',
      schema: {
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
          label: 'Content',
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
  },
  collections: {
    posts: collection({
      label: 'Posts',
      directory: 'content/posts',
      slugField: 'slug',
      schema: {
        title: fields.text({
          label: 'Title',
          validation: { length: { min: 4 } },
        }),
        slug: fields.text({
          label: 'Slug',
          validation: { length: { min: 4 } },
        }),
        summary: fields.text({
          label: 'Summary',
          validation: { length: { min: 4 } },
        }),
        publishedDate: fields.date({ label: 'Published Date' }),
        coverImage: fields.text({ label: 'Image' }),
        wordCount: fields.integer({
          label: 'Word count',
        }),
        authors: fields.array(fields.text({ label: 'Name' }), {
          label: 'Authors',
          itemLabel: (props) => props.value,
        }),
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
          label: 'Content',
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
    externalArticles: collection({
      label: 'External Article',
      directory: 'content/externalArticles',
      slugField: 'title',
      schema: {
        title: fields.text({
          label: 'Title',
          validation: { length: { min: 4 } },
        }),
        directLink: fields.url({
          label: 'Article Link',
        }),
        source: fields.text({
          label: 'Link Source',
          defaultValue: 'Read more.',
        }),
        coverImage: fields.text({
          label: 'Cover Image',
        }),
        summary: fields.text({
          label: 'Summary',
          validation: { length: { min: 4, max: 200 } },
        }),
        publishedDate: fields.date({ label: 'Published Date' }),
      },
    }),
  },
})
