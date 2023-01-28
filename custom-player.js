// grab element references and save in variables 

// video element
const media = document.querySelector('video');

// div containing controls 
const controls = document.querySelector('.controls');

// <button> element references

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

// timer wrapping <div>; inner <div> and <span>

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');


// removes the default browser controls 
media.removeAttribute('controls');

// makes the custom controls visible
controls.style.visibility = 'visible';


// JS to play and pause video

// invokes playPauseMedia() when the play button is clicked || function hoisting 
play.addEventListener('click', playPauseMedia);

// define playPauseMedia()

function playPauseMedia() {

  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);

  // media.paused returns a boolean that indicates whether the media element is paused 
  if (media.paused) {

    // if paused, we set the data-icon to 'u' to represent paused state
    play.setAttribute('data-icon', 'u');

    // invoke .play() method of HTMLMediaElement. Method returns a Promise which is resolved when playback has been succesful. 
    media.play();
  } else {

    // if not paused, set data-icon attribute to 'P' to represent play state
    play.setAttribute('data-icon', 'P');
    // invoke .pause() method of HTMLMediaElement
    media.pause();
  };
};

// Stopping video

function stopMedia() {
  // invoke .pause() method as there is no .stop() method; pauses the video
  media.pause();

  // sets value of currentTime property to 0
  media.currentTime = 0;

  // sets the value of the data-icon attribute to 'P' to indicate play state if clicked || keeping media ready to play
  play.setAttribute('data-icon', 'P');

  // Fixing play and pause
  // without below, play/pause/stop buttons won't work if they are pressed while the rwd or fwd functionality is active
  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
};

// invoke stopMedia() once user clicks stop button
stop.addEventListener('click', stopMedia);

// invoke stopMedia() again ?? once the video is ended as we want video to stop when finished OR user clicks stop button
media.addEventListener('ended', stopMedia);


// Seeking back and forth: wiring up the rewind and forward buttons

// event listeners on RWD/FWD buttons
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

// event handler functions
// initialize two global variables
let intervalRwd;
let intervalFwd;

function mediaBackward() {
  /*
  // pass in global variable internalFwd as param
  // this clears any classes/intervals that are set on the fast forward functionality
  // we do this because if we press the rwd button after pressing the fwd button, we want to cancel any forward functionality and replace it with rewind
  // otherwise we break the player
  clearInterval(internalFwd);

  // invoke .remove() method on the classList read-only property, targetting 'active' class
  fwd.classList.remove('active');
  
  Removed: this functionality is implemented in stopMedia() and playPauseMedia() functions above...
  */

  // IF statement block 
  // we check if .active class has been set on the rwd button; this happens if button already pressed
  // .contains() method returns boolean
  if (rwd.classList.contains('active')) {

    // if true, remove from rwd button classList
    rwd.classList.remove('active');
    // clear interval that was set when button was pressed 
    clearInterval(intervalRwd);
    // invoke play to cancel the rewind and start the video playing normally 
    media.play();
  } else {

    // if active hasn't been set yet, we add it to the classList
    rwd.classList.add('active');
    // pause the video
    media.pause();
    // set the internalRwd variable to equal a setInterval() call, which in turn calls our windBackward() function every 200 milliseconds
    intervalRwd = setInterval(windBackward, 200);
  }
};

// works exactly like the above function, only in reverse
function mediaForward() {
  /*
  // pass in global variable internalRwd as param to clearInterval() method
  clearInterval(internalRwd);
  fwd.classList.remove('active');

  Removed: this functionality is implemented in stopMedia() and playPauseMedia() functions above...
  */
  if (fwd.classList.contains('active')) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add('active');
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
};

/* Define windBackward and windForward hoisted function calls */

function windBackward() {
  // IF statement checks whether current time is less than 3 seconds, i.e. if rewinding by another 3 secs will take it back past the start of video. 
  if (media.currentTime <= 3) {
    // if this is true, we remove 'active' from rwd button class list
    rwd.classList.remove('active');
    // clear any internal on internalRwd otherwise the video would just keep rewinding forever. 
    clearInterval(intervalRwd);
    // and stop the media from playing.
    stopMedia();
  } else {

    // if false, meaning current time is not within 3 seconds of the start of the video, 
    media.currentTime -= 3;
  }
};

function windForward() {
  if (media.currentTime <= 3) {
    /*
    fwd.classList.remove('active');
    clearInterval(internalFwd);
    */
    stopMedia();
  } else {
    media.currentTime += 3;
  }
};

// Updating the elapsed time


media.addEventListener('timeupdate', setTime);

function setTime() {
  // we work out the number of minutes and seconds in the media.currentTime property
  const minutes = Math.floor(media.currentTime / 60);
  const seconds = Math.floor(media.currentTime - minutes * 60);

  // initialize two more variables; assign them the value of invoking .toString().padStart(2, '0') on minutes/seconds respectively
  // .padStart() here makes each value 2 characters long, even if numerical value is single digit - helps make elapsed time more visually apparent
  const minuteValue = minutes.toString().padStart(2, '0');
  const secondValue = seconds.toString().padStart(2, '0');

  // the actual time to display is initialised in value mediaTime, with the format specified within template literal
  const mediaTime = `${minuteValue}:${secondValue}`;

  // set the textContent of the timer <span> to mediaTime
  timer.textContent = mediaTime;

  // we work out the length we should set for inner <div> by working out width of outter <div> and,
  // multiplying that value by (media.currentTime / media.duration)
  const barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);

  // set width of inner <div> to equal the calculated bar length, including "px", so that it will be set to that number of pixels. 
  timerBar.style.width = `${barLength}px`;
};