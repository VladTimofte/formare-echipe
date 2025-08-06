const allPlayers = [
  "Andrei M",
  "Cosmin Vaida",
  "Uruguiuc Cristian",
  "Alin B",
  "Vlad T",
  "Horia D",
  "Sami V",
  "Peter Yev",
  "Mark salf",
  "Vlad Eusebiu",
  "Vlad Flavius",
  "Dani B",
  "Costi Alex",
  "Popa Flavius",
  "Railean Adiel",
  "David d",
  "Octavian Mance",
  "Rares LCF",
];

let teams = {
  team1: [],
  team2: [],
  team3: [],
  bench: [...allPlayers],
};

function render() {
  ["team1", "team2", "team3", "bench"].forEach((teamId) => {
    const ul =
      document.querySelector(`#${teamId} .player-list`) ||
      document.querySelector(`#${teamId}`);
    ul.innerHTML = "";
    teams[teamId].forEach((player) => {
      const li = document.createElement("li");
      li.className = "player";
      li.innerHTML = `
        <span>${player}</span>
        <div class="actions">${renderActions(teamId, player)}</div>
      `;
      ul.appendChild(li);
    });
  });
}

function renderActions(currentTeam, player) {
  const targets = ["team1", "team2", "team3"].filter((t) => t !== currentTeam);
  return targets
    .map(
      (t) =>
        `<button class="action-btn" onclick="movePlayer('${player}', '${currentTeam}', '${t}')">Mută în ${t.replace(
          "team",
          "echipa "
        )}</button>`
    )
    .join("");
}

function shuffleTeams() {
  const shuffled = [...allPlayers].sort(() => 0.5 - Math.random());
  teams.team1 = shuffled.slice(0, 6);
  teams.team2 = shuffled.slice(6, 12);
  teams.team3 = shuffled.slice(12, 18);
  teams.bench = [];
  render();
}

function movePlayer(player, fromTeam, toTeam) {
  teams[fromTeam] = teams[fromTeam].filter((p) => p !== player);
  teams[toTeam].push(player);
  render();
}

function shareWhatsApp() {
  let text = "";
  ["team1", "team2", "team3"].forEach((team, index) => {
    text += `Echipa ${index + 1}:\n` + teams[team].join("\n") + "\n\n";
  });

  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/?text=${encodedText}`;
  window.open(url, "_blank");
}

render();
