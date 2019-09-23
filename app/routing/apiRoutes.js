const data = require("../data/friends.js");


module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(data)
    })

    app.post("/api/friends", function (req, res) {
        let newData = req.body;
        console.log(newData)
        let possibleMatch;
        let matchArr = [];
        let matchArrTwo = [];
        let forOne = 0;
        let forTwo = 0;
        data.forEach(person => {
            console.log(person);
            person.scores.forEach((num, index) => {
                console.log(num);
                if (matchArr.length < 10) {
                    matchArr.push(Math.abs(num - newData.scores[index]));
                } else {
                    matchArrTwo.push(Math.abs(num - newData.scores[index]));
                }
            })
            console.log("HHHHHHHH " + matchArrTwo.length);
            if (matchArrTwo.length !== 0) {
                matchArr.forEach((numb, index) => {
                    console.log(numb);
                    if (numb >= matchArrTwo[index]) {
                        forOne++;
                    } else {
                        forTwo++;
                    }
                });
                if (forOne <= forTwo) {
                    matchArrTwo = [];
                } else {
                    matchArr = [...matchArr];
                    possibleMatch = person;
                    matchArrTwo = [];
                }
            } else {
                console.log("test match")
                possibleMatch = person;
            }
        })
        data.push(newData);
        res.json({status: 200, name: possibleMatch.name, photo: possibleMatch.photo});
    })
}