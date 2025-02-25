import { X } from "lucide-react"
import type { Node } from "reactflow"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReminderForm } from "./reminder-form"
import type { NodeData, ReminderData } from "../types"

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
  nodeId: string
  nodes: Node<NodeData>[]
  setNodes: (nodes: Node<NodeData>[]) => void
  onAddReminder: (node: Node, reminderData: ReminderData) => void
}

export function SidePanel({ isOpen, onClose, nodeId, nodes, setNodes, onAddReminder }: SidePanelProps) {
  const node = nodes.find((n) => n.id === nodeId)

  if (!node) return null

  const updateNodeData = (updates: Partial<NodeData>) => {
    setNodes(
      nodes.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: { ...n.data, ...updates },
          }
        }
        return n
      }),
    )
  }

  const handleAddReminder = (reminderData: ReminderData) => {
    onAddReminder(node, reminderData)
  }

  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-semibold">Edit Node</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Tabs defaultValue="details" className="p-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Node Details</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={node.data.title} onChange={(e) => updateNodeData({ title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={node.data.description}
              onChange={(e) => updateNodeData({ description: e.target.value })}
            />
          </div>
          {node.data.tags && (
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {node.data.tags.map((tag, index) => (
                  <div key={index} className="bg-secondary px-2 py-1 rounded-md text-sm">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="reminders" className="mt-4">
          <ReminderForm onSubmit={handleAddReminder} onCancel={onClose} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

