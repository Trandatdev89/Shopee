function ChangeValue(state = false, action) {
  switch (action.type) {
    case "reload":
      return !state;
    default:
      return state;
  }
}

export default ChangeValue;
