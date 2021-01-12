export const getCurrentItems = (allItems,currentPage,itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirsItem = indexOfLastItem - itemsPerPage;

    return allItems.slice(indexOfFirsItem,indexOfLastItem);
}