# HTMLMediaElement interface demo

- Repo contains a very basic video player implementation with custom controls implemented via custom-player.js. 

- custom-player.js relies on the [Document interface](https://developer.mozilla.org/en-US/docs/Web/API/Document) and the [HTMLMediaElement interface](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement).

- Code along according to [MDN's guide material](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs#summary). Further info there. 

## ToDo

- Lines 39 - 42 within playPauseMedia() function can be separated into a standalone function that is simply called within playPauseMedia(). Optimise. 

- Time display currently won't display hours. Implement functionality allowing timer to display hour(s) alongside minutes and seconds duration/elapsed.

- <audio> elements have the same HTMLMediaElement functionality available. Implement audio example alongside. 

- Turn the timer inner <div> element into a true seek bar/scroller - allowing the user to navigate to any point in the video by clicking at that point on the bar. 
