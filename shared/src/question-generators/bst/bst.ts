/**
 * This class represents a binary search tree.
 */
export class BST {
  private root: null | BSTNode = null

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

  treeDelete(z: BSTNode) {
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

  transplant(u: BSTNode, v: BSTNode | null) {
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

  maximum(z: BSTNode) {
    while (z.right !== null) {
      z = z.right
    }
    return z
  }

  minimum(z: BSTNode) {
    while (z.left !== null) {
      z = z.left
    }
    return z
  }

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

  toString() {}
}

type BSTNode = {
  value: number
  parent: BSTNode | null
  left: BSTNode | null
  right: BSTNode | null
}
