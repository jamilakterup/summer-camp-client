import {Helmet} from "react-helmet";
import useMenu from "../../Hooks/useMenu";
import Container from "../../components/Container";
import Paralax from "../Home/Paralax/Paralax";
import InstructorCard from "../Home/PopularInstructor/InstructorCard";

const AllInstructors = () => {
    const [menu] = useMenu();
    return (
        <Container>
            <Helmet title="SM Academy/Instructors" />
            <Paralax heading='Our Renowned Instructors' />
            <div className="grid md:grid-cols-3 grid-cols-1 gap-12 mb-12 mt-32">
                {
                    menu.map(item => <InstructorCard key={item._id} item={item} />)
                }
            </div>
        </Container>
    );
};

export default AllInstructors;