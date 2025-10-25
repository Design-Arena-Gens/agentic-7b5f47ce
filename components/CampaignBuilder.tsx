'use client';

import { useState } from 'react';
import {
  Plus,
  Play,
  Pause,
  Copy,
  Trash2,
  Edit,
  Users,
  Calendar,
  Target,
  TrendingUp,
  Mail,
  MessageSquare,
  Share2
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  type: 'email' | 'social' | 'ads';
  contacts: number;
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  startDate: string;
  budget?: number;
}

export default function CampaignBuilder() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Product Launch',
      status: 'active',
      type: 'email',
      contacts: 2500,
      sent: 2450,
      opened: 1470,
      clicked: 588,
      converted: 98,
      startDate: '2025-10-01',
      budget: 5000
    },
    {
      id: '2',
      name: 'Newsletter - October',
      status: 'active',
      type: 'email',
      contacts: 5800,
      sent: 5750,
      opened: 2875,
      clicked: 1150,
      converted: 172,
      startDate: '2025-10-15'
    },
    {
      id: '3',
      name: 'Social Media Awareness',
      status: 'paused',
      type: 'social',
      contacts: 15000,
      sent: 8500,
      opened: 4250,
      clicked: 850,
      converted: 85,
      startDate: '2025-09-20',
      budget: 3000
    },
    {
      id: '4',
      name: 'Black Friday Promo',
      status: 'draft',
      type: 'ads',
      contacts: 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      startDate: '2025-11-25',
      budget: 10000
    }
  ]);

  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'email' as 'email' | 'social' | 'ads',
    contacts: 0,
    startDate: '',
    budget: 0
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'social': return Share2;
      case 'ads': return Target;
      default: return Mail;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const calculateRate = (numerator: number, denominator: number) => {
    return denominator > 0 ? ((numerator / denominator) * 100).toFixed(1) : '0.0';
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.startDate) return;

    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      type: newCampaign.type,
      status: 'draft',
      contacts: newCampaign.contacts,
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      startDate: newCampaign.startDate,
      budget: newCampaign.budget || undefined
    };

    setCampaigns([...campaigns, campaign]);
    setShowNewCampaign(false);
    setNewCampaign({ name: '', type: 'email', contacts: 0, startDate: '', budget: 0 });
  };

  const toggleStatus = (id: string) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === id && c.status !== 'draft') {
        return { ...c, status: c.status === 'active' ? 'paused' : 'active' };
      }
      return c;
    }));
  };

  const duplicateCampaign = (campaign: Campaign) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Date.now().toString(),
      name: `${campaign.name} (Copy)`,
      status: 'draft',
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
          <p className="text-gray-600 mt-1">Create and manage your marketing campaigns</p>
        </div>
        <button
          onClick={() => setShowNewCampaign(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Campaign</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter campaign name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Type
                </label>
                <select
                  value={newCampaign.type}
                  onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="email">Email Campaign</option>
                  <option value="social">Social Media</option>
                  <option value="ads">Paid Ads</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Contacts
                </label>
                <input
                  type="number"
                  value={newCampaign.contacts}
                  onChange={(e) => setNewCampaign({ ...newCampaign, contacts: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Number of contacts"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={newCampaign.startDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (Optional)
                </label>
                <input
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Budget in USD"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreateCampaign}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Campaign
              </button>
              <button
                onClick={() => setShowNewCampaign(false)}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 gap-6">
        {campaigns.map((campaign) => {
          const TypeIcon = getTypeIcon(campaign.type);
          const openRate = calculateRate(campaign.opened, campaign.sent);
          const clickRate = calculateRate(campaign.clicked, campaign.opened);
          const conversionRate = calculateRate(campaign.converted, campaign.clicked);

          return (
            <div
              key={campaign.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-lg p-2">
                      <TypeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{campaign.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">{campaign.type}</span>
                        {campaign.budget && (
                          <span className="text-sm text-gray-500">• ${campaign.budget.toLocaleString()} budget</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {campaign.status !== 'draft' && (
                      <button
                        onClick={() => toggleStatus(campaign.id)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {campaign.status === 'active' ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => duplicateCampaign(campaign)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteCampaign(campaign.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Contacts</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{campaign.contacts.toLocaleString()}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Sent</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{campaign.sent.toLocaleString()}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Open Rate</span>
                    </div>
                    <p className="text-xl font-bold text-green-600">{openRate}%</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Target className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Click Rate</span>
                    </div>
                    <p className="text-xl font-bold text-blue-600">{clickRate}%</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Conversions</span>
                    </div>
                    <p className="text-xl font-bold text-purple-600">{campaign.converted}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Started: {new Date(campaign.startDate).toLocaleDateString()}</span>
                    <span className="text-gray-700 font-medium">Conversion Rate: {conversionRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
