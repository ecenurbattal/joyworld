export function getElement(baseElement, wantedElementClassName) {
    for (var i = 0; i < baseElement.children.length; i++) {
            const elementToReturn = baseElement.children[i];
            if (elementToReturn.className.includes(wantedElementClassName)) {
                return elementToReturn;
            } else {
                if(elementToReturn.children) {
                    const found = getElement(elementToReturn,wantedElementClassName)
                    if(found) {
                        return found
                    }
                }
            }
    }
}