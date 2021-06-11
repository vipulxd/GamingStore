import {React, useEffect} from "react";
import Header from "../components/Header/index";
import {useDispatch, useSelector} from "react-redux";
import Footer from "../components/Footer/index";
import Releases from "../components/releases/Releases";
import Explore from "../components/explore/Explore";
// import News from "../components/news/index";
import "../Styles/App.css";
import axios from "axios";
import {add_prod_name} from "../redux/Products/Actions";
function Home() {
  const dispatch = useDispatch();
  async function fetchdata() {
    await axios
      .get("https://gamerstopbymarcrove.herokuapp.com/api/product/")
      .then(function (response) {
        dispatch(add_prod_name(response.data));
      })
      .catch(function (error) {});
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="home_outer">
      <div className="main_body">
        <div className="header-outer">
          <Header />
        </div>
        {/* <div className="news-outer">
          <News />
        </div> */}
        <div className="main_div_releases">
          <Releases />
        </div>
        <div className="main_div_explore">
          <Explore />
        </div>

        <div className="footer_outer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
