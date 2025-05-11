import OpenAI from 'openai';

// Initialize OpenAI client
// Get the API key from environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Generate ad copy using OpenAI API
export const generateAdCopy = async (campaignDetails) => {
  const { name, ageRange, location, interests } = campaignDetails;
  try {
    // Check if we have a real API key
    if (!OPENAI_API_KEY) {
      throw new Error('No OpenAI API key provided');
    }
  
    
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert advertising copywriter. Create compelling ad copy based on the campaign details provided."
        },
        {
          role: "user",
          content: `Create ad copy for a campaign with the following details:
            - Campaign name: ${name}
            - Target age range: ${ageRange}
            - Target location: ${location}
            - Target interests: ${interests.join(', ')}
            
            Please provide:
            1. A catchy headline (max 60 characters)
            2. Ad copy (max 200 characters)
            3. A short tagline (max 50 characters)
            
            Format your response as JSON with keys: headline, adCopy, tagline`
        }
      ],
      
      response_format: { type: "json_object" }
    });
    
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating ad copy with OpenAI:', error);
    
    // Fallback to mock response on error
    return {
      headline: `Discover ${name} Today`,
      adCopy: `Perfect for ${ageRange} audiences in ${location} interested in ${interests[0] || 'our products'}. Experience the difference today.`,
      tagline: `${name} - Where Quality Meets Innovation`
    };
  }
};

// Generate simulated analytics data
export const generateAnalytics = (campaign) => {
  const dayCount = 14; // Two weeks of data
  const today = new Date();
  const labels = [];
  const impressions = [];
  const clicks = [];
  const conversions = [];
  
  // Base metrics influenced by campaign details
  const baseImpressions = Math.floor(Math.random() * 1000) + 500; // 500-1500 base impressions
  const ctr = (Math.random() * 3 + 1) / 100; // 1-4% CTR
  const conversionRate = (Math.random() * 2 + 0.5) / 100; // 0.5-2.5% conversion rate
  
  // Generate daily data
  for (let i = 0; i < dayCount; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (dayCount - i - 1));
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Add some randomness and trend
    const dayFactor = 1 + (i / dayCount) * 0.5; // Gradual increase over time
    const randomFactor = 0.8 + Math.random() * 0.4; // Random variation 0.8-1.2
    
    const dailyImpressions = Math.floor(baseImpressions * dayFactor * randomFactor);
    impressions.push(dailyImpressions);
    
    const dailyClicks = Math.floor(dailyImpressions * ctr * randomFactor);
    clicks.push(dailyClicks);
    
    const dailyConversions = Math.floor(dailyClicks * conversionRate * randomFactor);
    conversions.push(dailyConversions);
  }
  
  // Calculate totals and rates
  const totalImpressions = impressions.reduce((sum, val) => sum + val, 0);
  const totalClicks = clicks.reduce((sum, val) => sum + val, 0);
  const totalConversions = conversions.reduce((sum, val) => sum + val, 0);
  const averageCTR = totalClicks / totalImpressions * 100;
  const averageConversionRate = totalConversions / totalClicks * 100;
  
  // Estimate cost and ROI
  const costPerClick = 0.5 + Math.random() * 1.5; // $0.50-$2.00 CPC
  const totalCost = totalClicks * costPerClick;
  const averageOrderValue = 30 + Math.random() * 70; // $30-$100 AOV
  const revenue = totalConversions * averageOrderValue;
  const roi = (revenue - totalCost) / totalCost * 100;
  
  return {
    timeSeriesData: {
      labels,
      datasets: {
        impressions,
        clicks,
        conversions
      }
    },
    metrics: {
      impressions: totalImpressions,
      clicks: totalClicks,
      conversions: totalConversions,
      ctr: averageCTR.toFixed(2),
      conversionRate: averageConversionRate.toFixed(2),
      costPerClick: costPerClick.toFixed(2),
      totalCost: totalCost.toFixed(2),
      revenue: revenue.toFixed(2),
      roi: roi.toFixed(2)
    }
  };
};
