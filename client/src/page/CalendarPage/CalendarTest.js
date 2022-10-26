
import {useState,useEffect} from 'react';
import moment from 'moment';
import "./calendar.css"
import Spin from '../../asset/spin.gif'
import * as tmImage from '@teachablemachine/image';
import {useRef} from 'react';

const CalendarTest =()=>{

  const URL = "https://teachablemachine.withgoogle.com/models/DKLnLWS-K/"

  const [getMoment, setMoment]=useState(moment());

  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
  const dayList = ['일','월','화','수','목','금','토'];
  const [gateName, setGateName] = useState([]);

  let model, webcam, labelContainer, maxPredictions;
    let status = '';
    let temp = 'None';
    let looping = 0;
    let buildStatus = 0;
    
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
            }
            looping = 0;
          } else {
            looping++;
          }
          
        }
      },1000)
    
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


    const calendarArr=()=>{

      let result = [];
      let week = firstWeek;
      for ( week; week <= lastWeek; week++) {
        result = result.concat(
            <tbody className='c-tbody'>
                <tr key={week} className="c-t4">
                    {
                    Array(7).fill(0).map((data, index) => {
                        let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');

                        if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                        return(
                            <td key={index} className="c-td" >
                                <span>{days.format('D')}</span>
                            </td>
                        );
                        }else if(days.format('MM') !== today.format('MM')){
                        return(
                            <td key={index} style={{color:'#cdcdcd'}} >
                                <span>{days.format('D')}</span>
                            </td>
                        );
                        }else{
                        return(
                            <td key={index}  >
                                <span>{days.format('D')}</span>
                            </td>
                        );
                        }
                    })
                    }
                </tr>
            </tbody>
        );
      }
      return result;
    }

    function next() {
        console.log("next")
        setMoment(getMoment.clone().subtract(1, 'month')) 
    }
    
    function back() {
        console.log("back")
        setMoment(getMoment.clone().add(1, 'month')) 
    }

  return (
    <div className="App">
            <div className='C-contents'>
                <div className='C-left-contents'>
                    <div className="control">
                       {/*  <button  >이전달</button> */}
                        <span className='month'>{today.format('YYYY 년 MM 월')}</span>
                       {/*  <button  >다음달</button> */}
                    </div>
                    <table className='tc-table'>
                        <thead className='c-thead'>
                        <tr>
                        {
                            dayList.map(function(a){
                                return(
                                    <th className='c-th' key={dayList}>
                                        {a}
                                    </th>
                                )
                            })
                        }
                        </tr>
                        </thead>
                        {calendarArr()}
                    </table>
                </div>

                <div className="calendar-cam">
                    <img src={Spin}/>
                </div>
            </div>
        </div>

  );
}
export default CalendarTest;