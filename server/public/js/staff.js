
const players = [
    // STRUČNI ŠTAB
  { firstName: "Dario", lastName: "Damjanović", position: "Staff", image: "images/staff/Dario-Damjanovic.png" },
  { firstName: "Adis", lastName: "Bešić", position: "Staff", image: "images/staff/Adis-Besic.png" },
  { firstName: "Izudin", lastName: "Kamberović", position: "Staff", image: "images/staff/Izudin-Kamberovic.png" },
  { firstName: "Adi", lastName: "Bambur", position: "Staff",  image: "images/staff/Adi-Bambur.png" },
  // Medicinsko osoblje
  { firstName: "Albin", lastName: "Mašić", position: "Medical", image: "images/staff/Albin-Masic.png" },
  // Ekonomat
  { firstName: "Adis", lastName: "Bešić", position: "Economic", image: "images/staff/Adis-Besic.png" },
  { firstName: "Izudin", lastName: "Kamberović", position: "Economic", image: "images/staff/Izudin-Kamberovic.png" },
  
  ];
  
function createStaffBox(player) {
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
  
    return playerBox;
  }
  
  function initStaff() {
    const staffGroup = document.getElementById("staffGroup-group");
    const medGroup = document.getElementById("medGroup-group");
    const economicGroup = document.getElementById("ecoomicGroup-group");
  
    players.forEach(player => {
      if (player.position === "Staff") {
        staffGroup.appendChild(createStaffBox(player)); 
      } else if (player.position === "Medical") {
        medGroup.appendChild(createStaffBox(player)); 
      } else if (player.position === "Economic") {
        economicGroup.appendChild(createStaffBox(player)); 
      }
    });
  }
  
  initStaff();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });