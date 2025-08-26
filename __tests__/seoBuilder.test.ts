import { buildSEO } from '@/utils/seo/seoBuilder';

describe('buildSEO', () => {
  test('project article with full data', () => {
    const result = buildSEO({
      path: '/project/herbalink',
      kind: 'project',
      title: 'HerbaLink – Herbalist Marketplace Case Study',
      description: 'How I designed a HIPAA-conscious marketplace that increased certified herbalist bookings and patient retention through trustworthy UX and streamlined scheduling.',
      image: '/images/herbalink/hero.jpg',
      author: 'Hiram Barsky',
      published: '2025-08-01T12:00:00Z',
      modified: '2025-08-10T12:00:00Z',
      tags: ['UX', 'Healthcare']
    });

    expect(result).toMatchInlineSnapshot(`
      {
        "author": "Hiram Barsky",
        "canonical": "https://barskydesign.pro/project/herbalink",
        "description": "How I designed a HIPAA-conscious marketplace that increased certified herbalist bookings and patient retention through trustworthy UX and streamlined scheduling.",
        "image": "https://barskydesign.pro/images/herbalink/hero.jpg",
        "imageAlt": "HerbaLink – Herbalist Marketplace Case Study preview image",
        "modifiedTime": "2025-08-10T12:00:00Z",
        "publishedTime": "2025-08-01T12:00:00Z",
        "tags": [
          "UX",
          "Healthcare",
        ],
        "title": "HerbaLink – Herbalist Marketplace Case Study",
        "type": "article",
      }
    `);
  });

  test('home page uses website type and profile image', () => {
    const result = buildSEO({
      path: '/',
      kind: 'home',
      title: 'Hiram Barsky – Product Designer & Gen AI Developer'
    });

    expect(result.type).toBe('website');
    expect(result.image).toMatch(/^https:\/\//);
    expect(result.canonical).toBe('https://barskydesign.pro/');
    expect(result.publishedTime).toBeUndefined();
    expect(result.author).toBeUndefined();
  });

  test('blog post with tags', () => {
    const result = buildSEO({
      path: '/blog/finding-first-ux-job',
      kind: 'post',
      title: 'Finding Your First UX Job',
      description: 'A comprehensive guide to landing your first UX position with practical tips, portfolio advice, and interview strategies.',
      published: '2025-01-15T10:00:00Z',
      tags: ['Career', 'UX Design', 'Job Search']
    });

    expect(result.type).toBe('article');
    expect(result.tags).toEqual(['Career', 'UX Design', 'Job Search']);
    expect(result.publishedTime).toBe('2025-01-15T10:00:00Z');
    expect(result.author).toBe('Hiram Barsky');
  });

  test('static page fallback', () => {
    const result = buildSEO({
      path: '/about',
      kind: 'page'
    });

    expect(result.type).toBe('website');
    expect(result.publishedTime).toBeUndefined();
    expect(result.tags).toBeUndefined();
    expect(result.canonical).toBe('https://barskydesign.pro/about');
  });

  test('image URL normalization', () => {
    const result = buildSEO({
      path: '/test',
      kind: 'page',
      image: '/relative/image.jpg'
    });

    expect(result.image).toBe('https://barskydesign.pro/relative/image.jpg');
  });

  test('absolute image URL passthrough', () => {
    const result = buildSEO({
      path: '/test',
      kind: 'page',
      image: 'https://external.com/image.jpg'
    });

    expect(result.image).toBe('https://external.com/image.jpg');
  });
});