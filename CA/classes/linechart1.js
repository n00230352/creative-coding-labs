class LineChart1 {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;

        this.total = this.data.map((row) => {
            return row['ItalyPop'] + row['ItalyUrbanPop'] + row['WorldPop']
        })

        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 550;
        this.chartPosY = obj.chartPosY || 1500;

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

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        
        let colors = [
            { fill: color(51, 153, 255, 100), stroke: color(51, 153, 255) },
            { fill: color(255, 0, 0, 100), stroke: color(255, 0, 0) },
            { fill: color(0, 255, 0, 100), stroke: color(0, 255, 0) }
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
     
        // Find the max Y value from the data dynamically
        max(this.maxValues);
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i][this.yvalueTotal] > this.maxValue) {
                this.maxValue = this.data[i][this.yvalueTotal];
            }
        }
     
        let tickIncrement = this.maxValue / this.numTicks;
        let pixelIncrement = this.chartHeight / this.numTicks;
     
        textSize(12);
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
