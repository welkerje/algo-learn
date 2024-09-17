export const StackDeText = `
## Einführung in Stacks

Ein **Stack** ist eine Datenstruktur welche nachdem **Last In, First Out (LIFO)** Prinzip arbeitet. Das bedeutet, dass das zuletzt hinzugefügte Element (push) als erstes entfernt wird (pop).

## Schlüsseloperationen
- \`stack.push(x)\` Fügt das Element x zum Stack hinzu.
- \`stack.pop()\` Entfernt das oberste Element vom Stack.
- \`stack.isEmpty()\` Überprüft ob der Stack leer ist.

## Beispiele
### Push Operation
Du hast folgenden Stack:
\`\`\`array
{"array":[1,"-"],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
Wir führen folgende Operation aus:  
\`stack.push(2)\`

Nun enthält der Stack zwei Elemente:
\`\`\`array
{"array":[1,2],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
### Pop Operation
Wir führen anschließend folgende Operation aus: 
\`stack.pop()\`

Das oberste Element wird entfernt und der Stack enthält nur noch ein Element:
\`\`\`array
{"array":[1,"-"],"startingIndex":0,"secondRowName":{"de":"Wert","en":"Value"}}
\`\`\`
### isEmpty Operation
Zuletzt führen wir folgende Operation aus:
\`stack.isEmpty()\`

Diese Operation gibt \`False\` zurück, da der Stack nicht leer ist.
`
