function sortRender(state = false, action) {
  switch (action.type) {
    case "sort":
      return action.value;
    case "reload":
        return action.value;
    default:
      return state;
  }
}

export default sortRender;
