
import intro from '../../asset/intro_campus.png'
import monthCalandar from '../../asset/month_calandar.png'
import todayMeal from '../../asset/today_meal.png'
import * as tmImage from '@teachablemachine/image';
import {useEffect} from 'react';
import Spin from '../../asset/spin.gif'

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
          <div style ={{width : "100vw", height : "100vh"}}>
         
            <div style={{display : "flex",width : "100vw", height : "100vh", justifyContent : "space-around", alignItems : "center"}}>
                <div style={{width : "50px", height : "10px"}}></div>
                <div style={{ display : "grid", width : "40vw", height : "80vh", justifyItems : "center", alignItems : "center"}}>
                    <img style ={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px", borderRadius : "48px", gridColumnStart:"1" , gridColumnEnd:"2",gridRowStart:"1",gridRowEnd:"2" }} src={intro} width = "320px"/>
                    <img style ={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px", borderRadius : "48px",gridColumnStart:"2" , gridColumnEnd:"3",gridRowStart:"1",gridRowEnd:"2" }} src={todayMeal} width = "320px"/>
                    <img style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px", borderRadius : "48px",}} src={monthCalandar} width = "320px"/>
                    <img style = {{boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px", borderRadius : "48px",}} src={intro} width = "320px"/>
        
                </div>
             <div style={{  display : "flex" , justifyContent : "center", alignItems : "center",width : "40vw", height : "80vh"}}>
                <div id="webcam-container">
                    <img src={Spin}/>
                </div>
                {/* <div id="label-container"></div> */}
             </div>
             <div style={{width : "50px", height : "10px"}}></div>

            </div>

            </div>
            
            
        </>
    )

}