const players = {
    player1: {
        image: "images/x.png"
    },
    player2: {
        image: "images/o.png"
    }
}

const tiles = document.querySelectorAll('.tile')

// PLAYER GUIDE PROMPT
const newH2 = document.createElement('h2')
newH2.textContent = "Player 1's Turn"
document.querySelector('.player-prompt').append(newH2)
const winnerPrompt = document.querySelector('.player-prompt')

let player1Score = 0
let player2Score = 0
const scorePlayer1 = document.querySelector('.player1-score span')
const scorePlayer2 = document.querySelector('.player2-score span')
let currentPlayer = players.player1

// WINNING ANIMATION
const star = document.querySelector('.star-selector')


// MAIN GAME LOGIC
const runGame = function() {

    for (let tile of tiles) {
    
        tile.addEventListener('click', function() {
            if (!tile.classList.contains('clicked')) {
                tile.classList.add('clicked')
                const newImg = document.createElement('img')
        
                if (currentPlayer === players.player1) {
                    newImg.classList.add('x-piece')
                    newImg.src = currentPlayer.image
                    newImg.alt = 'X piece'
                    tile.setAttribute('data-piece', 'x')
                } else if (currentPlayer === players.player2) {
                    newImg.classList.add('o-piece')
                    newImg.src = currentPlayer.image
                    newImg.alt = 'O piece'
                    tile.setAttribute('data-piece', 'o')
                }
                tile.append(newImg)  


                // PLAYER GUIDE PROMPT
                if (currentPlayer === players.player1) {
                    setTimeout(function() {
                        newH2.textContent = "Player 2's Turn"
                    }, 80)
        
                } else if (currentPlayer === players.player2) {
                    setTimeout(function() {
                        newH2.textContent = "Player 1's Turn"
                    }, 80)
                }
        

                // ALTERNATING BETWEEN PIECES
                if (currentPlayer === players.player1) {
                    currentPlayer = players.player2
                } else if (currentPlayer === players.player2) {
                    currentPlayer = players.player1
                }

                
                // CHECK WINNING CONDITION
                const topLeft = document.querySelector('.top-left')
                const topMiddle = document.querySelector('.top-middle')
                const topRight = document.querySelector('.top-right')
                const middleLeft = document.querySelector('.middle-left')
                const middleMiddle = document.querySelector('.middle-middle')
                const middleRight = document.querySelector('.middle-right')
                const bottomLeft = document.querySelector('.bottom-left')
                const bottomMiddle = document.querySelector('.bottom-middle')
                const bottomRight = document.querySelector('.bottom-right')


                if ((topLeft.dataset.piece === "x" && topMiddle.dataset.piece === "x" && topRight.dataset.piece === "x")||             
                    (middleLeft.dataset.piece === "x" && middleMiddle.dataset.piece === "x" && middleRight.dataset.piece === "x")||               
                    (bottomLeft.dataset.piece === "x" && bottomMiddle.dataset.piece === "x" && bottomRight.dataset.piece === "x")||                
                    (topLeft.dataset.piece === "x" && middleLeft.dataset.piece === "x" && bottomLeft.dataset.piece === "x")||                
                    (topMiddle.dataset.piece === "x" && middleMiddle.dataset.piece === "x" && bottomMiddle.dataset.piece === "x")||                   
                    (topRight.dataset.piece === "x" && middleRight.dataset.piece === "x" && bottomRight.dataset.piece === "x")||                
                    (topLeft.dataset.piece === "x" && middleMiddle.dataset.piece === "x" && bottomRight.dataset.piece === "x")||
                    (topRight.dataset.piece === "x" && middleMiddle.dataset.piece === "x" && bottomLeft.dataset.piece === "x")) {
                    
                    // WINNING ANIMATION
                    star.classList.add('star')
                    // removing class after total animation time
                    setTimeout(function() {
                        star.classList.remove('star')
                    }, 2000)

                    setTimeout(function() {
                        newH2.textContent = "Player 1 Wins!"
                        player1Score += 1
                        scorePlayer1.textContent = player1Score
                        winnerPrompt.classList.add('winner')

                        // AUDIO
                        const winAudio = document.querySelector('#win-audio')
                        if (!winAudio.classList.contains('muted')) {
                            winAudio.volume = 0.3
                            winAudio.play()
                        }
                    }, 80)

                    for (let tile of tiles) {
                        tile.classList.add('clicked')
                    }
                    
                } else if ((topLeft.dataset.piece === "o" && topMiddle.dataset.piece === "o" && topRight.dataset.piece === "o")||
                            (middleLeft.dataset.piece === "o" && middleMiddle.dataset.piece === "o" && middleRight.dataset.piece === "o")||
                            (bottomLeft.dataset.piece === "o" && bottomMiddle.dataset.piece === "o" && bottomRight.dataset.piece === "o")||
                            (topLeft.dataset.piece === "o" && middleLeft.dataset.piece === "o" && bottomLeft.dataset.piece === "o")||
                            (topMiddle.dataset.piece === "o" && middleMiddle.dataset.piece === "o" && bottomMiddle.dataset.piece === "o")||
                            (topRight.dataset.piece === "o" && middleRight.dataset.piece === "o" && bottomRight.dataset.piece === "o")||
                            (topLeft.dataset.piece === "o" && middleMiddle.dataset.piece === "o" && bottomRight.dataset.piece === "o")||
                            (topRight.dataset.piece === "o" && middleMiddle.dataset.piece === "o" && bottomLeft.dataset.piece === "o")) {
                            
                            // WINNING ANIMATION
                            star.classList.add('star')
                            // removing class after total animation time
                            setTimeout(function() {
                                star.classList.remove('star')
                            }, 2000)

                            setTimeout(function() {
                                newH2.textContent = "Player 2 Wins!"
                                player2Score += 1
                                scorePlayer2.textContent = player2Score
                                winnerPrompt.classList.add('winner')
                                
                                // AUDIO
                                const winAudio = document.querySelector('#win-audio')
                                if (!winAudio.classList.contains('muted')) {
                                    winAudio.volume = 0.3
                                    winAudio.play()
                                }
                            }, 80)

                            for (let tile of tiles) {
                                tile.classList.add('clicked')
                            }
                        } else {
                            let count = 0
                            for (let tile of tiles) {
                                if (tile.classList.contains('clicked')) {
                                    count++
                                }
                            }
                            // DRAW LOGIC
                            if (count === 9) {
                                setTimeout(function() {
                                    newH2.textContent = "Draw!"
                                    winnerPrompt.classList.add('draw')

                                    //AUDIO
                                    const drawAudio = document.querySelector('#draw-audio')
                                    if (!drawAudio.classList.contains('muted')) {
                                        drawAudio.volume = 0.7
                                        drawAudio.play()
                                    }
                                }, 80)
                            } else {
                                // AUDIO
                                const laserAudio = document.querySelector('#laser-audio') 
                                if (!laserAudio.classList.contains('muted')) {
                                    laserAudio.volume = 0.5
                                    laserAudio.play()
                                }
                                
                            }
                        }
            }
        })
    }
}
runGame()


// RESTART BUTTON
const restart = function() {
    const restartBtn = document.querySelector('.restart-button')
    restartBtn.addEventListener('click', function() {

        winnerPrompt.classList.remove('winner')
        winnerPrompt.classList.remove('draw')

        for (let tile of tiles) {
            if (tile.hasChildNodes()) {
                const image = document.querySelector('.tile img')
                tile.removeChild(image)
            }

            tile.removeAttribute('data-piece')
            tile.classList.remove('clicked')
        }
        newH2.textContent = "Player 1's Turn"
        currentPlayer = players.player1
 
        runGame()
    })
}
restart()


// RESET SCORE BUTTON
const reset = function() {
    const resetBtn = document.querySelector('.reset-score-button')
    resetBtn.addEventListener('click', function() {
        player1Score = 0
        player2Score = 0 
        scorePlayer1.textContent = player1Score
        scorePlayer2.textContent = player2Score
    })
}
reset()


// CHANGE AVATAR BUTTON
const avatarBtn = function() {
    const avatarImages = ["images/alien.png", "images/astronaut.png", "images/planet.png", "images/robot.png", "images/ufo.png"]

    const p1LeftArrow = document.querySelector('.p1-left-arrow')
    const p1RightArrow = document.querySelector('.p1-right-arrow')
    const p2LeftArrow = document.querySelector('.p2-left-arrow')
    const p2RightArrow = document.querySelector('.p2-right-arrow')

    // set default avatar
    const p1Avatar = document.querySelector('.p1-avatar')
    const p2Avatar = document.querySelector('.p2-avatar')

    p1Index = 0
    p2Index = 0

    p1Avatar.setAttribute('src', avatarImages[p1Index])
    p2Avatar.setAttribute('src', avatarImages[p2Index])

    // clicking of buttons
    p1LeftArrow.addEventListener('click', function() {
        if (p1Index > 0) {
            p1Index--
        } else if (p1Index === 0) {
            p1Index = avatarImages.length - 1
        }
        p1Avatar.setAttribute('src', avatarImages[p1Index])
    })

    p1RightArrow.addEventListener('click', function() {
        if (p1Index < avatarImages.length - 1) {
            p1Index++
        } else if (p1Index === avatarImages.length - 1) {
            p1Index = 0
        }
        p1Avatar.setAttribute('src', avatarImages[p1Index])
    })

    p2LeftArrow.addEventListener('click', function() {
        if (p2Index > 0) {
            p2Index--
        } else if (p2Index === 0) {
            p2Index = avatarImages.length - 1
        }
        p2Avatar.setAttribute('src', avatarImages[p2Index])
    })

    p2RightArrow.addEventListener('click', function() {
        if (p2Index < avatarImages.length - 1) {
            p2Index++
        } else if (p2Index === avatarImages.length - 1) {
            p2Index = 0
        }
        p2Avatar.setAttribute('src', avatarImages[p2Index])
    })
}
avatarBtn()


// CHANGE NAME BUTTON
const nameBtn = function() {
    const nameEditP1 = document.querySelector('.name-p1 h3')
    const nameEditP2 = document.querySelector('.name-p2 h3')
    
    nameEditP1.addEventListener('click', function() {

        nameEditP1.remove()

        const newTextInputP1 = document.createElement('input')
        newTextInputP1.classList.add('nameText', 'name-input-p1')
        const nameP1 = document.querySelector('.name-p1')
        nameP1.append(newTextInputP1)

        const focusP1 = document.querySelector('.name-input-p1')
        focusP1.focus()

        focusP1.addEventListener('keydown', function(event) {
            if (event.keyCode == 13) {
                focusP1.blur()
            }
        })
    })

    nameEditP2.addEventListener('click', function() {

        nameEditP2.remove()

        const newTextInputP2 = document.createElement('input')
        newTextInputP2.classList.add('nameText', 'name-input-p2')
        const nameP2 = document.querySelector('.name-p2')
        nameP2.append(newTextInputP2)

        const focusP2 = document.querySelector('.name-input-p2')
        focusP2.focus()

        focusP2.addEventListener('keydown', function(event) {
            if (event.keyCode == 13) {
                focusP2.blur()
            }
        })
    })   
}
nameBtn()


// MUTE BUTTON
const muteBtn = function() {
    const mute = document.querySelector('.mute-button')
    mute.addEventListener('click', function() {
        const audios = document.querySelectorAll('audio')
        for (let audio of audios) {
            audio.classList.toggle('muted')
        }

        // change button to unmute
        const muteIcon = document.querySelector('.mute-button img') 
        const muteName = document.querySelector('.mute-button span')

        if (muteName.textContent === "Mute") {
            muteIcon.setAttribute('src', 'images/unmute.png')
            muteName.textContent = "Unmute"
        } else {
            muteIcon.setAttribute('src', 'images/mute.png')
            muteName.textContent = "Mute"
        }
        

    })
}
muteBtn()



