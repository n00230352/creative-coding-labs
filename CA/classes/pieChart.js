class PieChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;

        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 150;
        this.chartPosY = obj.chartPosY || 350;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);

        this.scaler = this.chartHeight / (max(this.data.map(row => row[this.yValue])));

        this.axisColour = color(50);
        this.barColor = color(0, 60, 120);
        this.axisTextColour = color(0);

        this.numTicks = 5;
        this.tickLength = 10;
    }
}

