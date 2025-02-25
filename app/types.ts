export interface NodeData {
  title: string
  description: string
  icon?: string
  tags?: string[]
  variant?: "purple" | "blue" | "yellow" | "green" | "default"
  reminder?: ReminderData
}

export interface ReminderData {
  message: string
  schedule: "immediate" | "delayed" | "conditional"
  delay?: number
  delayUnit?: "minutes" | "hours" | "days"
  status: "pending" | "sent" | "failed"
}

