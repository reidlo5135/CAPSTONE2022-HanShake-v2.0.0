import React,{useEffect, useState} from 'react';
import "./calendar.css"
import {motion} from "framer-motion"
import AOS from "aos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from 'react-router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hlogo from "../../asset/handshake.png";


export default function Calendar(){
    const [details, setDetails] = useState([]);
    var numbers = []
    for(var i = 1; i < 31; i++) {
		numbers.push(i);
}

  const location = useLocation();
  console.log("location : ",location);
  
  const getSchedules = async () => {
    try {
        const response = await fetch('/api/schedule/all', {method: 'post'});
        const body = await response.json();
        console.log('calendar.js getSchedules response : ', response);
        console.log('calendar.js getSchedules body : ', body);
        setDetails(body);
        console.log('calendar.js getSchedules body : ', details);
    } catch (error) {
        console.error(error);
    }
}

useEffect(() => {
    AOS.init();
    getSchedules();
    console.log(details)
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
        
            <div className='C-contents'>
                <div className='C-left-contents'>
                <Slider {...settings}>
                <div className='month'>6월</div>
                <div className="c-container">
                    <table className='tc-table'>
                        <thead className='c-thead'>
                            <tr className='c-tr'>
                                <th className='c-th'>Sun</th>
                                <th className='c-th'>Mon</th>
                                <th className='c-th'>Tue</th>
                                <th className='c-th'>Wed</th>
                                <th className='c-th'>Thu</th>
                                <th className='c-th'>Fri</th>
                                <th className='c-th'>Sat</th>
                            </tr>
                        </thead>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>28</td>
                                <td className='c-td'>29</td>
                                <td className='c-td'>30</td>
                                <td className='c-td'>31</td>
                                <td className='c-td'>1 {details.map(detail => {return(<><div className='cl-desc' >{detail.d1 === undefined  ? <></> : <h2 className={'cl-d1'}>{detail.d1}</h2>}</div></>)})}</td>
                                <td className='c-td'>2</td>
                                <td className='c-td'>3</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody' >
                            <tr className='c-t4'>
                                <td className='c-td'>4</td>
                                <td className='c-td'>5</td>
                                <td className='c-td'>6{details.map(detail => {return(<><div className='cl-desc' >{detail.d6 === undefined  ? <></> : <h2 className={'cl-d6'}>{detail.d6}</h2>}</div></>)})}</td>
                                <td className='c-td'>7</td>
                                <td className='c-td'>8{details.map(detail => {return(<><div className='cl-desc' >{detail.d8 === undefined  ? <></> : <h2 className={'cl-d8'}>{detail.d8}</h2>}</div></>)})}</td>
                                <td className='c-td'>9{details.map(detail => {return(<><div className='cl-desc' >{detail.d9 === undefined  ? <></> : <h2 className={'cl-d9'}>{detail.d9}</h2>}</div></>)})}</td>
                                <td className='c-td'>10{details.map(detail => {return(<><div className='cl-desc' >{detail.d10 === undefined  ? <></> : <h2 className={'cl-d10'}>{detail.d10}</h2>}</div></>)})}</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>11</td>
                                <td className='c-td'>12</td>
                                <td className='c-td'>13{details.map(detail => {return(<><div className='cl-desc' >{detail.d13 === undefined  ? <></> : <h2 className={'cl-d13'}>{detail.d13}</h2>}</div></>)})}</td>
                                <td className='c-td'>14{details.map(detail => {return(<><div className='cl-desc' >{detail.d14 === undefined  ? <></> : <h2 className={'cl-d14'}>{detail.d14}</h2>}</div></>)})}</td>
                                <td className='c-td'>15{details.map(detail => {return(<><div className='cl-desc' >{detail.d15 === undefined  ? <></> : <h2 className={'cl-d15'}>{detail.d15}</h2>}</div></>)})}</td>
                                <td className='c-td'>16{details.map(detail => {return(<><div className='cl-desc' >{detail.d16 === undefined  ? <></> : <h2 className={'cl-d16'}>{detail.d16}</h2>}</div></>)})}</td>
                                <td className='c-td'>17{details.map(detail => {return(<><div className='cl-desc' >{detail.d17 === undefined  ? <></> : <h2 className={'cl-d17'}>{detail.d17}</h2>}</div></>)})}</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>18</td>
                                <td className='c-td'>19</td>
                                <td className='c-td'>20</td>
                                <td className='c-td'>21{details.map(detail => {return(<><div className='cl-desc' >{detail.d21 === undefined  ? <></> : <h2 className={'cl-d21'}>{detail.d21}</h2>}</div></>)})}</td>
                                <td className='c-td'>22{details.map(detail => {return(<><div className='cl-desc' >{detail.d22 === undefined  ? <></> : <h2 className={'cl-d22'}>{detail.d22}</h2>}</div></>)})}</td>
                                <td className='c-td'>23{details.map(detail => {return(<><div className='cl-desc' >{detail.d23 === undefined  ? <></> : <h2 className={'cl-d23'}>{detail.d23}</h2>}</div></>)})}</td>
                                <td className='c-td'>24{details.map(detail => {return(<><div className='cl-desc' >{detail.d24 === undefined  ? <></> : <h2 className={'cl-d24'}>{detail.d24}</h2>}</div></>)})}</td>
                            </tr>
                        </tbody>
                        <tbody className='c-tbody'>
                            <tr className='c-t4'>
                                <td className='c-td'>25</td>
                                <td className='c-td'>26</td>
                                <td className='c-td'>27{details.map(detail => {return(<><div className='cl-desc' >{detail.d27 === undefined  ? <></> : <h2 className={'cl-d27'}>{detail.d27}</h2>}</div></>)})}</td>
                                <td className='c-td'>28{details.map(detail => {return(<><div className='cl-desc' >{detail.d28 === undefined  ? <></> : <h2 className={'cl-d28'}>{detail.d28}</h2>}</div></>)})}</td>
                                <td className='c-td'>29{details.map(detail => {return(<><div className='cl-desc' >{detail.d29 === undefined  ? <></> : <h2 className={'cl-d29'}>{detail.d29}</h2>}</div></>)})}</td>
                                <td className='c-td'>30{details.map(detail => {return(<><div className='cl-desc' >{detail.d30 === undefined  ? <></> : <h2 className={'cl-d30'}>{detail.d30}</h2>}</div></>)})}</td>
                                <td className='c-td'>31</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </Slider>
                </div>

                <div className='C-right-contents'>
                    <div className="campus-cam">
                        
                    </div>
                </div> 
            </div>    
            
            </motion.div>
        </>
    );
}