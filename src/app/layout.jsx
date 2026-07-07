import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getServerData, getData } from "@/lib/data";
import { API_ENDPOINTS } from "@/config/api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleMap from "@/components/layout/GoogleMap";
import FloatingActionButtons from "@/components/common/FloatingActionButtons";
import AOSInit from "@/components/common/AOSInit";
import 'flowbite';




export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const data = await getServerData();
  const theme = process.env.NEXT_PUBLIC_THEME || 'light';

  let services = [];
  let solutions = [];
  let technologies = [];
  let industries = [];

  try {
    const res = await getData(API_ENDPOINTS.SERVICES_LIST);
    services = res?.data || [];
  } catch (error) {
    console.error("Error fetching services in layout:", error);
    services = data?.services || [];
  }

  try {
    const res = await getData(API_ENDPOINTS.TECHNOLOGY_SOLUTIONS_LIST);
    solutions = res?.data?.technologies || [];
  } catch (error) {
    console.error("Error fetching solutions in layout:", error);
  }

  try {
    const res = await getData(API_ENDPOINTS.TECHNOLOGY_LIST);
    technologies = res?.data?.solutions || [];
  } catch (error) {
    console.error("Error fetching technologies in layout:", error);
  }

  try {
    const res = await getData(API_ENDPOINTS.INDUSTRIES_LIST);
    industries = res?.data || [];
  } catch (error) {
    console.error("Error fetching industries in layout:", error);
  }

  return (
    <html lang="en" className={theme}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50 text-gray-900 dark:bg-[#0d1117] dark:text-[#e6edf3] min-h-screen flex flex-col">
        <AOSInit />
        <Header services={services} solutions={solutions} technologies={technologies} industries={industries} siteName={data.siteInfo.name} theme={theme} />
        <main className="flex-1">{children}</main>
        <GoogleMap />
        <Footer siteInfo={data.siteInfo} services={services} theme={theme} />
        <FloatingActionButtons siteInfo={data.siteInfo} />
      </body>
    </html>
  );
}
