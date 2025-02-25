"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ReminderData } from "../types"
import { useState } from "react"

interface ReminderFormProps {
  onSubmit: (data: ReminderData) => void
  onCancel: () => void
}

export function ReminderForm({ onSubmit, onCancel }: ReminderFormProps) {
  const [message, setMessage] = useState("")
  const [schedule, setSchedule] = useState("immediate")
  const [delay, setDelay] = useState("1")
  const [delayUnit, setDelayUnit] = useState("hours")

  const handleSubmit = () => {
    onSubmit({
      message,
      schedule,
      delay: Number.parseInt(delay),
      delayUnit,
      status: "pending",
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Reminder Message</Label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your WhatsApp message"
        />
      </div>
      <div className="space-y-2">
        <Label>Schedule Type</Label>
        <Select value={schedule} onValueChange={setSchedule}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Send Immediately</SelectItem>
            <SelectItem value="delayed">Delayed</SelectItem>
            <SelectItem value="conditional">Conditional</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {schedule === "delayed" && (
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label>Delay</Label>
            <Input type="number" min="1" value={delay} onChange={(e) => setDelay(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Unit</Label>
            <Select value={delayUnit} onValueChange={setDelayUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Minutes</SelectItem>
                <SelectItem value="hours">Hours</SelectItem>
                <SelectItem value="days">Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!message} className="bg-green-600 hover:bg-green-700">
          Add Reminder
        </Button>
      </div>
    </div>
  )
}

