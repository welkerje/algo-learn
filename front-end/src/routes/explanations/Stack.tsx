import { createArrayDisplayCodeBlock } from "@shared/utils/arrayDisplayCodeBlock.ts"
import { t, Translations } from "@shared/utils/translations.ts"
import { Markdown } from "@/components/Markdown.tsx"
import { useTranslation } from "@/hooks/useTranslation.ts"

const translations: Translations = {
  en: {
    header: "Explanation to Stack",
    topDescription:
      "A **Stack** is a data structure that operates on the **Last In, First Out (LIFO)** principle. This means that the last element added (pushed) is the first one to be removed (popped).",
    keyOperations: "Key Operations",
    stackPushExplanation: "`stack.push(x)` | Adds an element to the top of the stack.",
    stackPopExplanation: "`stack.pop()` | Removes the element from the top of the stack.",
    stackIsEmptyExplanation: "`stack.isEmpty()` | Checks if the stack is empty.",
    example: "Example",
    stackOneElement: "Consider a stack with one element:",
    nowStackOneElement: "Now, the stack contains one element:",
    stackTwoElements: "Consider a stack with two elements:",
    nowStackTwoElements: "Now, the stack contains two elements:",
    performOperation: "We perform the following operation:",
    returnsFalse: "This operation returns `False` as the stack is not empty.",
  },
  de: {
    header: "Erklärung zum Stack",
    topDescription:
      "Ein **Stack** ist eine Datenstruktur, die nach dem **Last In, First Out (LIFO)** Prinzip arbeitet. Das bedeutet, dass das zuletzt hinzugefügte (gepushte) Element als erstes entfernt (gepoppt) wird.",
    keyOperations: "Wichtige Operationen",
    stackPushExplanation: "`stack.push(x)` | Fügt ein Element oben auf den Stack hinzu.",
    stackPopExplanation: "`stack.pop()` | Entfernt das oberste Element vom Stack.",
    stackIsEmptyExplanation: "`stack.isEmpty()` | Prüft, ob der Stack leer ist.",
    example: "Beispiel",
    stackOneElement: "Betrachten wir einen Stack mit einem Element:",
    nowStackOneElement: "Jetzt enthält der Stack ein Element:",
    stackTwoElements: "Betrachten wir einen Stack mit zwei Elementen:",
    nowStackTwoElements: "Jetzt enthält der Stack zwei Elemente:",
    performOperation: "Wir führen die folgende Operation aus:",
    returnsFalse: "Diese Operation gibt `False` zurück, da der Stack nicht leer ist.",
  },
}

const StackExplanationSheet = () => {
  const stackWithOneElement = createArrayDisplayCodeBlock({ array: [1, "-"] })
  const stackWithTwoElements = createArrayDisplayCodeBlock({ array: [1, 2] })

  const { lang } = useTranslation()

  return (
    <>
      {/* Section: Introduction to Stack */}
      <section className="mb-6 leading-relaxed">
        <h2 className="text-2xl font-bold">{t(translations, lang, "header")}</h2>
        <p>
          <Markdown md={t(translations, lang, "topDescription")} />
        </p>
      </section>

      {/* Section: Key Operations */}
      <section className="mb-6">
        <h3 className="mb-2 text-2xl font-bold">{t(translations, lang, "keyOperations")}</h3>
        <ul className="ml-4 list-inside list-disc space-y-2">
          <li>
            <Markdown md={t(translations, lang, "stackPushExplanation")} />
          </li>
          <li>
            <Markdown md={t(translations, lang, "stackPopExplanation")} />
          </li>
          <li>
            <Markdown md={t(translations, lang, "stackIsEmptyExplanation")} />
          </li>
        </ul>
      </section>

      {/* Section: Example */}
      <section className="mb-6">
        <h3 className="mb-4 text-2xl font-bold">{t(translations, lang, "example")}</h3>

        {/* Subsection: Push operation */}
        <div className="mb-6">
          <h4 className="mb-2 text-xl font-semibold">Push Operation</h4>
          <Markdown md={t(translations, lang, "stackOneElement")} />
          <Markdown md={stackWithOneElement} />

          <p className="mt-2">
            <Markdown md={t(translations, lang, "performOperation")} />
          </p>
          <Markdown md={"`stack.push(2)`"} />

          <p className="mt-2">{t(translations, lang, "nowStackTwoElements")}</p>
          <Markdown md={stackWithTwoElements} />
        </div>

        {/* Subsection: Pop operation */}
        <div className="mb-6">
          <h4 className="mb-2 text-xl font-semibold">Pop Operation</h4>
          <p>
            <Markdown md={t(translations, lang, "performOperation")} />
          </p>
          <Markdown md={"`stack.pop()`"} />

          <p className="mt-2">{t(translations, lang, "nowStackOneElement")}</p>
          <Markdown md={stackWithOneElement} />
        </div>

        {/* Subsection: isEmpty operation */}
        <div className="mb-6">
          <h4 className="mb-2 text-xl font-semibold">isEmpty Operation</h4>
          <p>
            <Markdown md={t(translations, lang, "performOperation")} />
          </p>
          <Markdown md={"`stack.isEmpty()`"} />

          <p className="mt-2">
            <Markdown md={t(translations, lang, "returnsFalse")} />
          </p>
        </div>
      </section>
    </>
  )
}

export { StackExplanationSheet }
