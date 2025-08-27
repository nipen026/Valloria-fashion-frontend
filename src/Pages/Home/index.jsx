import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import Banner from "../../Components/Banner";
import Categories from "../../Components/Categories";
import FooterBanner from "../../Components/Footerbanner";
// import FeaturedCategories from "../../Components/FeaturedCategories";
import NewArrivals from "../../Components/NewArrivals";
import PremiumCollection from "../../Components/PremiumCollection";
import ReviewPopup from "../../Components/ReviewPopup";
import SaleBanner from "../../Components/SaleBanner";
import TrustBadges from "../../Components/TrustBadges";

const Home= () =>{
    return (
        <>
        <Header/>
        <Banner/>
        {/* <Categories/> */}
        <SaleBanner/>
        {/* <FeaturedCategories/> */}
        <NewArrivals/>
        <FooterBanner/>
        {/* <PremiumCollection/> */}
        <TrustBadges/>
        <Footer/>
         {/* <ReviewPopup isOpen={true} /> */}
        </>
    )
}

export default Home;