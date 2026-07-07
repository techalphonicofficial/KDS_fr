import { solutionsData, technologyData } from "./solutionsAndTechData";

export function formatSlugToTitle(slug) {
  if (!slug) return "";

  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function generateMockData(slug, type) {

  const sourceData =
    type === "solutions"
      ? solutionsData
      : technologyData;

  const parentSection = sourceData.find(section =>
    section.items.some(item => item.slug === slug)
  );

  const serviceItem = parentSection?.items.find(
    item => item.slug === slug
  );

  const title =
    serviceItem?.name ||
    formatSlugToTitle(slug);

  return {
    id: slug,

    // Service-specific data
    title,
    slug,

    // Parent category data
    category: parentSection?.category || "",
    categoryDescription: parentSection?.description || "",
    overview: parentSection?.overview || "",
    image: parentSection?.image || "/hero-bg.png",
    iconName: parentSection?.iconName || "",
    overviewHed: parentSection?.overviewHed || "",
    overviewDesc: parentSection?.overviewDesc || "",


    // Generated fallback content
    whatIs: `Workforce planning is this strategic process where you basically look at current workforce capabilities, then predict what talent will be needed later, and follow through with plans to close workforce gaps in a reasonable way. In practice it helps the business make sure the right human resources are there to reach organizational goals while still keeping efficiency and productivity steady.
    Nowadays most companies run in dynamic settings, and workforce demands keep shifting. So, if there is no solid workforce planning framework, organizations can run into issues like skill shortages, more attrition than expected, weaker output, and, in the end, those increased hiring costs.`,
    shortDesc:
      parentSection?.description ||
      `Discover how our ${title} solutions can transform your operations.`,

    description: `
      Our ${title} services are designed to help organizations
      improve efficiency, reduce operational challenges,
      and achieve sustainable growth.
    `,

    features: [
      `Specialized ${title} expertise`,
      "Improved operational efficiency",
      "Scalable business support",
      "Industry best practices",
      "Compliance and governance",
      "Long-term business growth",
    ],

    features2: [
      "Improved workforce agility",
      "Enhanced innovation capabilities",
      "Better employee experiences",
      "Faster adaptation to market changes",
      "Stronger business resilience",
    ],


    featureDetails: [
      {
        title: "Aligns Workforce with Business Objectives",
        description:
          "Workforce planning connects staffing strategies with business goals, ensuring organizations have the right people in the right roles at the right time. It helps businesses prepare for both immediate needs and long-term growth objectives."
      },
      {
        title: "Strengthens Talent Management",
        description:
          "An effective workforce plan helps organizations attract, develop, and retain top talent. It supports succession planning, leadership development, and employee engagement initiatives, creating a stronger and more resilient workforce."
      },
      {
        title: "Reduces Future Skill Gaps",
        description:
          "By anticipating future workforce requirements, organizations can identify potential skill shortages early and invest in training, upskilling, or specialist hiring before gaps begin to impact operations."
      },
      {
        title: "Improves Productivity and Efficiency",
        description:
          "Strategic workforce planning ensures human resources are utilized effectively, reducing both understaffing and overstaffing issues. This leads to smoother operations, improved performance, and higher productivity."
      },
      {
        title: "Supports Organizational Growth",
        description:
          "As businesses expand, workforce planning ensures that qualified professionals are available when needed. It enables organizations to scale confidently while maintaining operational stability and service quality."
      },
      {
        title: "Reduces Recruitment Costs",
        description:
          "Workforce forecasting minimizes reactive hiring and lowers costs associated with employee turnover. It also enables organizations to develop more cost-effective recruitment and retention strategies over the long term."
      }
    ],

    benefitsDemo: [
      {
        title: "Customized Solutions",
        description:
          "We craft tailored workforce planning strategies based on your business goals, workforce structure, and operational requirements. Our customized approach ensures that workforce initiatives align closely with organizational priorities and deliver measurable outcomes."
      },
      {
        title: "Data-Driven Approach",
        description:
          "Our solutions are built on workforce analytics, market intelligence, and strategic forecasting. This enables organizations to make informed decisions with greater confidence, accuracy, and long-term visibility."
      },
      {
        title: "Scalable Workforce Strategies",
        description:
          "We develop flexible workforce plans that adapt to changing business needs, market conditions, and future expansion goals. Our strategies support sustainable growth while maintaining operational efficiency."
      },
      {
        title: "Improved Employee Retention",
        description:
          "Our workforce planning solutions enhance employee engagement, career development, and job satisfaction. This helps organizations strengthen retention rates and reduce employee turnover."
      },
      {
        title: "Cost Optimization",
        description:
          "We help businesses optimize workforce costs by improving staffing efficiency, reducing recruitment expenses, increasing productivity, and ensuring resources are allocated effectively."
      }
    ],

    benefits: [
      "Reduced operational costs",
      "Improved productivity",
      "Enhanced visibility and reporting",
      "Better resource utilization",
    ],

    content2: [
      {
        type: "heading",
        text: "Our Workforce Planning Process"
      },
      {
        type: "paragraph",
        text: `At KDS International Pvt. Ltd., we go by a kind of orderly, number-backed workforce planning approach, so the result is actually measurable for the business. Not just “ideas” you know.
`
      }, {
        type: "takeaways",
        heading: "Our Process",
        items: [
          {
            title: "Business and Workforce Assessment",
            description:
              "We begin by understanding your business objectives, organizational structure, workforce challenges, and industry landscape. This assessment provides the foundation for building a workforce strategy aligned with your operational and growth goals."
          },
          {
            title: "Workforce Data Analysis",
            description:
              "Our experts analyze workforce data, employee performance metrics, productivity levels, and talent trends to identify skill gaps, workforce risks, and opportunities for improvement."
          },
          {
            title: "Forecasting Future Workforce Needs",
            description:
              "Based on business growth plans, market conditions, and operational requirements, we forecast future workforce demands to ensure your organization is prepared for upcoming challenges and opportunities."
          },
          {
            title: "Strategy Development",
            description:
              "We develop customized workforce planning strategies that include recruitment plans, training initiatives, succession planning, and workforce optimization measures tailored to your organization's specific needs."
          },
          {
            title: "Implementation Support",
            description:
              "Our team supports the execution of workforce initiatives, including workforce restructuring, employee development programs, and change management activities to ensure successful adoption."
          },
          {
            title: "Continuous Monitoring and Improvement",
            description:
              "Workforce needs evolve over time. We continuously monitor workforce performance, review outcomes, and refine strategies to ensure long-term effectiveness and business alignment."
          }
        ],
      }

    ],

    content: [
      {
        type: "heading",
        text: `Why Choose ${title}?`,
      },
      {
        type: "paragraph",
        text:
          parentSection?.description ||
          `Our ${title} solutions are tailored to meet your business requirements.`,
      },
      {
        type: "takeaways",
        heading: "Key Benefits",
        items: [
          "Customized solutions",
          "Industry expertise",
          "Continuous improvement",
        ],
      },
    ],

    locations: [
      {
        stateLabel: "Nationwide",
        stateValue: "nationwide",
      },
    ],
  };
}