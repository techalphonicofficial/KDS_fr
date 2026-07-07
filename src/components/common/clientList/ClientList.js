"use client";

import { useState } from "react";
import {
  MapPin,
  Building2,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";

export default function ClientList({
  clientData = [],
  title,
  subtitle,
  description,
}) {

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCities, setExpandedCities] = useState({});
  const [sortBy, setSortBy] = useState("city");

  const rawItems = Array.isArray(clientData)
    ? clientData
    : clientData?.extra || [];

  const data = rawItems.map((item, index) => ({
    sno: item.sno ?? index + 1,
    name: item.name || item.value || item.key || "",
    department: item.department || item.key || "Client",
    type: item.type || "Private Sector",
    city: item.city || "India",
  }));
  const groupedByCity = data.reduce((acc, client) => {
    if (!acc[client.city]) acc[client.city] = [];
    acc[client.city].push(client);
    return acc;
  }, {});


  const sortedCities = Object.keys(groupedByCity).sort();


  const filterClients = (clients) => {
    if (!searchTerm) return clients;

    return clients.filter(
      (client) =>
        client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };


  const toggleCity = (city) => {
    setExpandedCities((prev) => ({
      ...prev,
      [city]: !prev[city],
    }));
  };


  const governmentCount = data.filter(
    (c) => c.type === "Government"
  ).length;

  const publicSectorCount = data.filter(
    (c) => c.type === "Public Sector"
  ).length;

  const educationCount = data.filter(
    (c) => c.type === "Educational Institution"
  ).length;


  return (
    <section className="py-5 bg-gray-50 dark:bg-[#0a0e15]">

      <div className="container mx-auto px-6 max-w-7xl">


        {/* HEADER API */}

        <div className="text-center mb-4">

          <span className="text-[#1565c0] font-black text-sm uppercase tracking-[0.3em] mb-4 block">
            {title || "Our Valued Clients"}
          </span>


          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">

            {subtitle || "Trusted By Government & Private Sectors"}

          </h2>


          <p
            className="text-gray-600 dark:text-[#8b949e] text-lg max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{
              __html:
                description ||
                "We've delivered excellence to prestigious organizations across India",
            }}
          />

        </div>



        {/* STATS */}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-12">


          <div className="bg-white dark:bg-transparent premium-glass p-4 rounded-2xl text-center">
            <Building2 className="w-8 h-8 text-[#1565c0] mx-auto mb-3" />
            <div className="text-3xl font-black">
              {data.length}
            </div>
            <p>Total Clients</p>
          </div>



          <div className="bg-white dark:bg-transparent premium-glass p-4 rounded-2xl text-center">
            <MapPin className="w-8 h-8 text-[#1565c0] mx-auto mb-3" />
            <div className="text-3xl font-black">
              {Object.keys(groupedByCity).length}
            </div>
            <p>Cities Covered</p>
          </div>



          <div className="bg-white dark:bg-transparent premium-glass p-4 rounded-2xl text-center">
            <MapPin className="w-8 h-8 text-[#1565c0]" />
            <div className="text-3xl font-black">
              {governmentCount}
            </div>
            <p>Government</p>
          </div>



          <div className="bg-white dark:bg-transparent premium-glass p-4 rounded-2xl text-center">
            <MapPin className="w-8 h-8 text-[#1565c0]" />
            <div className="text-3xl font-black">
              {publicSectorCount}
            </div>
            <p>Public Sector</p>
          </div>



          <div className="bg-white dark:bg-transparent premium-glass p-4 rounded-2xl text-center">
            <MapPin className="w-8 h-8 text-[#1565c0]" />
            <div className="text-3xl font-black">
              {educationCount}
            </div>
            <p>Educational</p>
          </div>


        </div>




        {/* SEARCH */}

        <div className="flex flex-col md:flex-row gap-4 my-4">


          <div className="flex-1 relative">

            <Search className="absolute !left-4 top-1/2 -translate-y-1/2"/>


            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              className="w-full !pl-12 py-3 rounded-xl border"
            />

          </div>
          <button
            onClick={()=>setSortBy("name")}
            className="px-4 py-2 rounded-xl bg-[#1565c0] text-white"
          >
            <Filter className="w-4 h-4 inline"/>
            Sort
          </button>


        </div>


        {/* CLIENT LIST */}

        <div>

        {sortedCities.map((city)=>{


          const filteredClients =
            filterClients(groupedByCity[city]);


          return (

          <div
            key={city}
            className="bg-white dark:bg-transparent rounded-2xl border my-4 overflow-hidden"
          >


            <button
              onClick={()=>toggleCity(city)}
              className="w-full px-4 py-4 flex items-center gap-3"
            >

              <MapPin className="text-[#1565c0]"/>

              <h3 className="font-black text-xl">
                {city}
              </h3>


              <span className="ml-auto bg-[#1565c0] text-white px-3 py-1 rounded-full">
                {filteredClients.length}
              </span>


              <ChevronDown
                className={
                  expandedCities[city]
                  ? "rotate-180"
                  :""
                }
              />

            </button>



            <div
              className={
                expandedCities[city]
                ? "block"
                :"hidden"
              }
            >


            {filteredClients
            .sort((a,b)=>
              sortBy==="name"
              ? a.name.localeCompare(b.name)
              : 0
            )
            .map((client,index)=>(


              <div
                key={index}
                className="px-4 py-4 border-t"
              >


                <p className="font-semibold">
                  {client.name}
                </p>


                <div className="flex gap-2 mt-2">


                  <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                    {client.department}
                  </span>


                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {client.type}
                  </span>


                </div>


              </div>


            ))}


            </div>


          </div>

          )

        })}


        </div>




        <div className="text-center mt-8">

          <p>
            Showing {data.length} clients across{" "}
            {Object.keys(groupedByCity).length} cities
          </p>

        </div>


      </div>


    </section>
  );
}