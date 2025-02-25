class StackedBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;

        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 150;
        this.chartPosY = obj.chartPosY || 750;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        this.total = this.data.map((row) => {
            return row['ItalyPop'] + row['ItalyUrbanPop']
        })

        this.scaler = this.chartHeight / (max(this.total));

        //this.maxValue = max(this.data.map((x) => x[this.yValues]));

        this.axisColour = color(50);
        this.axisTickColour = color(100);
        this.barColors = [color(30, 60, 120), color(90, 60, 120)]
        this.axisTextColour = color(0);

        this.numTicks = 5;
        this.tickLength = 10;

        this.yValues=obj.yValues
    }

    renderBars() {
        push(); 
        translate(this.chartPosX, this.chartPosY);
        push()
        translate(this.margin, 0)

        
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            push(); 
            translate(xPos, 0); 
    
            for (let j = 0; j < this.yValues.length; j++) {
                fill(this.barColors[j]);
                noStroke();
    
                rect(0, 0, this.barWidth, -this.data[i][this.yValues[j]] * this.scaler);
                translate(0, -this.data[i][this.yValues[j]] * this.scaler - 1);
            }
    
            pop();
        }
        pop();
        pop()
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

        }

        pop();
    }
}