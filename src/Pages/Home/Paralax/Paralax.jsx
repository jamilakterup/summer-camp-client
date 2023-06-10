import './Paralax.css';

const Paralax = ({heading}) => {
    return (
        <div className="parallax bg-fixed">
            <h2 className='md:text-5xl font-bold text-center p-6 md:p-32 bg-black opacity-90 text-white'>{heading}</h2>
        </div>
    );
};

export default Paralax;