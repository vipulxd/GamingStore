import {useState, useEffect, React} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "../Styles/product-cart.css";
import Home from "./Home";
function Product() {
  const {prod_id} = useParams();
  const [dataret, setdata] = useState();
  const [isfetched, setfetched] = useState(false);
  async function getdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/" + prod_id)
      .then(function (response) {
        setfetched(true);
        // setdata(response);
        console.log(response);
        console.log(isfetched);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="outer-crrt">
      {isfetched ? (
        <div className="cart-body">
          {/* <div className="cart-image">
            <img
              src={
                "https://gamerstopbymarcrove.herokuapp.com/" +
                dataret.createdAt +
                ".jpg"
              }
              alt={dataret.name}
            /> */}
          {/* </div> */}
          <div className="info-cart"></div>
        </div>
      ) : (
        <div>
          <p>{dataret}</p>
        </div>
      )}
    </div>
  );
}

export default Product;
