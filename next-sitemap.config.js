/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://jagaldol.com",
  generateRobotsTxt: true, // (optional)
  exclude: ["/manifest.json", "/icon*.png", "/apple-icon.png"],
  // ...other options
}
