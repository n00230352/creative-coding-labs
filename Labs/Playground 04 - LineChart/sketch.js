let data;
let cleanedData = [];
let chartHeight = 200;
let chartWidth = 200;
let barWidth = 30;
let margin = 15;
let axisThickness = 1;
let chartPosX = 250;
let chartPosY = 250;
let yValue = "Female";
let xValue = "Age_Group";
let gap;
let scaler;
let axisColour;
let barColour;
let axisTextColour;

let myNewArray;
let total; 
let font;

function preload() {
    data = loadTable("data/Combined.csv", "csv", "header");
	font = loadFont('./Roboto/roboto.ttf')
}

function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
    noLoop();
    cleanData();

    myNewArray = cleanedData.map(row => row.Female);
    total = 0;

    myNewArray.forEach(item => total = total + item);
    console.log(total);
}

function draw() {
    background(200);

    push();
    translate(chartPosX, chartPosY);

	

	for(let i=0; i<myNewArray.length; i++){
	fill(random(255),0,0);
	stroke(255)
    

	let start=0;
	let end=((myNewArray[i]/total)*360);

	arc(0,0,400,400,start,end,PIE);

	rotate (end);
	}
    //ellipse(0,0,200,200);
	noStroke();
	
	text("giorgia",0,0)


    pop();

}

function cleanData() {
    for (let i = 0; i < data.rows.length; i++) {
        cleanedData.push(data.rows[i].obj);
    }

    for (let i = 0; i < cleanedData.length; i++) {
        cleanedData[i].Female = parseInt(cleanedData[i].Female);
        cleanedData[i].Male = parseInt(cleanedData[i].Male);
        cleanedData[i].Total = parseInt(cleanedData[i].Total);
    }
}