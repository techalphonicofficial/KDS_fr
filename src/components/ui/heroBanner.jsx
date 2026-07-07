"use client";
import { useState, useEffect } from 'react';
import { CheckCircle, Phone, Mail, MapPin, ArrowRight, User, Globe, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
// import Image from 'next/image';

const HeroBanner = ({ service }) => {


  // Array of slides with image and corresponding content
  const slides = [
    {
      image: '/industry.png',
      profileImage: '/industry-small1.png',
      title: 'Skilled Manpower',
      slug: "skilled-manpower",
      description: 'Skilled industrial workers for manufacturing, factories, and production units with technical expertise.',
      features: [
        "Certified machine operators",
        "Maintenance technicians",
        "Production line workers",
        "Quality control staff"
      ]
    },
    {
      image: '/construction.png',
      profileImage: '/construction-small1.png',
      title: 'Unskilled Manpower',
      slug: "unskilled-manpower",
      description: 'Experienced construction workers including masons, carpenters, electricians, and site supervisors.',
      features: [
        "Site supervisors",
        "Heavy equipment operators",
        "Skilled masons & carpenters",
        "Safety compliant workforce"
      ]
    },
    {
      image: '/security.png',
      profileImage: '/security-small1.png',
      title: 'Contract Manpower',
      slug: "contract-manpower",
      description: 'Trained security personnel for residential, commercial, and industrial premises with PSARA certification.',
      features: [
        "PSARA certified guards",
        "Armed & unarmed security",
        "Fire safety trained",
        "24/7 monitoring staff"
      ]
    },
    {
      image: '/hostpital.png',
      profileImage: '/hostpital-small1.png',
      slug: "semi-skilled-manpower",
      title: "Semi Skilled Manpower",
      description: 'Professional hospitality staff for hotels, restaurants, and events with grooming and service training.',
      features: [
        "Chefs & kitchen staff",
        "Housekeeping personnel",
        "Front desk executives",
        "Event management crew"
      ]
    },
    {
      image: '/it-services.png',
      profileImage: '/it-services-small1.png',
      slug: "industrial-manpower",
      title: "Industrial Manpower Services",
      description: 'Skilled IT professionals and office staff for administrative, technical, and support roles.',
      features: [
        "System administrators",
        "Data entry operators",
        "Customer support staff",
        "Office assistants"
      ]
    },
    {
      image: '/hero-bg-6.png',
      profileImage: '/profile-6.jpg',
      slug: "labour-manpower",
      title: "Labour Manpower Services",
      description: 'Efficient logistics and supply chain workforce for warehouses, transportation, and inventory management.',
      features: [
        "Warehouse supervisors",
        "Forklift operators",
        "Delivery drivers",
        "Inventory managers"
      ]
    },
    // {
    //   image: '/hero-bg-7.png', 
    //   profileImage: '/profile-7.jpg',
    //   title: 'Healthcare',
    //   description: 'Qualified healthcare professionals for hospitals, clinics, and home care services with medical expertise.',
    //   features: [
    //     "Registered nurses",
    //     "Caregivers & attendants",
    //     "Lab technicians",
    //     "Reception & admin staff"
    //   ]
    // }
  ];


  const defaultIndex = slides.find(s => s.slug === service?.slug) || slides[0];


  //const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [colorIndex, setColorIndex] = useState(0);
  const time = '4000';
  // Auto-change slide every 2 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex === slides.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, time); // 2 seconds

  //   return () => clearInterval(interval);
  // }, []);

  // const stats = [
  //   { id: 1, value: '500+', label: 'WORKERS PLACED' },
  //   { id: 2, value: '200+', label: 'SATISFIED CLIENTS' },
  //   { id: 3, value: '24-48hr', label: 'MANPOWER RESPONSE' },
  //   { id: 4, value: '100%', label: 'COMPLIANCE ASSURED' },
  // ];
  const colorPalette = [
    { name: 'blue', value: '#0d489d', hue: 215 },
    { name: 'orange', value: '#f57c00', hue: 30 },
    { name: 'purple', value: '#00cb05', hue: 270 },
    { name: 'red', value: '#d32f2f', hue: 0 },
    { name: 'magenta', value: '#c2185b', hue: 330 },
    // { name: 'amber', value: '#ffa000', hue: 45 },
    // { name: 'yellow', value: '#fbc02d', hue: 60 }
  ];

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colorPalette.length);
    }, time);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* BG Image with overlay - changes with fade */}
      {/* <div
        
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: `url('/hostpital.png')`,
        }}
      /> */}


      {/* Dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020b16]/95 via-[#0b2340]/80 to-[#1e88e5]/35" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#04111f]/85 via-transparent to-[#1565c0]/10" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(21,101,192,1) 1px, transparent 1px), linear-gradient(90deg, rgba(21,101,192,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Glow orb */}
      <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#1565c0]/10 rounded-full blur-[120px] pointer-events-none" />


      {/* Slide counter */}
      {/* <div className="absolute top-8 right-8 z-20 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white/80 text-sm">
        {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div> */}

      <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-3 pt-xl-5 mt-xl-5 mt-3 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left — Main Content with Profile Image */}
          <div className="lg:col-span-7 space-y-7 z-10">

            {/* <div className="w-full h-[200px]   bg-white flex items-center justify-center mb-4 overflow-hidden rounded-xl">

              <img
                src="/hostpital.png"
                alt="pattern"
                className="w-full h-full "
              />

            </div> */}

            {/* Profile Image - Dynamic Circle */}
            {/* <div className="flex  lg:justify-start mb-4 transition-all duration-500  d-none d-xl-block">
              <div className="absolute top-0 left-0 rounded-full overflow-hidden border-4 border-[#1565c0]/30 shadow-2xl shadow-[#1565c0]/20 group light_img"  style={{
              borderColor: colorPalette[colorIndex].value,
              boxShadow: `0 25px 50px -12px ${colorPalette[colorIndex].value}80`,
              zIndex: '-1',
              transition: 'border-color 500ms ease-in-out, box-shadow 500ms ease-in-out'
            }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1565c0]/40 to-transparent !z-0 group-hover:opacity-0 transition-opacity duration-500" />
                <Image
                  src={slides[currentIndex].profileImage}
                  alt={slides[currentIndex].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                 
                  priority
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-[#1565c0]/50 ring-offset-2 ring-offset-[#06111e] group-hover:ring-[#90caf9] transition-all duration-500" style={{content:'',left:'0',bottom:'0',width:'100%',height:'100%',background:'linear-gradient(to top, #000428f5, #004e9200) !important'}}/>
              </div>
            </div> */}

            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-[#1565c0]/15 border border-[#1565c0]/30 backdrop-blur-sm rounded-full px-5 py-2 mb-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
              <span className="text-[8px] font-black text-white/90 uppercase tracking-[0.25em]">
                Delhi's Most Trusted Manpower Agency
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-white leading-[1.04] tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
              <span style={{ color: colorPalette[colorIndex].value }}>{defaultIndex.title}</span>
              <span className="mx-3 text-white">Manpower</span>
              Solutions.
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              {defaultIndex.description}
            </p>

            {/* Key features - dynamic based on slide */}
            <div className="grid grid-cols-2 gap-3 max-w-xl">
              {defaultIndex?.features?.map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={15} className="text-green-400 shrink-0" />
                  <span className="text-gray-300 text-sm font-medium">{feat}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}


            {/* Stats row - static */}
            {/* <div className="mt-4 flex flex-wrap gap-8 pt-4 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.id}>
                  <p className="text-2xl md:text-3xl font-black text-white leading-none">{stat.value}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">{stat.label}</p>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right — Contact card - static */}
          {/* <div className="lg:col-span-5 mb-5  flex flex-col items-center ">
            <div className="bg-white/5 border border-white/10  rounded-3xl overflow-hidden shadow-2xl shadow-[#1565c0]/10" style={{ backdropFilter: 'blur(2px) ' }}>
              Top accent
              <div className="h-1 w-full bg-gradient-to-r from-[#0d47a1] via-[#1565c0] to-[#1976d2]" />

              <div className="p-3 ">
                <h3 className="text-white font-black text-xl mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Get a Free Consultation
                </h3>
                <p className="text-gray-400 text-sm mb-6">Tell us your manpower requirements and we'll respond within 2 hours.</p>

                <div className="space-y-3 ">
                  {[
                    { icon: Phone, label: "Call Us Directly", value: "+91 9899184918", href: "tel:+919899184918" },
                    { icon: Mail, label: "Email Us", value: "info@kdsinternational.org", href: "mailto:info@kdsinternational.org" },
                    { icon: MapPin, label: "Our Office", value: "Laxmi Nagar, Delhi - 110092", href: "#" },
                  ].map((item, i) => (
                    <a key={i} href={item.href}
                      className="flex items-center gap-4 p-lg-2 p-3 rounded-2xl mb-3 hover:bg-[#1565c0]/20 border border-white/5 hover:border-[#1565c0]/30 transition-all cursor-pointer group">
                      <div className="w-10 h-10 rounded-xl bg-[#1565c0]/20 flex items-center justify-center shrink-0 group-hover:bg-[#1565c0] transition-all">
                        <item.icon size={17} className="text-[#90caf9] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white uppercase tracking-widest font-bold mb-1">{item.label}</p>
                        <p className="text-white text-sm font-semibold mb-0">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <Link href="/contact"
                  className="block mt-2 w-full py-3 text-center bg-gradient-to-r from-[#0d47a1] to-[#1565c0] hover:from-[#1565c0] hover:to-[#1976d2] text-white text-sm font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-[#1565c0]/20">
                  Request Manpower Today →
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-3 mt-4">
              <Button href="/contact" size="lg"
                className="bg-gradient-to-r from-[#0d47a1] to-[#1565c0] text-white hover:from-[#1565c0] hover:to-[#1976d2] border-none shadow-2xl shadow-[#1565c0]/30 font-black uppercase tracking-wider px-3 py-3">
                Get Hiring Consultation
              </Button>
              <a href="tel:+919899184918"
                className="inline-flex items-center gap-2 px-3 py-3 bg-white/5 border border-white/20 text-white text-sm font-bold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm">
                <Phone size={16} className="text-[#90caf9]" />
                +91 9899184918
              </a>
            </div>
          </div> */}


          {/* Right — Enquiry Form */}

          {/* Right — Compact Enquiry Form */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-[500px] bg-white border border-blue-100 rounded-[24px] overflow-hidden shadow-xl">

              {/* Top Strip Image */}
              <div className="relative h-[100px] w-full overflow-hidden">
                <img
                  src="/hostpital.png"
                  alt="banner"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#0d47a1]/80 via-[#1565c0]/50 to-transparent" />

                <div className="absolute bottom-3 left-4">
                  <h3 className="text-white text-lg font-black leading-none">
                    Enquire Now
                  </h3>

                  <p className="text-white/90 text-[11px] mt-1">
                    Quick manpower assistance
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="p-4 md:p-5">
                <form className="space-y-3">

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Full Name
                      </label>

                      <div className="relative">
                        <User
                          size={15}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1565c0]"
                        />

                        <input
                          type="text"
                          placeholder="Your name"
                          className="w-full h-[42px] pl-12 pr-3 bg-[#f5f9ff] border border-blue-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#1565c0]"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Email
                      </label>

                      <div className="relative">
                        <Mail
                          size={15}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1565c0]"
                        />

                        <input
                          type="email"
                          placeholder="Your email"
                          className="w-full h-[42px] pl-12 pr-3 bg-[#f5f9ff] border border-blue-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#1565c0]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone + Website */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Phone
                      </label>

                      <div className="relative">
                        <Phone
                          size={15}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1565c0]"
                        />

                        <input
                          type="text"
                          placeholder="+91 9876543210"
                          className="w-full h-[42px] pl-12 pr-3 bg-[#f5f9ff] border border-blue-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#1565c0]"
                        />
                      </div>
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                        Website
                      </label>

                      <div className="relative">
                        <Globe
                          size={15}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1565c0]"
                        />

                        <input
                          type="text"
                          placeholder="company.com"
                          className="w-full h-[42px] pl-12 pr-3 bg-[#f5f9ff] border border-blue-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#1565c0]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Message
                    </label>

                    <div className="relative">
                      <MessageSquare
                        size={15}
                        className="absolute right-4 top-4 text-[#1565c0]"
                      />

                      <textarea
                        rows={4}
                        placeholder="Tell us your requirements..."
                        className="w-full pl-12 pr-3 pt-4 pb-3 bg-[#f5f9ff] border border-blue-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#1565c0] resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full h-[45px] rounded-lg bg-gradient-to-r from-[#0d47a1] to-[#1565c0] hover:from-[#1565c0] hover:to-[#1976d2] text-white text-sm font-bold tracking-wide transition-all duration-300"
                  >
                    Send Enquiry
                  </button>

                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#06111e] to-transparent" /> */}
    </section>
  );
};

export default HeroBanner;


