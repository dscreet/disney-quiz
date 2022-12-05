
const amountOfOptions = 4;

/* calls the disney api and gets a random character */
const randomDisneyChar = async (needCorrectAns) => {
    // there are up to 7526 character ids on this api
    const rndInt = Math.floor(Math.random() * 7526) + 1;
    // not all requests are successful or have both films and an image...
    return await fetch('https://api.disneyapi.dev/characters/' + rndInt)
        .then(res => res.json())
        .then(data => {
            if (data !== undefined && data.films.length) {
                // get image only for the correct answer
                if (needCorrectAns === 1) {
                    if (data.imageUrl.length) return [data._id, [data.films[0], data.imageUrl]];
                } else {
                    return [data._id, data.films[0]];
                }
            } return [];
        })
        .catch((error => { console.log(error) }));
}

/* gets 4 random disney characters each round and sets one of them as the correct answer */
const round = async () => {

    const map = new Map();
    const rndIndex = Math.floor(Math.random() * 4);
    let char;
    let index = 0;

    while (map.size < amountOfOptions) {

        // randomise the index of the correct answer
        if (rndIndex === index) {
            char = await randomDisneyChar(1);
        } else {
            char = await randomDisneyChar(0);
        }

        // validates character data and only then adds char to map and increments index to make sure only one of the four options is the correct answer
        if (char && char.length) {
            map.set(char[0], char[1]);
            index++;
        }
    }
    return map;
}

module.exports = round;
