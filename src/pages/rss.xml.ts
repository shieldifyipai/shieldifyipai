import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '@/data/site';

export async function GET(context: { site?: URL }) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf(),
  );

  return rss({
    title: `${site.name} Blog`,
    description: 'Practical guidance on trademark protection, copyright enforcement, counterfeit detection, and digital evidence workflows.',
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedDate,
      link: `${site.url}/blog/${post.id}`,
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: '<language>en-us</language>',
  });
}
