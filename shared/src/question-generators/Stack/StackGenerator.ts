import { QuestionGenerator } from "@shared/api/QuestionGenerator.ts"
import { serializeGeneratorCall } from "@shared/api/QuestionRouter.ts"
import { generateVariantSequence } from "@shared/question-generators/Stack/utilsSequence.ts"
import { generateVariantStart } from "@shared/question-generators/Stack/utilsStart.ts"
import Random from "@shared/utils/random.ts"
import { tFunctional, Translations } from "@shared/utils/translations.ts"

const translations: Translations = {
  en: {
    name: "Stacks",
    description: "Perform stack operations",
    solutionFreetext: "|Index|Question|Solution|\n{{0}}",
    performOperations: `**We perform the following operations:**{{0}}`,
    checkFormat: "Please only enter a number",
    checkFormatBool: "Please only enter *true* or *false*",
    stackEmpty: "Currently the stack is empty.",
    stackContainsValues: `The stack contains the following elements (*with the top at the highest index*):`,
    freeTextInput: `Consider a **Stack "S"**. {{0}} **We perform the following operations:** {{1}}`,
    sequence1Text: `Consider an initially empty stack on which the operations {{0}} are executed. Enter the final state of the stack. *(The top element is at the highest index.)*`,
  },
  de: {
    name: "Stacks",
    description: "Stack-Operationen ausführen",
    solutionFreetext: "|Index|Frage|Lösung|\n{{0}}",
    performOperations: `**Wir führen folgende Operationen aus:**{{0}}`,
    checkFormat: "Bitte gib nur Zahlen ein.",
    checkFormatBool: "Bitte gib nur *true* oder *false* ein.",
    stackEmpty: "Der Stack ist aktuell leer.",
    stackContainsValues: `Der Stack enthält folgende Elemente (*mit dem Top-Element am höchsten Index*):`,
    freeTextInput: `Betrachte einen **Stack "S"**. {{0}} **Wir führen nun folgende Operationen aus:** {{1}}`,
    sequence1Text: `Betrachte einen anfangs leeren Stapel, auf dem die Operationen {{0}} ausgeführt werden. Gib den finalen Zustand des Stapels an. *(Das Top Element ist am höchsten Index.)*`,
  },
}

const wordTranslations: Translations = {
  en: {
    value: "Value",
    result: "Return value",
  },
  de: {
    value: "Wert",
    result: "Rückgabewert",
  },
}

export const stackQuestion: QuestionGenerator = {
  id: "stack",
  name: tFunctional(translations, "name"),
  description: tFunctional(translations, "description"),
  tags: ["stack"],
  languages: ["en", "de"],
  expectedParameters: [
    {
      type: "string",
      name: "variant",
      allowedValues: ["start", "sequence1"],
    },
  ],

  /**
   * Generates a new Stack question
   *
   * @param lang The language of the question
   * @param parameters The parameters for the question. In this case, none are used.
   * @param seed The seed for the random number generator
   * @returns A new MultipleChoiceQuestion question
   */
  generate: (lang = "en", parameters, seed) => {
    const random = new Random(seed)
    const variant = parameters.variant as "start" | "sequence1"

    const permalink = serializeGeneratorCall({
      generator: stackQuestion,
      lang,
      parameters,
      seed,
    })

    if (variant === "start") {
      return generateVariantStart(lang, random, permalink, translations, wordTranslations)
    } else {
      return generateVariantSequence(lang, random, permalink, translations)
    }
  },
}