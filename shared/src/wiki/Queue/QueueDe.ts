export const QueueDeText = `
## Einführung in Queue

Eine **Queue** ist eine Datenstruktur, die nach dem Prinzip **First In, First Out (FIFO)** arbeitet. Das bedeutet, dass das Element, das zuerst in die Queue eingefügt wurde (enqueue), auch als erstes entfernt wird (dequeue). 

## Schlüsseloperationen
- \`queue.enqueue(x)\` Fügt ein Element zum **Anfang** der Queue hinzu.
- \`queue.dequeue()\` Entfernt das Element vom **Ende** der Queue.
- \`queue.isEmpty()\` Überprüft, ob die Queue leer ist.

## Beispiele
### Enqueue Operation
Du hast eine Queue mit einem Element:
\`\`\`array
{"array":[1,"-"],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
Wir führen folgende Operation aus:
\`queue.enqueue(2)\`

Nun enthält die Queue zwei Elemente:
\`\`\`array
{"array":[1,2],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
### Dequeue Operation
Anschließend führen wir folgende Operation aus:
\`queue.dequeue()\`

Nun enthält die Queue ein Element:
\`\`\`array
{"array":["-",2],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
### isEmpty Operation
Zuletzt führen wir folgende Operation aus:  
\`queue.isEmpty()\`

Diese Operation gibt \`False\` zurück, da die Queue nicht leer ist.
`
