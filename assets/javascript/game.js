$(document).ready(function() {

  gameStart()
 
  // setting global variables
  var atkChosen = false;
  var defChosen = false;
  var atkHP = '';
  var defHP = '';
  var tempAtkHP = 0;
  var tempDefHP = 0;
  var tempAtkPwr = 0;
  var tempDefPwr = 0;
  var wins = 0;
  var endAtkPhase = false;
  var flame = $(".flame");

  //sets object character stats
  var char1 = {
    hp: 150, atkPwr: 5, counterPwr: 12
  }

  var char2 = {
    hp: 125, atkPwr: 3, counterPwr: 7
  }

  var char3 = {
    hp: 175, atkPwr: 8, counterPwr: 15
  }

  var char4 = {
    hp: 125, atkPwr: 6, counterPwr: 10
  }

  function gameStart() {
    attackPicker()
  }

  function attackPicker() {
    $(".flame").hide() //hides div for attacks between characters
    $(".attack-button").hide() //hides button for attack phase
    $(".instructions").html("<h3>Pick your ultimate Pokemon fighting partner!</h3>") //sets instructions
    $(".char-inventory").on("click", function() { //sets on click listener for character inventory
      if (defChosen === true) { //stops function if defender is already chosen
        return;
      }

      else if (atkChosen === false) { //function to set attacker
        atkChosen = true; 
          if ($(this).attr('id') === "char1") {  //listens for if the first pokemon being chosen
            tempAtkHP = char1.hp //sets temp hp from pokemon stat object
            tempAtkPwr = char1.atkPwr //sets atk power from pokemon stat object
            tempBasePwr = char1.atkPwr  //sets base atk power to iterate on for each battle round
            $(".char1-name").hide() //hides div name element from char inventory
            $(".char1").hide() // hides div picture element from char inventory
            $("#hp-atk").text(char1.hp); //sets hp for attacking char
            $(".atk-char").html('<img src="assets/images/dragonite_large.png" />'); //places larger photo in battle arena
            $(".atk-points").text(char1.atkPwr); //sets atk poitns for attacking char
            defendPicker();
          }

          else if ($(this).attr('id') === "char2") { 
            tempAtkHP = char2.hp
            tempAtkPwr = char2.atkPwr
            tempBasePwr = char2.atkPwr
            $(".char2-name").hide()
            $(".char2").hide()
            $("#hp-atk").text(char2.hp);
            $(".atk-char").html('<img src="assets/images/alakazam_large.png" />');
            $(".atk-points").text(char2.atkPwr);
            defendPicker();
          }

          else if ($(this).attr('id') === "char3") {
            tempAtkHP = char3.hp
            tempAtkPwr = char3.atkPwr
            tempBasePwr = char3.atkPwr
            $(".char3-name").hide()
            $(".char3").hide()
            $("#hp-atk").text(char3.hp)
            $(".atk-char").html('<img src="assets/images/tyranotaur_large.png" />');
            $(".atk-points").text(char3.atkPwr);
            defendPicker();
          }

          else {
            tempAtkHP = char4.hp
            tempAtkPwr = char4.atkPwr
            tempBasePwr = char4.atkPwr
            $(".char4-name").hide()
            $(".char4").hide()
            $("#hp-atk").text(char4.hp);
            $(".atk-char").html('<img src="assets/images/zapdos_large.png" />');
            $(".atk-points").text(char4.atkPwr);
            defendPicker();
          };
        };
      });
    };

  function defendPicker() { //function to chooose defending pokemon
    if (wins === 3) {  //condition for winning when attacker has defeated three pokemon
      $(".instructions").html("<h3>Congratulations!  You've won!</h3>")
      return;
    }

    else {    
      $(".instructions").html("<h3>Now pick your opponent!</h3")
      $(".char-inventory").on("click", function() { //click listener for defending pokemon

        if (defChosen === true) {  //stops function if a defender has been chosen
          return;
        }

        else if (defChosen === false) {
          defChosen = true;
          $(".def-char").show()
          if ($(this).attr('id') === "char1") {
            tempDefHP = char1.hp
            counterPwr = char1.counterPwr
            $(".char1-name").hide()
            $(".char1").hide()
            $("#def-atk").text(char1.hp);
            $(".def-char").html('<img src="assets/images/dragonite_large.png" />');
            $(".def-points").text(char1.counterPwr);
            endAtkPhase = false
            attackPhase()
          }

          else if ($(this).attr('id') === "char2") {
            tempDefHP = char2.hp
            counterPwr = char2.counterPwr
            $(".char2-name").hide()
            $(".char2").hide()
            $("#def-atk").text(char2.hp);
            $(".def-char").html('<img src="assets/images/alakazam_large.png" />');
            $(".def-points").text(char2.counterPwr);
            endAtkPhase = false
            attackPhase()
          }

          else if ($(this).attr('id') === "char3") {
            tempDefHP = char3.hp
            counterPwr = char3.counterPwr
            $(".char3-name").hide()
            $(".char3").hide()
            $("#def-atk").text(char3.hp);
            $(".def-char").html('<img src="assets/images/tyranotaur_large.png" />');
            $(".def-points").text(char3.counterPwr);
            endAtkPhase = false
            attackPhase()
          }

          else {
            tempDefHP = char4.hp
            counterPwr = char4.counterPwr
            $(".char4-name").hide()
            $(".char4").hide()
            $("#def-atk").text(char4.hp);
            $(".def-char").html('<img src="assets/images/zapdos_large.png" />');
            $(".def-points").text(char4.counterPwr);
            endAtkPhase = false
            attackPhase()
          }
        };
      });
    };
  };
  
  function deathChecker() {
    if (tempAtkHP <= 0) {
      $(".atk-char").hide()  //hides defending char picture
      $("#hp-atk").text(0)  //resets visuals for atk pokemon power
      $(".atk-points").text(0)  //resets visuals for atk hp pokemon
      $(".attack-button").hide() //hides attack button
      $(".instructions").html("<h3>Game Over!  Refresh page to try again!</h3>")
    }
    
    else if (tempDefHP <= 0) {
      wins++  //adjusts win counter
      $(".def-char").hide()  //hides defending char picture
      $("#def-atk").text(0)  //resets visuals for def pokemon power
      $(".def-points").text(0)  //resets visuals for def hp pokemon
      $(".attack-button").hide() //hides attack button until new defender is chosen
      defChosen = false  //resets checker for defender function
      defendPicker() //initializes defender chooser function
      endAtkPhase = true
    };
  };

  function attackPhase() {  //attack phase function

      if (endAtkPhase === true) { //attempting to stop attackphase function from running multiple times on second enemy
        return
      }

      else if (endAtkPhase === false) {
      $(".attack-button").show()  //shows button used to initiate attacks
      $(".instructions").html("<h3>Now use the attack button to strike at your enemy!</h3>")
      $(".attack-button").off().on("click", function() {  //click listener for attack button
        
        tempAtkHP = tempAtkHP - counterPwr  //adjusts attaacking pokemons hp
        tempDefHP = tempDefHP - tempAtkPwr  //adjusts defender hp
        tempAtkPwr =  tempAtkPwr + tempBasePwr  //adjusts attacking pokemons power
        console.log(tempAtkPwr)
        
        deathChecker()
        
        $(".flame").show(1).delay(500).hide(1);  //sets flame object temporarily after each attack
        $(".atk-points").text(tempAtkPwr);  //adjusts atk power visual
        $("#hp-atk").text(tempAtkHP); //adjusts atk hp visual
        $("#def-atk").text(tempDefHP); //adjusts def hp visual
        });
      };
    };
  });