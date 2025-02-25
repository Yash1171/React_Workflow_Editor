import { Handle, Position } from "reactflow"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, Clock } from "lucide-react"
import * as Icons from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { NodeData } from "../types"

const statusIcons = {
  pending: Clock,
  sent: CheckCircle,
  failed: Bell,
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  sent: "bg-green-100 text-green-800 border-green-300",
  failed: "bg-red-100 text-red-800 border-red-300",
}

export function ReminderNode({ data }: { data: NodeData }) {
  const Icon = Icons[data.icon as keyof typeof Icons]
  const StatusIcon = data.reminder ? statusIcons[data.reminder.status] : Bell

  return (
    <div>
      <Handle type="target" position={Position.Left} className="!bg-green-500" />
      <Card className="w-[300px] bg-green-50 border-green-200">
        <CardHeader className="flex-row items-center space-x-2 p-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
            <Icon className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h3 className="font-semibold">{data.title}</h3>
            <p className="text-sm text-muted-foreground">{data.description}</p>
            {data.reminder && (
              <div className="mt-2">
                <Badge variant="outline" className={statusColors[data.reminder.status]}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {data.reminder.schedule === "delayed"
                    ? `Send in ${data.reminder.delay} ${data.reminder.delayUnit}`
                    : data.reminder.schedule}
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

