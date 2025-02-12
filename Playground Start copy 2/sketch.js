let data;
let cleanedData = [];
let chartHeight = 300;
let chartWidth = 400;
let barWidth = 6;
let margin = 15;
let gap;
let scaler;
let axisThickness = 5;
let chartPosX = 50;
let chartPosY = 400;
let axisColour;
let barColour;
let axisTextColour;

let yValues = ["Female", "Male"];
let xValue = "Age_Group";
let yValueTotal = "Total";
let barColours = [];
let maxValue;

function preload() {
	data = loadTable("data/Combined.csv", "csv", "header");
}

function setup() {
	createCanvas(500, 500);
	angleMode(DEGREES);
	noLoop();
	cleanData();

	barColours.push(color(0));
	barColours.push(color(255, 150, 200));

	gap =(chartWidth - cleanedData.length * barWidth * yValues.length - (margin * 2)) / (cleanedData.length - 1);

	//extracting the max num from both array
	let maxFemale = max(cleanedData.map((row) => row.Female));
	let maxMale = max(cleanedData.map((row) => row.Male));
	let maxValues = [];
	//pushing max values into array
	maxValues.push(maxFemale, maxMale);
	maxValue = max(maxValues);
	console.log(maxFemale, maxMale, maxValue);

	scaler = chartHeight / maxValue;

	axisColour = color(255, 204, 0);
	barColour = color(0, 200, 50);
	axisTextColour = color(125);
}

function draw() {
	background(245, 235, 220);

	push();
	translate(chartPosX, chartPosY);
	noFill();
	stroke(axisColour);
	strokeWeight(axisThickness);
	line(0, 0, 0, -chartHeight);
	line(0, 0, chartWidth, 0);

	push();
	translate(margin, 0);

	for (let i = 0; i < cleanedData.length; i++) {
        push();
        translate((gap + (barWidth*2))*i,0)
        for(let j=0; j<yValues.length; j++){
            noStroke()
            fill(random(255))
            rect(barWidth*j, 0, barWidth, -100)
        }
        pop()
    }
	// pop()
	// pop()

	// fill(axisTextColour);
	// noStroke();
	// textAlign(LEFT,CENTER);
	// textSize(8);
	// push()
	// translate(xPos + (barWidth/2),10)
	// rotate(60)
	// text (cleanedData[i][xValue], 0, 0);
	// pop()

	pop();

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
