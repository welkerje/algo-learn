import { Language } from "./Language"
import { ExpectedParameters, Parameters } from "./Parameters"

/**
 * Objects of type Question are generated by QuestionGenerators. There are only
 * a handful of question types. Whenever a new QuestionGenerator wants to
 * explore a new interaction pattern, the existing types should be extended with
 * optional properties. If this is not possible, a new question type should be
 * added.
 */
export type Question = MultipleChoiceQuestion | FreeTextQuestion

/**
 * Base type for all question types; they must contain the already-translated
 * question descriptions and texts in markdown-style syntax. All Question object
 * must have at least these properties.
 */
export interface QuestionBase {
  /** The type of the question */
  type: string

  /**
   * Unique path to this question; for example,
   * "/en/topic/questiongenerator1/variant1/VeryRandomSeed". The path must
   * contain _all_ parameters necessary to re-generate the question.
   */
  path: string

  /** The name of the question */
  name: string

  /** The markdown text of the question (optional) */
  text?: string
}

/**
 * MultipleChoiceQuestion stores the generated data of multiple choice
 * questions.
 */
export interface MultipleChoiceQuestion extends QuestionBase {
  type: "MultipleChoiceQuestion"

  /** List of possible answers to the question */
  answers: string[]

  /** Whether multiple answers can be selected; defaults to false */
  allowMultiple?: boolean

  /** Whether the question is a sorting question; defaults to false */
  sorting?: boolean

  /** The feedback function for this question; defaults to undefined */
  feedback?: MultipleChoiceFeedbackFunction
}

/**
 * After the user selects answer(s), these answeres are stored as a
 * MultipleChoiceAnswer object.
 */
export interface MultipleChoiceAnswer {
  /**
   * The indices of all answers selected by the user; the order is relevant only
   * if sortingQuestion is true
   */
  choice: number[]
}

/**
 * The QuestionGenerator provides a feedback function that is given the question
 * and the answer given by the user and returns feedback on the answer. The type
 * of the feedback function depends on the question type, but every feedback
 * must/may contain the fields in the following FeedbackBase interface.
 */
export interface FeedbackBase {
  /**
   * Whether the choice is exactly correct. This field may be withheld, for
   * example, if the correctness is unknown or if the answer was only
   * preliminary and not final.
   */
  correct?: boolean

  /** The feedback text to show to the user. (optional) */
  feedbackText?: string
}

/**
 * The feedback object returned by the feedback function for multiple-choice
 * questions.
 */
export interface MultipleChoiceFeedback extends FeedbackBase {
  /**
   * The correct choice; the order is relevant only if sortingQuestion is true.
   * (optional)
   */
  correctChoice?: number[]
}

/** The signature of the feedback function for multiple-choice questions */
export type MultipleChoiceFeedbackFunction = (
  answer: MultipleChoiceAnswer
) => MultipleChoiceFeedback | Promise<MultipleChoiceFeedback>

/**
 * This function returns a feedback function for multiple-choice questions that
 * checks whether the selected answer or answers are correct. The correct answer
 * is given as a list of indices of the correct answers.
 *
 * @param correctAnswerIndex The index or indices of the correct answer(s)
 * @param sorting Whether the order of the answers is relevant; defaults to
 *   false, in which case the order of the answers is ignored by sorting them
 * @returns
 */
export function minimalMultipleChoiceFeedback({
  correctAnswerIndex,
  sorting = false,
}: {
  correctAnswerIndex: number | number[]
  sorting?: boolean
}): MultipleChoiceFeedbackFunction {
  const correctChoice =
    typeof correctAnswerIndex === "number"
      ? [correctAnswerIndex]
      : correctAnswerIndex.slice()
  if (!sorting) correctChoice.sort()
  const feedback: MultipleChoiceFeedbackFunction = ({ choice }) => {
    const sameLength = choice.length === correctChoice.length
    if (!sorting) choice = choice.slice().sort()
    let sameAnswer = true
    choice.forEach((c, i) => {
      if (c !== correctChoice[i]) sameAnswer = false
    })
    const correct = sameLength && sameAnswer
    return { correct, correctChoice }
  }
  return feedback
}

/**
 * FreeTextQuestion stores the generated data of free text questions. Free text
 * questions are questions where the user can enter any text as an answer.
 */
export interface FreeTextQuestion extends QuestionBase {
  type: "FreeTextQuestion"

  /** The prompt to show to the user next to the input field (optional) */
  prompt?: string

  /** The placeholder text to show inside the input field (optional) */
  placeholder?: string

  /** The text to show below the input field (optional) */
  bottomText?: string

  /** The number of lines in the input field (defaults to 1) */
  lines?: number

  /** The feedback function for this question; defaults to undefined */
  feedback?: FreeTextFeedbackFunction

  /**
   * If provided, the following function performs a preliminary check on the
   * provided answer. For example, it can be used to check whether the syntax of
   * the given answer is correct and to provide feedback on the syntax.
   */
  checkFormat?: FreeTextFormatFunction
}

/**
 * After the user enters an answer, this answer is stored as a FreeTextAnswer
 * object.
 */
export interface FreeTextAnswer {
  /** The text entered by the user */
  text: string
}

/** For feedback on free-text questions, the base feedback type is sufficient. */
export interface FreeTextFeedback extends FeedbackBase {
  /** A possible correct answer; this field is optional */
  correctAnswer?: string
}

/** The signature of the feedback function for free-text questions */
export type FreeTextFeedbackFunction = (
  answer: FreeTextAnswer
) => FreeTextFeedback | Promise<FreeTextFeedback>

/** The signature of the function that checks the syntax or basic format. */
export type FreeTextFormatFunction = (
  answer: FreeTextAnswer
) =>
  | { valid: boolean; message?: string }
  | Promise<{ valid: boolean; message?: string }>

/**
 * QuestionGenerator type for generating questions.
 *
 * Here, TQuestion is a generic type that represents the question type, for
 * example MultipleChoiceQuestion, etc.
 */
export interface QuestionGenerator {
  /**
   * The path can be used as part of the URL (only lower-case letters, numbers,
   * dashes, and slashes) to identify the question. For example, the path could
   * be "python3/variables" for a question about Python variables.
   */
  path: string

  /** List of supported languages. */
  languages: Language[]

  /** Human-readable name of the question. */
  name: (lang: Language) => string

  /**
   * Human-readable short description of the competence trained by this
   * question. (optional)
   *
   * This should always be a short phrase with an _active_ verb, that tells us
   * which skill is trained by this question. For example:
   *
   * - "compare functions by their asymptotic growth"
   * - "analyze the time complexity of a short, iterative algorithm"
   * - "determine the recurrence relation of a recursive algorithm"
   * - "determine the asymptotics of a recurrence relation"
   */
  description?: (lang: Language) => string

  /** Link to the source code of the question. (optional) */
  link?: string

  /** Tags for this question. (optional) */
  tags?: string[]

  /** Author(s) of the question. (optional) */
  author?: string

  /** License of the question. (optional) */
  license?: string

  /** Ordered list of allowed parameters for the question. */
  expectedParameters: ExpectedParameters

  /**
   * Function to generate an instance of the question from the given parameters,
   * as well as the feedback function for this question. The function must be
   * implemented by each QuestionGenerator object.
   *
   * @param parameters The parameters to use when generating the question
   * @param lang The language to use when generating the question
   * @returns The question object including its corresponding feedback function
   *   as a closure. Additional properties may be added to the output object to
   *   provide unit tests.
   */
  generate: (
    lang: Language,
    parameters: Parameters,
    seed: string
  ) => { question: Question } | Promise<{ question: Question }>
}

/**
 * Function to export the question in JSON format
 *
 * @param question The question to export
 * @returns The question in JSON format
 */
export function questionToJSON(question: Question): string {
  return JSON.stringify(question, null, 2).replace("\\\\", "\\")
}

/**
 * Function to import the question from JSON format
 *
 * @param json The question to import in JSON format
 * @returns The question object
 */
export function questionFromJSON(json: string): Question {
  return JSON.parse(json) as Question
}
