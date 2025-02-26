class BarChart {
    constructor(obj) {
        this.data = obj.data;
        this.title = obj.title  || "World population barchart";
        this.xAxisLabel = obj.xAxisLabel || "Years";
        this.yAxisLabel = obj.yAxisLabel || "Millions";
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 450;
        this.barWidth = obj.barWidth || 15;
        this.margin = obj.margin || 10;

        this.axisThickness = obj.axisThickness || 3;
        this.chartPosX = obj.chartPosX || 140;
        this.chartPosY = obj.chartPosY || 470;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        this.scaler = this.chartHeight / (max(this.data.map(row => row[this.yValue])));

        this.maxValue = max(this.data.map((x) => x[this.yValue]));

        this.axisColour = color(50);
        this.axisTickColour = color(100);
        this.barColor = color( 60, 179, 113);
        this.axisTextColour = color(0);

        this.numTicks = 5;
        this.tickLength = 10;
    }

    renderTitle(){
        push()
        translate(this.chartPosX, this.chartPosY - this.chartHeight - 20)
        fill(this.axisTextColour);
        textSize(20);
        textAlign(CENTER, LEFT);
        
        text(this.title, 230, 0); // Render the chart title
        pop();
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            fill(this.barColor);
            rect(xPos, 0, this.barWidth, -this.data[i][this.yValue] * this.scaler);
        }
        pop();
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
            textSize(12);
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
    
        let tickIncrement = this.chartHeight / this.numTicks;
    
        textSize(12);
        textAlign(RIGHT, CENTER);
    
        for (let i = 0; i <= this.numTicks; i++) {
            let y = -tickIncrement * i;
            line(0, y, -this.tickLength, y);  // Draw the tick lines
    
            let tickValue = (this.maxValue / this.numTicks) * i;
            
            // Adjust text position
            textAlign(RIGHT, CENTER);  // Align text to the right of the tick line
            push();
            // Position text a little to the left of the tick line
            translate(-this.tickLength - 5, y);  // Use 'y' directly for vertical positioning
            noStroke();
            text(tickValue, 0, 0);  // Render the tick value
            pop();
        }
    
        pop();
    }
    

}
