// Global var for quizId, numéro de la question et le nombre de bonnes réponse(s)
var quizId;
var numQuest = 0;
var bonneReponse = 0;
// End of var

/**
 * Get the id of the quizz from the url, increment the id of the quizz into a global variable.
 */
function getIdUrl() {
    // Recupere en Jquery tout le path
    var pageUrl = $(location).attr('href');
    // Objet qui represente url de notre page
    var url = new URL(pageUrl);

    // Retourn la valeur de la requête url.search
    var query_string = url.search;

    var search_params = new URLSearchParams(query_string);
    //Retourne la première valeur associée au paramètre de recherche donné.
    quizId = search_params.get('quizId');
    findEmplacementQuiz();
}

/**
 * find the position of the quizz in the data array and return it.
 * @returns position of the quizz in the data array
 */
function findEmplacementQuiz() {
    for (var i in data) {
        if (data[i].id == quizId) {
            return i;
        }
    }
}

/**
 * Set the theme of the quizz.
 */
function displayQuizTheme() {
    var emplacementData = findEmplacementQuiz();
    $("#quizTheme").text("Quiz sur le thème : " + data[emplacementData].description);
}

/**
 * Set the number of the current question and set the question to traduce. Create the button in the word container
 */
function displayQuestion() {
    var emplacementData = findEmplacementQuiz();
    // affiche le numéro de question
    $("#numQuest").text("Question " + (numQuest + 1) + " :")
    // affiche la question
    $("#question").text(data[emplacementData].questions[numQuest].question);
    let [splitAnswer, idAnswers] = getAnswerQuestion();
    for (var i in splitAnswer) {
        $("#boutonQuestion").append('<button id="' + idAnswers[i] + '" class="questionBut espace-small questionButton">' + splitAnswer[i] + '</button>');
    }
}

/**
 * Return the answer of the question
 * @returns answer of the question
 */
function getAnswer() {
    var emplacementData = findEmplacementQuiz();
    return answers = data[emplacementData].questions[numQuest].answer;
}
/**
 * Get the full answer and return the position of wich word in answer
 * @returns the position of answer
 */
function setAnswerSplit() {
    let answers = getAnswer();
    let answersSplit = answers.split(" ");
    for (var i = 0; i < answersSplit.length; i++) {
        answersSplit[i] = i;
    }
    return answersSplit;
}

/**
 * Split word and extra word in array and return the all split word and position of it.
 * @returns In array all word and position of it.
 */
function getAnswerQuestion() {
    var emplacementData = findEmplacementQuiz();
    // Stock la réponse non spliter
    let answers = getAnswer();
    let answersSplit = setAnswerSplit();
    // Stock les mots extra
    let otherAnswer = data[emplacementData].questions[numQuest].extras;
    let allWordAnswer = answers + " " + otherAnswer;
    let splitAnswer = allWordAnswer.split(" ");
    let idAnswers = [];
    for (var i = 0; i < splitAnswer.length; i++) {
        idAnswers[i] = i;
    }
    // Mélange
    shuffleAnswer(splitAnswer, idAnswers);
    // Retourne le tableau
    return [splitAnswer, idAnswers];
}

/**
 * Get the position of data and return the number of question in total
 * @returns number of question in total
 */
function getNumberQuestion() {
    var emplacementData = findEmplacementQuiz()
    return nbQuestion = data[emplacementData].questions.length;
}
/**
 * Randomly Shuffle in the same order the first tab and the second tab.
 * @param {*} splitAnswer array contain all split answer
 * @param {*} IdSplitAnswer array contain all position of split answer
 */
function shuffleAnswer(tab, tab2) {
    // Melange avec un random le tableau
    for (let i = tab.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [tab[i], tab[j]] = [tab[j], tab[i]];
        [tab2[i], tab2[j]] = [tab2[j], tab2[i]];
    }
}

/**
 * Move the button in the all word container into the answer container. Remove and add Class to identify button in container
 * @param {*} id id of the selected button
 */
function moveWordAnswer(id) {
    $('#containerQuestion').append($('#boutonQuestion>#' + id));
    $("#" + id).removeClass("questionButton");
    $("#" + id).addClass("questionButtonAnswer");
}

/**
 * Move the button in the answer container into the all word container. Remove and add Class to identify button in container
 * @param {*} id id of the selected button
 */
function moveAnswer(id) {
    $('#boutonQuestion').append($('#containerQuestion>#' + id));
    $("#" + id).removeClass("questionButtonAnswer");
    $("#" + id).addClass("questionButton");
}

/**
 * Get all id button in answer container and return it
 * @returns the id answer
 */
function getAnswerUser() {
    let parentDiv = [];
    $("#containerQuestion > button").each((index, elem) => {
        parentDiv.push(elem.id);
    });
    return parentDiv;
}

/**
 * Get the button in answer container and get the rest of the button in all word container
 * @returns id button from all game
 */
function getAllAnswer() {
    let parentDivAll = getAnswerUser();
    $("#boutonQuestion > button").each((index, elem) => {
        parentDivAll.push(elem.id);
    });
    return parentDivAll;
}

/**
 * Compare if the id button is equal to the same in the answer split id. Return true if the result is equal of the answer split length else return false
 * @returns true if the result have the same length that the answerSplit else false
 */
function verifAnswer() {
    // Réponse
    let answersSplit = setAnswerSplit();
    var resultat = 0;
    // Résultat donné par l'utilisateur
    let answerUser = getAnswerUser();
    for (var i in answerUser) {
        if (answerUser[i] == answersSplit[i]) {
            resultat++;
        } else {
            resultat--;
        }
    }
    // Vérifie si le résultat correspond à la taille
    if (resultat == answersSplit.length) {
        return true;
    } else {
        return false;
    }
}

/**
 * Disable all button in the game
 */
function disableButton() {
    let parentDivAll = getAllAnswer();
    for (var i in parentDivAll) {
        $("#" + parentDivAll[i]).prop('disabled', true);
    }
}

/**
 * Remove the attribut disabled to unabled all button in the game
 */
function unableButton() {
    let parentDivAll = getAllAnswer();
    for (var i in parentDivAll) {
        $("#" + parentDivAll[i]).removeAttr('disabled');
    }
}

/**
 * Change the text of the verification button, display win if user have founded the good solution else display wrong. 
 * If it's last question button verif change text and go in the end of the game
 */
function displayReponse() {
    let answers = getAnswer();
    var win = verifAnswer();
    var nbQuestion = getNumberQuestion();
    disableButton();
    $("#verif").text("Question suivante");
    $(".reponse").removeClass("hidden");
    if (win) {
        $(".reponse").addClass("win");
        $(".reponse").text("Bravo !!!");
        bonneReponse++;
    } else {
        $(".reponse").addClass("loose");
        $(".reponse").text(answers);
    }
    // Question de fin
    if ((numQuest + 1) == nbQuestion) {
        $("#verif").text("Afficher le résultat");
        $("#verif").click(function () {
            endGame();
        })
    } else {
        nextQuest = true;
    }
}

/**
 * Unable all button and remove all
 * Change text and class of the answer and the button verif
 * Relaunch the game for next question
 */
function nextQuestion() {
    unableButton();
    removeAllButton();
    $(".reponse").text("");
    $(".reponse").removeClass("loose");
    $(".reponse").removeClass("win");
    $("#verif").text("Vérifier ma réponse");
    game();
}

/**
 * Remove and add Class at the end of the game
 */
function EndClass() {
    $(".container").addClass("hidden");
    $(".div-end").addClass("endDiv");
    $(".endDiv").removeClass("hidden");
    $("#reloadGame").addClass("reloadGame");
}

/**
 * Display all the information of the game in the end
 */
function addTextEnd() {
    var emplacementData = findEmplacementQuiz();
    var nbQuestion = getNumberQuestion();
    $("#reloadGame").text("Recommencez le test sur : " + data[emplacementData].description);
    $("#home").text("Revenir à la page d'acceuil");
    if (bonneReponse > nbQuestion) {
        bonneReponse--;
    }
    if (bonneReponse > 1) {
        $(".endResult").text("Vous avez fini la partie avec " + bonneReponse + " bonnes réponses sur " + nbQuestion + " au total");
    } else {
        $(".endResult").text("Vous avez fini la partie avec " + bonneReponse + " bonne réponse sur " + nbQuestion + " au total");
    }

    $(".endMessage").text("Si vous souhaitez recommencer cliqué sur le bouton RECOMMENCEZ ou bien de revenir à la page d'accueil cliqué sur le bouton REVENIR A L'ACCUEIL");
}

/**
 * Use the methods above
 * if click on reload game will reload the same game else go to home page
 */
function endGame() {
    var emplacementData = findEmplacementQuiz();
    EndClass();
    addTextEnd();
    $("#reloadGame").click(function () {
        window.location.href = "jeu.html?quizId=" + data[emplacementData].id;
    });
    $("#home").click(function () {
        window.location.href = "index.html";
    });
}

/**
 * Use all methods for the game
 * If user click on all word container will use method moveWordAnswer else moveAnswer
 */
function game() {
    nextQuest = false;
    getIdUrl();
    displayQuizTheme();
    displayQuestion();
    getNumberQuestion();
    $(".questionButton").click(function () {
        var id = this.id;
        moveWordAnswer(id);
    })
    $('div.container-question').on('click', ".questionButtonAnswer", function () {
        var id = this.id;
        moveAnswer(id);
    });
    $('div.boutonQuestion').on('click', ".questionButton", function () {
        var id = this.id;
        moveWordAnswer(id);
    });
}

/**
 * Remove all button from the game
 */
function removeAllButton() {
    let parentDivAll = getAllAnswer();
    for (var i in parentDivAll) {
        $("#" + parentDivAll[i]).remove();
    }
}

/**
 * When page is ready will execute method and code
 * If verif button is click. If NextQuest is true will check if it's last question or not else display the answer
 * If last question disaplay the answer and use endGame method else go to next question
 */
$(document).ready(function () {
    game();
    var nbQuestion = getNumberQuestion();
    $("#verif").click(function () {
        if (nextQuest) {
            if ((numQuest + 1) == nbQuestion) {
                displayReponse();
                endGame();
            } else {
                numQuest++;
                nextQuestion();
            }
        } else {
            displayReponse();
        }

    });
})