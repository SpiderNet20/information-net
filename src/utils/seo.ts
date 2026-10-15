import { Post } from '../types';

export interface SeoConfig {
  siteName: string;
  siteUrl: string;
  siteDescription: string;
  logoUrl: string;
}

export const DEFAULT_SEO_CONFIG: SeoConfig = {
  siteName: 'العنكبوت للمعلومات',
  siteUrl: 'https://www.information-net.com',
  siteDescription: 'موقع العنكبوت للمعلومات information-net هو مدونة تعليمية شاملة تغطي الألعاب، البرامج، الكتب، التكنولوجيا، الذكاء الاصطناعي، الشروحات، وببجي موبايل.',
  logoUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBo1WmK3f4pmz7crRXZFAJhISydyWEYNi2hZXziFtauELiBdEoo6_JPkYLrMQeNTft33Clp1860jSr_RkMZWXtN2WYPsMdWrBp6eeRYoawIDp8LphoOZ87Pl_EOBTaEBTwGah357ZkKOY/s1600/log.jpg',
};

/**
 * Generates the Schema.org WebSite JSON-LD with SearchAction
 */
export function getWebSiteSchema(config: SeoConfig = DEFAULT_SEO_CONFIG) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.siteName,
    alternateName: 'information-net',
    url: config.siteUrl,
    description: config.siteDescription,
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: `${config.siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    ],
  };
}

/**
 * Generates the SeoPlus NewsArticle / BlogPosting Schema.org JSON-LD
 * Exactly matching the template schema logic in the user's XML
 */
export function getArticleSchema(post: Post, config: SeoConfig = DEFAULT_SEO_CONFIG) {
  const postUrl = post.canonicalUrl || `${config.siteUrl}/${post.categorySlug}/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    headline: post.title,
    description: post.snippet,
    keywords: post.tags.join(', '),
    image: [post.thumbnail],
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    inLanguage: 'ar',
    articleSection: post.category,
    publisher: {
      '@type': 'Organization',
      name: config.siteName,
      url: config.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: config.logoUrl,
        width: 250,
        height: 70,
      },
    },
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${config.siteUrl}/author/${encodeURIComponent(post.author.name)}`,
      description: post.author.bio,
      image: post.author.avatar,
    },
  };
}

/**
 * Generates BreadcrumbList Schema.org JSON-LD
 */
export function getBreadcrumbSchema(post: Post, config: SeoConfig = DEFAULT_SEO_CONFIG) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': config.siteUrl,
          name: config.siteName,
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': `${config.siteUrl}/${post.categorySlug}/`,
          name: post.category,
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@id': post.canonicalUrl || `${config.siteUrl}/${post.categorySlug}/${post.slug}`,
          name: post.title,
        },
      },
    ],
  };
}

/**
 * Generates FAQPage Schema for articles with question and solution sections
 */
export function getFaqSchema(post: Post) {
  if (!post.content.sections || post.content.sections.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.content.sections.map((sec) => ({
      '@type': 'Question',
      name: sec.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: sec.body.join(' '),
      },
    })),
  };
}

/**
 * Updates head metadata and injects structured Schema.org JSON-LD tags
 */
export function applySeoMetadata(
  post: Post | null,
  activeCategory: string = 'all',
  config: SeoConfig = DEFAULT_SEO_CONFIG
) {
  if (typeof document === 'undefined') return;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : config.siteUrl;

  if (post) {
    // 1. Title & Description
    document.title = `${post.title} | ${config.siteName}`;
    updateMeta('name', 'description', post.snippet);

    // 2. OpenGraph
    updateMeta('property', 'og:title', `${post.title} | ${config.siteName}`);
    updateMeta('property', 'og:description', post.snippet);
    updateMeta('property', 'og:image', post.thumbnail);
    updateMeta('property', 'og:type', 'article');
    updateMeta('property', 'og:url', currentUrl);
    updateMeta('property', 'article:section', post.category);
    updateMeta('property', 'article:published_time', post.isoDate);
    updateMeta('property', 'article:author', post.author.name);

    // 3. Twitter
    updateMeta('name', 'twitter:title', post.title);
    updateMeta('name', 'twitter:description', post.snippet);
    updateMeta('name', 'twitter:image', post.thumbnail);
    updateMeta('name', 'twitter:card', 'summary_large_image');

    // 4. Canonical
    updateCanonical(post.canonicalUrl || `${config.siteUrl}/${post.categorySlug}/${post.slug}`);

    // 5. Schema.org JSON-LD Injections
    const articleLd = getArticleSchema(post, config);
    const breadcrumbLd = getBreadcrumbSchema(post, config);
    const faqLd = getFaqSchema(post);

    injectJsonLd('schema-article', articleLd);
    injectJsonLd('schema-breadcrumbs', breadcrumbLd);
    if (faqLd) {
      injectJsonLd('schema-faq', faqLd);
    } else {
      removeJsonLd('schema-faq');
    }
  } else if (activeCategory && activeCategory !== 'all') {
    const categoryNames: Record<string, string> = {
      AI: 'الذكاء الاصطناعي',
      Games: 'الألعاب',
      Software: 'البرامج',
      Business: 'الربح من الإنترنت',
      Education: 'مقالات تعليمية',
    };
    const catName = categoryNames[activeCategory] || activeCategory;
    const catUrl = `${config.siteUrl}/${activeCategory}/`;

    document.title = `قسم ${catName} | ${config.siteName}`;
    updateMeta('name', 'description', `تصفح أحدث وأبرز مقالات وشروحات قسم ${catName} في موقع العنكبوت للمعلومات.`);

    updateMeta('property', 'og:title', `قسم ${catName} | ${config.siteName}`);
    updateMeta('property', 'og:description', `تصفح أحدث وأبرز مقالات وشروحات قسم ${catName} في موقع العنكبوت للمعلومات.`);
    updateMeta('property', 'og:image', config.logoUrl);
    updateMeta('property', 'og:type', 'website');
    updateMeta('property', 'og:url', catUrl);

    updateMeta('name', 'twitter:title', `قسم ${catName} | ${config.siteName}`);
    updateMeta('name', 'twitter:description', `تصفح أحدث وأبرز مقالات وشروحات قسم ${catName} في موقع العنكبوت للمعلومات.`);
    updateMeta('name', 'twitter:image', config.logoUrl);

    updateCanonical(catUrl);

    const websiteLd = getWebSiteSchema(config);
    injectJsonLd('schema-website', websiteLd);
    removeJsonLd('schema-article');
    removeJsonLd('schema-breadcrumbs');
    removeJsonLd('schema-faq');
  } else {
    // Revert to Homepage SEO
    document.title = `${config.siteName} - مدونة تقنية شاملة للألعاب والذكاء الاصطناعي`;
    updateMeta('name', 'description', config.siteDescription);

    updateMeta('property', 'og:title', `${config.siteName} - information-net`);
    updateMeta('property', 'og:description', config.siteDescription);
    updateMeta('property', 'og:image', config.logoUrl);
    updateMeta('property', 'og:type', 'website');
    updateMeta('property', 'og:url', config.siteUrl);

    updateMeta('name', 'twitter:title', `${config.siteName} - information-net`);
    updateMeta('name', 'twitter:description', config.siteDescription);
    updateMeta('name', 'twitter:image', config.logoUrl);

    updateCanonical(config.siteUrl);

    const websiteLd = getWebSiteSchema(config);
    injectJsonLd('schema-website', websiteLd);
    removeJsonLd('schema-article');
    removeJsonLd('schema-breadcrumbs');
    removeJsonLd('schema-faq');
  }
}

function updateMeta(attr: 'name' | 'property', key: string, value: string) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

function updateCanonical(url: string) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

function injectJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

function removeJsonLd(id: string) {
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
}
