   /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
	 
   
    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */


import { Play, Act, Scene,InitialSetup } from './play-module.js';


document.addEventListener("DOMContentLoaded", function() {
  let currentPlayInstance;
  let currentSetupInstance;
  let currentActInstance;

  const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
  const playList = document.getElementById('playList');

  playList.addEventListener('change', function() {
    const selectedPlay = playList.value;

    if (currentActInstance) { //need to avoid buildup of duplicate event handlers
      currentActInstance.cleanup();
    }

    if(currentPlayInstance){ 
      currentPlayInstance.cleanup();
    }

    // If a play option was selected
    if (selectedPlay !== '0') {
      // Fetch play data based on the selected play
      fetch(`${url}?name=${selectedPlay}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);

          // Create Play instance
          currentPlayInstance = new Play(data.acts, data.title);
          currentPlayInstance.renderPlay(); // Render the act list and title

          // Create InitialSetup instance
          currentSetupInstance = new InitialSetup(data,data.acts);
          currentSetupInstance.renderActSceneListFirst(); // Render the first scene from the first act
          currentSetupInstance.renderFirstSceneFirstAct();
          currentSetupInstance.renderPlayers();

          // Create Act instance
          currentActInstance = new Act(data.acts);
          currentActInstance.renderAct(); //handle when a scene changes and when switching acts (need new act list)
          currentPlayInstance.renderActChange() //
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  });
});
