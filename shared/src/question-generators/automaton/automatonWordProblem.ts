import {
  minimalMultipleChoiceFeedback,
  type MultipleChoiceQuestion,
  type QuestionGenerator,
} from "@shared/api/QuestionGenerator"
import { serializeGeneratorCall } from "@shared/api/QuestionRouter"
import type { Automaton } from "@shared/question-generators/automaton/generate/automaton"
import {
  generateDFA,
  generateNFA,
} from "@shared/question-generators/automaton/generate/automatonGenerator"
import {
  generateWords,
  isWordAccepted,
  writeAutomatonDefinition,
} from "@shared/question-generators/automaton/generate/automatonUtil"
import Random from "@shared/utils/random"
import { t, tFunctional, type Translations } from "@shared/utils/translations"

const translations: Translations = {
  en: {
    name: "Word Problem in Finite Automata",
    description: "Determine which words are accepted by the automaton.",
    prompt: "Which of the following words are accepted by $\\mathcal{A}$? Select all that apply.",
    none: "None of the above",
  },
  de: {
    name: "Wortproblem in endlichen Automaten",
    description: "Bestimme die vom Automaten akzeptierten Wörter.",
    prompt:
      "Welche der folgenden Wörter werden von $\\mathcal{A}$ akzeptiert? Wähle alle korrekten Möglichkeiten aus.",
    none: "Keine der genannten Optionen",
  },
}

export const AutomatonWordQuestion: QuestionGenerator = {
  id: "automatonaccept",
  name: tFunctional(translations, "name"),
  description: tFunctional(translations, "description"),
  tags: ["automaton", "word recognition"],
  languages: ["en", "de"],
  license: "MIT",
  expectedParameters: [
    {
      name: "size",
      description: (lang) => t(translations, lang, "description"),
      type: "integer",
      min: 3,
      max: 6,
    },
    {
      name: "type",
      description: (lang) =>
        lang === "en" ? "Type of automaton (NFA or DFA)." : "Typ des Automaten (NFA oder DFA).",
      type: "string",
      allowedValues: ["NFA", "DFA"],
    },
  ],

  generate: (lang: "en" | "de", parameters, seed) => {
    const random = new Random(seed)
    const size = parameters.size as number
    const type = parameters.type as "NFA" | "DFA"
    const alphabet = ["0", "1"]

    const automaton: Automaton =
      type === "NFA"
        ? generateNFA(random, size, alphabet, 0.5, 0.2, 0.1, 0.3, true)
        : generateDFA(random, size, alphabet, 0.2, true)

    const words = generateWords(random, 6, 2, 6, alphabet)
    const acceptedWords = words.filter((word) => isWordAccepted(automaton, word))

    const answers = words.map((word) => ({
      key: word,
      element: word,
      correct: acceptedWords.includes(word),
    }))

    const noneOfTheAbove = t(translations, lang, "none")
    answers.push({
      key: noneOfTheAbove,
      element: noneOfTheAbove,
      correct: acceptedWords.length === 0,
    })

    const question: MultipleChoiceQuestion = {
      type: "MultipleChoiceQuestion",
      name: AutomatonWordQuestion.name(lang),
      path: serializeGeneratorCall({ generator: AutomatonWordQuestion, lang, parameters, seed }),
      allowMultiple: true,
      text: [
        writeAutomatonDefinition(lang, automaton, alphabet),
        "",
        t(translations, lang, "prompt"),
      ].join(" $\\\\$ "),
      answers: answers.map(({ element }) => element),
      feedback: minimalMultipleChoiceFeedback({
        correctAnswerIndex: answers
          .map((answer, index) => (answer.correct ? index : -1))
          .filter((index) => index !== -1),
      }),
    }

    return { question }
  },
}
