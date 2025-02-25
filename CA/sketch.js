let data; 
let cleanedData = [];
let charts = [];


function preload(){
    data = loadTable('data/population.csv', 'csv', 'header')
}

function setup(){
    createCanvas(1000, 2000);
    angleMode(DEGREES);
    noLoop();
    cleanData();

    charts.push(new BarChart({
        data:cleanedData,
        xValue:'Year',
        yValue:'WorldPop',
        }
    ));

    charts.push(new HorizontalChart({
        data: cleanedData,
        xValue: 'Year',
        yValue: 'ItalyUrbanPop',
    }));

    charts.push(new StackedBarChart({
        data:cleanedData,
        xValue:'Year',
        yValues: ['ItalyPop', 'ItalyUrbanPop'],
        }
    ));

    charts.push(new LineChart({
        data: cleanedData,
        xValue: 'Year',
        yValue: 'WorldPop',
    }));

    // charts.push(new clusterChart({
    //     data:cleanedData,
    //     xValue:'Year',
    //     yValues: ['ItalyPop', 'ItalyUrbanPop'],
    //     }
    // ));

    charts.push(new LineChart1({
        data: cleanedData,
        xValue: 'Year',
        yValues: ['ItalyPop', 'ItalyUrbanPop', 'WorldPop'],
    }));

    //  charts.push(new PieChart({
    //      data: cleanedData,
    //      xValue: 'Year',
    //      yValue: 'WorldPop',
    // }));
}


function draw(){
    background(245, 235, 220);

    charts.forEach(chart => {
        chart.renderBars();
        chart.renderLabels();
        chart.renderAxis();
        chart.renderTicks();
    });
}

function cleanData(){
    for(let i=0; i<data.rows.length; i++){
    cleanedData.push(data.rows[i].obj)
    }

    for(let i=0; i<cleanedData.length; i++){
        cleanedData[i].ItalyPop = parseInt(cleanedData[i].ItalyPop)
        cleanedData[i].ItalyUrbanPop = parseInt(cleanedData[i].ItalyUrbanPop)
        cleanedData[i].WorldPop = parseInt(cleanedData[i].WorldPop)
    } 
}

