class HorizontalChart {
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
        this.chartPosY = obj.chartPosY || 350;

        // Adjust gap calculation to avoid division by zero
        this.gap = this.data.length > 1
            ? (this.chartHeight - this.data.length * this.barWidth - this.margin * 2) / (this.data.length - 1)
            : 0; // No gap if there's only one bar.

        // Scale based on the max value of y
        this.scaler = this.chartWidth / max(this.data.map((row) => row[this.yValue]));

        this.maxValue = max(this.data.map((x) => x[this.yValue]));

        this.axisColour = color(50);
        this.axisTickColour = color(100);
        this.barColor = color(0, 128, 255);
        this.axisTextColour = color(0);

        this.numTicks = 5;
        this.tickLength = 10;
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        push();
        translate(0, -this.margin * 1.8);

        for (let i = 0; i < this.data.length; i++) {
            let yPos = (this.barWidth + this.gap) * i;
            console.log(`Bar ${i} y position: `, yPos);
            fill(this.barColor);
            rect(0, -yPos, this.data[i][this.yValue] * this.scaler, this.barWidth);
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
        line(0, 0, 0, -this.chartHeight); // Vertical axis
        line(0, 0, this.chartWidth, 0); // Horizontal axis
        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);

        push();
        translate(-this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let yPos = (this.barWidth + this.gap) * i;

            fill(this.axisTextColour);
            noStroke();
            textAlign(RIGHT, CENTER);
            textSize(12);
            push();
            translate(0, -yPos - this.margin);
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

        // Calculate tick increment
        let tickIncrement = this.chartWidth / this.numTicks;
        let tickValueIncrement = this.maxValue / this.numTicks;

        fill(this.axisColour);

        for (let i = 0; i <= this.numTicks; i++) {
            let x = tickIncrement * i;
            line(x, 0, x, this.tickLength); // Draw the tick line

            let tickValue = tickValueIncrement * i;

            textAlign(LEFT, CENTER);
            push();
            translate(x, 20); // Move the tick label down a bit for clarity
            rotate(45); // Rotate text for readability
            noStroke();
            text(tickValue.toFixed(0), 0, 0); // Render the tick label
            pop();
        }

        pop();
    }
}
