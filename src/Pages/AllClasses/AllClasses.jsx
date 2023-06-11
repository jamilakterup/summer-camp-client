import {Helmet} from "react-helmet";
import useMenu from "../../Hooks/useMenu";
import Container from "../../components/Container";
import Paralax from "../Home/Paralax/Paralax";
import PopularClassCard from "../Home/PopularClass/PopularClassCard";

const AllClasses = () => {
    const [menu] = useMenu();

    return (
        <Container>
            <Helmet title="SM Academy/All-Class" />
            <Paralax heading='All Classes' />
            <div className="grid md:grid-cols-3 grid-cols-1 gap-12 mb-12 mt-32">
                {
                    menu.map(item => <PopularClassCard key={item._id} item={item} />)
                }
            </div>
        </Container>
    );
};

export default AllClasses;