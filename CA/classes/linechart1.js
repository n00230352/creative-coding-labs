class LineChart1 {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;

        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 550;
        this.chartPosY = obj.chartPosY || 1500;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        this.scalers = this.yValues.map(yValue => this.chartHeight / max(this.data.map(row => row[yValue])));

        this.maxValues = this.yValues.map(yValue => max(this.data.map((x) => x[yValue])));

        this.axisColour = color(50);
        this.axisTickColour = color(100);
        this.barColor = color(30, 60, 120);
        this.axisTextColour = color(0);

        this.numTicks = 5;
        this.tickLength = 10;
    }

    renderBars() {
    push();
    translate(this.chartPosX, this.chartPosY);
    
    // Loop through each yValue to draw multiple lines
    for (let j = 0; j < this.yValues.length; j++) {
        let currentYValue = this.yValues[j];
        let colorFill = (j === 0) ? color(51, 153, 255, 100) : (j === 1) ? color(255, 0, 0, 100) : color(0, 255, 0, 100); // Change color for each line
        let strokeColor = (j === 0) ? color(51, 153, 255) : (j === 1) ? color(255, 0, 0) : color(0, 255, 0);

        // Use the appropriate scaler for this yValue
        let currentScaler = this.scalers[j];

        // Draw the filled area under the line (area fill)
        noStroke();
        fill(colorFill); 
        beginShape();
        vertex(0, 0); // Start at bottom left
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            vertex(xPos, -this.data[i][currentYValue] * currentScaler); 
        }
        vertex((this.barWidth + this.gap) * (this.data.length - 1), 0); // Close shape at bottom right
        vertex(0, 0); // Back to start
        endShape(CLOSE);

        // Draw the line chart
        noFill();
        stroke(strokeColor);
        strokeWeight(2);
        beginShape();
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            vertex(xPos, -this.data[i][currentYValue] * currentScaler); 
        }
        endShape();

        // Draw data points
        fill(strokeColor);
        noStroke();
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            ellipse(xPos, -this.data[i][currentYValue] * currentScaler, 5, 5);
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
