import {useState, useEffect, React} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "../Styles/product-cart.css";
import Header from "../components/Header/index";
function Product() {
  const {prod_id} = useParams();
  const [name, setname] = useState();
  const [createdat, setcreatedat] = useState();

  const [isfetched, setfetched] = useState(false);
  async function getdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/" + prod_id)
      .then(function (response) {
        setfetched(true);
        setname(response.data.name);
        setcreatedat(response.data.createdAt);
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
      <Header />
      {isfetched ? (
        <div className="cart-body">
          <div className="cart-image">
            <img
              src={
                "https://gamerstopbymarcrove.herokuapp.com/" +
                createdat +
                ".jpg"
              }
              alt={name}
            />
          </div>
          <div className="info-cart"></div>
        </div>
      ) : (
        <div>
          <p>{name}</p>
        </div>
      )}
    </div>
  );
}

export default Product;
