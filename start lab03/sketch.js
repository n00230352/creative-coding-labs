let data; 
let cleanedData = [];
let charts = [];


function preload(){
    data = loadTable('data/Combined.csv', 'csv', 'header')
}

function setup(){
    createCanvas(1000, 1050);
    angleMode(DEGREES);
    noLoop();
    cleanData();

    charts.push(new BarChart(cleanedData, 'Age_Group', 'Male', 400, 400, 10, 15, 10, 20, 450, 450))
    //charts.push(new BarChart(cleanedData,"Age_Group","Female", 400, 400, 30, 15, 2, 470, 0))
    //charts.push(new BarChart(cleanedData,"Age_Group","Total", 400, 400, 30, 15, 2, -200, 490))
}


function draw(){
    background(255, 192, 203);

    charts.forEach(chart => {
        chart.renderBars();
        chart.renderLabels();
        chart.renderAxis();
        chart.renderTicks();
    });

    // let femaleAges = []

//  version 1 of a for loop 
    // for(let i=0; i<cleanedData.length; i++)  
    // //console.log(i);
    // femaleAges.push(cleanedData[i].Female)
    // console.log(femaleAges)

// version 2
    // cleanedData.forEach(  
    //     function(row){
    //         femaleAges.push(row.Female)
    //     }
    // )
    
// a    
    // cleanedData.forEach(
    //     row => {femaleAges.push(row.Female)}
    // );

// version 3 - map
}

function cleanData(){
    for(let i=0; i<data.rows.length; i++){
    cleanedData.push(data.rows[i].obj)
    }

    for(let i=0; i<cleanedData.length; i++){
        cleanedData[i].Female = parseInt(cleanedData[i].Female)
        cleanedData[i].Male = parseInt(cleanedData[i].Male)
        cleanedData[i].Total = parseInt(cleanedData[i].Total)
    }

    
}

//step 1 
// class Friend{
//     constructor(){
//         this.name = "Giorgia"
//         this.age = 19
//     }
// }

// let friends = [];
// friends.push(new Friend("nichita", 20));
// friends.push(new Friend("tara", 21));
// console.log(friends)

