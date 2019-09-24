const data = require("../data/friends.js");


module.exports = function (app) {
    //if we recive a get request on the route /api/friends send the entire array of friends back
    app.get("/api/friends", function (req, res) {
        res.json(data)
    })

    //if we recive a post request on the route /api/friends do the following
    app.post("/api/friends", function (req, res) {
        //create the variables to be used to get the closest match based on the users inputted data
        let newData = req.body;
        let possibleMatch;
        let matchArr = [];
        let matchArrTwo = [];
        let forOne = 0;
        let forTwo = 0;
        //loop through the users we already have
        data.forEach(person => {
            //loop through the scores for the person
            person.scores.forEach((num, index) => {
                //if the match array does not have a length of 10 then to the math and push to it, otherwise push to array 2
                if (matchArr.length < 10) {
                    matchArr.push(Math.abs(num - newData.scores[index]));
                } else {
                    matchArrTwo.push(Math.abs(num - newData.scores[index]));
                }
            })

            //if arr 2 has a length that means we have done the math on 2 separate people and must compare them
            if (matchArrTwo.length !== 0) {
                //loop through both arrays to see what is bigger than the other and add a number for the appropriate array
                matchArr.forEach((numb, index) => {
                    if (numb >= matchArrTwo[index]) {
                        forOne++;
                    } else {
                        forTwo++;
                    }
                });
                //if for one is equal to or less than forTwo clear matchArrTwo, forTwo and forOne as for one is the closer match
                if (forOne <= forTwo) {
                    forOne = 0;
                    forTwo = 0;
                    matchArrTwo = [];
                } else {
                    //set match arr to matchArrTwo as it is the better match
                    forOne = 0;
                    forTwo = 0;
                    matchArr = [...matchArrTwo];
                    possibleMatch = person;
                    matchArrTwo = [];
                }
            } else {
                possibleMatch = person;
            }
        })
        //add the new person to the array and send the data back for the closest possible match
        data.push(newData);
        res.json({status: 200, name: possibleMatch.name, photo: possibleMatch.photo});
    })
}