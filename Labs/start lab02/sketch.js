let friend01 = {name:"Giorgia", age:19, bowling:true};
let friend02 = {name:"Mary", age:20, bowling:true};
let friend03 = {name:"Cian", age:22, bowling:false};
let friend04 = {name:"Alicia", age:18, bowling:false};
let friend05 = {name:"Leo", age:25, bowling:true};

let friends = [];
let friendAges = [];
let friendBowling = [];

friends.push(friend01);
friends.push(friend02);
friends.push(friend03);
friends.push(friend04);
friends.push(friend05);

for(let index=0; index<5; index++){
    friendAges.push(friends[index].age)
}

for(let index=0; index<5; index++){
    if(friends[index].bowling == true ){
        friendBowling.push(friends[index].age)
    }
}

// calculation age of friends that like bowling - avreage/mean 
function calcAvg (array) {
    let startValue = 0 ;

    for (let i = 0; i < array.length; i++) {
        startValue = startValue + array[i]
    }
    return startValue / array.length;
}

// for (let i = 0; i<100; i++){
//     if(i%5==0){console.log(i)}
// }

//median (mid num-odd)
function median(arrayNums){
    arrayNums.sort((a,b)=>(a-b)) 

    //even 
    if (arrayNums.length%2==0){
        let num1 = arrayNums.length / 2 - 1;
        let num2 = arrayNums.length / 2;
        return (arrayNums[num1] +arrayNums [num2]) / 2;
    } else {

        //odd
        return arrayNums[Math.floor(arrayNums.length/2)]
    }
}