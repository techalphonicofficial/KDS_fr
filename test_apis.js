async function test() {
  const API_URL = "https://darkturquoise-koala-648403.hostingersite.com/api";
  const endpoints = {
    TECHNOLOGY_SOLUTIONS_LIST: `${API_URL}/technology-solutions`,
    TECHNOLOGY_LIST: `${API_URL}/solutions`,
    INDUSTRIES_LIST: `${API_URL}/industries`,
  };

  for (const [key, url] of Object.entries(endpoints)) {
    try {
      const res = await fetch(url);
      console.log(`${key} Status:`, res.status);
      const data = await res.json();
      console.log(`${key} Keys:`, Object.keys(data));
      if (data.data) {
        if (Array.isArray(data.data)) {
          console.log(`${key} Data Length:`, data.data.length);
          if (data.data.length > 0) {
            console.log(`${key} First Item Keys:`, Object.keys(data.data[0]));
          }
        } else {
          console.log(`${key} Data Keys:`, Object.keys(data.data));
        }
      }
    } catch (err) {
      console.error(`Error fetching ${key}:`, err.message);
    }
  }
}

test();
