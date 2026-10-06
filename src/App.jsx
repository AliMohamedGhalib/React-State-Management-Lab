import { useState } from "react";

const AllProducts = [
  {
    id: 1,
    name: "Black T shirt",
    price: 5
  },
  {
    id: 2,
    name: "Hanger Set",
    price: 8
  },
  {
    id: 3,
    name: "Thoub",
    price: 12
  },
  {
    id: 4,
    name: "Computer Bag",
    price: 20
  },
  {
    id: 5,
    name: "Couch",
    price: 50
  },
  {
    id: 6,
    name: "Gaming Chair",
    price: 70
  }
]

function App() {
  const [availableItems, setAvailableItems] = useState(AllProducts);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(100);
  const [warningMessage, setWarningMessage] = useState(null);

  function handleAddToCart(item) {
    if (availableBalance > item.price) {
      const newList = availableItems.filter((product) => product.id !== item.id);
      setAvailableItems(newList);

      setShoppingCart([...shoppingCart, item]);

      setAvailableBalance(availableBalance - item.price);
    } else {
      setWarningMessage("Insufficient funds. Your balance is too low to purchase this item");

      setTimeout(() => {
        setWarningMessage(null);
      }, 4000);
    }
  }

  function handleRemoveFromShoppingCart(item) {
    const newCart = shoppingCart.filter((product) => product.id !== item.id);
    setShoppingCart(newCart);

    setAvailableItems([...availableItems, item]);

    setAvailableBalance(availableBalance + item.price);
  }

  return (
    <>
      <h1>Sayed Hameds Closet</h1>

      <h2>Your Balance: {availableBalance}</h2>

      {warningMessage && <p>{warningMessage}</p>}

      <h2>Available Items</h2>
      {availableItems.map((item) => (
        <div key={item.id}>
          <p>{item.name} - {item.price}</p>
          <button onClick={() => { handleAddToCart(item) }}>
            Add
          </button>
        </div>
      ))}

      <h2>Shopping Cart</h2>
      {shoppingCart.map((item) => (
        <div key={item.id}>
          <p>{item.name} - {item.price}</p>
          <button onClick={() => { handleRemoveFromShoppingCart(item) }}>
            Remove
          </button>
        </div>
      ))}
    </>
  );
}

export default App;