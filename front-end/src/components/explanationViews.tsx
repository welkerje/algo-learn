import { ReactElement } from "react"
import { StackExplanationSheet } from "@/components/explRoutes/Stack.tsx"
import { Markdown } from "@/components/Markdown.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx"
import { useTranslation } from "@/hooks/useTranslation.ts"

export function BoxMarkdownView({ text, id }: { text: string; id: string }): ReactElement {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className={`transform-origin-center inline-block transform cursor-pointer rounded-sm border border-gray-400 border-opacity-25 px-0.5 transition-transform hover:scale-105 hover:border-opacity-100`}
        >
          <Markdown md={text} />
        </div>
      </SheetTrigger>
      <ExplanationSheet id={id} />
    </Sheet>
  )
}

function ExplanationSheet({ id }: { id: string }): ReactElement {
  const { t } = useTranslation()

  return (
    <SheetContent className={`w-[450px] overflow-y-auto sm:w-[600px]`} side="right">
      <SheetHeader>
        <SheetTitle>{t("header")}</SheetTitle>
      </SheetHeader>
      <div className={`my-5`}>
        <StackExplanationSheet />
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button>{t("Back")}</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}

/*
<div className={`px-0.5 inline cursor-pointer hover:bg-blue-300 hover:rounded-sm hover:px-0.5`}>
          <Markdown md={text}/>
      </div>
 */
/*
<div className={`inline cursor-pointer text-blue-500 hover:text-blue-700`}>
      <Markdown md={text} />
    </div>
 */
