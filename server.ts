import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import data for dynamic sitemaps
// Note: We'll use dynamic import inside the routes to ensure we get fresh data if needed,
// but for simplicity in this environment, we'll import it here.
// We need to be careful with imports from 'src' in a production build.
import { INITIAL_POSTS, INITIAL_CATEGORIES } from './src/data/posts.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const domain = 'https://www.information-net.com';

async function createServer() {
  const app = express();

  // --- Sitemap Logic ---

  const getSitemapHeader = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const getSitemapFooter = () => `</urlset>`;

  const formatDate = (dateStr?: string) => {
    try {
      if (!dateStr) return new Date().toISOString().split('T')[0];
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? new Date().toISOString().split('T')[0] : date.toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  };

  // 1. sitemap_index.xml
  app.get('/sitemap_index.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${domain}/sitemap-blog.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${domain}/sitemap-services.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${domain}/sitemap-pages.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;
    res.send(xml);
  });

  // 2. sitemap.xml (Comprehensive)
  app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    let xml = getSitemapHeader();
    
    // Add Home
    xml += `
  <url>
    <loc>${domain}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Add Posts
    INITIAL_POSTS.forEach(post => {
      xml += `
  <url>
    <loc>${domain}/${post.categorySlug}/${post.slug}</loc>
    <lastmod>${formatDate(post.isoDate)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Add Categories (Services/Sections)
    INITIAL_CATEGORIES.forEach(cat => {
      xml += `
  <url>
    <loc>${domain}/${cat.slug}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    xml += getSitemapFooter();
    res.send(xml);
  });

  // 3. sitemap-blog.xml
  app.get('/sitemap-blog.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    let xml = getSitemapHeader();
    INITIAL_POSTS.forEach(post => {
      xml += `
  <url>
    <loc>${domain}/${post.categorySlug}/${post.slug}</loc>
    <lastmod>${formatDate(post.isoDate)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
    xml += getSitemapFooter();
    res.send(xml);
  });

  // 4. sitemap-services.xml
  app.get('/sitemap-services.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    let xml = getSitemapHeader();
    INITIAL_CATEGORIES.forEach(cat => {
      xml += `
  <url>
    <loc>${domain}/${cat.slug}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
    xml += getSitemapFooter();
    res.send(xml);
  });

  // 5. sitemap-pages.xml
  app.get('/sitemap-pages.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    const pages = ['about', 'contact', 'privacy', 'terms', 'sitemap'];
    let xml = getSitemapHeader();
    pages.forEach(page => {
      xml += `
  <url>
    <loc>${domain}/${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
    });
    xml += getSitemapFooter();
    res.send(xml);
  });

  // --- Vite / Static Serve Logic ---

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
