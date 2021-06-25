import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import "../../Styles/cart.css";
import CartItem from "../CartItem";
import {useSelector, useDispatch} from "react-redux";
import {sum_add} from "../../redux/Purchase/purchaseAction";
function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [itemNo, setItemNo] = useState(0);
  const [loading, setloading] = useState(false);
  const itemNumbers = useSelector(state => state.CartInfo.products);
  const [price, setPrice] = useState(0);
  function findsum() {
    function amount(item) {
      return item.price;
    }

    function sum(prev, next) {
      return prev + next;
    }

    const num = itemNumbers
      .map(item => parseInt(item.price.replace(",", "")))
      .reduce((prev, next) => prev + next);
    setItemNo(num);
  }

  function triggerpay() {
    dispatch(sum_add(itemNo));
    history.push("/payment");
  }

  useEffect(() => {
    if (itemNumbers.length > 0) {
      setloading(true);
      findsum();
    }
  }, []);
  return (
    <div className="cartouter">
      <div className="cart1">
        <div className="cart2 itm">
          <CartItem />
        </div>
        <div className="cart2">
          {loading ? (
            <div className="chk">
              <div className="chk1">
                {" "}
                <p className="chktext"></p>
              </div>

              <div className="chk2 divvs">
                <div className="chk21">Total Item</div>
                <div className="chk22">{itemNumbers.length} X 1</div>
              </div>
              <div className="chk3 divvs">
                {" "}
                <div className="chk21">Total Price</div>
                <div className="chk22">{itemNo}</div>
              </div>
              <div className="chk4 divvs">
                <div className="chk21"></div>
                <div className="chk23">
                  <button onClick={() => triggerpay()} className="chkbuy">
                    <p>Checkout</p>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>No Items in Cart</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
