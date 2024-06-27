import { FreeTextQuestion, QuestionGenerator } from "@shared/api/QuestionGenerator.ts"
import { serializeGeneratorCall } from "@shared/api/QuestionRouter.ts"
import { randomBSTGeneration } from "@shared/question-generators/bst/utils.ts"
import Random from "@shared/utils/random.ts"
import { t, tFunctional, Translations } from "@shared/utils/translations.ts"

const translations: Translations = {
  en: {
    name: "Binary Search Tree",
    description: "Determine BTS state after various operations",
    task: "Below is a binary search tree (without balancing requirement) {{0}}.  We call **{{1}}**. Give the state as an array that results from this.",
    insert: "Insert({{0}})",
    delete: "Delete({{0}})",
  },
  de: {
    name: "Binärer Suchbaum",
    description: "Bestimme den Binären-Suchbaum-Zustand nach verschiedenen Operationen",
    task: "Unten abgebildet ist ein binärer Suchbaum (ohne Balancierungsanspruch) {{0}}. Wir rufen **{{1}}** auf. Gib den Zustand als Array an, der dadurch entsteht.",
    insert: "Insert({{0}})",
    delete: "Delete({{0}})",
  },
}

export const BSTGenerator: QuestionGenerator = {
  id: "bst",
  name: tFunctional(translations, "name"),
  description: tFunctional(translations, "description"),
  tags: ["binary search tree", "bst", "bst-insert", "bst-delete", "inorder-traversal"],
  languages: ["en", "de"],
  expectedParameters: [
    {
      type: "string",
      name: "variant",
      allowedValues: ["insert", "delete"],
    },
  ],

  generate: (lang = "en", parameters, seed) => {
    const random = new Random(seed)

    const variant = parameters.variant as "insert" | "delete"

    const { bst, bstInOrder } = randomBSTGeneration(random)

    const question: FreeTextQuestion = {
      type: "FreeTextQuestion",
      name: BSTGenerator.name(lang),
      path: serializeGeneratorCall({
        generator: BSTGenerator,
        lang,
        parameters,
        seed,
      }),
      text: t(translations, lang, "task", [
        bst.toString(),
        t(translations, lang, variant, [random.choice(bstInOrder).toString()]),
      ]),
    }

    return {
      question,
    }
  },
}
