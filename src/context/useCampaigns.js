import { useContext } from 'react';
import { CampaignContext } from './CampaignContext';

export const useCampaigns = () => useContext(CampaignContext);
