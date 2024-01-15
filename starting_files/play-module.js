/* In this module, create three classes: Play, Act, and Scene. */

// play-module.js

//this can be used so that whenever we swap between hamlet or julius plays, the first scene from first act
//renders first 
class InitialSetup {
    constructor(data,acts){
        this.data = data
        this.acts = acts
    }

  //make it so that when new play is selected, it renders the first scene list for first act
  renderActSceneListFirst(){ 
    const sceneList = document.querySelector("#sceneList");        
    const selectedActIndex1 = 0

        
    // Clear previous scenes from the sceneList
    sceneList.innerHTML = '';
        
      for (let scene of this.acts[selectedActIndex1].scenes) {
            const sceneItem = document.createElement("option");
            sceneItem.innerHTML = scene.name; 
            sceneList.appendChild(sceneItem);
      }

    }


 renderFirstSceneFirstAct(){
    const actIndex = 0;
    const sceneIndex = 0;  
    const actName = document.querySelector("#actHere h3")
    const sceneName = document.querySelector ("#sceneHere h4")
    const titleElement = document.querySelector("#sceneHere p.title");
    const directionElement = document.querySelector("#sceneHere p.direction");

    actName.innerHTML   = ""
    sceneName.innerHTML = ""
    titleElement.innerHTML = ""
    directionElement.innerHTML = ""

    actName.innerHTML = this.acts[actIndex].name
    sceneName.innerHTML = this.acts[actIndex].scenes[sceneIndex].name
    titleElement.innerHTML = this.acts[actIndex].scenes[sceneIndex].title
    directionElement.innerHTML = this.acts[actIndex].scenes[sceneIndex].stageDirection
   
    // Assuming 'speechData' is the array containing the speech data
    const speechData = this.acts[actIndex].scenes[sceneIndex].speeches
  

    // Get the parent element where you want to append the speeches
    const sceneHere = document.querySelector("#sceneHere");
    // Select all children with a specific class (e.g., 'speech')
    const speechElements = sceneHere.querySelectorAll('.speech');

    // Loop through and remove each element for presenting new play
    speechElements.forEach((element) => {
        element.remove();
    });

    for(let s of speechData){
        const divContainer = document.createElement("div")
        divContainer.classList.add("speech")
        const speakerSpan = document.createElement("span")
        speakerSpan.innerHTML = s.speaker
        divContainer.appendChild(speakerSpan)
        sceneHere.appendChild(divContainer)
      

        for (let l of s.lines) {
          // Create a paragraph for each line and append it to the container
          const lineParagraph = document.createElement("p");
          lineParagraph.innerHTML = l;
          divContainer.appendChild(lineParagraph);
        }

        // Check if there is a stagedir property and create an <em> element if present
        if (s.stagedir && s.stagedir.length > 0) {
          const stagedirEm = document.createElement("em");
          stagedirEm.innerHTML = s.stagedir;
          divContainer.appendChild(stagedirEm);
      }

    }



}

renderPlayers(){
const playerData = this.data.persona
console.log(playerData)
const playerList = document.querySelector("#playerList")
const nonZeroValueOptions = document.querySelectorAll('#playerList option:not([value="0"])');

nonZeroValueOptions.forEach((element) => {
  element.remove();
  });

for(let p of playerData){

      const playeropt = document.createElement("option")
      playeropt.value = p.position
      playeropt.innerHTML = p.player
      playerList.appendChild(playeropt)

 }


}


}

/****************************************************************************************************** */


class Scene {
    constructor(name, speeches) {
      this.name = name;
      this.speeches = speeches;
    }
  
    renderScene() {
    
    }
  }
  
 /*********************************************************************************************************/ 
  class Act {
    constructor(acts) {
      this.acts = acts;
      this.handleChangeAct = this.handleChangeAct.bind(this);
      this.handleSceneChange = this.handleSceneChange.bind(this);
    }
    
    handleChangeAct() {
      const actList = document.querySelector("#actList");
      const sceneList = document.querySelector("#sceneList");
  
      const selectedActIndex = actList.selectedIndex;
      // Clear previous scenes from the sceneList
      sceneList.innerHTML = '';
      const selectedAct = this.acts[selectedActIndex];
      for (let scene of selectedAct.scenes) {
        const sceneItem = document.createElement("option");
        sceneItem.innerHTML = scene.name; // Replace 'name' with the actual property containing the scene's name
        sceneList.appendChild(sceneItem);
      }
    }
  
    handleSceneChange(){
      const actList = document.querySelector("#actList");
      const sceneList = document.querySelector("#sceneList");
      const selectedSceneIndex = sceneList.selectedIndex;
      const selectedActIndex = actList.selectedIndex;

      const actName = document.querySelector("#actHere h3")
    const sceneName = document.querySelector ("#sceneHere h4")
    const titleElement = document.querySelector("#sceneHere p.title");
    const directionElement = document.querySelector("#sceneHere p.direction");

    actName.innerHTML   = ""
    sceneName.innerHTML = ""
    titleElement.innerHTML = ""
    directionElement.innerHTML = ""

    actName.innerHTML = this.acts[selectedActIndex].name
    sceneName.innerHTML = this.acts[selectedActIndex].scenes[selectedSceneIndex].name
    titleElement.innerHTML = this.acts[selectedActIndex].scenes[selectedSceneIndex].title
    directionElement.innerHTML = this.acts[selectedActIndex].scenes[selectedSceneIndex].stageDirection
   
    // Assuming 'speechData' is the array containing the speech data
    const speechData = this.acts[selectedActIndex].scenes[selectedSceneIndex].speeches
  

    // Get the parent element where you want to append the speeches
    const sceneHere = document.querySelector("#sceneHere");
    // Select all children with a specific class (e.g., 'speech')
    const speechElements = sceneHere.querySelectorAll('.speech');

    // Loop through and remove each element for presenting new play
    speechElements.forEach((element) => {
        element.remove();
    });

    for(let s of speechData){
        const divContainer = document.createElement("div")
        divContainer.classList.add("speech")
        const speakerSpan = document.createElement("span")
        speakerSpan.innerHTML = s.speaker
        divContainer.appendChild(speakerSpan)
        sceneHere.appendChild(divContainer)
      

        for (let l of s.lines) {
          // Create a paragraph for each line and append it to the container
          const lineParagraph = document.createElement("p");
          lineParagraph.innerHTML = l;
          divContainer.appendChild(lineParagraph);
        }

        // Check if there is a stagedir property and create an <em> element if present
        if (s.stagedir && s.stagedir.length > 0) {
          const stagedirEm = document.createElement("em");
          stagedirEm.innerHTML = s.stagedir;
          divContainer.appendChild(stagedirEm);
      }

    }



      

    }
    renderAct() {
      const actList = document.querySelector("#actList");
      actList.addEventListener('change', this.handleChangeAct);
      const sceneList = document.querySelector("#sceneList")
      sceneList.addEventListener('change', this.handleSceneChange)
    }

    cleanup(){
      const actList = document.querySelector("#actList");
      actList.removeEventListener('change', this.handleChangeAct);
      const sceneList = document.querySelector("#sceneList")
      sceneList.removeEventListener('change', this.handleSceneChange)

    }
  }
  
  /****************************************************************************************** */
  class Play {
    constructor(acts,title) {
      this.title = title;
      this.acts = acts;
      this.handleActChange = this.handleActChange.bind(this);
    }
  
    handleActChange(){
      const actList = document.querySelector("#actList");
      const selectedActIndex = actList.selectedIndex;
      const sceneData = this.acts[selectedActIndex].scenes[0]

      const actName = document.querySelector("#actHere h3")
      const sceneName = document.querySelector ("#sceneHere h4")
      const titleElement = document.querySelector("#sceneHere p.title");
      const directionElement = document.querySelector("#sceneHere p.direction");

      actName.innerHTML   = ""
      sceneName.innerHTML = ""
      titleElement.innerHTML = ""
      directionElement.innerHTML = ""

      actName.innerHTML = this.acts[selectedActIndex].name
      sceneName.innerHTML = sceneData.name
      titleElement.innerHTML = sceneData.title
      directionElement.innerHTML = sceneData.stageDirection
    
      // Assuming 'speechData' is the array containing the speech data
      const speechData = sceneData.speeches
    

      // Get the parent element where you want to append the speeches
      const sceneHere = document.querySelector("#sceneHere");
      // Select all children with a specific class (e.g., 'speech')
      const speechElements = sceneHere.querySelectorAll('.speech');

      // Loop through and remove each element for presenting new play
      speechElements.forEach((element) => {
          element.remove();
      });

      for(let s of speechData){
          const divContainer = document.createElement("div")
          divContainer.classList.add("speech")
          const speakerSpan = document.createElement("span")
          speakerSpan.innerHTML = s.speaker
          divContainer.appendChild(speakerSpan)
          sceneHere.appendChild(divContainer)
        

          for (let l of s.lines) {
            // Create a paragraph for each line and append it to the container
            const lineParagraph = document.createElement("p");
            lineParagraph.innerHTML = l;
            divContainer.appendChild(lineParagraph);
          }

          // Check if there is a stagedir property and create an <em> element if present
          if (s.stagedir && s.stagedir.length > 0) {
            const stagedirEm = document.createElement("em");
            stagedirEm.innerHTML = s.stagedir;
            divContainer.appendChild(stagedirEm);
        }

      }
    }

    renderActChange(){
      const actList = document.querySelector("#actList");
      actList.addEventListener('change', this.handleActChange);
    }



    cleanup(){
      const actList = document.querySelector("#actList");
      actList.removeEventListener('change', this.handleActChange);
    }

    renderPlay() { 
      //manipulate the title  
      const playTitle = document.querySelector("#playHere h2")
      playTitle.innerHTML = this.title
      


      //manipulate the acts
      const actlist = document.querySelector("#actList")
      actlist.innerHTML =''
      
      for (let a of this.acts){
           const actItem = document.createElement("option")
           actItem.innerHTML = a.name
           actlist.appendChild(actItem)
      }
          
    }
  }
  
  export { Scene, Act, Play, InitialSetup };
  