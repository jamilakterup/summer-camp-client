import {useEffect, useState} from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import InstructorCard from "./InstructorCard";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

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

            <div className="grid md:grid-cols-3 grid-cols-1 gap-12 mb-12">
                {
                    instructors.sort((a, b) => b.students - a.students).slice(0, 6).map(item => <InstructorCard key={item._id} item={item} />)
                }
            </div>
            <div className="text-center mb-28">
                <Link to='/instructors'><Button style={{backgroundColor: '#f0f0f0', color: '#000', marginBottom: '10px'}} variant="contained">See All Instructors</Button></Link>
            </div>
        </div>
    );
};

export default PopularInstructor;