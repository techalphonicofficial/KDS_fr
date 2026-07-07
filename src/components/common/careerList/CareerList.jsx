// components/common/careerList/CareerList.jsx
'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { MapPin, Building2, Briefcase, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import Drawer from '@/components/common/Drawer';
import CareerApplicationForm from '@/components/common/careerForm/CareerApplicationForm';

const CareerList = ({ careerData }) => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Get unique types and departments
  const types = ['all', ...new Set(careerData.map(item => item.type))];
  const departments = ['all', ...new Set(careerData.map(item => item.department))];

  // Filter data based on selections
  const filteredData = careerData.filter(item => {
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    const deptMatch = selectedDepartment === 'all' || item.department === selectedDepartment;
    return typeMatch && deptMatch;
  });

  // Get color classes based on type
  const getTypeColor = (type) => {
    switch(type) {
      case 'Government':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Public Sector':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Educational Institution':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleApplyClick = (position) => {
    setSelectedPosition(position);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <section id="openings" className="py-5">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-5">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Current Openings
            </h2>
            <p className="text-gray-600 dark:text-[#8b949e] max-w-2xl mx-auto">
              We have {filteredData.length} positions available across various departments and locations
            </p>
          </div>

          {/* Filter Toggle for Mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden w-full mb-6 px-4 py-3 bg-white dark:bg-[#1a1e24] rounded-lg shadow-sm flex items-center justify-between text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
          >
            <span className="flex items-center gap-2">
              <Filter size={20} />
              Filters
            </span>
            {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {/* Filters Section */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block mb-8`}>
            <div className="bg-white dark:bg-[#1a1e24] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-3">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organization Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1565c0] focus:border-transparent"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1565c0] focus:border-transparent"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>
                        {dept === 'all' ? 'All Departments' : dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="my-4 text-s text-gray-600 dark:text-gray-400">
            Showing <b>{filteredData.length}</b> of <b>{careerData.length}</b> positions
          </div>

          {/* Career Cards */}
          <div className="space-y-4">
            {filteredData.map((item) => (
              <div
                key={item.sno}
                className="bg-white dark:bg-[#1a1e24] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-md mb-3"
              >
                <div className="p-3">
                  {/* Main Card Content */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Left Section - Icon and Details */}
                    <div className="flex-1" onClick={() => setExpandedId(expandedId === item.sno ? null : item.sno)}>
                      <div className="flex items-start gap-3">
                        <div className="mt-2">
                          <Briefcase className="w-5 h-5 text-[#1565c0]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold !text-[#1565c0] dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                              <MapPin size={16} />
                              {item.location}
                            </span>
                            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                              <Building2 size={16} />
                              {item.department}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-3 pl-8 lg:pl-0">
                      <Button
                        onClick={() => handleApplyClick(item)}
                        size="sm"
                        className="bg-[#1565c0] text-white hover:bg-[#0d47a1]"
                      >
                        Apply Now
                      </Button>
                      <button
                        onClick={() => setExpandedId(expandedId === item.sno ? null : item.sno)}
                        className="p-2 text-gray-500 hover:text-[#1565c0] dark:text-gray-400 dark:hover:text-[#1565c0] transition-colors"
                      >
                        {expandedId === item.sno ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details Section */}
                  {expandedId === item.sno && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className=''>
                        <p>{item.description}</p>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Responsibilities
                          </h4>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ps-0">
                            {item.responsibilities.map((item,i) => (
                              <li className="flex items-start gap-2" key={i}>
                                <span className="text-[#1565c0]">•</span>
                                <span>{item} position</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        {/* Position Details */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Position Details
                          </h4>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ps-0">
                            <li className="flex items-start gap-2">
                              <span className="text-[#1565c0]">•</span>
                              <span>{item.type} position</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#1565c0]">•</span>
                              <span>Based in {item.city}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#1565c0]">•</span>
                              <span>Department: {item.department}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#1565c0]">•</span>
                              <span>Organization Type: {item.type}</span>
                            </li>
                          </ul>
                        </div>

                        {/* Requirements */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Requirements
                          </h4>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ps-0">
                             {item.requirements.map((item,i) => (
                              <li className="flex items-start gap-2" key={i}>
                                <span className="text-[#1565c0]">•</span>
                                <span>{item} position</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No positions match your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedDepartment('all');
                }}
                className="mt-4 text-[#1565c0] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Drawer with Application Form */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} width="800px">
        <div className="space-y-4">
          {selectedPosition && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Applying for: <span className='text-[#1565c0]'>{selectedPosition.title}</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedPosition.department} • {selectedPosition.location}
              </p>
            </div>
          )}
          <CareerApplicationForm 
            job={selectedPosition}
            initialPosition={selectedPosition?.title || 'Other'}
            onSuccess={() => {
              // Optional: Close drawer after successful submission
              setTimeout(() => setIsDrawerOpen(false), 3000);
            }}
          />
        </div>
      </Drawer>
    </>
  );
};

export default CareerList;