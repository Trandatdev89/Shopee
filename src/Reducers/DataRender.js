function DataRender(state = [], action) {
  switch (action.type) {
    case "data":
      return action.value;
    default:
      return state;
  }
}

export default DataRender;
