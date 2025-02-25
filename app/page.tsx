"use client"

import { useState, useCallback } from "react"
import ReactFlow, {
  addEdge,
  Background,
  type Connection,
  ConnectionMode,
  Controls,
  type Node,
  useEdgesState,
  useNodesState,
} from "reactflow"
import "reactflow/dist/style.css"
import { ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkflowNode } from "./components/workflow-node"
import { SidePanel } from "./components/side-panel"
import { ReminderNode } from "./components/reminder-node"
import { AddNodeDialog } from "./components/add-node-dialog"
import type { NodeData, ReminderData } from "./types"

const nodeTypes = {
  workflowNode: WorkflowNode,
  reminderNode: ReminderNode,
}

const initialNodes: Node<NodeData>[] = [
  {
    id: "start",
    type: "workflowNode",
    position: { x: 250, y: 0 },
    data: {
      title: "Basic Onboarding",
      description: "Runs automatically when a new user is added",
      icon: "Users",
      tags: ["Employees - All", "Clients - All", "Locations - B"],
      variant: "purple",
    },
  },
]

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isAddingNode, setIsAddingNode] = useState(false)

  const onConnect = useCallback(
    (params: Connection) => {
      const isReminderConnection = params.sourceHandle === "side"
      return setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: {
              strokeWidth: 2,
              stroke: isReminderConnection ? "#10B981" : "#7C3AED",
              strokeDasharray: "5 5",
            },
          },
          eds,
        ),
      )
    },
    [setEdges],
  )

  const addNewNode = useCallback(
    (nodeData: Partial<NodeData>) => {
      const newNode: Node<NodeData> = {
        id: `node-${nodes.length + 1}`,
        type: "workflowNode",
        position: { x: 250, y: (nodes.length + 1) * 200 },
        data: {
          title: nodeData.title || "New Step",
          description: nodeData.description || "Configure this step",
          icon: nodeData.icon || "FileText",
          tags: nodeData.tags || [],
          variant: nodeData.variant || "default",
        },
      }
      setNodes((nds) => [...nds, newNode])
      setIsAddingNode(false)
    },
    [nodes.length, setNodes],
  )

  const addReminderNode = useCallback(
    (parentNode: Node, reminderData: ReminderData) => {
      const newNode: Node<NodeData> = {
        id: `reminder-${nodes.length}`,
        type: "reminderNode",
        position: { x: parentNode.position.x + 400, y: parentNode.position.y },
        data: {
          title: "WhatsApp Reminder",
          description: reminderData.message,
          icon: "MessageCircle",
          variant: "green",
          reminder: reminderData,
        },
      }
      setNodes((nds) => [...nds, newNode])
    },
    [nodes.length, setNodes],
  )

  return (
    <div className="h-screen w-full bg-slate-50">
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={() => setIsAddingNode(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Node
          </Button>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
          Start Workflow
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: { strokeWidth: 2, stroke: "#7C3AED", strokeDasharray: "5 5" },
        }}
        onNodeClick={(_, node) => setSelectedNode(node.id)}
        fitView
      >
        <Background color="#94a3b8" gap={16} size={1} />
        <Controls />
      </ReactFlow>
      {selectedNode && (
        <SidePanel
          isOpen={!!selectedNode}
          onClose={() => setSelectedNode(null)}
          nodeId={selectedNode}
          nodes={nodes}
          setNodes={setNodes}
          onAddReminder={addReminderNode}
        />
      )}
      <AddNodeDialog open={isAddingNode} onClose={() => setIsAddingNode(false)} onAdd={addNewNode} />
    </div>
  )
}

