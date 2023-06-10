import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {useEffect, useState} from "react";
import PopularClassCard from "./PopularClassCard";

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

            <div className="grid md:grid-cols-3 grid-cols-1 gap-12 mb-20">
                {
                    classes.map(item => <PopularClassCard key={item._id} item={item} />)
                }
            </div>
        </div>
    );
};

export default PopularClass;