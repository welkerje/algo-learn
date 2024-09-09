import { StackDeText } from "@shared/wiki/Stack/StackDe.ts"
import { StackEnText } from "@shared/wiki/Stack/StackEn.ts"

export const explanationSheets: { [key: string]: { [K in "en" | "de"]: string } } = {
  Stack: {
    en: StackEnText,
    de: StackDeText,
  },
}
