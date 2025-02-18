let data;

function preload(){
    data = loadTable('data/population.csv', 'csv', 'header')
}

function setup(){
    createCanvas(600, 600);
}

function draw(){
    background(245, 235, 220);
}