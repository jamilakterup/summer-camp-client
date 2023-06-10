import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {useEffect, useState} from "react";
import PopularClassCard from "./PopularClassCard";
import {Button} from "@mui/material";

const PopularClass = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetch('class.json')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    return (
        <div>
            <SectionTitle heading='Popular Classes' subHeading='Our Programs' />

            <div className="grid md:grid-cols-3 grid-cols-1 gap-12 mb-12">
                {
                    classes.sort((a, b) => b.students - a.students).slice(0, 6).map(item => <PopularClassCard key={item._id} item={item} />)
                }
            </div>
            <div className="text-center mb-28">
                <Button style={{backgroundColor: '#f0f0f0', color: '#000', marginBottom: '10px'}} variant="contained">See All Classes</Button>
            </div>
        </div>
    );
};

export default PopularClass;