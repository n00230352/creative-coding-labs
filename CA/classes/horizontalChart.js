class HorizontalChart {
	constructor(obj) {
		this.data = obj.data;
		this.title = obj.title  || "World population horizontal chart";
        this.xAxisLabel = obj.xAxisLabel || "Millions";
        this.yAxisLabel = obj.yAxisLabel || "Years";
		this.xValue = obj.xValue;
		this.yValue = obj.yValue;
		this.chartHeight = obj.chartHeight || 400;
		this.chartWidth = obj.chartWidth || 450;
		this.barWidth = obj.barWidth || 15;
		this.margin = obj.margin || 15;

		this.axisThickness = obj.axisThickness || 3;
		this.chartPosX = obj.chartPosX || 800;
		this.chartPosY = obj.chartPosY || 470;

		this.gap =
			(this.chartHeight - this.data.length * this.barWidth - this.margin * 2) /
			(this.data.length - 1);

		this.scaler =
			this.chartWidth / max(cleanedData.map((row) => row[this.yValue]));

		this.maxValue = max(this.data.map((x) => x[this.yValue]));

		this.axisColour = color(50);
		this.axisTickColour = color(100);
		this.barColor = color(0, 0, 205);
		this.axisTextColour = color(0);

		this.numTicks = 5;
		this.tickLength = 10;
	}

	renderTitle(){
        push()
        translate(this.chartPosX, this.chartPosY - this.chartHeight - 20)
        fill(this.axisTextColour);
        textSize(20);
        textAlign(CENTER, CENTER);
        
        text(this.title, 210, 0); // Render the chart title
        pop();
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
		pop()
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

		let tickIncrement = this.chartWidth / this.numTicks;
		let tickValueIncrement =
			max(this.data.map((row) => row[this.yValue])) / this.numTicks;

		fill(this.axisColour);

		for (let i = 0; i <= this.numTicks; i++) {
			let x = tickIncrement * i;
			line(x, 0, x, this.tickLength);
            

			let tickValue = (this.maxValue / this.numTicks) * i;

            textAlign(LEFT, CENTER);
			push();
			translate(x, 20);            
			rotate(45);
            noStroke()
			text(tickValue.toFixed(0), 0, 0);
			pop();            
		}

		pop();
	}
}
