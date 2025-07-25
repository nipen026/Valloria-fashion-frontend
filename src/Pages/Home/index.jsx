import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import Banner from "../../Components/Banner";
import FeaturedCategories from "../../Components/FeaturedCategories";
import NewArrivals from "../../Components/NewArrivals";
import PremiumCollection from "../../Components/PremiumCollection";

const Home= () =>{
    return (
        <>
        <Header/>
        <Banner/>
        <FeaturedCategories/>
        <NewArrivals/>
        <PremiumCollection/>
        <Footer/>
        </>
    )
}

export default Home;