export default function dataList(state = [], action) {
  let tmp = {};

  function filter(arr) {
    return arr.filter(function(a) {
      return a.objectID in tmp ? 0 : (tmp[a.objectID] = 1);
    });
  }

  if (action.type === "GET_LIST") {
    let result = state.concat(action.payload);

    let newData = filter(result);

    return [...newData];
  }
  return state;
}
