import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');

  return rss({
    title: 'Sacred Wellness Blog',
    description: 'Natural health insights and holistic living tips from Sacred',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
