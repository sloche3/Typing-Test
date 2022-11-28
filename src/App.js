import React from 'react';
import ReactDOM from 'react-dom/client';
import Fade from 'react-reveal/Fade';
import './App.css';
import { WebGazeContext } from './WebGazeContext';
import Script from 'react-load-script'

declare var GazeCloudAPI;

// typing test prompt
// this is used on the display, for the user to type
let prompt = ["Days are not of equal value in one's life.", "Some bring happiness while others bring sadness.", "Sadness and happiness both are equally important to man's life,", "since they are the two sides of a coin.", "As we cannot forget the happiest day,", "we are unable to forget the saddest day of our life too.", "The saddest day of my life was the Diwali Day.", "Diwali is considered to be a happy festival and till last Diwali,", "it was my favorite festival. On last Diwali, my sister,", "my brother and I were busy lighting the fireworks.", "I was holding a 'fuljhari' in my hand and unfortunately", "my younger brother, who was standing just beside me,", "had a cracker in his hand. This cracker caught fire and", "a very loud explosion was heard which shook my sister and me.", "After that, we all could think of nothing else than", "blood stained cotton, bandage, dettol etc.", "My cousin took my brother to the doctor where he got", "14 stitches in his forefinger and thumb. But at home,", "everybody kept cursing and blaming me for the mishap.", "That night, I could not sleep and I cried a lot.", "For the next few days, I bore the burden of", "this blame for being responsible for this unfortunate incident.", "I had a deeply guilty conscious which I was able to", "overcome after a long time."]

// this is used for checking the spelling of words
let promptWords = ['Days', 'are', 'not', 'of', 'equal', 'value', 'in', "one's", 'life.', 'Some', 'bring', 'happiness', 'while', 'others', 'bring', 'sadness.', 'Sadness', 'and', 'happiness', 'both', 'are', 'equally', 'important', 'to', "man's", 'life,', 'since', 'they', 'are', 'the', 'two', 'sides', 'of', 'a', 'coin.', 'As', 'we', 'cannot', 'forget', 'the', 'happiest', 'day,', 'we', 'are', 'unable', 'to', 'forget', 'the', 'saddest', 'day', 'of', 'our', 'life', 'too.', 'The', 'saddest', 'day', 'of', 'my', 'life', 'was', 'the', 'Diwali', 'Day.', 'Diwali', 'is', 'considered', 'to', 'be', 'a', 'happy', 'festival', 'and', 'till', 'last', 'Diwali,', 'it', 'was', 'my', 'favorite', 'festival.', 'On', 'last', 'Diwali,', 'my', 'sister,', 'my', 'brother', 'and', 'I', 'were', 'busy', 'lighting', 'the', 'fireworks.', 'I', 'was', 'holding', 'a', "'fuljhari'", 'in', 'my', 'hand', 'and', 'unfortunately', 'my', 'younger', 'brother,', 'who', 'was', 'standing', 'just', 'beside', 'me,', 'had', 'a', 'cracker', 'in', 'his', 'hand.', 'This', 'cracker', 'caught', 'fire', 'and', 'a', 'very', 'loud', 'explosion', 'was', 'heard', 'which', 'shook', 'my', 'sister', 'and', 'me.', 'After', 'that,', 'we', 'all', 'could', 'think', 'of', 'nothing', 'else', 'than', 'blood', 'stained', 'cotton,', 'bandage,', 'dettol', 'etc.', 'My', 'cousin', 'took', 'my', 'brother', 'to', 'the', 'doctor', 'where', 'he', 'got', '14', 'stitches', 'in', 'his', 'forefinger', 'and', 'thumb.', 'But', 'at', 'home,', 'everybody', 'kept', 'cursing', 'and', 'blaming', 'me', 'for', 'the', 'mishap.', 'That', 'night,', 'I', 'could', 'not', 'sleep', 'and', 'I', 'cried', 'a', 'lot.', 'For', 'the', 'next', 'few', 'days,', 'I', 'bore', 'the', 'burden', 'of', 'this', 'blame', 'for', 'being', 'responsible', 'for', 'this', 'unfortunate', 'incident.', 'I', 'had', 'a', 'deeply', 'guilty', 'conscious', 'which', 'I', 'was', 'able', 'to', 'overcome', 'after', 'a', 'long', 'time.']

// variables used to coordinate various things across the components
let time = 60
let changeText = false
let textBank = []
let promptIndex = 0
let stopPushing = false
let eyesY = 0

// decrements the timer
function startTimer(){
  if (time > 0){
    time -= 1
    setTimeout(startTimer, 1000)
  }
}


class Typing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textHolder: "", // sample message
      refresh: 0,
      timeStart: false,
      clearText: false
    };
  }

  // refresh and componentDidMount() refresh the component every millisecond 
  refresh(){
    let { refresh } = this.state;
    this.setState({ refresh });
  }

  componentDidMount(){
    setInterval(this.refresh.bind(this), 1);
  }

  // updates the timer on the display
  countDown(){
    if (this.state.timeStart){
      if(time > 9){
        return <span>{`0:${time}`}</span>
      }
      else{
        return <span>{`0:0${time}`}</span>
      }
    }
    else{
      return <span>1:00</span>
    }
  }

  // starts the times when the user starts typing and updates the 
  // textHolder (for the display) with everything the user types
  handleInput = (event) => {
    if (!this.state.timeStart){
      startTimer()
    }

    this.state.timeStart = true
    this.state.textHolder = event.target.value;
  };

  // updates the display with the text inside the textHolder
  // also pushes completed words into the user's textBank
  compare(usrInput){
    let currPrompt = prompt[promptIndex].split(" ")
    let currUserInput = usrInput.split(" ")
    let userInputToDisplay = []

    // if the timer hits 0, the current words are added to the user's
    // textBank and the stopPushing bool is changed, so that nothing 
    // else is added to the user's textBank
    if (time == 0 && !stopPushing){
      for (let i = 0; i < currUserInput.length; i++){
        textBank.push(currUserInput[i])
      }
      stopPushing = true
      this.state.clearText = true

      this.state.textHolder = ""
    }

    // if the number of words in the textHolder is the same
    // as the number of words in the current prompt line,
    // the user's textHolder is emptied into their textBank
    else if (currUserInput.length == currPrompt.length + 1){
      changeText = true 
      for (let i = 0; i < currUserInput.length-1; i++){
        textBank.push(currUserInput[i])
      }
      this.state.clearText = true

      this.state.textHolder = ""
    }

    // updates the colors of the words the user has typed
    for (let i = 0; i < currUserInput.length; i++){
      if (currUserInput[i] == currPrompt[i]){
        userInputToDisplay.push(<span style={{ color: "blue" }}>{`${currUserInput[i]} `}</span>)
      }
      else{
        userInputToDisplay.push(<span style={{ color: "red" }}>{`${currUserInput[i]} `}</span>)
      }
    }
    return userInputToDisplay
  }

  // returns the user's input box / clears the input box
  inputBox(){
    if (this.state.clearText){
      this.state.clearText = false
      return
    }
    else{
      return <input className="inputBox" autoFocus onChange={this.handleInput} type="text" placeholder="Type here..."/>
    }
  }

  // if the user is looking at the keyboard, display a "LOOK UP" message
  checkEyes(){
    if (eyesY >= 400){
      return <span style={{ color: "red" }}><b>LOOK UP</b></span>
    }
  }

  // renders all the elements of this component
  render(){
    const { textHolder, colors, refreshRate } = this.state;

    return (
      <div>

        {this.compare(textHolder)}

        <br/>
        <br/>

        {this.inputBox()}

        <br/>
        <br/>

        {this.countDown()}

        <br/>
        <br/>

        {this.checkEyes()}

      </div>
    );
  }
}

// this is for the integration of the eye trackers api
class GazeCloudAPILoader extends React.Component {
    constructor() {
        super();
        this.state = {
            context: { x: -1, y: -1 }
        };
    }

    handleScriptLoad() {

        function processGaze(GazeData) {
            var x_ = GazeData.docX;
            var y_ = GazeData.docY;
            //document.getElementById("gazeX").innerHTML = x_;//GazeData.GazeX;
            //document.getElementById("gazeY").innerHTML = y_;//GazeData.GazeY;

            this.setState({ context: { x: x_, y: y_ } });

            /*var gaze = document.getElementById("gaze");
            x_ -= gaze.clientWidth / 2;
            y_ -= gaze.clientHeight / 2;
            */

             //console.log(x_, y_);
             eyesY = y_

             /*
            gaze.style.left = x_ + "px";
            gaze.style.top = y_ + "px";

            if (GazeData.state !== 0) {
                if (gaze.style.display === 'block')
                    gaze.style.display = 'none';
            } else {
                if (gaze.style.display === 'none')
                    gaze.style.display = 'block';
            }*/


        }
        GazeCloudAPI.OnCalibrationComplete = function () {
            console.log('gaze Calibration Complete');
        }
        GazeCloudAPI.OnCamDenied = function () { console.log('camera access denied') }
        GazeCloudAPI.OnError = function (msg) { console.log('err: ' + msg) }
        GazeCloudAPI.UseClickRecalibration = true;
        GazeCloudAPI.OnResult = processGaze.bind(this);

    }

    handleScriptError() {
        console.log('Script loading Error!');
    }

    render() {
        return (
            <WebGazeContext.Provider value={this.state.context}>
                <Script
                    url="https://api.gazerecorder.com/GazeCloudAPI.js"
                    onLoad={this.handleScriptLoad.bind(this)}
                    onError={this.handleScriptError.bind(this)}
                />
                <button className="startTracking" onClick={() => GazeCloudAPI.StartEyeTracking()}> Start Eye Tracking </button>
                <button className="stopTracking" onClick={() => GazeCloudAPI.StopEyeTracking()}> Stop Eye Tracking </button>
            </WebGazeContext.Provider>

        );
    }
}

class TypingTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: 0
    };
  }

  // refresh and componentDidMount() refresh the component every second 
  refresh(){
    let { refresh } = this.state;
    this.setState({ refresh });
  }

  componentDidMount(){
    setInterval(this.refresh.bind(this), 1000);
  }

  // returns the display for the next prompt in the "queue"
  nextText(){
    if (promptIndex == prompt.length - 1){
      return 
    }
    else{
      return <span className="no-select">{`${prompt[promptIndex+1]}`}</span>
    }
  }

  // returns the display for the current prompt 
  currText(){
    if (changeText){
      changeText = false
      promptIndex += 1
      return <span className="currText"><Fade top>{`${prompt[promptIndex]}`}</Fade></span>
    }
    else{
      return <span className="currText">{`${prompt[promptIndex]}`}</span>
    }
  }

  // when the timer hits 0 the user's results are calculated and returned
  endTest(){
    let misspelledWords = 0
    let wordsTyped = 0
    if (time == 0){
      for (let i = 0; i < textBank.length; i++){
        wordsTyped += 1
        if (textBank[i] != promptWords[i]){
          misspelledWords += 1
        }
      }
    
      let accuracy = misspelledWords / wordsTyped
      let WPM = wordsTyped * (1 - accuracy)

      return <span>{`${wordsTyped} words typed * ${Math.floor((1-accuracy) * 100)}% accuracy = ${Math.floor(WPM)}wpm`}</span>
    }
  }

  // takes 5 seconds off the users time when they're looking at the keyboard
  checkEyes(){
    if (eyesY >= 400 && time != 60){
      if (time-5 < 0){
        time = 0
      }
      else{
        time -= 5
      }
    }
  }

  // returns the user display for before and after time runs out
  checkTime(){
    if (time != 0){
      return <div className="grid-item">

        <br/>

        {this.checkEyes()}

        {this.nextText()}

        <br/>
        <br/>
        <br/>

        {this.currText()}

        <br/>
        <br/>
        <br/>

        <Typing />

        <br/>
        <br/>
        <br/>

        <GazeCloudAPILoader />

        <br/>
        <br/>
        <br/>
        <br/>
        <div className="instructions">
          Type as much as you can before the time runs out.
          <br/>
          <br/>
          Red means a word is misspelled, blue means the word spelling is correct.
          <br/>
          <br/>
          Type the text in the grey box, the text above will then move into the grey box and so on.
          <br/>
          <br/>
          To use the eye trackers, press the "Start Eye Tracking" button before typing.
          <br/>
          <br/>
          5 seconds will be removed from the timer each time you look at the keyboard when using the eye trackers.  
        </div>


      </div>

    }
    else{
      return <div className="grid-item">
        <br/>
        <br/>
        Words Typed * Accuracy = WPM
        <br/>
        <br/> 
        {this.endTest()}
        <br/>
        <br/>
        <button className="retry" onClick={() => window.location.reload(false)}>Retry</button>
      </div>
    }
  }

  // renders all the elements of this component
  render(){
    return (
      <div className="grid-container">
        {this.checkTime()}
      </div>
    );
  }
}

export default TypingTest;
