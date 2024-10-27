const levels = [
  {
    name: "Level-1",
    grid: 4,
    score: 100,
    type: "Low",
    completed: false,
    status: "unlock",
    images: ["🥳", "🥳", "💀", "💀"],
    Time: "23:00",
    moves: 99,
  },
  {
    name: "Level-2",
    grid: 4,
    score: 200,
    type: "Medium",
    completed: false,
    status: "lock",
    images: ["🥳", "🥳", "💀", "💀", "🚀", "🚀"],
    Time: "23:00",
    moves: 99,
  },
  {
    name: "Level-3",
    grid: 4,
    score: 300,
    type: "High",
    completed: false,
    status: "lock",
    images: ["🥳", "🥳", "💀", "💀", "🚀", "🚀", "🤝", "🤝"],
    Time: "23:00",
    moves: 99,
  },
  {
    name: "Level-4",
    grid: 4,
    score: 500,
    type: "High",
    completed: false,
    status: "lock",
    images: [
      "🥳",
      "🥳",
      "💀",
      "💀",
      "🚀",
      "🚀",
      "🤝",
      "🤝",
      "😋",
      "😋",
      "🤩",
      "🤩",
    ],
    Time: "23:00",
    moves: 99,
  },
  {
    name: "Level-5",
    grid: 4,
    score: 700,
    type: "High",
    completed: false,
    status: "lock",
    images: [
      "🥳",
      "🥳",
      "💀",
      "💀",
      "🚀",
      "🚀",
      "🤝",
      "🤝",
      "😋",
      "😋",
      "🤩",
      "🤩",
      "😜",
      "😜",
      "🤑",
      "🤑",
    ],
    Time: "23:00",
    moves: 99,
  },
  {
    name: "Level-6",
    grid: 4,
    score: 900,
    type: "High",
    completed: false,
    status: "lock",
    images: [
      "🥳",
      "🥳",
      "💀",
      "💀",
      "🚀",
      "🚀",
      "🤝",
      "🤝",
      "😋",
      "😋",
      "🤩",
      "🤩",
      "😜",
      "😜",
      "🤑",
      "🤑",
      "👻",
      "👻",
      "😎",
      "😎",
    ],
    Time: "23:00",
    moves: 99,
  },
  {
    name: "Level-7",
    grid: 4,
    score: 900,
    type: "High",
    completed: false,
    status: "lock",
    images: [
      "🥳",
      "🥳",
      "💀",
      "💀",
      "🚀",
      "🚀",
      "🤝",
      "🤝",
      "😋",
      "😋",
      "🤩",
      "🤩",
      "😜",
      "😜",
      "🤑",
      "🤑",
      "👻",
      "👻",
      "😎",
      "😎",
      "🥶",
      "🥶",
      "🤡",
      "🤡",
    ],
    Time: "23:00",
    moves: 99,
  },
];

// Load and save levels to local storage
function saveLevelData() {
  localStorage.setItem("levels", JSON.stringify(levels));
}

function loadLevelData() {
  const savedLevels = localStorage.getItem("levels");
  if (savedLevels) {
    levels.length = 0;
    levels.push(...JSON.parse(savedLevels));
  }
}

// Calculate total scores and levels
function updateScores() {
  const totalScore = levels.reduce((accumulator, currentLevel) => {
    return accumulator + currentLevel.score;
  }, 0);
  const completedLevels = levels.reduce((accumulator, currentLevel) => {
    if (currentLevel.status === "unlock") {
      return accumulator + 1;
    } else {
      return accumulator;
    }
  }, 0);
  const obtainedScore = levels.reduce((accumulator, currentLevel) => {
    if (currentLevel.completed === true) {
      return accumulator + currentLevel.score;
    } else {
      return accumulator;
    }
  }, 0);
  const scores = document.getElementById("scores");
  scores.innerHTML = `
            <span>Obtained Score: ${obtainedScore}/${totalScore}</span>
          <span>Levels Unlocked: ${completedLevels}/${levels.length}</span> 
  `;
}
document.addEventListener("DOMContentLoaded", () => {
  loadLevelData();
  const root = document.getElementById("root");
  function timeToSeconds(time) {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  }

  function secondsToTime(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  }

  function home() {
    root.innerHTML = `
      <div class="Home">
        <h1 class="py-3">Welcome To Flip The Card</h1>
        <button id="Play">Play Now</button>
      </div>
    
    `;

    document
      .getElementById("Play")
      .addEventListener("click", loadLevelsContainer);
  }

  function levelCompleted(level, formattedTime, moveCount) {
    level.completed = true;

    const newTimeInSeconds = timeToSeconds(formattedTime);
    const existingTimeInSeconds = timeToSeconds(level.Time);

    level.Time = secondsToTime(
      Math.min(newTimeInSeconds, existingTimeInSeconds)
    );

    level.moves = Math.min(moveCount, level.moves);

    saveLevelData();

    Swal.fire({
      title: "Congratulations!",
      text: ` You completed ${level.name} in ${formattedTime} with ${moveCount} moves.`,
      customClass: {
        confirmButton: "custom-confirm-button-Cong",
        popup: "custom-popup",
      },
      confirmButtonText: "Next Level",
    }).then(() => {
      const nextLevelIndex = levels.findIndex((l) => l.name === level.name) + 1;
      if (nextLevelIndex < levels.length) {
        levels[nextLevelIndex].status = "unlock";
      }
      loadGameContainer(levels[nextLevelIndex]);
    });
  }

  function loadGameCards(level, stopTimer) {
    const shuffledEmojis = [...level.images].sort(() => Math.random() - 0.5);
    let flippedCards = [];
    let matchedCards = [];
    let moveCount = 0;

    function updateMoveCounter() {
      document.querySelector(".move-counter").textContent = moveCount;
    }

    updateMoveCounter();

    shuffledEmojis.forEach((emoji) => {
      const box = document.createElement("div");
      box.className = "item";
      box.innerHTML = `<div class="emoji-front">${emoji}</div>`;
      box.dataset.emoji = emoji;

      box.onclick = function () {
        if (flippedCards.length < 2 && !this.classList.contains("boxOpen")) {
          this.classList.add("boxOpen");
          flippedCards.push(this);
          moveCount++;
          updateMoveCounter();

          if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
              matchedCards.push(firstCard, secondCard);
              flippedCards = [];

              if (matchedCards.length === shuffledEmojis.length) {
                stopTimer(moveCount);
              }
            } else {
              setTimeout(() => {
                flippedCards.forEach((card) =>
                  card.classList.remove("boxOpen")
                );
                flippedCards = [];
              }, 1000);
            }
          }
        }
      };

      document.querySelector(".cards-container").appendChild(box);
    });
  }

  function loadGameContainer(level) {
    let secondsElapsed = 0;
    let timerInterval;

    function startTimer() {
      timerInterval = setInterval(() => {
        secondsElapsed++;
        const minutes = String(Math.floor(secondsElapsed / 60)).padStart(
          2,
          "0"
        );
        const seconds = String(secondsElapsed % 60).padStart(2, "0");
        document.querySelector(
          ".time-counter"
        ).textContent = ` ${minutes}:${seconds}`;
      }, 1000);
    }

    function stopTimer(moveCount) {
      clearInterval(timerInterval);
      const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
      const seconds = String(secondsElapsed % 60).padStart(2, "0");
      levelCompleted(level, `${minutes}:${seconds}`, moveCount);
    }

    root.innerHTML = `<div class="Board">
        <div class="Board-header">
          <h1>${level.name}</h1>
          <button id="Back">
            <i class="fa-solid fa-arrow-left"></i> Back
          </button>
        </div>
        <div class="Board-header-scores">
          <p>
            Total Moves: <span class="move-counter">0</span>
          </p>
          <p>
            Time Elapsed: <span class="time-counter">00:00</span>
          </p>
        </div>
        <div class="cards-container"></div>
      </div>
      `;

    startTimer();
    loadGameCards(level, stopTimer);

    document.getElementById("Back").addEventListener("click", () => {
      Swal.fire({
        title: "Back To Home !",
        text: `Are You Sure To Leave The Game`,
        confirmButtonText: "Yes",
        showCancelButton: true,
        customClass: {
          confirmButton: "custom-confirm-button",
          cancelButton: "custom-cancel-button",
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          clearInterval(timerInterval);
          loadLevelsContainer();
        }
      });
    });
  }

  function displayLevelData(level) {
    Swal.fire({
      html: `
        <div class="inner">
          <h1 class="Title">${level.name}</h1>
          <p>
            Level Score: <span>${level.score}</span>
          </p>
          <p>
            Highest Record: <span>${level.Time}</span>
          </p>
          <p>
            Least Moves: <span>${level.moves}</span>
          </p>
        </div>
        `,
      showCancelButton: true,
      width: 300,
      customClass: {
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
        popup: "custom-popup",
      },
      confirmButtonText: "Start",
    }).then((result) => {
      if (result.isConfirmed) {
        loadGameContainer(level);
      }
    });
  }

  function loadLevels() {
    const container = document.getElementById("levels-container");
    container.innerHTML = "";
    updateScores();
    levels.forEach((level) => {
      const iconClass = level.status === "unlock" ? "fa-unlock" : "fa-lock";
      const content = `
        <div class="level" data-name="${level.name}">
          <p>${level.name}</p>
          <div class="${level.type}">${level.type}</div>
          <div class="${level.status}">
            <i class="fa-solid ${iconClass}"></i>
          </div>
        </div>
      
      `;
      container.innerHTML += content;
    });

    container.addEventListener("click", (e) => {
      const levelElement = e.target.closest(".level");
      if (levelElement) {
        const levelName = levelElement.getAttribute("data-name");
        const levelData = levels.find((level) => level.name === levelName);
        if (levelData) {
          if (levelData.status === "unlock") {
            displayLevelData(levelData);
          } else {
            Swal.fire({
              title: "Locked Level!",
              text: `You need to complete previous levels to unlock ${levelData.name}.`,
              customClass: {
                popup: "custom-popup",
              },
              confirmButtonText: "Okay",
            });
          }
        }
      }
    });
  }

  function loadLevelsContainer() {
    root.innerHTML = `
      <div class="levels">
        <div class="level-header">
          <h1>Levels</h1>
          <button id="BackHome"><i class="fa-solid fa-arrow-left"></i> Home</button>
        </div>
        <div class="scores px-4" id="scores">
        </div>
        <div class="levels-container" id="levels-container"></div>
      </div>
      `;
    loadLevels();
    document.getElementById("BackHome").addEventListener("click", home);
  }

  home();
});
