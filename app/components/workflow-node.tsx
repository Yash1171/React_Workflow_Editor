import { Handle, Position } from "reactflow"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, MoreVertical } from "lucide-react"
import * as Icons from "lucide-react"
import type { NodeData } from "../types"

const variants = {
  purple: "bg-purple-50 border-purple-200",
  blue: "bg-blue-50 border-blue-200",
  yellow: "bg-yellow-50 border-yellow-200",
  green: "bg-green-50 border-green-200",
  default: "bg-white border-gray-200",
}

export function WorkflowNode({ data }: { data: NodeData }) {
  const Icon = Icons[data.icon as keyof typeof Icons]

  return (
    <div className="group">
      <Handle type="target" position={Position.Top} className="!bg-purple-600" />
      <Card className={`w-[400px] shadow-sm ${variants[data.variant || "default"]}`}>
        <CardHeader className="flex-row items-center space-x-2 p-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h3 className="font-semibold">{data.title}</h3>
            <p className="text-sm text-muted-foreground">{data.description}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Copy className="h-4 w-4" />
          </Button>
        </CardHeader>
        {data.actions && (
          <CardContent className="flex items-center justify-between p-4 pt-0">
            {data.actions.map((action, i) => (
              <span key={i} className="text-sm text-muted-foreground">
                {action}
              </span>
            ))}
          </CardContent>
        )}
      </Card>
      <Handle type="source" position={Position.Bottom} className="!bg-purple-600" />
      <Handle
        type="source"
        position={Position.Right}
        id="side"
        className="!bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  )
}

