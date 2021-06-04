import {useState, useEffect, React} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "../Styles/product-cart.css";

function Product() {
  const {prod_id} = useParams();
  console.log(prod_id);
  const [data, setdata] = useState();
  async function getdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/" + prod_id)
      .then(function (response) {
        setdata(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  console.log(data);
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="outer-crrt">
      <div className="cart-body">
        <div className="cart-image">
          <img
            src={
              " https://gamerstopbymarcrove.herokuapp.com/" +
              data.image +
              ".jpg"
            }
            alt={data.name}
          />
        </div>
        <div className="info-cart"></div>
      </div>
    </div>
  );
}

export default Product;
