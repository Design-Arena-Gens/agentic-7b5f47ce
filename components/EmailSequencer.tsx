'use client';

import { useState } from 'react';
import {
  Mail,
  Plus,
  Clock,
  Edit,
  Trash2,
  Copy,
  Play,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface EmailStep {
  id: string;
  subject: string;
  preview: string;
  delay: number;
  delayUnit: 'hours' | 'days' | 'weeks';
  opens: number;
  clicks: number;
}

interface EmailSequence {
  id: string;
  name: string;
  status: 'active' | 'draft';
  subscribers: number;
  steps: EmailStep[];
}

export default function EmailSequencer() {
  const [sequences, setSequences] = useState<EmailSequence[]>([
    {
      id: '1',
      name: 'Onboarding Series',
      status: 'active',
      subscribers: 1547,
      steps: [
        {
          id: 's1',
          subject: 'Welcome to Our Platform! 🎉',
          preview: 'Get started with these quick tips...',
          delay: 0,
          delayUnit: 'hours',
          opens: 1124,
          clicks: 789
        },
        {
          id: 's2',
          subject: 'Your First Steps to Success',
          preview: 'Here are the most important features...',
          delay: 2,
          delayUnit: 'days',
          opens: 892,
          clicks: 534
        },
        {
          id: 's3',
          subject: 'Unlock Advanced Features',
          preview: 'Take your experience to the next level...',
          delay: 5,
          delayUnit: 'days',
          opens: 723,
          clicks: 412
        }
      ]
    },
    {
      id: '2',
      name: 'Product Launch Drip',
      status: 'active',
      subscribers: 3241,
      steps: [
        {
          id: 's4',
          subject: 'Something Big is Coming...',
          preview: 'Be the first to know about our new product',
          delay: 0,
          delayUnit: 'hours',
          opens: 2547,
          clicks: 1834
        },
        {
          id: 's5',
          subject: 'Sneak Peek: New Product Features',
          preview: 'Here\'s what you can expect...',
          delay: 3,
          delayUnit: 'days',
          opens: 2134,
          clicks: 1456
        }
      ]
    },
    {
      id: '3',
      name: 'Re-engagement Campaign',
      status: 'draft',
      subscribers: 0,
      steps: [
        {
          id: 's6',
          subject: 'We Miss You! Come Back',
          preview: 'Special offer just for you...',
          delay: 0,
          delayUnit: 'hours',
          opens: 0,
          clicks: 0
        }
      ]
    }
  ]);

  const [expandedSequence, setExpandedSequence] = useState<string | null>('1');
  const [showNewSequence, setShowNewSequence] = useState(false);
  const [newSequenceName, setNewSequenceName] = useState('');

  const toggleSequence = (id: string) => {
    setExpandedSequence(expandedSequence === id ? null : id);
  };

  const calculateOpenRate = (opens: number, subscribers: number) => {
    return subscribers > 0 ? ((opens / subscribers) * 100).toFixed(1) : '0.0';
  };

  const calculateClickRate = (clicks: number, opens: number) => {
    return opens > 0 ? ((clicks / opens) * 100).toFixed(1) : '0.0';
  };

  const createSequence = () => {
    if (!newSequenceName) return;

    const newSequence: EmailSequence = {
      id: Date.now().toString(),
      name: newSequenceName,
      status: 'draft',
      subscribers: 0,
      steps: []
    };

    setSequences([...sequences, newSequence]);
    setNewSequenceName('');
    setShowNewSequence(false);
  };

  const addStep = (sequenceId: string) => {
    setSequences(sequences.map(seq => {
      if (seq.id === sequenceId) {
        const newStep: EmailStep = {
          id: `s${Date.now()}`,
          subject: 'New Email',
          preview: 'Email preview text...',
          delay: 1,
          delayUnit: 'days',
          opens: 0,
          clicks: 0
        };
        return { ...seq, steps: [...seq.steps, newStep] };
      }
      return seq;
    }));
  };

  const deleteStep = (sequenceId: string, stepId: string) => {
    setSequences(sequences.map(seq => {
      if (seq.id === sequenceId) {
        return { ...seq, steps: seq.steps.filter(s => s.id !== stepId) };
      }
      return seq;
    }));
  };

  const deleteSequence = (id: string) => {
    setSequences(sequences.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Sequences</h2>
          <p className="text-gray-600 mt-1">Create automated email drip campaigns</p>
        </div>
        <button
          onClick={() => setShowNewSequence(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Sequence</span>
        </button>
      </div>

      {/* New Sequence Modal */}
      {showNewSequence && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Sequence</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sequence Name
                </label>
                <input
                  type="text"
                  value={newSequenceName}
                  onChange={(e) => setNewSequenceName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter sequence name"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={createSequence}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Sequence
              </button>
              <button
                onClick={() => setShowNewSequence(false)}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sequences List */}
      <div className="space-y-4">
        {sequences.map((sequence) => (
          <div
            key={sequence.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            {/* Sequence Header */}
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSequence(sequence.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{sequence.name}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          sequence.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {sequence.status.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {sequence.steps.length} emails • {sequence.subscribers.toLocaleString()} subscribers
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSequence(sequence.id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {expandedSequence === sequence.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Sequence Steps */}
            {expandedSequence === sequence.id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="space-y-4">
                  {sequence.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="bg-white rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{step.subject}</h4>
                            <p className="text-sm text-gray-500 mt-1">{step.preview}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteStep(sequence.id, step.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>
                            {step.delay === 0
                              ? 'Immediately'
                              : `Wait ${step.delay} ${step.delayUnit}`}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div>
                            <span className="text-gray-500">Opens:</span>{' '}
                            <span className="font-semibold text-gray-900">
                              {step.opens.toLocaleString()} ({calculateOpenRate(step.opens, sequence.subscribers)}%)
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Clicks:</span>{' '}
                            <span className="font-semibold text-gray-900">
                              {step.clicks.toLocaleString()} ({calculateClickRate(step.clicks, step.opens)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addStep(sequence.id)}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 py-3 rounded-lg hover:bg-blue-100 transition-colors border-2 border-dashed border-blue-300"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add Email Step</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
