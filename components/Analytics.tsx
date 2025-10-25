'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Mail,
  MousePointer,
  Users,
  DollarSign,
  Calendar,
  Download
} from 'lucide-react';

const performanceData = [
  { date: 'Oct 18', sent: 1200, opened: 720, clicked: 288, converted: 48 },
  { date: 'Oct 19', sent: 1350, opened: 810, clicked: 324, converted: 54 },
  { date: 'Oct 20', sent: 1500, opened: 975, clicked: 390, converted: 65 },
  { date: 'Oct 21', sent: 1400, opened: 910, clicked: 364, converted: 61 },
  { date: 'Oct 22', sent: 1600, opened: 1040, clicked: 416, converted: 70 },
  { date: 'Oct 23', sent: 1750, opened: 1138, clicked: 455, converted: 77 },
  { date: 'Oct 24', sent: 1550, opened: 1085, clicked: 434, converted: 72 },
];

const campaignPerformance = [
  { name: 'Summer Launch', value: 35 },
  { name: 'Newsletter', value: 28 },
  { name: 'Social Media', value: 22 },
  { name: 'Black Friday', value: 15 },
];

const channelData = [
  { channel: 'Email', conversions: 245, revenue: 12250 },
  { channel: 'Social', conversions: 187, revenue: 9350 },
  { channel: 'Paid Ads', conversions: 156, revenue: 7800 },
  { channel: 'Organic', conversions: 134, revenue: 6700 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function Analytics() {
  const [dateRange, setDateRange] = useState('7d');

  const metrics = [
    {
      label: 'Total Emails Sent',
      value: '24,328',
      change: '+12.5%',
      trend: 'up',
      icon: Mail,
      color: 'bg-blue-500'
    },
    {
      label: 'Open Rate',
      value: '65.3%',
      change: '+3.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      label: 'Click-Through Rate',
      value: '8.7%',
      change: '-1.1%',
      trend: 'down',
      icon: MousePointer,
      color: 'bg-purple-500'
    },
    {
      label: 'Total Conversions',
      value: '447',
      change: '+18.9%',
      trend: 'up',
      icon: Users,
      color: 'bg-orange-500'
    },
    {
      label: 'Revenue Generated',
      value: '$36,100',
      change: '+22.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-teal-500'
    },
    {
      label: 'Avg. ROI',
      value: '425%',
      change: '+15.7%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-pink-500'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Track your marketing performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center space-x-1 mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last period</span>
                  </div>
                </div>
                <div className={`${metric.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Campaign Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sent"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Emails Sent"
            />
            <Line
              type="monotone"
              dataKey="opened"
              stroke="#10b981"
              strokeWidth={2}
              name="Opened"
            />
            <Line
              type="monotone"
              dataKey="clicked"
              stroke="#8b5cf6"
              strokeWidth={2}
              name="Clicked"
            />
            <Line
              type="monotone"
              dataKey="converted"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Converted"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Campaign Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Campaign Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campaignPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {campaignPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Channel Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="channel" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="conversions" fill="#3b82f6" name="Conversions" />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Campaigns */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Top Performing Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Click Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">Summer Product Launch</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    Email
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">2,450</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">60.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-600 font-medium">40.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">98</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">$4,900</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">Newsletter - October</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    Email
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">5,750</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">50.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-600 font-medium">40.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">172</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">$8,600</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">Social Media Awareness</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                    Social
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">8,500</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">50.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-purple-600 font-medium">20.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">85</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">$4,250</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
