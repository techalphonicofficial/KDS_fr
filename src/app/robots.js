export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/private/"],
        },
        sitemap: "https://darkturquoise-koala-648403.hostingersite.com/sitemap.xml",
    };
}
