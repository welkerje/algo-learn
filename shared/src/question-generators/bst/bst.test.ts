import { describe, expect, test } from "vitest"
import { BST } from "@shared/question-generators/bst/bst.ts"

describe("BST Algortihm test", () => {
  test("1 BST insert", () => {
    const bst = new BST()
    bst.insert(10)
    const inOrderResult = bst.inOrder()
    expect(inOrderResult.toString()).toBe([10].toString())

    bst.insert(5)
    bst.insert(7)
    bst.insert(13)

    const inOrderResult2 = bst.inOrder()
    expect(inOrderResult2.toString()).toBe([5, 7, 10, 13].toString())

    bst.insert(11)
    bst.insert(16)
    bst.insert(15)

    const inOrderResult3 = bst.inOrder()
    expect(inOrderResult3.toString()).toBe([5, 7, 10, 11, 13, 15, 16].toString())
  })

  test("2 BST insert", () => {
    const bst = new BST()
    const result: number[] = []

    for (let i = 0; i < 100; i++) {
      bst.insert(i)
      result.push(i)
    }

    expect(bst.inOrder().toString()).toBe(result.toString())
  })

  test("1 BST delete", () => {
    const bst = new BST()

    bst.insert(5)
    bst.insert(7)
    bst.insert(13)
    bst.insert(11)
    bst.insert(2)
    bst.insert(1)
    bst.insert(3)

    bst.delete(2)
    bst.delete(11)

    expect(bst.inOrder().toString()).toBe([1, 3, 5, 7, 13].toString())
  })
})
