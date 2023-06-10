import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import PopularClassCard from "./PopularClassCard";
import {Button} from "@mui/material";
import useMenu from "../../../Hooks/useMenu";
import {Link} from "react-router-dom";

const PopularClass = () => {
    const [menu] = useMenu();

    return (
        <div>
            <SectionTitle heading='Popular Classes' subHeading='Our Programs' />

            <div className="grid md:grid-cols-3 grid-cols-1 gap-12 mb-12">
                {
                    menu.sort((a, b) => b.students - a.students).slice(0, 6).map(item => <PopularClassCard key={item._id} item={item} />)
                }
            </div>
            <div className="text-center mb-28">
                <Link to='/allClass'><Button style={{backgroundColor: '#f0f0f0', color: '#000', marginBottom: '10px'}} variant="contained">See All Classes</Button></Link>
            </div>
        </div>
    );
};

export default PopularClass;