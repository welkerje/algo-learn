import { BST } from "@shared/question-generators/bst/bst.ts"
import Random from "@shared/utils/random.ts"

export function randomBSTGeneration(random: Random) {
  const bstSize = random.int(7, 12)
  const elements = random.subset([...Array(100).keys()], bstSize)

  const bst = new BST()
  elements.forEach((el) => bst.insert(el + 1))

  return {
    bst,
    bstInOrder: bst.inOrder(),
  }
}
