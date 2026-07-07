// components/common/careerForm/CareerApplicationForm.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { Upload, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';

const CareerApplicationForm = ({ job, initialPosition = '', onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: initialPosition,
    experience: '',
    message: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Update form when initialPosition changes
  useEffect(() => {
    if (initialPosition) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(prev => ({ ...prev, position: initialPosition }));
    }
  }, [initialPosition]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const form = new FormData();

      // Required backend fields
      form.append('job_id', job?.id || job?.sno || '');
      form.append('full_name', formData.fullName);
      form.append('email', formData.email);
      form.append('phone_number', formData.phone);
      form.append(
        'position_applying_for',
        formData.position
      );
      form.append(
        'years_of_experience',
        formData.experience
      );

      // Optional fields
      form.append(
        'cover_letter',
        formData.message || ''
      );

      if (resumeFile) {
        form.append('resume', resumeFile);
      }

      const res = await fetch(API_ENDPOINTS.JOB_APPLY, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: form,
      });

      const result = await res.json();

      if (!res.ok) {
        console.log(result);
        let errMsg = 'Submission failed';
        if (result && result.message) {
          if (typeof result.message === 'string') {
            errMsg = result.message;
          } else if (typeof result.message === 'object') {
            errMsg = Object.values(result.message).flat().join(' ');
          }
        }
        throw new Error(errMsg);
      }

      setSubmitStatus('success');

      if (onSuccess) onSuccess();

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        message: '',
      });

      setResumeFile(null);

      const fileInput = document.getElementById('resume');
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || 'Something went wrong. Please try again.');
      setSubmitStatus('error');

    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1e24] rounded-xl">
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-green-800 dark:text-green-300">
            Application submitted successfully! We&apos;ll review your profile and get back to you soon.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg flex items-center gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-red-800 dark:text-red-300">
            {errorMsg}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information - Row 1 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className='mb-3'>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-colors"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className='mb-3'>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Personal Information - Row 2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Phone Number */}
          <div className='mb-3'>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-colors"
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Position */}
          <div className='mb-3'>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Position Applying For <span className="text-red-500">*</span>
            </label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-colors"
            >
              <option value="">Select a position</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Site Engineer">Site Engineer</option>
              <option value="Civil Engineer">Civil Engineer</option>
              <option value="Electrical Engineer">Electrical Engineer</option>
              <option value="Mechanical Engineer">Mechanical Engineer</option>
              <option value="Safety Officer">Safety Officer</option>
              <option value="Contract Manager">Contract Manager</option>
              <option value="Quantity Surveyor">Quantity Surveyor</option>
              <option value="Architect">Architect</option>
              <option value="HVAC Engineer">HVAC Engineer</option>
              <option value="BIM Coordinator">BIM Coordinator</option>
              <option value="Procurement Specialist">Procurement Specialist</option>
              <option value="Quality Control Engineer">Quality Control Engineer</option>
              <option value="Environmental Engineer">Environmental Engineer</option>
              <option value="IT Infrastructure Engineer">IT Infrastructure Engineer</option>
              <option value="Land Surveyor">Land Surveyor</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Finance Manager">Finance Manager</option>
              <option value="Business Development Manager">Business Development Manager</option>
              <option value="Junior Engineer">Junior Engineer</option>
              <option value="Store Keeper">Store Keeper</option>
              <option value="Document Controller">Document Controller</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Experience */}
        <div className='mb-3'>
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Years of Experience <span className="text-red-500">*</span>
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-colors"
          >
            <option value="">Select experience</option>
            <option value="0-2">0-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        {/* Resume Upload */}
        <div className='mb-3'>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resume/CV <span className="text-red-500">*</span>
          </label>
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center hover:border-[#1565c0] dark:hover:border-[#1565c0] transition-colors cursor-pointer group"
            onClick={() => document.getElementById('resume').click()}
          >
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
              className="hidden"
            />
            <div className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500 mb-2 group-hover:text-[#1565c0] transition-colors" />
              <p className="text-gray-600 dark:text-gray-400 group-hover:text-[#1565c0] transition-colors">
                {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          </div>
          {resumeFile && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              ✓ {resumeFile.name} selected
            </p>
          )}
        </div>

        {/* Cover Letter */}
        <div className='mb-3'>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Cover Letter / Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition-colors resize-none"
            placeholder="Tell us why you're interested in this position and what makes you a great candidate..."
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className={`w-full bg-[#1565c0] text-white hover:bg-[#0d47a1] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Submit Application</span>
            </>
          )}
        </Button>

        {/* Terms */}
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-4">
          By submitting this form, you agree to our{' '}
          <a href="/privacy" className="text-[#1565c0] hover:underline">
            privacy policy
          </a>{' '}
          and{' '}
          <a href="/terms" className="text-[#1565c0] hover:underline">
            terms of service
          </a>.
          <br />
          We&apos;ll handle your information with care.
        </p>
      </form>
    </div>
  );
};

export default CareerApplicationForm;