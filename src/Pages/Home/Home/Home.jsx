import Container from "../../../components/Container";
import Carousel from "../Carousel/Carousel";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";

const Home = () => {
    return (
        <>
            <Carousel />
            <Container>
                <PopularClass />
                <PopularInstructor />
            </Container>
        </>
    );
};

export default Home;