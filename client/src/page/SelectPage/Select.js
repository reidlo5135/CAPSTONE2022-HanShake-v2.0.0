import intro from '../../asset/intro_campus.png'
import monthCalandar from '../../asset/month_calandar.png'
import todayMeal from '../../asset/today_meal.png'
import * as tmImage from '@teachablemachine/image';
import {useEffect} from 'react';
import Spin from '../../asset/spin.gif'
import './select.css'
import { Link } from "react-router-dom";

const URL = "https://teachablemachine.withgoogle.com/models/riXpFHlAu/";

export default function Select () {

    let model, webcam, labelContainer, maxPredictions;
    let status = '';
    let temp = 'None';
    let looping = 0;

    function timeTable() {
        setInterval(()=> {
            let redbull = status;
            console.log(looping)
            if (temp !== redbull) {
              console.log("이전값과 다릅니다.")
              looping = 0;
              temp = redbull;
            } else {
              if (looping === 6) {
                
                console.log("선택값은 " +redbull)
                if (redbull === 'A') {
                    window.location.href = "/campus"
                }
                looping = 0;
              } else {
                looping++;
              }
              
            }
          },1000)
    }
    
    useEffect(()=> {
        console.log("dd")
        init();
      },[])

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(600, 600, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        console.log("캠 로딩 완료")
        
        window.requestAnimationFrame(loop);
        

        // append elements to the DOM
        document.getElementById("webcam-container").innerHTML = '';
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        timeTable();
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }



    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
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
            // labelContainer.childNodes[i].innerHTML = classPrediction;
        }
        status = maxValue;
        
       
    }

    
    return (
        <>
          <div className='select'>
            <div className='select-content'>
                <div className='select-block'>
                  <Link className="block1 block" to="/campus">
                    <img src={intro}/>
                  </Link>
                  <Link className="block2 block" to="/food">
                    <img src={todayMeal}/>
                  </Link>
                  <Link className="block3 block" to="/calendar">
                    <img src={monthCalandar}/>
                  </Link>
                  <Link className="block4 block" to="/">
                    <img src={intro}/>
                  </Link>
                </div>
                <div className="webcam">
                  <div id="webcam-container">
                      <img src={Spin}/>
                  </div>
                  {/* <div id="label-container"></div> */}
                </div>
            </div>
          </div>   
        </>
    )

}