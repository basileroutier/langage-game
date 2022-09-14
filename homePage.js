/**
 * Set all descriptions and id in select
 */
function displayDescription() {
    let description = getDescription();
    let id = getId();
    for (var i = 0; i < description.length; i++) {
        $("#langage-chooser").append('<option value="' + id[i] + '"">' + description[i] + '</option>');
    }
}

/**
 * Display help with animation
 */
function showHelp() {
    $("#helpDiv").hide();
    $("#help").click(function () {
        $("#helpDiv").toggle(500);
    });
}

/**
 * Go to the demo page if demoHelp is click and a langage is selected
 */
function goToDemoPage() {
    $("#demoHelp").click(function () {
        var selectedCountry = $("#langage-chooser").children("option:selected").val();
        if (selectedCountry == "") {
            alert("Veuillez choisir une langue dans le selector à côté du bouton");
        } else {
            window.location.href = "demo.html?quizId=" + selectedCountry;
        }
    });
}

/**
 * When page is ready will execute method and code
 */
$(document).ready(function () {
    displayDescription();
    showHelp();
    goToDemoPage();
});