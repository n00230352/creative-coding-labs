class clusterChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 600;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;

        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 150;
        this.chartPosY = obj.chartPosY || 1150;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        this.total = this.data.map((row) => {
            return row['ItalyPop'] + row['ItalyUrbanPop']
        })

        this.scaler = this.chartHeight / (max(this.total));

        this.maxValues = max(this.data.map((x) => x[this.yValues[0]]));

        this.axisColour = color(50);
        this.axisTickColour = color(100);
        this.barColors = [color(66, 161, 245), color(66, 209, 245)]
        this.axisTextColour = color(0);

        this.numTicks = 5;
        this.tickLength = 10;

        this.yValues=obj.yValues
    }

    renderBars() {
        push(); 
        translate(this.chartPosX, this.chartPosY);  // Move to the chart position
        push();
        translate(this.margin, 0);  // Apply margin
    
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.yValues.length; j++) {
                push();
                
                // Calculate the x position for the current bar
                let xPos = (this.gap + this.barWidth) * i + this.barWidth * j;
                translate(xPos, 0);  // Translate to the correct x position for the bar
                
                // Set the color for the current bar
                fill(this.barColors[j % 3]);
                noStroke();
                
                // Draw the bar, scaling its height based on the data value
                rect(0, 0, this.barWidth, -this.data[i][this.yValues[j]] * this.scaler);
                
                pop();
            }
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
    
            let tickValue = (this.maxValues / this.numTicks) * i;
            
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