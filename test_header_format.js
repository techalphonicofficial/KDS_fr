async function test() {
  const formatTitle = (title) => {
    if (!title) return "";
    if (title.includes(" ") || /[A-Z]/.test(title)) return title;
    return title
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const API_URL = "https://darkturquoise-koala-648403.hostingersite.com/api";

  // Fetch Solutions
  const resSol = await fetch(`${API_URL}/technology-solutions`);
  const dataSol = await resSol.json();
  const solutions = dataSol.data?.technologies || [];

  // Fetch Technologies
  const resTech = await fetch(`${API_URL}/solutions`);
  const dataTech = await resTech.json();
  const technologies = dataTech.data?.solutions || [];

  // Fetch Industries
  const resInd = await fetch(`${API_URL}/industries`);
  const dataInd = await resInd.json();
  const industries = dataInd.data || [];

  // 1. Process Solutions
  const formattedSolutions = (() => {
    const groups = {};
    solutions.forEach(item => {
      const catTitle = item.category?.title || "Solutions";
      if (!groups[catTitle]) {
        groups[catTitle] = [];
      }
      groups[catTitle].push({
        name: formatTitle(item.title),
        slug: item.slug
      });
    });
    return Object.keys(groups).map(title => ({
      category: title,
      items: groups[title]
    }));
  })();

  // 2. Process Technologies
  const formattedTechnologies = (() => {
    const groups = {};
    technologies.forEach(item => {
      const catTitle = item.category?.title || "Technology & Operations";
      if (!groups[catTitle]) {
        groups[catTitle] = [];
      }
      groups[catTitle].push({
        name: formatTitle(item.title),
        slug: item.slug
      });
    });
    return Object.keys(groups).map(title => ({
      category: title,
      items: groups[title]
    }));
  })();

  // 3. Process Industries
  const formattedIndustries = (() => {
    return industries.map(cat => ({
      category: cat.name,
      items: (cat.industries || []).map(ind => ({
        name: ind.name,
        slug: ind.slug
      }))
    }));
  })();

  console.log("FORMATTED SOLUTIONS:");
  console.dir(formattedSolutions, { depth: null });

  console.log("\nFORMATTED TECHNOLOGIES:");
  console.dir(formattedTechnologies, { depth: null });

  console.log("\nFORMATTED INDUSTRIES:");
  console.dir(formattedIndustries, { depth: null });
}

test();
