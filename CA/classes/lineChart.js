class LineChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;

        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 550;
        this.chartPosY = obj.chartPosY || 750;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        this.scaler = this.chartHeight / (max(this.data.map(row => row[this.yValue])));

        this.maxValue = max(this.data.map((x) => x[this.yValue]));

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
            translate(this.margin, 0);
        
            noFill();
            stroke(this.barColor);
            strokeWeight(2);
        
            beginShape();
            for (let i = 0; i < this.data.length; i++) {
                let xPos = (this.barWidth + this.gap) * i;
        
                vertex(xPos, -this.data[i][this.yValue]*this.scaler); 
                
                stroke(255, 0, 0);
                ellipse(xPos,-this.data[i][this.yValue]*this.scaler , 5, 5);
            }
            endShape();
        
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

        let tickIncrement = this.chartHeight / this.numTicks;

        fill(this.axisColour);
        textSize(12);
        textAlign(RIGHT, CENTER);

        for (let i = 0; i <= this.numTicks; i++) {
            let y = -tickIncrement * i;
            line(0, y, -this.tickLength, y); 

            let tickValue = (this.maxValue / this.numTicks) * i; 
            text(tickValue, -this.tickLength - 5, y); 
        }

        pop();
    }
}
