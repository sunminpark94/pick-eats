const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const choiceElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btns')
const choiceOneElement = document.getElementById('choice-one')
const choiceTwoElement = document.getElementById('choice-two')
const buttonOne = document.createElement('button')
const buttonTwo = document.createElement('button')
let randomChoiceOne, randomChoiceTwo, randomChoice, previous, buttonToReplace;
const checkList = new Set()
let currentChoiceIndex = 0;
let buttonOneClicked = false;
let buttonTwoClicked = false;

startButton.addEventListener('click', startGame);

function clickNext() {
    nextButton.addEventListener('click', () => {
        currentChoiceIndex++
        setNextQuestion()
    })
}

/*what happens when start button is clicked*/
function startGame() {
    startButton.classList.add('hide')
    firstRandomChooser()
}    

/* for the first question set only */
function firstRandomChooser() {
    /*chooses first random choice */
    randomChoiceOne = choices[Math.floor(Math.random() * choices.length)]
    storeChoice(randomChoiceOne)

    /*chooses second random choice */
    randomChoiceTwo = choices[Math.floor(Math.random() * choices.length)]
    while (checkList.has(randomChoiceTwo)) {
        randomChoiceTwo = choices[Math.floor(Math.random() * choices.length)]
    }
    storeChoice(randomChoiceTwo)

    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

/*for second - last choices */
function randomChooser() {
    randomChoice = choices[Math.floor(Math.random() * choices.length)];
    while (checkList.has(randomChoice)) {
        randomChoice = choices[Math.floor(Math.random() * choices.length)];
    }
    storeChoice(randomChoice);
}

/*stores random choice into checklist set*/
function storeChoice(choice) {
    checkList.add(choice);
}

/*what happens when next button is clicked*/
function setNextQuestion() {
    resetState()
    showChoiceOne(randomChoiceOne)
    showChoiceTwo(randomChoiceTwo)
    nextButton.classList.remove('hide');
    nextButton.addEventListener('click', followingQuestion);
}

/* for showing second - last questions */
function followingQuestion() {
    randomChooser();
    if (buttonOneClicked == false) {
        previous = buttonOneClicked;
        buttonToReplace = buttonOne;
    } else {
        previous = buttonTwoClicked;
        buttonToReplace = buttonTwo;
    }
    replace(previous, randomChoice, buttonToReplace);
}

/*to replace the unchosen choice */
function replace(previous, next, button) {
    button.innerHTML = next;
}

/*displays choice one from checkList set */
function showChoiceOne(choice) {
    console.log(choice)
    const buttonOne = document.createElement('button')
    buttonOne.innerText = choice
    buttonOne.classList.add('btn')
    buttonOne.addEventListener('click', handleClickOne)
    answerButtonsElement.appendChild(buttonOne)
}

/*displays choice two from checkList set */
function showChoiceTwo(choice) {
    console.log(choice)
    const buttonTwo = document.createElement('button')
    buttonTwo.innerText = choice
    buttonTwo.classList.add('btn')
    buttonTwo.addEventListener('click', handleClickTwo)
    answerButtonsElement.appendChild(buttonTwo)
}

function handleClickOne() {
    buttonOneClicked = true
}

function handleClickTwo() {
    buttonTwoClicked = true
}

/*to hide default answers*/
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

/*what happens when an answer is selected*/
// function selectAnswer() {
//     clicked = true
    
    // const chosen = selectedButton.dataset.chosen;
    // setStatusClass(document.body, chosen);
    // Array.from(answerButtonsElement.children).forEach(button => {
    //     setStatusClass(button, button.dataset.chosen);
    // });
// }

function setStatusClass(element, chosen) {
    clearStatusClass(element)
    if (chosen) {
        element.classList.add('chosen');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('chosen');
    element.classList.remove('wrong');
}

var choices = [];
    choices[0] = "Burger"
    choices[1] = "Pizza"
    choices[2] = "Pasta"
    choices[3] = "Sushi"
    choices[4] = "Korean"
    choices[4] = "Chinese"
    // choices[0] = new Image;
    // choices[0].src="./img/burger.jpg";
    // choices[1] = new Image;
    // choices[1].src="./img/pizza.jpg";
    // choices[2] = new Image;
    // choices[2].src="./img/sushi.jpeg";
