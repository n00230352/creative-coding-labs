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

		this.gap =
			(this.chartHeight - this.data.length * this.barWidth - this.margin * 2) /
			(this.data.length - 1);

		this.scaler =
			this.chartWidth / max(cleanedData.map((row) => row[this.yValue]));

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
