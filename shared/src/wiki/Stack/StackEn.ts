export const StackEnText = `
## Introduction to Stack

A **Stack** is a data structure that operates on the **Last In, First Out (LIFO)** principle. This means that the last element added (pushed) is the first one to be removed (popped).

## Key Operations
- \`stack.push(x)\` | Adds an element to the top of the stack.
- \`stack.pop()\` | Removes the element from the top of the stack.
- \`stack.isEmpty()\` | Checks if the stack is empty.

## Examples
### Push Operation
Consider a stack with one element:
\`\`\`array
{"array":[1,"-"],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
We perform the following operation:  
\`stack.push(2)\`
Now, the stack contains two elements:
\`\`\`array
{"array":[1,2],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
### Pop Operation
We perform the following operation:  
\`stack.pop()\`
Now, the stack contains one element:
\`\`\`array
{"array":[1,"-"],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
### Is Empty Operation
We perform the following operation:  
\`stack.isEmpty()\`

This operation returns \`False\` as the stack is not empty.
`
