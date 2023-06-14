

const SectionTitle = ({subHeading, heading}) => {
    return (
        <div className="md:w-1/3 text-center mx-auto my-12">
            <p className="text-[#33d66f]">{subHeading}</p>
            <h3 className="text-[#1F2937] text-4xl font-bold border-y-4 py-3">{heading}</h3>
        </div>
    );
};

export default SectionTitle;