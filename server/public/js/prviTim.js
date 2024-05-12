
const players = [
  //Golmani
  { firstName: "Adi", lastName: "Durmo", position: "Goalkeeper", number: 0, image: "images/players/Adi-Durmo.png" },
  { firstName: "Ajdin", lastName: "Brkić", position: "Goalkeeper", number: 1, image: "images/players/Ajdin-Brkic.png" },
  //Odbrana
  { firstName: "Aladin", lastName: "Isaković", position: "Defense", number: 2, image: "images/players/Aladin-Isakovic.png" },
  { firstName: "Kenan", lastName: "Horić", position: "Defense", number: 3, image: "images/players/Kenan-Horic.png" },
  { firstName: "Nedim", lastName: "Smajlvić", position: "Defense", number: 4, image: "images/players/Nedim-Smajlovic.png" },
  { firstName: "Emrah", lastName: "Palačkić", position: "Defense", number: 5, image: "images/players/Emrah-Palackic.png" },
  { firstName: "Eldar", lastName: "Sivac", position: "Defense", number: 6, image: "images/players/Eldar-Sivac.png" },
  { firstName: "Davud", lastName: "Arnautović", position: "Attack", number: 7, image: "images/players/Davud-Arnautovic.png" },
  { firstName: "Faris", lastName: "Bajramović", position: "Defense", number: 8, image: "images/players/Faris-Bajramovic.png" },
  { firstName: "Afan", lastName: "Ibraković", position: "Defense", number: 9, image: "images/players/Afan-Ibrakovic.png" },
  { firstName: "Amer", lastName: "Hodžić", position: "Defense", number: 10, image: "images/players/Amer-Hodzic.png" },
  { firstName: "Alden", lastName: "Šetkić", position: "Defense", number: 11, image: "images/players/Alden-Setkic.png" },
  { firstName: "Lovro", lastName: "Musa", position: "Defense", number: 12, image: "images/players/Lovro-Musa.png" },
  //Vezni red
  { firstName: "Ali", lastName: "Medjuseljac", position: "Midfield", number: 13, image: "images/players/Ali-Meduseljac.png" },
  { firstName: "Mahir", lastName: "Mehić", position: "Midfield", number: 14, image: "images/players/Mahir-Mehic.png" },
  { firstName: "Talha", lastName: "Tabaković", position: "Midfield", number: 15, image: "images/players/Talha-Tabakovic.png" },
  { firstName: "Adin", lastName: "Begic", position: "Midfield", number: 16, image: "images/players/Adin-Begic.png" },
  { firstName: "Fenan", lastName: "Salčinović", position: "Midfield", number: 17, image: "images/players/Fenan-Salcinovic.png" },
  { firstName: "Hanan", lastName: "Zahirović", position: "Midfield", number: 18, image: "images/players/Hanan-Zahirovic.png" },
  { firstName: "Bakir", lastName: "Bašić", position: "Midfield", number: 19, image: "images/players/Bakir-Basic.png" },
  { firstName: "Muamer", lastName: "Hamzić", position: "Midfield", number: 20, image: "images/players/Muamer-Hamzic.png" },
  { firstName: "Harun", lastName: "Vardo", position: "Midfield", number: 21, image: "images/players/Harun-Vardo.png" },
  //Napad
  { firstName: "Anes", lastName: "Mašić", position: "Attack", number: 22, image: "images/players/Anes-Masic.png" },
  { firstName: "Edin", lastName: "Durmiš", position: "Attack", number: 23, image: "images/players/Edin-Durmis.png" },
  { firstName: "Emir", lastName: "Karalic", position: "Attack", number: 24, image: "images/players/Emir-Karalic.png" },
  { firstName: "Avdija", lastName: "Vršajević", position: "Attack", number: 25, image: "images/players/Avdija-Vrsajevic.png" },
  { firstName: "Benjamin", lastName: "Ahmetspahić", position: "Attack", number: 26, image: "images/players/Benjamin-Ahmetspahic.png" },

];

function createPlayerBox(player) {
  const playerBox = document.createElement("div");
  playerBox.classList.add("team-member");

  const img = document.createElement("img");
  img.src = player.image;
  img.alt = `${player.firstName} ${player.lastName}`;
  playerBox.appendChild(img);

  const playerInfo = document.createElement("div");
  playerInfo.classList.add("player-info");

  const playerName = document.createElement("div");
  playerName.classList.add("player-name");
  playerName.textContent = player.firstName;
  playerInfo.appendChild(playerName);

  const playerSurname = document.createElement("div");
  playerSurname.classList.add("player-surname");
  playerSurname.textContent = player.lastName;
  playerInfo.appendChild(playerSurname);

  playerBox.appendChild(playerInfo);

  const playerNumber = document.createElement("div");
  playerNumber.classList.add("player-number");
  playerNumber.textContent = `${player.number}`;
  playerBox.appendChild(playerNumber);

  return playerBox;
}

function initTeamPage() {
  const goalkeeperGroup = document.getElementById("goalkeeper-group");
  const defenseGroup = document.getElementById("defense-group");
  const midfieldGroup = document.getElementById("midfield-group");
  const attackGroup = document.getElementById("attack-group");

  players.forEach(player => {
    const playerBox = createPlayerBox(player);
    if (player.position === "Goalkeeper") {
      goalkeeperGroup.appendChild(playerBox);
    } else if (player.position === "Defense") {
      defenseGroup.appendChild(playerBox); 
    } else if (player.position === "Midfield") {
      midfieldGroup.appendChild(playerBox);
    } else if (player.position === "Attack") {
      attackGroup.appendChild(playerBox);
    }
  });
}

initTeamPage();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
