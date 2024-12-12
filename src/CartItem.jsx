import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

export const calculateTotalQuantity = (cart) =>
  cart.reduce((total, item) => total + item.quantity, 0);

const CartItem = ({ onContinueShopping, handleDelete }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleContinueShopping = (e) => {
    //alert('Functionality to be added for future reference');
    onContinueShopping();
  };

  const handleCheckOut = () =>  {
    alert('Coming Soon!');
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({name: item.name, quantity: item.quantity + 1}));
  };

  const handleDecrement = (item) => {
    if(item.quantity > 1){
      dispatch(updateQuantity({name: item.name, quantity: item.quantity - 1}));
    } else{
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
    handleDelete(name);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => 
    item.cost.replace('$', '') * item.quantity;

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                 className="cart-item-button cart-item-button-dec" 
                 onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item).toFixed(2)}</div>
              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item.name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => handleCheckOut()}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

