import {Helmet} from "react-helmet";
import Container from "../../../components/Container";
import Carousel from "../Carousel/Carousel";
import ExtraSection from "../ExtraSection/ExtraSection";
import Paralax from "../Paralax/Paralax";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";

const Home = () => {
    return (
        <>
            <Helmet title="SM Academy/Home" />
            <Carousel />
            <Container>
                <PopularClass />
                <Paralax heading='Music camps provide a focused and immersive environment where participants can refine their musical skills.' />
                <PopularInstructor />
                <ExtraSection />
            </Container>
        </>
    );
};

export default Home;