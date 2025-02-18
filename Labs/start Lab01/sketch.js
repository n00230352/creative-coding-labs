//finding the age 
let age;
const dob="11/08/2005";

let yob = dob.substring(6,10);
let yobNum = parseInt(yob);

age = 2025 - parseInt(dob.substring(6,10));



let friends = ["Giorgia","Mary","Matylda","Cian"];

for(let num=0; num<friends.length; num++){
    console.log(friends[num])
};

friends.splice(2,1, "Nichita")

let myFriend = {name:"Giorgia", age:19, eirCode:"A90YY45"};