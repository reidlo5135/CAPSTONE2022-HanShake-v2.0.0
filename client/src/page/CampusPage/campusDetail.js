import React, {useEffect, useState} from 'react';
import "./campusdetail.css"
import AOS from "aos";
import * as tmImage from '@teachablemachine/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from 'react-router';
import gateNames from "../../utills/campusConfig";

import Hlogo from "../../asset/handshake.png";

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

const URL = "https://teachablemachine.withgoogle.com/models/DKLnLWS-K/"


export default function CampusDetail(){
    const [details, setDetails] = useState([]);
    const location = useLocation();
    const gateName = location.state;
    const name = gateNames.get(gateName);

    useEffect(()=> {
        init();
    },[])

    let model, webcam, labelContainer, maxPredictions;
    let status = '';
    let temp = 'None';
    let looping = 0;

    console.log("location : ", location);
    console.log("gateName : ", gateName);
    console.log("name : ", name);

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
                if (redbull === 'Past') {
                    window.location.href = "/campus"
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

    const getGateDetails = async () => {
        try {
            const response = await fetch(`/api/campus/gates/details/${name}`, {method: 'post'});
            const body = await response.json();
            console.log('campusDetail.js getGateDetails response : ', response);
            console.log('campusDetail.js getGateDetails body : ', body);
            setDetails(body);
            console.log('campusDetail.js getGateDetails body : ', details);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        AOS.init();
        getGateDetails();
    }, []);

    return (
        <>
        <div className='top'>
            <div className='cd-title'>
                {gateName}
            </div>

        </div>
        
        <div className='cd-contents'>
            <div className='cd-left-contents'>
                {details.map(detail => {
                    return(
                        <>       
                        <div className='cd-desc' >
                            {detail.fb1 === undefined  ? <></> : <h2 className={'dc-fb1'}>{detail.fb1}</h2>}
                            {detail.f1 === undefined  ? <></> : <h2 className={'dc-f1'}>{detail.f1}</h2>}
                            {detail.f2 === undefined  ? <></> : <h2 className={'dc-f2'}>{detail.f2}</h2>}
                            {detail.f3 === undefined  ? <></> : <h2 className={'dc-f3'}>{detail.f3}</h2>}
                            {detail.f4 === undefined  ? <></> : <h2 className={'dc-f4'}>{detail.f4}</h2>}
                            {detail.f5 === undefined  ? <></> : <h2 className={'dc-f5'}>{detail.f5}</h2>}
                            {detail.f6 === undefined ? <></> : <h2 className={'dc-f6'}>{detail.f6}</h2>}
                            {detail.f7 === undefined ? <></> : <h2 className={'dc-f7'}>{detail.f7}</h2>}

                            {detail.name !== "다산관" ? <></> : <h2 className={'campus-img'}><img src={Ds} alt="다산관"/></h2>}
                            {detail.name !== "수암관" ? <></> : <h2 className={'campus-img'}><img src={Sa} alt="수암관"/></h2>}
                            {detail.name !== "생활관" ? <></> : <h2 className={'campus-img'}><img src={Sh} alt="생활관"/></h2>}
                            {detail.name !== "율곡관" ? <></> : <h2 className={'campus-img'}><img src={Ug} alt="율곡관"/></h2>}
                            {detail.name !== "임곡관" ? <></> : <h2 className={'campus-img'}><img src={Ig} alt="임곡관"/></h2>}
                            {detail.name !== "자동차관" ? <></> : <h2 className={'campus-img'}><img src={Jd} alt="자동차관"/></h2>}
                            {detail.name !== "전산관" ? <></> : <h2 className={'campus-img'}><img src={Js} alt="전산관"/></h2>}
                            {detail.name !== "정보통신관" ? <></> : <h2 className={'campus-img'}><img src={Jb} alt="정보통신관"/></h2>}
                            {detail.name !== "퇴계관" ? <></> : <h2 className={'campus-img'}><img src={Tg} alt="퇴계관"/></h2>}
                            {detail.name !== "한림관" ? <></> : <h2 className={'campus-img'}><img src={Hl} alt="한림관"/></h2>}
                            {detail.name !== "홍지관" ? <></> : <h2 className={'campus-img'}><img src={Hg} alt="홍지관"/></h2>}
                        </div>  
                        </>
                    )})
                }
                </div>
                <div className='cd-right-contents'>
                    <div id="webcam-container">
                </div>
                </div>  
            </div>
        </>
    );
}