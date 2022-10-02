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
    let json = {};

    const getFood = async () => {
        get('/v1/api/diet', {})
            .then((response) => {
                if(response.data.code === 0) {
                    console.log("Food.js getAllDiet response.data : ", response.data);
                    console.log("Food.js getAllDiet response.data.list : ", response.data.list);
                    json = JSON.parse(JSON.stringify(response.data.list));
                    console.log("Food.js getAllDiet responseJSON : ", json);
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
                    {/*<table>*/}
                    {/*    <thead>*/}
                    {/*        <tr>*/}
                    {/*            <th>코너</th>*/}
                    {/*            <th>MON</th>*/}
                    {/*            <th>TUE</th>*/}
                    {/*            <th>WEN</th>*/}
                    {/*            <th>THU</th>*/}
                    {/*            <th>FRI</th>*/}
                    {/*        </tr>*/}
                    {/*    </thead>*/}
                    {/*    <tbody>*/}
                    {/*        {*/}
                    {/*            details.map((diet) => (*/}
                    {/*                <tr key={diet.index}>*/}
                    {/*                    <th>{diet.corner}</th>*/}
                    {/*                    <td>{diet.menu.toString()}</td>*/}
                    {/*                </tr>*/}
                    {/*            ))*/}
                    {/*        }*/}
                    {/*        <tr>*/}
                    {/*            <th>Corner2</th>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <th>Corner3</th>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <th>Corner4</th>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <th>Corner5</th>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <th>Corner6</th>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <th>Daelim Cook</th>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <th>델리버스</th>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <th>PLUS+</th>*/}
                    {/*        </tr>*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
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
                                                        <th>Daelim Cook</th>
                                                        <th>PLUS+</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        details.map((diet) => (
                                                            <tr key={diet.index}>
                                                                <td>{detail.day === diet.day ? diet.menu : "-"}</td>
                                                            </tr>
                                                        ))
                                                    }
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