export const API_URL = "https://darkturquoise-koala-648403.hostingersite.com/api";
export const IMAGE_URL = "https://darkturquoise-koala-648403.hostingersite.com";

// all api call here
export const API_ENDPOINTS = {
  HOME: `${API_URL}/page/home`,
  FAQ: `${API_URL}/faq/home`,
  ABOUT: `${API_URL}/page/about`,
  CLIENTS: `${API_URL}/page/clients`,
  CAREER: `${API_URL}/page/career`,
  SERVICES: `${API_URL}/page/services`,
  SERVICES_LIST: `${API_URL}/services`,
  SERVICES_SLUG: (slug) => `${API_URL}/services/${slug}`,
  TECHNOLOGY_SOLUTIONS_LIST: `${API_URL}/technology-solutions`,
  INDUSTRIES: `${API_URL}/page/industries`,
  INDUSTRIES_LIST: `${API_URL}/industries`,
  INDUSTRY_SLUG: (slug) => `${API_URL}/industries/${slug}`,
  CONTACT: `${API_URL}/page/contact`,
  CONTACT_SUBMIT: `${API_URL}/contact`,
  BLOGS: `${API_URL}/page/blog`,
  BLOGS_LIST: `${IMAGE_URL}/public/api/blogs`,
  SOLUTIONS: `${API_URL}/page/solutions`,
  SOLUTIONS_SLUG: (slug) => `${API_URL}/technology-solutions/${slug}`,
  TECHNOLOGY_SLUG: (slug) => `${API_URL}/solutions/${slug}`,
  TECHNOLOGY: `${API_URL}/page/technology-and-operations`,
  TECHNOLOGY_LIST: `${API_URL}/solutions`,
  BLOGS_SLUG: (slug) => `${IMAGE_URL}/public/api/blogs/${slug}`,
  TESTIMONIALS: `${API_URL}/testimonial`,
  JOBS: `${API_URL}/jobs`,
  JOB_APPLY: `${API_URL}/job-apply`,
  VALUED_CLIENTS: `${API_URL}/clients`,
  SERVICES_DETAIL_SLUG: (serviceSlug, locationSlug) => `${API_URL}/services/${serviceSlug}/${locationSlug}`,
  // City-level endpoint: serviceSlug, stateSlug, citySlug
  SERVICES_CITY_SLUG: (serviceSlug, stateSlug, citySlug) => `${API_URL}/services/${serviceSlug}/${stateSlug}/${citySlug}`,

}