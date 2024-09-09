import { ReactElement } from "react"
import { QueueExplanationSheet } from "@/routes/explanations/Queue.tsx"
import { StackExplanationSheet } from "@/routes/explanations/Stack.tsx"

//Todo: Generate this const
export const explanationSheets: { [key: string]: ReactElement } = {
  Stack: <StackExplanationSheet />,
  Queue: <QueueExplanationSheet />,
}
