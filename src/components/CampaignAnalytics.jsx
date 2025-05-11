import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { generateAnalytics } from '../services/openaiService';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CampaignAnalytics({ campaign }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState('impressions');

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call to get real analytics
        // For this demo, we're using simulated data
        const data = generateAnalytics(campaign);
        setAnalytics(data);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [campaign]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex justify-center items-center h-64">
        <div className="flex items-center">
          <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-600">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500 text-center">No analytics data available</p>
      </div>
    );
  }

  // Prepare chart data
  const chartData = {
    labels: analytics.timeSeriesData.labels,
    datasets: [
      {
        label: activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1),
        data: analytics.timeSeriesData.datasets[activeMetric],
        borderColor: activeMetric === 'impressions' ? 'rgba(59, 130, 246, 1)' : 
                     activeMetric === 'clicks' ? 'rgba(16, 185, 129, 1)' : 
                     'rgba(249, 115, 22, 1)',
        backgroundColor: activeMetric === 'impressions' ? 'rgba(59, 130, 246, 0.2)' : 
                         activeMetric === 'clicks' ? 'rgba(16, 185, 129, 0.2)' : 
                         'rgba(249, 115, 22, 0.2)',
        tension: 0.3,
        fill: true,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Campaign Analytics</h3>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-md">
          <p className="text-xs text-blue-700 font-medium">Impressions</p>
          <p className="text-lg font-bold text-blue-900">{formatNumber(analytics.metrics.impressions)}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-md">
          <p className="text-xs text-green-700 font-medium">Clicks</p>
          <p className="text-lg font-bold text-green-900">{formatNumber(analytics.metrics.clicks)}</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-md">
          <p className="text-xs text-orange-700 font-medium">Conversions</p>
          <p className="text-lg font-bold text-orange-900">{formatNumber(analytics.metrics.conversions)}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-md">
          <p className="text-xs text-purple-700 font-medium">CTR</p>
          <p className="text-lg font-bold text-purple-900">{analytics.metrics.ctr}%</p>
        </div>
      </div>
      
      {/* Chart Controls */}
      <div className="flex mb-4 space-x-2">
        <button 
          className={`px-3 py-1 text-xs rounded-full ${activeMetric === 'impressions' 
            ? 'bg-blue-100 text-blue-700 font-medium' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          onClick={() => setActiveMetric('impressions')}
        >
          Impressions
        </button>
        <button 
          className={`px-3 py-1 text-xs rounded-full ${activeMetric === 'clicks' 
            ? 'bg-green-100 text-green-700 font-medium' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          onClick={() => setActiveMetric('clicks')}
        >
          Clicks
        </button>
        <button 
          className={`px-3 py-1 text-xs rounded-full ${activeMetric === 'conversions' 
            ? 'bg-orange-100 text-orange-700 font-medium' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          onClick={() => setActiveMetric('conversions')}
        >
          Conversions
        </button>
      </div>
      
      {/* Chart */}
      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>
      
      {/* Additional Metrics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="border border-gray-200 p-3 rounded-md">
          <p className="text-xs text-gray-500">Cost Per Click</p>
          <p className="text-base font-semibold text-gray-800">${analytics.metrics.costPerClick}</p>
        </div>
        <div className="border border-gray-200 p-3 rounded-md">
          <p className="text-xs text-gray-500">Total Cost</p>
          <p className="text-base font-semibold text-gray-800">${analytics.metrics.totalCost}</p>
        </div>
        <div className="border border-gray-200 p-3 rounded-md">
          <p className="text-xs text-gray-500">Estimated Revenue</p>
          <p className="text-base font-semibold text-gray-800">${analytics.metrics.revenue}</p>
        </div>
        <div className="border border-gray-200 p-3 rounded-md">
          <p className="text-xs text-gray-500">Conversion Rate</p>
          <p className="text-base font-semibold text-gray-800">{analytics.metrics.conversionRate}%</p>
        </div>
        <div className="border border-gray-200 p-3 rounded-md md:col-span-2">
          <p className="text-xs text-gray-500">ROI</p>
          <p className={`text-base font-semibold ${parseFloat(analytics.metrics.roi) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {parseFloat(analytics.metrics.roi) >= 0 ? '+' : ''}{analytics.metrics.roi}%
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400 text-right">
        <p>*Simulated data for demonstration purposes</p>
      </div>
    </div>
  );
}

export default CampaignAnalytics;
