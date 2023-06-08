import img1 from '../../../assets/img1.png';
import img2 from '../../../assets/img2.png';
import img3 from '../../../assets/img3.png';
import img5 from '../../../assets/img5.jpg';


const Carousel = () => {
    return (
        <div className="carousel w-full">
            <div id="slide1" className="flex-col-reverse md:flex-row carousel-item relative md:h-full h-[50vh] w-full bg-green-100">
                <div className='w-full md:w-1/2 md:ps-24 flex items-center justify-center md:mb-0 md:mt-0 mt-4 mb-10'>
                    <h1 className="md:text-5xl font-bold"> Let the music of summer camp be the soundtrack <br /> of your adventure!</h1>
                </div>
                <img src={img2} className="w-full md:w-1/2 md:h-[415px] h-[240px] md:mt-24" />

                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="flex-col-reverse md:flex-row carousel-item relative w-full bg-green-100">
                <div className='w-full md:w-1/2 md:ps-24 flex items-center justify-center md:mb-0 md:mt-0 mt-4  mb-12'>
                    <h1 className="md:text-5xl font-bold"> Let the music of summer camp be the soundtrack <br /> of your adventure!</h1>
                </div>
                <img src={img2} className="w-full md:w-1/2 md:h-[415px] h-[240px] md:mt-24" />

                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="flex-col-reverse md:flex-row carousel-item relative w-full bg-green-100">
                <div className='w-full md:w-1/2 md:ps-24 flex items-center justify-center md:mb-0 md:mt-0 mt-4  mb-12'>
                    <h1 className="md:text-5xl font-bold"> Let the music of summer camp be the soundtrack <br /> of your adventure!</h1>
                </div>
                <img src={img2} className="w-full md:w-1/2 md:h-[415px] h-[240px] md:mt-24" />

                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide4" className="flex-col-reverse md:flex-row carousel-item relative w-full bg-green-100">
                <div className='w-full md:w-1/2 md:ps-24 flex items-center justify-center md:mb-0 md:mt-0 mt-4  mb-12'>
                    <h1 className="md:text-5xl font-bold"> Let the music of summer camp be the soundtrack <br /> of your adventure!</h1>
                </div>
                <img src={img2} className="w-full md:w-1/2 md:h-[415px] h-[240px] md:mt-24" />

                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Carousel;