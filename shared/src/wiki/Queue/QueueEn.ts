export const QueueEnText = `
## Introduction to Queue

A **Queue** is a data structure that operates on the **First In, First Out (FIFO)** principle. This means that the first element added (enqueued) is the first one to be removed (dequeued).

## Key Operations
- \`queue.enqueue(x)\` Adds an element to the **front** of the queue.
- \`queue.dequeue()\` Removes the element from the **rear** of the queue.
- \`queue.isEmpty()\` Checks if the queue is empty.

## Examples
### Enqueue Operation
Consider a queue with one element:
\`\`\`array
{"array":[1,"-"],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
We perform the following operation:  
\`queue.enqueue(2)\`

Now, the queue contains two elements:
\`\`\`array
{"array":[1,2],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
### Dequeue Operation
After that, we perform the following operation:  
\`queue.dequeue()\`

Now, the queue contains one element:
\`\`\`array
{"array":["-",2],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
### isEmpty Operation
We perform the following operation:  
\`queue.isEmpty()\`

This operation returns \`False\` as the queue is not empty.
`
