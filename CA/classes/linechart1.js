class LineChart1 {
    constructor(obj) {
        this.data = obj.data;
        this.title = obj.title  || "Personalized chart";
        this.xAxisLabel = obj.xAxisLabel || "Millions";
        this.yAxisLabel = obj.yAxisLabel || "Years";
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 450;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;

        this.total = this.data.map((row) => {
            return row['ItalyPop'] + row['ItalyUrbanPop'] + row['NonUrbanPop']  + row['WorldPop']
        })

        this.axisThickness = obj.axisThickness || 3;
        this.chartPosX = obj.chartPosX || 1500;
        this.chartPosY = obj.chartPosY || 1100;;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        this.scalers = this.yValues.map(yValue => this.chartHeight / max(this.data.map(row => row[yValue])));

        this.maxValues = this.yValues.map(yValue => 
            max(this.data.map(row => row[yValue])))

        this.axisColour = color(50);
        this.axisTickColour = color(100);
        this.axisTextColour = color(0);

        this.numTicks = 5;
        this.tickLength = 10;
    }

    renderTitle(){
        push()
        translate(this.chartPosX, this.chartPosY - this.chartHeight - 50)
        fill(this.axisTextColour);
        textSize(20);
        textAlign(CENTER, LEFT);
        
        text(this.title, 230, 0); // Render the chart title
        pop();
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        
        let colors = [
            { fill: color(0, 0, 255, 100), stroke: color(65, 105, 255) },
            { fill: color(65, 105, 225, 100), stroke: color(65, 105, 225) },
            { fill: color(100, 149, 237, 100), stroke: color(30, 144, 255) }, 
            { fill: color(240, 128, 128, 100), stroke: color(240, 128, 128) }
            
        ];
        
        for (let j = 0; j < this.yValues.length; j++) {
            let scaler = this.scalers[j];
    
            // Draw filled area under the line
            noStroke();
            fill(colors[j].fill);
            beginShape();
            vertex(0, 0);
            for (let i = 0; i < this.data.length; i++) {
                vertex((this.barWidth + this.gap) * i, -this.data[i][this.yValues[j]] * scaler);
            }
            vertex((this.barWidth + this.gap) * (this.data.length - 1), 0);
            vertex(0, 0);
            endShape(CLOSE);
    
            // Draw line chart
            noFill();
            stroke(colors[j].stroke);
            strokeWeight(2);
            beginShape();
            for (let i = 0; i < this.data.length; i++) {
                vertex((this.barWidth + this.gap) * i, -this.data[i][this.yValues[j]] * scaler);
            }
            endShape();
    
            // Draw data points
            fill(colors[j].stroke);
            noStroke();
            for (let i = 0; i < this.data.length; i++) {
                ellipse((this.barWidth + this.gap) * i, -this.data[i][this.yValues[j]] * scaler, 5, 5);
            }
        }
        pop();
    }

    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight); // Vertical line
        line(0, 0, this.chartWidth, 0); // Horizontal line

        fill(this.axisTextColour);
        textSize(15);
        textAlign(CENTER, CENTER);
       
        // X-axis label (centered)
        noStroke()
        text(this.xAxisLabel, this.chartWidth / 2, 100);
       
        // Y-axis label (centered vertically)
        push();
        rotate(-90)
        text(this.yAxisLabel, this.chartHeight / 2, -100); // Rotate to place Y-axis label vertically
        pop();
        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);

        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;

            fill(this.axisTextColour);
            noStroke();
            textAlign(LEFT, CENTER);
            textSize(15);
            push();
            translate(xPos + this.barWidth / 2, 20);
            rotate(45);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        fill(this.axisColour);
    
        // Find the max Y value correctly
        this.maxValue = max(this.maxValues);  // 
    
        let tickIncrement = this.maxValue / this.numTicks; //calculates the gap between tick marks on the y-axis
        let pixelIncrement = this.chartHeight / this.numTicks; //calculates the spacing between tick marks
    
        textSize(15);
        textAlign(RIGHT, CENTER);
    
        for (let i = 0; i <= this.numTicks; i++) {
            let yPos = -pixelIncrement * i;
            let tickValue = tickIncrement * i;
    
            // Draw tick lines
            line(0, yPos, -this.tickLength, yPos);
    
            // Draw tick values
            push();
            noStroke();
            text(tickValue.toFixed(0), -this.tickLength - 5, yPos);
            pop();
        }
    
        pop();
    }
    
    
}
