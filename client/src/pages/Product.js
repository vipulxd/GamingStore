import {useState, useEffect, React} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "../Styles/product-cart.css";

function Product() {
  const {prod_id} = useParams();
  const [data, setdata] = useState({});
  async function getdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/" + prod_id)
      .then(function (response) {
        setdata(response.data);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  console.log(`https://localhost:9000/${data.createdAt}` + ".jg");

  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="outer-crrt">
      {data.length > 0 ? (
        <div className="cart-body">
          <div className="cart-image">
            <img
              src={
                "https://gamerstopbymarcrove.herokuapp.com/" +
                data.createdAt +
                ".jpg"
              }
              alt={data.name}
            />
          </div>
          <div className="info-cart"></div>
        </div>
      ) : (
        <p>{data.createdAt}</p>
      )}
    </div>
  );
}

export default Product;
