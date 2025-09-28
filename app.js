
  class Game {
    constructor() {
      this.states = {
        lockDice: false,
        playerCount: 0,
        currentPlayer: 0,
        diceResult: undefined,
        consecutiveSixes: [],
        isDiceRolling: false,
        activeToken: false,
        killed: false,
        winOrder: [],
        reached: false,
        movingToken : false
      };

      this.players = [
        this.createPlayer("player 1", "blue", ".blueT", ".dice1"),
        this.createPlayer("player 2", "yellow", ".yellowT", ".dice2"),
        this.createPlayer("player 3", "green", ".greenT", ".dice3"),
        this.createPlayer("player 4", "red", ".redT", ".dice4")
      ];

      this.init();
    }

    createPlayer(name, color, homeSelector, diceSelector) {
      return {
        name,
        color,
        homeDivs: document.querySelectorAll(homeSelector),
        diceDiv: undefined,
        playing: false,
        diceLoad: document.querySelector(diceSelector),
        tokens: undefined
      };
    }

    init() {
      this.showDiv();
      setInterval(() => this.showDiv(), 20000);
      this.popup();
    }

    buttonAudio() {
      const audio = new Audio("data:audio/mpeg;base64,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")
      audio.play();
    }

    getCenterOfDiv(div) {
      const rect = div.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      return { x: centerX, y: centerY };
    }

    createToken(color) {
      const elem = document.createElement("div");
      elem.className = "token";
      elem.innerHTML = ['circle', 'triangle', `${color} innerCircle`].map(c => `<div class="${c}"></div>`).join('');
      return elem;
    }

    getColorToken(token) {
      return token.children[2].classList[0];
    }

    startGame() {
      this.setupTokenPositionObservers();
      this.setupCellObservers();
      this.gameLogic();
    }

    setupTokenPositionObservers() {
      const positions = {
        1: ["11%"],
        2: ["-4%", "26%"],
        3: ["-19%", "11%", "41%"],
        4: ["-24%", "-0.66%", "22.68%", "46.02%"],
      };

      document.querySelectorAll(".stop").forEach((stop) => {
        const observerCallback = () => {
          const uniqueTokens = new Set();
          const uniqueElements = [];
          stop.querySelectorAll(".token").forEach((token) => {
            const key = this.getColorToken(token);
            if (!uniqueTokens.has(key)) {
              uniqueTokens.add(key);
              uniqueElements.push(token);
            }
          });

          if (uniqueElements.length >= 1) {
            uniqueElements.forEach((element, index) => {
              stop.querySelectorAll(`.token .${this.getColorToken(element)}`)
                .forEach((t) => {
                  const parent = t.parentElement;
                  if (!parent.classList[1]) {
                    parent.style.left = positions[uniqueElements.length][index];
                    parent.style.zIndex = 10 + index;
                  } else {
                    parent.style.zIndex = 14;
                  }
                });
            });
          }

          if (uniqueElements.length == 1) {
            if (stop.querySelectorAll(".token").length >= 1) {
              positions[stop.querySelectorAll(".token").length].forEach((position, j) => {
                stop.querySelectorAll(".token")[j].style.left = position;
              });
            }
          }
        };

        observerCallback();
        const observer = new MutationObserver(observerCallback);
        observer.observe(stop, { childList: true });
      });
    }

    setupCellObservers() {
      const positions = {
        1: ["11%"],
        2: ["-4%", "26%"],
        3: ["-19%", "11%", "41%"],
        4: ["-24%", "-0.66%", "22.68%", "46.02%"],
      };

      document.querySelectorAll(".cell:not(.stop)").forEach((cell) => {
        const observerCallback = () => {
          const x = cell.childElementCount;
          if (x == 2 && !cell.children[1].classList[1] &&
            cell.children[0].children[2].classList[0] != cell.children[1].children[2].classList[0]) {
            this.toHome(cell.children[0]);
            this.states.killed = true;
          } else if (x >= 1) {
            positions[x].forEach((position, i) => {
              cell.children[i].style.left = position;
            });
          }
        };

        observerCallback();
        const observer = new MutationObserver(observerCallback);
        observer.observe(cell, { childList: true });
      });
    }

    setUp(i) {
      const diceFaces = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8],
      };

      const diceHTML = Object.entries(diceFaces)
        .map(([num, positions]) => `
        <div class="face ${["", "one", "two", "three", "four", "five", "six"][num]}">
          ${Array.from({ length: 9 }, (_, i) =>
          positions.includes(i) ? '<div class="c"></div>' : '<div class="empty"></div>'
        ).join("")}
        </div>`
        )
        .join("");

      document.querySelector(`.dice${i + 1}`).innerHTML = `<div class="dice">${diceHTML}</div>`;

      for (let j = 0; j < 4; j++) {
        this.players[i].homeDivs[j].appendChild(this.createToken(this.players[i].color));
      }

      this.players[i].tokens = document.querySelector(`.${this.players[i].color}-home`).querySelectorAll(".token");
      this.players[i].diceDiv = document.querySelector(`.dice${i + 1}`).children[0];
    }

    handleName() {
      let x = this.states.playerCount;
      const inputs = document.querySelectorAll("input");

      const assignName = (i, name) => {
        this.players[i].name = name;
        document.querySelector(`.${this.players[i].color}Name`).innerHTML = name;
        this.setUp(i);
        this.players[i].playing = true;
        x--;
      };

      document.querySelectorAll("#nxt")[1].addEventListener("click", () => {
        this.buttonAudio();
        inputs.forEach((input, i) => {
          if (x > 0 && input.value) assignName(i, input.value);
        });
        inputs.forEach((input, i) => {
          if (x > 0 && !input.value) assignName(i, `player ${i + 1}`);
        });

        setTimeout(() => {
          document.querySelector(".popup").remove();
          this.players = this.players.filter((p) => p.playing);
          this.startGame();
        }, 250);
      });

      document.querySelectorAll("#nxt")[0].addEventListener("click", () => {
        this.buttonAudio();
        document.querySelector(".input").innerHTML = `
        <div class="count">Select Players!
          <button id="2P">2 Players</button>
          <button id="3P">3 Players</button>
          <button id="4P">4 Players</button>
        </div>`;
        this.popup();
      });
    }

    popup() {
      document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
          this.buttonAudio();
          setTimeout(() => {
            this.states.playerCount = parseInt(button.id[0]);
            document.querySelector(".count").remove();
            document.querySelector(".input").innerHTML = `
            <div class="count">
              PLAYER NAMES
              ${["blue", "yellow", "green", "red"].map(color =>
              `<input type="text" class="${color}" placeholder="${color.charAt(0).toUpperCase() + color.slice(1)} Player Name">`
            ).join('')}
              <div class="buttons">
                <button id="nxt">BACK</button>
                <button id="nxt">START</button>
              </div>
            </div>`;
            this.handleName();
          }, 100);
        });
      });
    }

    nextTurn() {
      let attempts = 0;
      do {
        this.states.currentPlayer = (this.states.currentPlayer + 1) % this.players.length;
        attempts++;
        if (attempts > this.players.length) {
          console.log("No active players!");
          break;
        }
      } while (!this.players[this.states.currentPlayer].playing);
    }

    getDiceResult(X, Y) {
      const lookupTable = {
        "0,0": 6,
        "0,0.25": 3,
        "0,0.5": 1,
        "0,0.75": 4,
        "0,-0.25": 4,
        "0,-0.5": 1,
        "0,-0.75": 3,

        "0.25,0": 2,
        "0.25,0.25": 2,
        "0.25,0.5": 2,
        "0.25,0.75": 2,
        "0.25,-0.25": 2,
        "0.25,-0.5": 2,
        "0.25,-0.75": 2,

        "-0.25,0": 5,
        "-0.25,0.25": 5,
        "-0.25,0.5": 5,
        "-0.25,0.75": 5,
        "-0.25,-0.25": 5,
        "-0.25,-0.5": 5,
        "-0.25,-0.75": 5,

        "-0.5,0": 1,
        "-0.5,0.25": 4,
        "-0.5,0.5": 6,
        "-0.5,0.75": 3,
        "-0.5,-0.25": 3,
        "-0.5,-0.5": 6,
        "-0.5,-0.75": 4,

        "0.5,0": 1,
        "0.5,0.25": 4,
        "0.5,0.5": 6,
        "0.5,0.75": 3,
        "0.5,-0.25": 3,
        "0.5,-0.5": 6,
        "0.5,-0.75": 4,

        "0.75,0": 5,
        "0.75,0.25": 5,
        "0.75,0.5": 5,
        "0.75,0.75": 5,
        "0.75,-0.25": 5,
        "0.75,-0.5": 5,
        "0.75,-0.75": 5,

        "-0.75,0": 2,
        "-0.75,0.25": 2,
        "-0.75,0.5": 2,
        "-0.75,0.75": 2,
        "-0.75,-0.25": 2,
        "-0.75,-0.5": 2,
        "-0.75,-0.75": 2,
      };

      const key = `${X},${Y}`;
      return lookupTable[key];
    }

    blinkHome(i) {
      this.players.forEach((player) => {
        document.querySelector(`.${player.color}-home`).removeAttribute("style");
      });

      if (i !== "stop") {
        document.querySelector(`.${this.players[i].color}-home`).style =
          `animation: blink${this.players[i].color} 1s infinite ease-in-out;`;
      }
    }

    gameLogic() {
      this.arrow(this.states.currentPlayer);

      this.players.forEach((player, i) => {
        player.diceDiv.addEventListener("click", () => {
          if (!this.states.isDiceRolling && this.states.currentPlayer == i && !this.states.lockDice) {
            this.arrow("remove");
            this.rollDice(i).then(() => {
              this.states.lockDice = true;
              if (this.states.diceResult != 6 &&
                document.querySelector(`.${player.color}-home`).querySelectorAll(".token").length ==
                document.querySelectorAll(`.${player.color}.innerCircle`).length) {
                this.nextTurn();
                this.arrow(this.states.currentPlayer);
                this.states.lockDice = false;
              } else {
                this.blinkHome(this.states.currentPlayer);
                this.states.activeToken = true;
                this.states.movingToken = false;
              }
            });
          }
        });

        player.tokens.forEach((token) => {
          token.addEventListener("click", () => {
            if (this.states.activeToken && this.getColorToken(token) == this.players[this.states.currentPlayer].color && !this.states.movingToken) {
              if (this.states.diceResult == 6 && token.parentElement.parentElement.classList[0] == "cont") {
                this.toGround(token).then(() => {
                  this.states.activeToken = false;
                  this.states.lockDice = false;
                  this.arrow(this.states.currentPlayer);
                  this.blinkHome("stop");
                });
              } else if (token.parentElement.classList[0] == "cell") {
                this.move(token, this.states.diceResult).then(() => {
                  if (this.states.diceResult != 6 && !this.states.killed) {
                    this.states.reached ? this.states.reached = false : this.nextTurn();
                  } else if (this.states.killed) {
                    this.states.killed = false;
                  }
                  this.states.activeToken = false;
                  this.states.lockDice = false;
                  this.arrow(this.states.currentPlayer);
                  this.blinkHome("stop");
                });
              }
            }
          });
        });
      });
    }

    rollDice(i) {
      return new Promise((resolve) => {
        this.states.isDiceRolling = true;
        const rotX = Math.trunc(Math.random() * 100 - 50);
        const rotY = Math.trunc(Math.random() * 100 - 50);
        let turnX = rotX / 4 - Math.trunc(rotX / 4);
        let turnY = rotY / 4 - Math.trunc(rotY / 4);

        this.players[i].diceDiv.style =
          `transform: rotateX(${90 * rotX}deg) rotateY(${90 * rotY}deg);`;

        setTimeout(() => {
          this.states.diceResult = this.getDiceResult(turnX, turnY);
          resolve(this.states.diceResult);
          this.states.consecutiveSixes.push(this.states.diceResult);
          this.states.isDiceRolling = false;
        }, 2000);
      });
    }

    async toHome(token) {
      token.classList.add("goingHome");
      this.states.movingToken = true;
      const pos = { b: 1, y: 2, g: 3, r: 4 };
      const color = this.getColorToken(token);
      const k = parseInt(token.parentElement.attributes[pos[color[0]]].nodeValue);

      const oneStep = (token) => {
        return new Promise((resolve) => {
          const j = parseInt(token.parentElement.attributes[pos[color[0]]].nodeValue);
          const targetCell = this.getCellByColor(color[0], j - 1);
          const initPos = this.getCenterOfDiv(token.parentElement);
          const finPos = this.getCenterOfDiv(targetCell);

          token.style.transform = `translate(${finPos.x - initPos.x}px, ${finPos.y - initPos.y}px)`;

          setTimeout(() => {
            targetCell.appendChild(token);
            token.removeAttribute("style");
            resolve();
          }, 100);
        });
      };

      for (let i = k; i > 1; i--) {
        await oneStep(token);
      }

      const targetSlots = document.querySelectorAll(`.${color}T`);
      for (let i = 0; i < 4; i++) {
        if (targetSlots[i].childElementCount === 0) {
          const final = this.getCenterOfDiv(targetSlots[i]);
          const initial = this.getCenterOfDiv(token.parentElement);
          token.style.transform = `translate(${final.x - initial.x}px, ${final.y - initial.y}px)`;

          setTimeout(() => {
            token.removeAttribute("style");
            targetSlots[i].appendChild(token);
            
          }, 100);
          break;
        }
      }
    }

    getCellByColor(color, value) {
      return document.querySelector(`.cell[${color}="${value}"]`);
    }

    async move(token, step) {
      const pos = { b: 1, y: 2, g: 3, r: 4 };
      const color = this.getColorToken(token)[0];
      let f = parseInt(token.parentElement.attributes[pos[color]].nodeValue) + step;
      const finalCell = this.getCellByColor(color, f);

      if (f > 57 || (finalCell?.querySelectorAll(".token").length > 1 &&
        color !== this.getColorToken(finalCell.children[0]) &&
        finalCell.classList[1] !== "stop")) {
        return;
      }

      token.classList.add("moving");
      this.states.movingToken = true;

      for (let i = 0; i < step; i++) {
        const parent = token.parentElement;
        const targetCell = this.getCellByColor(color, parseInt(parent.attributes[pos[color]].nodeValue) + 1);

        if (!targetCell) {
          token.remove();
          this.checkWin(this.getColorToken(token));
          return;
        }

        const { x, y } = this.getCenterOfDiv(targetCell);
        const { x: initX, y: initY } = this.getCenterOfDiv(parent);
        token.style.transform = `translate(${x - initX}px, ${y - initY}px)`;

        await new Promise((resolve) => setTimeout(() => {
          targetCell.appendChild(token);
          token.removeAttribute("style");
          resolve();
        }, 300));
      }

      token.classList.remove("moving");
      finalCell.appendChild(token);
      

      await new Promise((resolve) => {
        setTimeout(() => resolve(), 200);
      });
    }

    toGround(token) {
      return new Promise((resolve) => {
        if (token.parentElement.parentElement.classList[0] == "cont") {
          token.classList.add("moving");
          this.states.movingToken = true;
          const final = this.getCenterOfDiv(this.getCellByColor(this.getColorToken(token)[0], 1));
          const initial = this.getCenterOfDiv(token.parentElement);

          token.style.transform = `translate(${final.x - initial.x}px, ${final.y - initial.y}px)`;

          setTimeout(() => {
            token.removeAttribute("style");
            this.getCellByColor(this.getColorToken(token)[0], 1).appendChild(token);
            token.classList.remove(token.classList[1]);
            
            resolve();
          }, 300);
        }
      });
    }

    arrow(i) {
      for (let j = 1; j <= 4; j++) {
        document.querySelector(`.arrow${j}`)?.remove();
      }

      if (i !== "remove") {
        const n = parseInt(this.players[i].diceDiv.parentElement.classList[0][4]);
        const arrowElem = document.createElement("div");
        arrowElem.className = `arrow${n}`;
        document.querySelector(`.dice${n}`).appendChild(arrowElem);
      }
    }

    checkWin(color) {
      if (document.querySelectorAll(`.token .${color}`).length == 0) {
        const num = ["One", "Two", "Three", "Four"];
        this.states.winOrder.push(color);
        document.querySelector(`.${color}-home .cont`).innerHTML = "";
        const elem = document.createElement("div");
        elem.className = `won${num[this.states.winOrder.length - 1]}`;
        document.querySelector(`.${color}-home .cont`).appendChild(elem);
        this.blinkHome("stop");

        this.players.find(player => player.color === color).playing = false;

        if (this.states.winOrder.length == this.states.playerCount - 1) {
          setTimeout(() => {
            const lastColor = this.players[this.states.currentPlayer].color;
            this.states.winOrder.push(lastColor);
            document.querySelector(`.${lastColor}-home .cont`).innerHTML = "";
            const elem = document.createElement("div");
            elem.className = `won${num[this.states.winOrder.length - 1]}`;
            document.querySelector(`.${lastColor}-home .cont`).appendChild(elem);
            this.blinkHome("stop");
            this.players[this.states.currentPlayer].playing = false;
            this.arrow("remove");
          }, 200);
        }
      }
      else {
        this.states.reached = true;
      }
    }

    showDiv() {
      const div = document.querySelector(".Myname");
      div.style.display = 'block';
      setTimeout(() => {
        div.style.display = 'none';
      }, 2000);
    }

    showTokens(token) {
      if (token != "none") {
        const Elem = document.createElement("div");
        Elem.setAttribute("class", "turn");
        token.appendChild(Elem)
      } else {
        document.querySelectorAll(".token").forEach((token) => {
          token.querySelector(".turn")?.remove()
        })
      }
    }
  }
  const game = new Game();

  setTimeout(()=>{
    document.querySelectorAll("a")[0].remove();
    document.querySelector("div").remove();
},1100)

