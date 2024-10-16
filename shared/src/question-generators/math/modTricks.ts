import { Language } from "@shared/api/Language";
import {
    FreeTextFeedbackFunction,
    FreeTextQuestion,
    QuestionGenerator,
} from "@shared/api/QuestionGenerator";
import { serializeGeneratorCall } from "@shared/api/QuestionRouter";
import Random from "@shared/utils/random";
import { t, tFunctional, Translations } from "@shared/utils/translations";
import {
    gcd,
    calculateModularInverse,
    modularExponentiation,
    solveCRT,
    areCoprime
} from "@shared/question-generators/math/utils";

const translations: Translations = {
    en: {
        name: "Modular Arithmetic Tricks",
        description: "Answer questions involving modular arithmetic.",
        reductionQuestion: "Reduce ${{x}}$ modulo ${{n}}$.",
        inverseQuestion: "Find the modular inverse of ${{a}}$ modulo ${{n}}$.",
        expQuestion: "Calculate ${{a}}^{{{b}}} \\pmod{ {{n}} }$.",
        simpleQuestion: "Find an integer $x$ such that $x ≡ {{a}} \\pmod{ {{b}} }$.",
        crtQuestion: "Solve the system of congruences: \\[ {{text}} \\text{.}\\]",
        crtBottomText: "Provide your answer in the form: $y\\pmod{z}$.",
        feedbackInvalid: "Your answer is not valid.",
        feedbackCorrect: "Correct!",
        feedbackIncorrect: "Incorrect.",
    },
    de: {
        name: "Modulare Arithmetik Tricks",
        description: "Beantworten Sie Fragen zur modularen Arithmetik.",
        reductionQuestion: "Reduzieren Sie ${{x}}$ modulo ${{n}}$.",
        inverseQuestion: "Finden Sie das Inverse von ${{a}}$ modulo ${{n}}$.",
        expQuestion: "Berechnen Sie ${{a}}^{{{b}}} \\pmod{ {{n}} }$.",
        simpleQuestion: "Finden Sie eine ganze Zahl $x$, so dass $x ≡ {{a}} \\pmod{ {{b}} }$.",
        crtQuestion: "Lösen Sie das System von Kongruenzen: \\[ {{text}} \\text{.}\\]",
        crtBottomText: "Geben Sie Ihre Antwort in der Form $y\\pmod{z}$ an.",
        feedbackInvalid: "Ihre Antwort ist ungültig.",
        feedbackCorrect: "Richtig!",
        feedbackIncorrect: "Falsch.",
    }
};

export const ModTricks: QuestionGenerator = {
    id: "modtricks",
    name: tFunctional(translations, "name"),
    description: tFunctional(translations, "description"),
    tags: ["basic math", "modular arithmetic", "modulus", "mod", "arithmetic"],
    languages: ["en", "de"],
    author: "Janette Welker",
    license: "MIT",
    expectedParameters: [
        {
            type: "string",
            name: "variant",
            allowedValues: ["simple", "reduction", "inverse", "exponentiation", "crt"],
        },
    ],

    generate: (lang, parameters, seed) => {
        const path = serializeGeneratorCall({
            generator: ModTricks,
            lang,
            parameters,
            seed,
        });

        const random = new Random(seed);
        const variant = parameters.variant as "simple" | "reduction" | "inverse" | "exponentiation" | "crt";

        let question;
        let testing;

        switch (variant) {
        case "simple":
            ({ question, testing } = generateSimpleQuestion(lang, path, random));
            break;
        case "reduction":
            ({ question, testing } = generateReductionQuestion(lang, path, random));
            break;
        case "inverse":
            ({ question, testing } = generateInverseQuestion(lang, path, random));
            break;
        case "exponentiation":
            ({ question, testing } = generateExponentiationQuestion(lang, path, random));
            break;
        case "crt":
            ({ question, testing } = generateCRTQuestion(lang, path, random));
            break;
        default:
            throw new Error("Unknown variant");
        }

        return {
        question,
        testing, // allows for unit tests
        };
    },
};

// Simple
function generateSimpleQuestion(lang: Language, path: string, random: Random) {
    const a = random.int(0, 19);
    const b = random.int(2, 20);

    const question: FreeTextQuestion = {
        type: "FreeTextQuestion",
        name: ModTricks.name(lang),
        path: path,
        text: t(translations, lang, "simpleQuestion", { a: String(a), b: String(b) }),
        feedback: getSimpleFeedbackFunction(lang, a, b),
    };

    const testing = { a, b };
    return { question, testing };
}

function getSimpleFeedbackFunction(lang: Language, a: number, b: number): FreeTextFeedbackFunction {
    return ({ text }) => {
        // parse to Float to correctly recognize non-integer numbers
        const userAnswer = parseFloat(text.trim());
        if (isNaN(userAnswer) || !Number.isInteger(userAnswer)) {
            return { correct: false, feedbackText: t(translations, lang, "feedbackInvalid") };
        }
        return (userAnswer - a) % b === 0
            ? { correct: true, feedbackText: t(translations, lang, "feedbackCorrect") }
            : { correct: false, feedbackText: t(translations, lang, "feedbackIncorrect") };
    };
}

// Reduction
function generateReductionQuestion(lang: Language, path: string, random: Random) {
    const x = random.int(100, 999);
    const n = random.int(2, 20);

    const question: FreeTextQuestion = {
        type: "FreeTextQuestion",
        name: ModTricks.name(lang),
        path: path,
        text: t(translations, lang, "reductionQuestion", { x: String(x), n: String(n) }),
        feedback: getReductionFeedbackFunction(lang, x, n),
    };

    const testing = { x, n };
    return { question, testing };
}

function getReductionFeedbackFunction(lang: Language, x: number, n: number): FreeTextFeedbackFunction {
    return ({ text }) => {
        const userAnswer = parseFloat(text.trim());
        // normalize answer to smallest positive integer
        const correctAnswer = ((x % n) + n) % n;
        if (isNaN(userAnswer) || !Number.isInteger(userAnswer)) {
            return { correct: false, feedbackText: t(translations, lang, "feedbackInvalid") };
        }
        return userAnswer === correctAnswer
            ? { correct: true, feedbackText: t(translations, lang, "feedbackCorrect") }
            : { correct: false, feedbackText: t(translations, lang, "feedbackIncorrect") };
    };
}

// Inverse
function generateInverseQuestion(lang: Language, path: string, random: Random) {
    let a, n;
    do {
        a = random.int(2, 15);
        n = random.int(2, 20);
    } while (gcd(a, n) !== 1);

    const inverse = calculateModularInverse(a, n);

    const question: FreeTextQuestion = {
        type: "FreeTextQuestion",
        name: ModTricks.name(lang),
        path: path,
        text: t(translations, lang, "inverseQuestion", { a: String(a), n: String(n) }),
        feedback: getInverseFeedbackFunction(lang, inverse),
    };

    const testing = { a, n, inverse };
    return { question, testing };
}

function getInverseFeedbackFunction(lang: Language, correctAnswer: number | null): FreeTextFeedbackFunction {
    return ({ text }) => {
        const userAnswer = parseFloat(text.trim());
        if (isNaN(userAnswer) || !Number.isInteger(userAnswer)) {
            return { correct: false, feedbackText: t(translations, lang, "feedbackInvalid") };
        }
        return userAnswer === correctAnswer
            ? { correct: true, feedbackText: t(translations, lang, "feedbackCorrect") }
            : { correct: false, feedbackText: t(translations, lang, "feedbackIncorrect") };
    };
}

// Exponentiation
function generateExponentiationQuestion(lang: Language, path: string, random: Random) {
    const a = random.int(2, 10);
    const b = random.int(2, 10);
    const n = random.int(2, 20);
    const result = modularExponentiation(a, b, n);

    const question: FreeTextQuestion = {
        type: "FreeTextQuestion",
        name: ModTricks.name(lang),
        path: path,
        text: t(translations, lang, "expQuestion", { a: String(a), b: String(b), n: String(n) }),
        feedback: getExponentiationFeedbackFunction(lang, result),
    };

    const testing = { a, b, n, result };
    return { question, testing };
}

function getExponentiationFeedbackFunction(lang: Language, correctAnswer: number): FreeTextFeedbackFunction {
    return ({ text }) => {
        const userAnswer = parseFloat(text.trim());
        if (isNaN(userAnswer) || !Number.isInteger(userAnswer)) {
            return { correct: false, feedbackText: t(translations, lang, "feedbackInvalid") };
        }
        return userAnswer === correctAnswer
            ? { correct: true, feedbackText: t(translations, lang, "feedbackCorrect") }
            : { correct: false, feedbackText: t(translations, lang, "feedbackIncorrect") };
    };
}

// Chinese Remainder Theorem
function generateCRTQuestion(lang: Language, path: string, random: Random) {
    //determine number of congruences
    const numCongruences = random.int(2, 4);
    // congruence with a as remainder within (1, 20) and n as modulus within (2, 20)
    const congruences: { a: number; n: number }[] = [];
    const text: string[] = [];

    // generate system of congruences
    for (let i = 0; i < numCongruences; i++) {
        const a = random.int(1, 20);
        let n: number;

        // find new modulus that is coprime to preceding moduli
        do {
            n = random.int(2, 20);
        } while (congruences.some(({ n: precedingModulus }) => !areCoprime(n, precedingModulus)));

        congruences.push({ a, n });
        text.push(`x ≡ ${a} \\pmod{ ${n} }`);
    }

    const crtValue = solveCRT(congruences);
    const commonModulus = congruences.reduce((acc, { n }) => acc * n, 1);

    const question: FreeTextQuestion = {
        type: "FreeTextQuestion",
        name: ModTricks.name(lang),
        path: path,
        text: t(translations, lang, "crtQuestion", { text: text.join(", \\\\") }),
        prompt: `$x ≡ $`,
        bottomText: t(translations, lang, "crtBottomText"),
        feedback: getCRTFeedbackFunction(lang, crtValue, commonModulus),
    };

    const testing = { crtValue, commonModulus };
    return { question, testing };
}

function getCRTFeedbackFunction(lang: Language, crtValue: number, commonModulus: number): FreeTextFeedbackFunction {
    return ({ text }) => {
        // match "y (mod z)" (optional whitespaces) and capture y and z
        const pattern = /^(\d+)\s*\(\s*mod\s*(\d+)\s*\)$/i; 
        const match = text.trim().match(pattern);

        // dismiss incorrectly formatted answers
        if (!match) {
            return { correct: false, feedbackText: t(translations, lang, "feedbackInvalid") };
        }

        // y: userValue and z: userModulus
        let userValue = parseInt(match[1], 10);
        let userModulus = parseInt(match[2], 10);

        // normalize to range [0, commonModulus]
        userValue = (userValue % commonModulus + commonModulus) % commonModulus;
        crtValue = (crtValue % commonModulus + commonModulus) % commonModulus;

        return userModulus !== commonModulus || userValue !== crtValue
            ? { correct: false, feedbackText: t(translations, lang, "feedbackIncorrect") }
            : { correct: true, feedbackText: t(translations, lang, "feedbackCorrect") };
    };
}
