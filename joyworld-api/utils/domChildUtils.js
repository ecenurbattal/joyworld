module.exports.getFirstDegreeChild = (item,childIndex) => {
    return item.children[childIndex]
}

module.exports.getSecondDegreeChild = (item,firstChildIndex,secondChildIndex) => {
    return item.children[firstChildIndex].children[secondChildIndex]
}

module.exports.getThirdDegreeChild = (item,firstChildIndex,secondChildIndex,thirdChildIndex) => {
    return item.children[firstChildIndex].children[secondChildIndex].children[thirdChildIndex]
}

module.exports.getFourthDegreeChild = (item,firstChildIndex,secondChildIndex,thirdChildIndex,fourthChildIndex) => {
    return item.children[firstChildIndex].children[secondChildIndex].children[thirdChildIndex].children[fourthChildIndex]
}

module.exports.getFifthDegreeChild = (item,firstChildIndex,secondChildIndex,thirdChildIndex,fourthChildIndex,fifthChildIndex) => {
    return item.children[firstChildIndex].children[secondChildIndex].children[thirdChildIndex].children[fourthChildIndex].children[fifthChildIndex]
}

// module.exports.getElementInsideElement = (baseElement, wantedElementClassName) => {
//     var elementToReturn;
//         for (var i = 0; i < baseElement.children.length; i++) {
//             elementToReturn = baseElement.children[i];
//             if (elementToReturn.className.includes(wantedElementClassName)) {
//                 return elementToReturn;
//             } else {
//                 return getElementInsideElement(elementToReturn, wantedElementClassName);
//             }
//         }
// }