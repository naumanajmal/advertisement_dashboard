import { useState } from 'react';
import { CampaignContext } from './CampaignContext';

export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);

  const addCampaign = (campaign) => {
    const newCampaign = {
      ...campaign,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'Pending',
    };
    setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
    return newCampaign;
  };

  const updateCampaignStatus = (id, status) => {
    setCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status } : campaign
      )
    );
  };

  const value = {
    campaigns,
    addCampaign,
    updateCampaignStatus,
  };

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
};

export default CampaignProvider;
