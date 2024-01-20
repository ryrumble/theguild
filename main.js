//You have 3 buttons to replace text, using buttonX.onClick = functionName
// then can update the button to display text, using buttonX.innerText = TEXT

/*
//ideas - reach threshold of stats to succeeed on a mission?
//        reach correct rock-paper-scissors comp for better success
//        too many people, mission slower
//        affiliations to factions will help/hurt the 
//        dating sim? roguelite elements? 
*/

//declare variables
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const button4 = document.querySelector('#button4');
const button5 = document.querySelector('#button5');
const button6 = document.querySelector('#button6');
const text = document.querySelector('#text');
const questsText = document.querySelector('.questsText');
const inventoryText = document.querySelector('.inventoryText');
const monsterPictureText = document.querySelector("#monsterPicture");
const laudText = document.querySelector('#laud');
const goldText = document.querySelector('gold');
let laudNum = 2; //for the 2 adventurers @lvl 1
let members = [];
let adventurers = [];
const colors = ['Violet', 'Indigo', 'Blue', 'Green', 'Yellow', 'Orange', 'Red'];
const monsters = ['Slime', 'Wolf', 'Goblin', 'Dragon'];
const monstersList = [];

const quests = []; //not needed? could make mad libs quests...
let questVerbs = ""
let questVerbsArray = questVerbs.split('Track Ambush Remove Clear Eliminate');
let questNouns = ""
let questNounsArray = questNouns.split('');

//populate monstersList
function populateMonsters(){
  let number = 1;//monster level. +1 for each monster
  monsters.forEach(monster => {
    colors.forEach(color => {
      monstersList.push([color + " " + monster, 'Alive', number]);
      number++;
    });
  });
  //monstersList.push("Rainbow Dragon");
}
//populate quests (not needed?)
function populateQuests(){
  monstersList.forEach(monster => {
    quests.push("Kill the "+monster[0]+".");
  });
}

class Adventurer{
  constructor(name, className, level, skills, gear){ 
    this.name = name;
    this.className = className;
    this.level = level;
    this.skills = skills;
    this.gear = gear;
    this.status = "Available";
  }
  //TODO - methods go here for our adventurers
  setStatus(newStatus){
    this.status = newStatus;
  }
  sendOnQuest(){
    this.status = "On quest";
  }
}
const adventurer1 = new Adventurer("Herp", "Warrior", 1, ["Sword Mastery", "Shield Block"]);
const adventurer2 = new Adventurer("Derpa", "Mage", 1, ["Fireball", "Rock Throw"]);
const adventurer3 = new Adventurer("Doinkus", "Paladin", 3, ["Smite", "Heal"]);
members.push(adventurer1);
members.push(adventurer2);
adventurers.push(adventurer1);
adventurers.push(adventurer2);
adventurers.push(adventurer3);

class Quest {
  constructor(name, difficulty, description, objectives, rewards){
    this.name = name;
    this.difficulty = difficulty;
    this.description = description;
    this.objectives = objectives;
    this.rewards = rewards;
    this.status = "Not Started";
  }
  //TODO - methods for quests
  startQuest(){
    this.status = "In Progress";
  }
  completeQuest(){
    this.status = "Completed";
  }
}
//TO BE USED. Consider fleshing out?
class Monster{
  constructor(name, description){
    this.name = name;
    this.description = description;
  }
}

//LEARNING NOTE - these intitially were not wrapped in an anonymous function().
//BUT because it wasn't, the 5th button was executing immediately during the assignment.
// Initialize buttons
button1.onclick = function() { displayMembers(); };
button2.onclick = function() { displayQuests(); };
button3.onclick = function() { displayMonsters(); };
button4.onclick = function() { assignQuests(); };
button5.onclick = function() { fightMonster(members, monstersList[0]); };

//button6.onclick = ;

function displayMembers() {
  console.log('display members');
  text.innerText = "Here are your members";
  members.forEach(member => {
    text.innerText += "\n"+ "Name: " + member.name + ". Class: " + member.className + ". Level: " + member.level;
  });
}
function displayQuests() {
  console.log('display quests');
  text.innerText = "Here are your available quests.";
  quests.forEach(quest => {
    text.innerText += "\n" + quest;
  });

}
function displayMonsters(){
  console.log('display monstersList');
  text.innerText = "Here is a bestiary of remaining monsters.";
  monstersList.forEach(monsterInList => {
       text.innerText += "\n" + monsterInList[0]+", Level: "+monsterInList[2];

  });
  //text.innerText += "\n" + "?????"; //add rainbow dragon as last boss
}
function assignQuests(){
  //jank check to win the game
  if (typeof quests[0] === 'undefined'){
    text.innerText = "There are no more monsters, and there are no more quests. You win!";
    monsterPictureText.innerText = "";
    return;
  }
  let team = "";
  console.log('assign quests');
  text.innerText = "The next quest to complete is:";
  text.innerText += "\n" + quests[0];
  text.innerText += "\n";
  console.log(members);
  members.forEach((member, index) => {
    console.log(member.name+", "+index);
    console.log(members.length - 1);
    if (index === members.length - 1) {
      team += member.name;
    } else {
      team += member.name + " and ";
    }
  });
  text.innerText += "\n" + team+ " are ready to take on the quest!";
}
///This function will have the party fight the monster.
///The party's level will be summed and compared against the monster.
///If the party's level is high enough, they will defeat the monster.
///The user will be told they win. The party's level will increase based on
/// the monster's level. The quest to kill the monster will be removed(pop?).
///The user will be informed of the party's new level. The laud will go up too.

function fightMonster(members, monsterInList) {
  //jank check - if monsterInList is undefined, it means we're at the end of our list.
  //the player wins the game!
  if (typeof monsterInList === 'undefined'){
    text.innerText = "There are no more monsters, and there are no more quests. You win!";
    monsterPictureText.innerText = "";
    return;
  }

  console.log(monsterInList);
  const color = monsterInList[0].split(' ')[0];
  const name = monsterInList[0];
  let teamName = "";
  let teamPower = 0;
  members.forEach((member, index) => {
    console.log(member.name+", "+index);
    console.log(members.length - 1);
    teamPower += member.level;
    if (index === members.length - 1) {
      teamName +="and " + member.name;
    } else {
      teamName += member.name + ", ";
    }
  });
  text.innerText = "TIME TO FIGHT!\n";
  text.innerText += teamName + " at power level "+teamPower+" VS the "+ name+" at power level "+ monsterInList[2];
  if (teamPower > monsterInList[2]){ //heroes win
    text.innerText += "\nThe heroes have a higher power level and win the fight! The members gain "+monsterInList[2]+" level.";
    //TODO GIVE ADVENTURERS POWER
    members.forEach(member => {
      member.level += monsterInList[2];
    });
    text.innerText += "\nThe town lauds your guild!";
    laudNum += monsterInList[2]
    
    laudText.innerText = laudNum;
    text.innerText += "\nThe quest is removed and the monster is gone. The town thanks you!";
    monstersList.shift();
    quests.shift();
  }
  else{
    text.innerText += "\nThe heroes are not strong enough to win!";
  }

  // Display the name of the monster with the color.
  monsterPictureText.innerText = name;
  monsterPictureText.style.color = color.toLowerCase();
}

function getRandomMonster(){
  const randomIndex = Math.floor(Math.random() * monstersList.length);
  console.log('Found '+monstersList[randomIndex])
  return monstersList[randomIndex][0];
}

populateMonsters();
populateQuests();