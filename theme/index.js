//inisiasi soal dalam quiz
const gambar1 = document.createElement("img");
gambar1.src = 'picture/senang.png';

const gambar2 = document.createElement("img");
gambar2.src = 'picture/bangga.png';

const gambar3 = document.createElement("img");
gambar3.src = 'picture/marah.png';

const gambar4 = document.createElement("img");
gambar4.src = 'picture/kaget.png';

const gambar5 = document.createElement("img");
gambar5.src = 'picture/sedih.png';

const gambar6 = document.createElement("img");
gambar6.src = 'picture/malu.png';

const gambar7 = document.createElement("img");
gambar7.src = 'picture/takut.png';

const gambar8 = document.createElement("img");
gambar8.src = 'picture/sedih2.png';

const gambar9 = document.createElement("img");
gambar9.src = 'picture/senang2.png';

const gambar10 = document.createElement("img");
gambar10.src = 'picture/bangga2.png';


const questions = [
    {
        img: gambar1,
        question: "Bagaimana Perasaan Pada Gambar Di Atas?",
        optionA: "Senang",
        optionB: "Sedih",
        optionC: "Marah",
        optionD: "Takut",
        correctOption: "optionA"
    },
    {
        img: gambar2,
        question: "Bagaimana Perasaan Pada Gambar Di Atas?",
        optionA: "Senang",
        optionB: "Sedih",
        optionC: "Bangga",
        optionD: "Takut",
        correctOption: "optionC"
    },
    {
        img: gambar3,
        question: "Bagaimana Perasaan Pada Gambar Di Atas?",
        optionA: "Senang",
        optionB: "Sedih",
        optionC: "Marah",
        optionD: "Takut",
        correctOption: "optionC"
    },
    {
        img: gambar4,
        question: "Bagaimana Perasaan Pada Gambar Di Atas?",
        optionA: "Senang",
        optionB: "Kaget",
        optionC: "Sedih",
        optionD: "Bangga",
        correctOption: "optionB"
    },
    {
        img: gambar5,
        question: "Bagaimana Perasaan Pada Gambar Di Atas?",
        optionA: "Senang",
        optionB: "Bangga",
        optionC: "Malu",
        optionD: "Sedih",
        correctOption: "optionD"
    },
    {
        img: gambar6,
        question: "Bagaimana Perasaan Pada Gambar Di Atas?",
        optionA: "Malu",
        optionB: "Marah",
        optionC: "Bangga",
        optionD: "Takut",
        correctOption: "optionA"
    },
    {
        img: gambar7,
        question: "Bagaimana Perasaan Pada Gambar Di Atas?",
        optionA: "Bangga",
        optionB: "Sedih",
        optionC: "Marah",
        optionD: "Takut",
        correctOption: "optionD"
    },
    {
        img: gambar8,
        question: "Bagaimana Perasaan Pada Gambar Di Atas?",
        optionA: "Senang",
        optionB: "Sedih",
        optionC: "Kaget",
        optionD: "Takut",
        correctOption: "optionB"
    },
    {
        img: gambar9,
        question: "Bagaimana Perasaan Pada Gambar Di Atas?",
        optionA: "Senang",
        optionB: "Sedih",
        optionC: "Marah",
        optionD: "Takut",
        correctOption: "optionA"
    },
    {
        img: gambar10,
        question: "Bagaimana Perasaan Pada Gambar Di Atas?",
        optionA: "Senang",
        optionB: "Sedih",
        optionC: "Bangga",
        optionD: "Takut",
        correctOption: "optionC"
    }

]



let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("display-img").style.height = "210px";
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-img").appendChild(currentQuestion.img);
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked === false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
        document.getElementById("display-img").appendChild();
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Belajar lagi yaa."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Bagus."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Hebat."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}