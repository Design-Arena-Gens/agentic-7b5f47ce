'use client';

import { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  Connection,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Mail,
  Clock,
  Users,
  Split,
  CheckCircle,
  MessageSquare,
  AlertCircle,
  Plus,
  Save
} from 'lucide-react';

const nodeTypes = {
  trigger: { icon: AlertCircle, color: 'bg-green-500', label: 'Trigger' },
  email: { icon: Mail, color: 'bg-blue-500', label: 'Send Email' },
  delay: { icon: Clock, color: 'bg-yellow-500', label: 'Wait/Delay' },
  condition: { icon: Split, color: 'bg-purple-500', label: 'Condition' },
  segment: { icon: Users, color: 'bg-orange-500', label: 'Segment' },
  action: { icon: CheckCircle, color: 'bg-teal-500', label: 'Action' },
  sms: { icon: MessageSquare, color: 'bg-pink-500', label: 'Send SMS' },
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'New Subscriber', type: 'trigger' },
    position: { x: 250, y: 50 },
    style: { background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', padding: '12px' },
  },
  {
    id: '2',
    data: { label: 'Welcome Email', type: 'email' },
    position: { x: 250, y: 150 },
    style: { background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', padding: '12px' },
  },
  {
    id: '3',
    data: { label: 'Wait 2 Days', type: 'delay' },
    position: { x: 250, y: 250 },
    style: { background: '#eab308', color: 'white', border: 'none', borderRadius: '8px', padding: '12px' },
  },
  {
    id: '4',
    data: { label: 'Opened Email?', type: 'condition' },
    position: { x: 250, y: 350 },
    style: { background: '#a855f7', color: 'white', border: 'none', borderRadius: '8px', padding: '12px' },
  },
  {
    id: '5',
    data: { label: 'Follow-up Email', type: 'email' },
    position: { x: 100, y: 470 },
    style: { background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', padding: '12px' },
  },
  {
    id: '6',
    data: { label: 'Product Tips Email', type: 'email' },
    position: { x: 400, y: 470 },
    style: { background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', padding: '12px' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-3', source: '2', target: '3', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3-4', source: '3', target: '4', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    label: 'No',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#ef4444' }
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    label: 'Yes',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#22c55e' }
  },
];

export default function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeType, setSelectedNodeType] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
    [setEdges]
  );

  const addNode = (type: keyof typeof nodeTypes) => {
    const nodeConfig = nodeTypes[type];
    const Icon = nodeConfig.icon;

    const newNode: Node = {
      id: `${nodes.length + 1}`,
      data: { label: nodeConfig.label, type },
      position: { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 },
      style: {
        background: nodeConfig.color.replace('bg-', '#'),
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px'
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workflow Automation</h2>
          <p className="text-gray-600 mt-1">Design automated marketing workflows with drag-and-drop</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Save className="w-5 h-5" />
          <span>Save Workflow</span>
        </button>
      </div>

      {/* Node Palette */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Workflow Steps</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(nodeTypes).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => addNode(key as keyof typeof nodeTypes)}
                className={`flex items-center space-x-2 ${config.color} text-white px-3 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm`}
              >
                <Plus className="w-4 h-4" />
                <Icon className="w-4 h-4" />
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Workflow Canvas */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Steps</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{nodes.length}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Workflows</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <AlertCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Contacts in Flow</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,247</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">87%</p>
            </div>
            <div className="bg-orange-100 rounded-lg p-3">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
