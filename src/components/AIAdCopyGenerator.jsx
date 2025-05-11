import { useState } from 'react';
import { generateAdCopy } from '../services/openaiService';

function AIAdCopyGenerator({ campaignData, onAdCopyGenerated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adCopy, setAdCopy] = useState(null);

  const handleGenerateAdCopy = async () => {
    // Check if we have enough campaign data to generate ad copy
    if (!campaignData.name || !campaignData.ageRange || !campaignData.location || campaignData.interests.length === 0) {
      setError('Please fill in all campaign details before generating AI ad copy');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const generatedCopy = await generateAdCopy(campaignData);
      setAdCopy(generatedCopy);
      onAdCopyGenerated(generatedCopy);
    } catch (err) {
      console.error('Error generating ad copy:', err);
      setError('Failed to generate ad copy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section bg-white rounded-md p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-blue-600">
            <path d="M4.5 10a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0ZM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM8.5 8.5h3v6h-1v-5h-2v-1Z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold leading-6 text-gray-900">AI-Generated Ad Copy</h3>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Let AI generate compelling ad copy based on your campaign details. Our AI will create a headline, ad copy, and tagline tailored to your target audience and interests.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 shadow-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-2 h-5 w-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {adCopy ? (
        <div className="mb-4 rounded-md bg-blue-50 p-4 shadow-sm">
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-700">Headline:</h4>
            <p className="text-base font-semibold text-blue-700">{adCopy.headline}</p>
          </div>
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-700">Ad Copy:</h4>
            <p className="text-sm text-gray-900">{adCopy.adCopy}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Tagline:</h4>
            <p className="text-sm italic text-gray-800">{adCopy.tagline}</p>
          </div>
          
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleGenerateAdCopy}
              disabled={loading}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin mr-1 h-3 w-3 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Regenerating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-3 w-3">
                    <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                  </svg>
                  Regenerate
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleGenerateAdCopy}
          disabled={loading}
          className="hover-lift w-full rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating AI Ad Copy...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-2 h-4 w-4">
                <path d="M4.5 10a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0ZM10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM8.5 8.5h3v6h-1v-5h-2v-1Z" />
              </svg>
              Generate AI Ad Copy
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default AIAdCopyGenerator;
