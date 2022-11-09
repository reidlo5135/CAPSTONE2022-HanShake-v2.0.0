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
    
    const [foods,setFoods] = useState([]);

    const [monconer,setMonconer] = useState([]);
    const [tueconer,setTueconer] = useState([]);
    const [wedconer,setWedconer] = useState([]);
    const [thuconer,setThuconer] = useState([]);
    const [friconer,setFriconer] = useState([]);

    useEffect(()=> {
        setMonconer(details.filter((detail) => detail.day === "MON"));
        setTueconer(details.filter((detail) => detail.day === "TUE"));
        setWedconer(details.filter((detail) => detail.day === "WEN"))
        setThuconer(details.filter((detail) => detail.day === "THU"))
        setFriconer(details.filter((detail) => detail.day === "FRI"))

        setFoods([monconer,tueconer,wedconer,thuconer,friconer]);

    },[details])

    useEffect(()=> {
        console.log(foods);
    },[foods])

    const foodRender = () => {
        for (let i=0; i<foods.length; i++) {
            foods[i].map((food) => {
            return <td>{food.menu}</td>
            })
        }
    }

    /* const foodRender = () =>{
        let i=0;
        foods[i].map((food) =>{
            i++;
            food.map((foo)=>{
                return (<td>{foo.menu}</td>)
            })
        })
    } */

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
                     {foods.map(detail =>{
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