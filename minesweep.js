let isGameLoaded;
document.querySelector("#btn-game").addEventListener("click", () => {
  if (!isGameLoaded) {
    let grid = document.querySelector(".grid");

    let width = 10;
    let bombAmount = 20;
    let squares = [];
    let isGameOver = false;
    let flags = 0;
    isGameLoaded = true;

    //create Board
    function createBoard() {
      //get Shuffled game array with random bombs
      const bombsArray = Array(bombAmount).fill("bomb");
      const emptyArray = Array(width * width - bombAmount).fill("valid");

      let gameArray = emptyArray.concat(bombsArray);
      let shuffledArray = gameArray.sort(() => Math.random() - 0.5);

      for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div");
        square.setAttribute("id", i);
        square.classList.add(shuffledArray[i]);
        grid.appendChild(square);
        squares.push(square);

        square.addEventListener("click", () => {
          click(square);
        });

        //control and left click
        square.oncontextmenu = (e) => {
          e.preventDefault();
          addFlag(square);
        };
      }

      //add numbers
      for (let i = 0; i < squares.length; i++) {
        let total = 0;
        let isLeftEdge = i % width === 0;
        let isRightEdge = i % width === width - 1;

        if (squares[i].classList.contains("valid")) {
          if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
            total++;
          if (
            i > 9 &&
            !isRightEdge &&
            squares[i + 1 - width].classList.contains("bomb")
          )
            total++;
          if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
          if (
            i > 11 &&
            !isLeftEdge &&
            squares[i - 1 - width].classList.contains("bomb")
          )
            total++;
          if (
            i < 98 &&
            !isRightEdge &&
            squares[i + 1].classList.contains("bomb")
          )
            total++;
          if (
            i < 90 &&
            !isLeftEdge &&
            squares[i - 1 + width].classList.contains("bomb")
          )
            total++;
          if (
            i < 88 &&
            !isRightEdge &&
            squares[i + 1 + width].classList.contains("bomb")
          )
            total++;
          if (i < 89 && squares[i + width].classList.contains("bomb")) total++;
          squares[i].setAttribute("data", total);
        }
      }
    }

    createBoard();

    function addFlag(square) {
      if (isGameOver) return;
      if (!square.classList.contains("checked") && flags < bombAmount) {
        if (!square.classList.contains("flag")) {
          square.classList.add("flag");
          square.innerHTML = " 🚩";
          flags++;
          // flagsLeft.innerHTML = bombAmount - flags;
          checkForWin();
        } else {
          square.classList.remove("flag");
          square.innerHTML = "";
          flags--;
          // flagsLeft.innerHTML = bombAmount - flags;
        }
      }
    }

    //click on square actions
    function click(square) {
      if (isGameOver) return;
      if (
        square.classList.contains("checked") ||
        square.classList.contains("flag")
      )
        return;
      if (square.classList.contains("bomb")) {
        gameOver();
      } else {
        let total = square.getAttribute("data");
        if (total != 0) {
          square.classList.add("checked");
          square.innerHTML = total;
          return;
        }
        square.classList.add("checked");
      }
      checkSquare(square);
    }

    //chck neighboring square once square is clicked
    function checkSquare(square) {
      let id = square.id;
      let isLeftEdge = id % width === 0;
      let isRightEdge = id % width === width - 1;
      setTimeout(() => {
        if (id > 0 && !isLeftEdge) {
          const newId = squares[parseInt(id) - 1].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (id > 9 && !isRightEdge) {
          const newId = squares[parseInt(id) + 1 - width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (id > 10) {
          const newId = squares[parseInt(id) - width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (id > 11 && !isLeftEdge) {
          const newId = squares[parseInt(id) - 1 - width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (id < 98 && !isRightEdge) {
          const newId = squares[parseInt(id) + 1].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (id < 90 && !isLeftEdge) {
          const newId = squares[parseInt(id) - 1 + width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (id < 88 && !isRightEdge) {
          const newId = squares[parseInt(id) + 1 + width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
        if (id < 89) {
          const newId = squares[parseInt(id) + width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
      }, 10);
    }

    //game over
    function gameOver() {
      isGameOver = true;
      console.log("BOOM! Game Over");
      //show all the bombs
      squares.forEach((square) => {
        if (square.classList.contains("bomb")) {
          square.innerHTML = "💣";
        }
      });
      openResponseModal("BOOM! Game Over");
    }

    //check for win
    function checkForWin() {
      ///simplified win argument
      let matches = 0;

      for (let i = 0; i < squares.length; i++) {
        if (
          squares[i].classList.contains("flag") &&
          squares[i].classList.contains("bomb")
        ) {
          matches++;
        }
        if (matches === bombAmount) {
          result.innerHTML = "YOU WIN!";
          openResponseModal("YOU WIN!");
          isGameOver = true;
        }
      }
    }
    function openResponseModal(response) {
      //Get Modal Element
      const responseCenter = document.querySelector("#response-center");
      const responseMessage = document.createElement("div");
      responseMessage.innerHTML = `<h4>"${response}"</h4>`;
      responseCenter.appendChild(responseMessage);
      const modal = document.getElementById("responseModal");

      modal.style.display = "block";
    }
  }
});
