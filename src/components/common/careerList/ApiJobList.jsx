// components/common/careerList/ApiJobList.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { MapPin, Building2, Briefcase, ChevronDown, ChevronUp, Filter, Search, Loader2 } from 'lucide-react';
import Drawer from '@/components/common/Drawer';
import CareerApplicationForm from '@/components/common/careerForm/CareerApplicationForm';
import { API_ENDPOINTS } from "@/config/api";

// Dynamic departments will be loaded from API
const EMPLOYMENT_TYPES = ['all', 'Full-time', 'Part-time', 'Contract', 'Internship'];

const ApiJobList = ({ initialJobsData }) => {
  const [jobs, setJobs] = useState(initialJobsData?.data?.data || []);
  const [pagination, setPagination] = useState({
    currentPage: initialJobsData?.data?.current_page || 1,
    lastPage: initialJobsData?.data?.last_page || 1,
    total: initialJobsData?.data?.total || 0,
    perPage: initialJobsData?.data?.per_page || 10,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [departments, setDepartments] = useState(['all']);

  // Initialize departments from initial data
  useEffect(() => {
    if (initialJobsData?.data?.data) {
      const deptSet = new Set(['all']);
      initialJobsData.data.data.forEach(j => {
        if (j.department) deptSet.add(j.department);
      });
      setDepartments(Array.from(deptSet));
    }
  }, []);

  // Safe JSON Parser
  const parseJsonField = (str, fallback = []) => {
    if (!str) return fallback;
    try {
      const parsed = typeof str === 'string' ? JSON.parse(str) : str;
      return Array.isArray(parsed) ? parsed : fallback;
    } catch (e) {
      return fallback;
    }
  };

  // Fetch jobs dynamically based on page, department, and employment type
  const fetchJobs = async (pageNumber, dept = selectedDept, type = selectedType) => {
    setIsLoading(true);
    try {
      let url = `${API_ENDPOINTS.JOBS}?page=${pageNumber}`;
      if (dept !== 'all') {
        url += `&department=${encodeURIComponent(dept)}`;
      }
      if (type !== 'all') {
        url += `&employment_type=${encodeURIComponent(type)}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const result = await res.json();

      if (result.status && result.data) {
        const fetchedJobs = result.data.data || [];
        setJobs(fetchedJobs);
        setPagination({
          currentPage: result.data.current_page || 1,
          lastPage: result.data.last_page || 1,
          total: result.data.total || 0,
          perPage: result.data.per_page || 10,
        });
        // Update dynamic departments list
        const deptSet = new Set(['all']);
        fetchedJobs.forEach(j => {
          if (j.department) deptSet.add(j.department);
        });
        setDepartments(Array.from(deptSet));
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle department filter change
  const handleDeptChange = (e) => {
    const dept = e.target.value;
    setSelectedDept(dept);
    setExpandedId(null);
    fetchJobs(1, dept, selectedType);
  };

  // Handle employment type filter change
  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    setExpandedId(null);
    fetchJobs(1, selectedDept, type);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > pagination.lastPage || pageNumber === pagination.currentPage) return;
    setExpandedId(null);
    fetchJobs(pageNumber);
    // Smooth scroll to API jobs section
    const element = document.getElementById('global-opportunities');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter jobs client-side based on search query (title or location)
  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();
    const titleMatch = job.title?.toLowerCase().includes(query);
    const locationMatch = job.location?.toLowerCase().includes(query);
    const deptMatch = job.department?.toLowerCase().includes(query);
    return titleMatch || locationMatch || deptMatch;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'Full-time':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Part-time':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Contract':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Internship':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleApplyClick = (job) => {
    setSelectedPosition(job);
    setIsDrawerOpen(true);
  };

  // Generate pagination page numbers to display
  const getPageNumbers = () => {
    const current = pagination.currentPage;
    const last = pagination.lastPage;
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <>
      <section id="global-opportunities" className="!py-12 bg-gray-50/50 dark:bg-[#0d1117]/50 border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Explore Global Opportunities
            </h2>
            <p className="text-gray-600 dark:text-[#8b949e] max-w-2xl mx-auto">
              Browse and apply for active positions across diverse fields. Select your department or employment preference below.
            </p>
          </div>

          {/* Filters & Search Row */}
          <div className="bg-white dark:bg-[#1a1e24] p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8 transition-colors duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search title, location or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full !pl-9 !pr-4 !py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-colors"
                />
              </div>

              {/* Department */}
              <div>
                <select
                  value={selectedDept}
                  onChange={handleDeptChange}
                  className="w-full !px-4 !py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-colors"
                >
                  <option value="all">All Departments</option>
                  {departments.filter(d => d !== 'all').map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Employment Type */}
              <div>
                <select
                  value={selectedType}
                  onChange={handleTypeChange}
                  className="w-full !px-4 !py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-colors"
                >
                  <option value="all">All Employment Types</option>
                  {EMPLOYMENT_TYPES.filter(t => t !== 'all').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              Showing <b>{filteredJobs.length}</b> result{filteredJobs.length !== 1 ? 's' : ''} on this page
              {selectedDept !== 'all' || selectedType !== 'all' || searchQuery ? ' (filtered)' : ''}
            </div>
            <div>
              Total jobs found: <b>{pagination.total}</b>
            </div>
          </div>

          {/* Job List Cards */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 bg-white dark:bg-[#1a1e24] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-500">
              <Loader2 className="w-10 h-10 animate-spin text-[#1565c0]" />
              <p className="text-gray-500 dark:text-gray-400">Loading opportunities...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#1a1e24] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-500">
              <p className="text-gray-600 dark:text-gray-400">
                No positions found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDept('all');
                  setSelectedType('all');
                  fetchJobs(1, 'all', 'all');
                }}
                className="mt-4 text-[#1565c0] dark:text-blue-400 hover:underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const parsedResponsibilities = parseJsonField(job.responsibilities);
                const parsedRequirements = parseJsonField(job.requirements);
                const parsedDetails = parseJsonField(job.position_details);

                return (
                  <div
                    key={job.id}
                    className="bg-white dark:bg-[#1a1e24] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-md transition-colors duration-500"
                  >
                    <div className="p-5">
                      {/* Main Job Details */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="mt-1.5 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-[#1565c0]">
                              <Briefcase className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-[#1565c0] transition-colors">
                                {job.title}
                              </h3>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-[#8b949e]">
                                <span className="flex items-center gap-1">
                                  <MapPin size={16} className="text-gray-400 dark:text-gray-500" />
                                  {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Building2 size={16} className="text-gray-400 dark:text-gray-500" />
                                  {job.department}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(job.employment_type)}`}>
                                  {job.employment_type}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pl-12 lg:pl-0">
                          <Button
                            onClick={() => handleApplyClick(job)}
                            size="sm"
                            className="bg-[#1565c0] text-white hover:bg-[#0d47a1] px-5 py-2"
                          >
                            Apply Now
                          </Button>
                          <button
                            onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                            className="p-2 text-gray-500 hover:text-[#1565c0] dark:text-gray-400 dark:hover:text-[#1565c0] transition-colors"
                          >
                            {expandedId === job.id ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Section */}
                      {expandedId === job.id && (
                        <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800/80 animate-fade-in space-y-6">
                          {/* Description */}
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                              Job Description
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                              {job.description}
                            </p>
                          </div>

                          {/* Responsibilities & Requirements Grid */}
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Responsibilities */}
                            {parsedResponsibilities.length > 0 && (
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                  Key Responsibilities
                                </h4>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300 ps-0 text-sm">
                                  {parsedResponsibilities.map((item, i) => (
                                    <li className="flex items-start gap-2" key={i}>
                                      <span className="text-[#1565c0] font-bold mt-0.5">•</span>
                                      <span>{item.responsibility || item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Requirements */}
                            {parsedRequirements.length > 0 && (
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                  Job Requirements
                                </h4>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300 ps-0 text-sm">
                                  {parsedRequirements.map((item, i) => (
                                    <li className="flex items-start gap-2" key={i}>
                                      <span className="text-[#1565c0] font-bold mt-0.5">•</span>
                                      <span>{item.requirement || item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Position Details */}
                          {parsedDetails.length > 0 && (
                            <div className="bg-gray-50 dark:bg-[#0d1117]/30 p-4 rounded-lg border border-gray-100 dark:border-gray-800/60">
                              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                Position Details
                              </h4>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300 ps-0 text-sm">
                                {parsedDetails.map((item, i) => (
                                  <li className="flex items-center gap-2" key={i}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1565c0]"></span>
                                    <span>{item.detail || item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {pagination.lastPage > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {/* Prev Button */}
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1 || isLoading}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1e24] text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="hidden sm:flex items-center gap-1.5">
                {getPageNumbers().map((pageNum, idx) => (
                  <button
                    key={idx}
                    onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                    disabled={isLoading || pageNum === '...'}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${pageNum === pagination.currentPage
                      ? 'bg-[#1565c0] text-white'
                      : pageNum === '...'
                        ? 'text-gray-400 cursor-default'
                        : 'border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1e24] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              {/* Mobile Page Indicator */}
              <span className="sm:hidden text-sm text-gray-600 dark:text-gray-400 font-medium px-2">
                Page {pagination.currentPage} of {pagination.lastPage}
              </span>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.lastPage || isLoading}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1e24] text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Application Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} width="800px">
        <div className="space-y-4">
          {selectedPosition && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Applying for: <span className="text-[#1565c0]">{selectedPosition.title}</span>
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
              setTimeout(() => setIsDrawerOpen(false), 3000);
            }}
          />
        </div>
      </Drawer>
    </>
  );
};

export default ApiJobList;
