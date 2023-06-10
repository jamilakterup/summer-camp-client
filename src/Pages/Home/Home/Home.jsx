import Container from "../../../components/Container";
import Carousel from "../Carousel/Carousel";
import ExtraSection from "../ExtraSection/ExtraSection";
import Paralax from "../Paralax/Paralax";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";

const Home = () => {
    return (
        <>
            <Carousel />
            <Container>
                <PopularClass />
                <Paralax />
                <PopularInstructor />
                <ExtraSection />
            </Container>
        </>
    );
};

export default Home;