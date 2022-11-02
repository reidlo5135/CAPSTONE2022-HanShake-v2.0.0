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

    const monconer = details.filter((detail) => detail.day === "MON");
    const tueconer = details.filter((detail) => detail.day === "TUE");
    const wedconer = details.filter((detail) => detail.day === "WED");
    const thuconer = details.filter((detail) => detail.day === "THU");
    const friconer = details.filter((detail) => detail.day === "FRI");

    var foods = [monconer,tueconer,wedconer,thuconer,friconer];

    const foodRender = () =>{
        for (let i=0; i<foods.length; i++) {
        foods.map((food) => ( 
            <th>{food.menu}</th>
        ))
     }
    }
    ///이름을 배열로

    const corner = {
        "MON" : [],
        "TUE" : [],
        "WEN" : [],
        "THU" : [],
        "FRI" : [],
    }


    const getFood = () => {
        get('/v1/api/diet', {})
            .then((response) => {
                if(response.data.code === 0) {
                    setDetails(response.data.list);
                }
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

    useEffect(()=> {
        if (details.length != 0) {
            for (let i=0; i<details.length; i++) {
                let string = details[i].day;
                corner[string].push(details[i]);
             }
             console.log(corner)
        }
        
    },[details])

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
                                            <div className='food-title' key={detail.index}>
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
                                                        <th>Daelim Cook</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                <tr key={detail.index}>
                                                    {foodRender()}
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