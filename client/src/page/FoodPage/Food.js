import React,{useEffect,useState} from 'react';
import {get} from "../../services/AxiosService";
import "./food.css"
import {motion} from "framer-motion"
import AOS from "aos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hlogo from "../../asset/handshake.png";

export default function Food(){
    const [details, setDetails] = useState([]);

    const getFood = async () => {
        get('/v1/api/diet', {})
            .then((response) => {
                console.log("Food.js getAllDiet response.data : ", response.data);
                console.log("Food.js getAllDiet response.data.list : ", response.data.list);
                setDetails(response.data.list);
            })
            .catch((err) => {
                alert(err);
            });
    }

    useEffect(() => {
        AOS.init();
        getFood();
        console.log(details);
      }, []);

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      
    return (
        <>
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
        >
            <div className='f-logo'>
                <img src={Hlogo} alt="handshake 로고" className='h-logo'/>
            </div>
            <div className='f-contents'>
                <div className='f-left-contents'>
                <Slider {...settings}>
                    {details.map(detail =>{
                                    return (
                                        <div className="f-container">
                                            <div className='food-title' key={1}>
                                                {detail.day}
                                            </div>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Corner1</th>
                                                        <th>Corner2</th>
                                                        <th>Corner3</th>
                                                        <th>Corner4</th>
                                                        <th>Corner5</th>
                                                        <th>Corner6</th>
                                                        <th>PLUS+</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                    {details.map((it)=> (
                                                        <td>{detail.corner === undefined? "-"  : detail.corner1}</td>        
                                                    ))}
                                                    </tr>
                                                </tbody>
                                        </table>
                                        </div>
                                    )
                                })
                            }
                </Slider>
                </div>
                <div className='f-right-contents'>
                    <div className="campus-cam">
                        
                    </div>
                </div> 
            </div>     
            
            </motion.div>
        </>
    );
}