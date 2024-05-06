function Cart(state = [], action) {
  switch (action.type) {
    case "send":
      return action.data;
    default:
      return state;
  }
}

export default Cart;
