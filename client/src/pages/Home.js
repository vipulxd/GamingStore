import {React} from "react";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";
import Releases from "../components/releases/Releases";
import Explore from "../components/explore/Explore";
import News from "../components/news/index";
import "../Styles/App.css";

function Home() {
  return (
    <div className="home_outer">
      <div className="main_body">
        <div className="header-outer">
          <Header />
        </div>
        <div className="news-outer">
          <News />
        </div>
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
