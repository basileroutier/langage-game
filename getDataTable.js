/**
 * Return all description from the data array
 * @returns description of all data
 */
function getDescription() {
    let description = [];
    for (var i = 0; i < data.length; i++) {
        description[i] = data[i].description;
    }
    return description;
}

/**
 * Return all id from the data array
 * @returns id of all data
 */
function getId() {
    let id = [];
    for (var i = 0; i < data.length; i++) {
        id[i] = data[i].id;
    }
    return id;
}

/**
 * Display message anti-cheat in console
 */
function displayCheatMessage() {
    console.warn("Merci de ne pas tricher lors du test de langue.");
}

displayCheatMessage();