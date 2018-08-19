export default function dataList(state = [], action) {
    if (action.type === "GET_LIST") {
        return [...action.payload];
    }
    return state;
}
