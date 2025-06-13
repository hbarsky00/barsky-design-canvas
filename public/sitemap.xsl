
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN" doctype-system="http://www.w3.org/TR/html4/loose.dtd"/>
  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap - Hiram Barsky Design</title>
        <link rel="icon" href="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" type="image/png"/>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
          .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .header h1 { margin: 0; color: #333; display: flex; align-items: center; }
          .header img { width: 32px; height: 32px; margin-right: 12px; }
          .sitemap { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .sitemap h2 { color: #666; margin-top: 0; }
          .url-list { list-style: none; padding: 0; }
          .url-item { padding: 12px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
          .url-item:hover { background: #f9f9f9; }
          .url-link { color: #0066cc; text-decoration: none; font-weight: 500; }
          .url-link:hover { text-decoration: underline; }
          .url-meta { font-size: 12px; color: #999; }
          .priority { background: #e3f2fd; color: #1976d2; padding: 2px 8px; border-radius: 12px; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>
            <img src="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" alt="Hiram Barsky Design"/>
            Sitemap - Hiram Barsky Design
          </h1>
          <p>This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs</p>
        </div>
        
        <div class="sitemap">
          <h2>All Pages</h2>
          <ul class="url-list">
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <li class="url-item">
                <div>
                  <a href="{sitemap:loc}" class="url-link">
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                  <div class="url-meta">
                    Last modified: <xsl:value-of select="sitemap:lastmod"/> | 
                    Change frequency: <xsl:value-of select="sitemap:changefreq"/>
                  </div>
                </div>
                <span class="priority">Priority: <xsl:value-of select="sitemap:priority"/></span>
              </li>
            </xsl:for-each>
          </ul>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
