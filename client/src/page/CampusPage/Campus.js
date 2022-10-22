import React, {useState, useEffect} from 'react';
import * as tmImage from '@teachablemachine/image';
import "./campus.css"
import {motion} from "framer-motion"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import gateNames from '../../utills/campusConfig';

import {useRef} from 'react';
import Spin from '../../asset/spin.gif'
import $ from 'jquery';

import Ds from "../../asset/Ds.png";
import Sa from "../../asset/Sa.png";
import Sh from "../../asset/Sh.png";
import Ug from "../../asset/Ug.png";
import Ig from "../../asset/Ig.png";
import Jd from "../../asset/Jd.png";
import Jb from "../../asset/Jb.png";
import Js from "../../asset/Js.png";
import Tg from "../../asset/Tg.png";
import Hl from "../../asset/Hl.png";
import Hg from "../../asset/Hg.png";
import Hlogo from "../../asset/handshake.png";


const buildArray = ['dasan','suam','sang','yul','im','car','computer','info','toi','hanrim','hongji']
let buildStatus = 0;
const URL = "https://teachablemachine.withgoogle.com/models/DKLnLWS-K/"


export default function Campus(){

    const [gateName, setGateName] = useState([]);
    let model, webcam, labelContainer, maxPredictions;
    let status = '';
    let temp = 'None';
    let looping = 0;

   

    useEffect(()=> {
        console.log("dd")
        init();
      },[])

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(500, 500, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        console.log("캠 로딩 완료")
        
        window.requestAnimationFrame(loop);
        
        let interval = setInterval(()=> {
            let redbull = status;
            console.log(looping)
            if (temp !== redbull) {
              console.log("이전값과 다릅니다.")
              looping = 0;
              temp = redbull;
            } else {
              if (looping === 3) {
                
                console.log("선택값은 " +redbull)
                if (redbull === 'Next') {
                    buildStatus++;
                    next();
                } else if (redbull === 'Back') {
                    buildStatus--;
                    back();
                } else if (redbull === 'Choice') {
                    let stat = buildArray[buildStatus];
                    choice(stat)
                    clearInterval(interval);
                    // window.location.reload();
                }
                looping = 0;
              } else {
                looping++;
              }
              
            }
          },1000)
    
        
        document.getElementById("webcam-container").innerHTML = '';
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }



   
    async function predict() {
        
        const prediction = await model.predict(webcam.canvas);
        let max = 0.0;
        let maxValue = '';
        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].probability.toFixed(2) * 100 >= max) {
              max = prediction[i].probability.toFixed(2) * 100
              maxValue = prediction[i].className;
            }
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2) * 100;
            
        }
        status = maxValue;
        
       
    }

    const sliderRef = useRef(null);

    function next() {
        console.log("next")
        sliderRef.current.slickNext();
    }
    
    function back() {
        console.log("back")
        sliderRef.current.slickPrev();
    }

    function choice(astat) {
        $("#"+astat).get(0).click();
    }

    const getGateName = async ()=> {
        try {
            const response = await fetch('/api/campus/gates', {method: 'post'});
            const body = await response.json();
            console.log('Campus.js getGateName response : ', response);
            console.log('Campus.js getGateName body : ', body);
            setGateName(body);
            console.log('gateName : ', gateName);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getGateName();
    }, []);

    const settings = {
        arrows : false,
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


                <div className='contents'>
                    <div className='left-contents'>
                        <div className='campus-slide'>
                            <Slider {...settings}>
                                {gateName.map(user =>{
                                    return (
                                        <Link to={{
                                            pathname: '/gate/details',
                                            state: user.name
                                        }} key={user.id} className="campus-link">
                                            {user.name !== "다산관" ? <></> : <div className={'campus-img'}><p>다산관</p><img src={Ds} alt="다산관" /></div>}
                                            {user.name !== "수암관" ? <></> : <div className={'campus-img'}><div>수암관</div><img src={Sa} alt="수암관"/></div>}
                                            {user.name !== "생활관" ? <></> : <div className={'campus-img'}><div>생활관</div><img src={Sh} alt="생활관"/></div>}
                                            {user.name !== "율곡관" ? <></> : <div className={'campus-img'}><div>율곡관</div><img src={Ug} alt="율곡관"/></div>}
                                            {user.name !== "임곡관" ? <></> : <div className={'campus-img'}><div>임곡관</div><img src={Ig} alt="임곡관"/></div>}
                                            {user.name !== "자동차관" ? <></> : <div className={'campus-img'}><div>자동차관</div><img src={Jd} alt="자동차관"/></div>}
                                            {user.name !== "전산관" ? <></> : <div className={'campus-img'}><div>전산관</div><img src={Js} alt="전산관"/></div>}
                                            {user.name !== "정보통신관" ? <></> : <div className={'campus-img'}><div>정보통신관</div><img src={Jb} alt="정보통신관"/></div>}
                                            {user.name !== "퇴계관" ? <></> : <div className={'campus-img'}><div>퇴계관</div><img src={Tg} alt="퇴계관"/></div>}
                                            {user.name !== "한림관" ? <></> : <div className={'campus-img'}><div>한림관</div><img src={Hl} alt="한림관"/></div>}
                                            {user.name !== "홍지관" ? <></> : <div className={'campus-img'}><div>홍지관</div><img src={Hg} alt="홍지관"/></div>}
                                        </Link>
                                    )
                                })

                                }
                            </Slider>
                        </div>
                        </div>
                   
                    <div className='right-contents'>
                        <div id="webcam-container">
                            <img src={Spin}/>
                        </div>
                    </div>
                </div>

                <div className="tuto-desc">
                    <span>캠 화면을 통해 수어를 인식합니다</span><br/>
                    <span>원하시는 위치로 넘겨보세요!</span>
                    <button onClick={()=> {
                        choice();
                    }}>asdsad</button>
                </div>
            </motion.div>
        </>
    );
}
