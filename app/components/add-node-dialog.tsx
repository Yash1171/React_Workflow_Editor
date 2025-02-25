"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { NodeData } from "../types"
import { useState } from "react"

const NODE_TYPES = [
  { value: "welcome", label: "Welcome", icon: "Building2", variant: "blue" },
  { value: "personal", label: "Personal Details", icon: "User", variant: "default" },
  { value: "verification", label: "Verification", icon: "CheckCircle", variant: "yellow" },
  { value: "onboarding", label: "Onboarding Kit", icon: "Package", variant: "purple" },
]

interface AddNodeDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (data: Partial<NodeData>) => void
}

export function AddNodeDialog({ open, onClose, onAdd }: AddNodeDialogProps) {
  const [nodeType, setNodeType] = useState<string>("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleAdd = () => {
    const selectedType = NODE_TYPES.find((type) => type.value === nodeType)
    onAdd({
      title,
      description,
      icon: selectedType?.icon,
      variant: selectedType?.variant as NodeData["variant"],
    })
    setNodeType("")
    setTitle("")
    setDescription("")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Node</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Node Type</Label>
            <Select value={nodeType} onValueChange={setNodeType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {NODE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter node title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter node description"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!nodeType || !title}>
            Add Node
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

