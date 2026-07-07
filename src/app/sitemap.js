import { getServerData } from "@/lib/data";

export default async function sitemap() {
    const baseUrl = "https://darkturquoise-koala-648403.hostingersite.com";
    const data = await getServerData();

    // Static routes
    const routes = ["", "/about", "/services", "/projects", "/contact", "/blog"].map(
        (route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: route === "" ? 1 : 0.8,
        })
    );

    // Dynamic service routes
    const serviceRoutes = data.services.map((service) => ({
        url: `${baseUrl}/services/${service.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    }));



       // Dynamic service + location routes
    const serviceLocationRoutes = [];
    for (const service of data.services) {
        if (!service.locations) continue;
        for (const loc of service.locations) {
            for (const cityObj of loc.cities) {
                serviceLocationRoutes.push({
                    url: `${baseUrl}/services/${service.slug}/${loc.state}/${cityObj.slug}`,
                    lastModified: new Date(),
                    changeFrequency: "monthly",
                    priority: 0.65,
                });
            }
        }
    }
    // Dynamic blog routes
    const blogRoutes = data.blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
    }));

    // Combine
    // return [...routes, ...serviceRoutes];
    return [...routes, ...serviceRoutes, ...serviceLocationRoutes, ...blogRoutes];
}
