// ==UserScript==
// @name           Pixiv Illust Id Quick Open
// @namespace      i-c0112
// @description    If your'e lazy and don't want to type url yourself. This plugin will do that for you.
// @version 0.0.1
// @include        *
// ==/UserScript==

//Anonomyous function wrapper
(function (){
  //Ensure that there is only one instance of the pixivid Object
  if(typeof this["pixivid"] == "undefined"){  
    pixivid = {};
  }  

  //Make a local refrence to the cookie Injector object to save on typing
  var pI = pixivid;
  //Make the pixivid object globally viewable
  unsafeWindow['pixivid'] = pI;
  
  /**
  * Sets up the dialogue
  */
  pI.createDiv = function(){
    //Create the DIV to contain the Dialog
    pI.dialog = document.createElement('div');
    pI.dialog.id = "pixivDiv";
    pI.dialog.innerHTML = "<div align='center'>Pixiv Illust Id:<br/><input type='text' id='pixivInput' value='" + pI.getSelectionText() + "'/><br/><button onclick='pixivid.openIllust();'>OK</button><button onclick='pixivid.hide();'>Cancel</button></div>";
    pI.dialog.style.display = "none";
    pI.dialog.style.position = "fixed";
    pI.dialog.style.opacity = "0.9";
    pI.dialog.style.top = "40%";
    pI.dialog.style.background= "#DDDDDD";
    pI.dialog.style.left = "40%";
    pI.dialog.style.width = "20%";
    pI.dialog.style.zIndex = "99999";
    document.body.appendChild(pI.dialog);
    pI.visible = false;
  } 

  /**
  * Show the dialog
  */
  pI.show = function(){
    if(!pI.dialog) {
      pI.createDiv();
    }
    pI.dialog.style.display = "block";
    pI.visible = true;
  }

  /**
  * Hide the dialog
  */
  pI.hide = function(){
    pI.dialog.style.display = "none";
    pI.visible = false;
  }

  pI.openIllust= function(){
    var idDiv = document.getElementById('pixivInput');
    var idText = idDiv.value;
    pixivInput.value = "";
    // open a new tab loading the illust
    window.open("http://pixiv.net/member_illust.php?mode=medium&illust_id=" + idText, "_blank");
    pI.hide();
  }

  pI.keyPress = function (e){  
    //Check to see if "P" is pressed after ALT  
    if(e.keyCode == 80 && pI.ctrlFire){
      if(!pI.visible){    
        pI.show();
      }else{
        pI.hide();
      }
    }

    //Make sure the Alt key was previously depressed
    if(e.keyCode == 18){
      pI.ctrlFire = true;
    }else{
      pI.ctrlFire = false;
    }
  }

  pI.getSelectionText = function (){
    var text = "";
    if(window.getSelection){
      text = window.getSelection().toString();
    }else if(document.selection && document.selection.type != "Control"){
      text = document.selection.createRange().text;
    }
    return text;
  }

  //Capture all onkeydown events, so we can filter for our key-combo
  pI.visible = false;
  window.addEventListener('keydown', pI.keyPress,'false');
})();

