import {useEffect, useState} from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import InstructorCard from "./InstructorCard";

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('class.json')
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])

    return (
        <div>
            <SectionTitle heading='Popular Instructors' subHeading='Our Experts' />

            <div className="grid md:grid-cols-3 grid-cols-1 gap-12 mb-20">
                {
                    instructors.map(item => <InstructorCard key={item._id} item={item} />)
                }
            </div>
        </div>
    );
};

export default PopularInstructor;