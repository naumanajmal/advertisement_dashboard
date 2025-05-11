import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '../context/useCampaigns';
import { locations, interests, ageRanges } from '../assets/mock/targetingData';
import AIAdCopyGenerator from '../components/AIAdCopyGenerator';

function CreateCampaign() {
  const navigate = useNavigate();
  const { addCampaign } = useCampaigns();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bannerUrl: '',
    bannerFile: null,
    bannerPreview: null,
    ageRange: '',
    location: '',
    interests: [],
    adCopy: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      if (prev.interests.includes(value)) {
        return {
          ...prev,
          interests: prev.interests.filter((interest) => interest !== value),
        };
      } else {
        return {
          ...prev,
          interests: [...prev.interests, value],
        };
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          bannerFile: file,
          bannerPreview: reader.result,
          bannerUrl: reader.result, // In a real app, this would be a URL after upload
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      bannerUrl: value,
      bannerPreview: value,
      bannerFile: null,
    }));
  };

  const handleAdCopyGenerated = (adCopy) => {
    setFormData(prev => ({
      ...prev,
      adCopy
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.ageRange || !formData.location || formData.interests.length === 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would upload the banner image to a server here
      // and get back a URL to store in the campaign
      
      const newCampaign = addCampaign({
        name: formData.name,
        bannerUrl: formData.bannerPreview,
        ageRange: formData.ageRange,
        location: formData.location,
        interests: formData.interests,
        adCopy: formData.adCopy, // Include AI-generated ad copy if available
      });
      
      console.log('Campaign created:', newCampaign);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('An error occurred while creating the campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create New Campaign</h1>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className=" hover-lift rounded-md bg-white border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </div>
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <div className="form-section bg-white rounded-md p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-blue-600">
                        <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">Campaign Details</h3>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Campaign Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                        placeholder="Enter campaign name"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section bg-white rounded-md p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-blue-600">
                        <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">Ad Banner</h3>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="bannerFile" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Image
                      </label>
                      <input
                        type="file"
                        name="bannerFile"
                        id="bannerFile"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>

                   

                    <div className="sm:col-span-6">
                      <div className="banner-preview rounded-md bg-gray-50 border-2 border-dashed border-gray-200 p-4 flex justify-center items-center">
                        {formData.bannerPreview ? (
                          <img
                            src={formData.bannerPreview}
                            alt="Banner preview"
                            className="max-h-48 w-auto object-contain"
                          />
                        ) : (
                          <div className="text-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400 mb-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <p>Banner preview will appear here</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>


                <div className="form-section bg-white rounded-md p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-blue-600">
                        <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">Audience Targeting</h3>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700 mb-1">
                        Age Range *
                      </label>
                      <select
                        id="ageRange"
                        name="ageRange"
                        required
                        value={formData.ageRange}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                      >
                        <option value="">Select age range</option>
                        {ageRanges.map((age) => (
                          <option key={age} value={age}>
                            {age}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location *
                      </label>
                      <select
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                      >
                        <option value="">Select location</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Interests *
                      </label>
                      <div className="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {interests.map((interest) => (
                          <div key={interest} className="flex items-center bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors duration-150">
                            <input
                              id={`interest-${interest}`}
                              name="interests"
                              type="checkbox"
                              value={interest}
                              checked={formData.interests.includes(interest)}
                              onChange={handleInterestChange}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`interest-${interest}`}
                              className="ml-2 block text-sm text-gray-700 cursor-pointer w-full"
                            >
                              {interest}
                            </label>
                          </div>
                        ))}
                      </div>
                      {formData.interests.length === 0 && (
                        <p className="mt-2 text-sm text-red-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                          Please select at least one interest
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <AIAdCopyGenerator campaignData={formData} onAdCopyGenerated={handleAdCopyGenerated} />

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className=" hover-lift rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                      Cancel
                    </div>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="hover-lift rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        Create Campaign
                      </div>
                    )}
                  </button>
                  
                </div>

              </div>

            </form>
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default CreateCampaign;
