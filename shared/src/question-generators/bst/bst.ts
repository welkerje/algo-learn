/**
 * This class represents a binary search tree.
 *
 * Only possible keys are numbers (don't need more for the question generator).
 *
 */
export class BST {
  private root: null | BSTNode = null

  /**
   * Inserts a new node with value z into the tree.
   * @param z - the value of the new node
   */
  insert(z: number) {
    let y: BSTNode | null = null
    let x: BSTNode | null = this.root
    while (x !== null) {
      y = x // in case we end this algorithm in this iteration, y will be the parent of x
      if (z === x.value) {
        return // we don't allow duplicates
      }
      if (z < x.value) {
        x = x.left
      } else {
        x = x.right
      }
    }
    const newNode: BSTNode = { value: z, parent: y, left: null, right: null } as BSTNode
    if (y === null) {
      this.root = newNode
    } else if (z < y.value) {
      y.left = newNode
    } else {
      y.right = newNode
    }
  }

  /**
   * Deletes the node with value z from the tree.
   * @param z - the value of the node to delete
   */
  delete(z: number) {
    if (this.root === null) {
      return
    }
    let x: BSTNode | null = this.root
    while (x !== null && x.value !== z) {
      if (z < x.value) {
        x = x.left
      } else {
        x = x.right
      }
    }
    if (x === null) {
      return
    }
    this.treeDelete(x)
  }

  /**
   * Deletes the node z from the tree.
   * (CLRS 298)
   *
   * This is private because it only makes sense if you have a node inside the tree.
   *
   * @param z - the node to delete
   */
  private treeDelete(z: BSTNode) {
    if (z.left === null) {
      this.transplant(z, z.right)
    } else if (z.right === null) {
      this.transplant(z, z.left)
    } else {
      const y = this.minimum(z.right)
      if (y.parent !== z) {
        this.transplant(y, y.right)
        y.right = z.right
        y.right.parent = y
      }
      this.transplant(z, y)
      y.left = z.left
      y.left.parent = y
    }
  }

  /**
   * Replaces the subtree rooted at node u with the subtree rooted at node v.
   * (CLRS 296)
   * @param u - the node to replace
   * @param v - the node to replace with
   */
  private transplant(u: BSTNode, v: BSTNode | null) {
    if (u.parent === null) {
      this.root = v
    } else if (u === u.parent.left) {
      u.parent.left = v
    } else {
      u.parent.right = v
    }
    if (v !== null) {
      v.parent = u.parent
    }
  }

  /**
   * Returns the node with value z
   * @param z - the value of the node to find
   */
  find(z: number) {
    let x: BSTNode | null = this.root
    while (x !== null && x.value !== z) {
      if (z < x.value) {
        x = x.left
      } else {
        x = x.right
      }
    }
    return x
  }

  /**
   * Returns the predecessor of node z.
   * The predecessor of a node x is the node with the largest key smaller than x.key.
   * (CLRS 292)
   *
   * @param z
   */
  predecessor(z: BSTNode) {
    if (z.left !== null) {
      return this.maximum(z.left)
    }
    let y = z.parent
    while (y !== null && z === y.left) {
      z = y
      y = y.parent
    }
    return y
  }

  /**
   * Returns the successor of node z.
   * @param z
   */
  successor(z: BSTNode) {
    if (z.right !== null) {
      return this.minimum(z.right)
    }
    let y = z.parent
    while (y !== null && z === y.right) {
      z = y
      y = y.parent
    }
    return y
  }

  /**
   * Returns the node with the maximum value in the tree.
   *
   * This should always be on the right side of the tree.
   * @param z
   */
  maximum(z: BSTNode) {
    while (z.right !== null) {
      z = z.right
    }
    return z
  }

  /**
   * Returns the node with the minimum value in the tree.
   *
   * This should always be on the left side of the tree.
   * @param z
   */
  minimum(z: BSTNode) {
    while (z.left !== null) {
      z = z.left
    }
    return z
  }

  /**
   * Returns the in-order traversal of the tree.
   */
  inOrder() {
    const result: number[] = []

    function inOrderHelper(node: BSTNode | null) {
      if (node !== null) {
        inOrderHelper(node.left)
        result.push(node.value)
        inOrderHelper(node.right)
      }
    }
    inOrderHelper(this.root)

    return result
  }

  levelOrder() {
    const result: number[] = []
    let queue = [this.root]
    while (queue.length > 0) {
      const newQueue = []
      for (let i = 0; i < queue.length; i++) {
        const node = queue[i]
        if (node !== null) {
          result.push(node.value)
          newQueue.push(node.left)
          newQueue.push(node.right)
        }
      }
      queue = newQueue
    }
    return result
  }

  /**
   * Just provides a simple (ugly) print of the tree.
   * To verify the tree structure.
   *
   * TODO: improve this function for better output
   *
   * 8
   * null 19
   * null null 16 22
   * ...
   *
   */
  toString() {
    let queue = [this.root]
    let result = ""
    while (queue.length > 0) {
      const newQueue = []
      let linePrint = ""
      let normalValue = false
      for (let i = 0; i < queue.length; i++) {
        const node = queue[i]
        linePrint += (node === null ? "_" : node?.value) + " "
        if (node === null) {
          newQueue.push(null)
          newQueue.push(null)
        } else {
          normalValue = true
          newQueue.push(node.left)
          newQueue.push(node.right)
        }
      }
      if (!normalValue) {
        break
      }
      result += linePrint + "\n"
      queue = newQueue
    }

    return result
  }
}

type BSTNode = {
  value: number
  parent: BSTNode | null
  left: BSTNode | null
  right: BSTNode | null
}
