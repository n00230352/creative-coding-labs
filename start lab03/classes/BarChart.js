class BarChart{
    constructor(obj){
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin ||10;

        this.axisThickness = obj.axisThickness ||1;
        this.chartPosX = obj.chartPosX ||50;
        this.chartPosY = obj.chartPosY ||350;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth ) - (this.margin*2)) / (this.data.length - 1)
        this.scaler = this.chartHeight / (max(cleanedData.map(row => row[this.yValue])));

        this.axisColour = color(50);
        this.axisTickColour = color(100);
        this.barColor =color(30, 60, 120);
        this.axisTextColour = color(0);


        this.numTicks=5;
        this.tickLength = 10;
    }


    renderBars(){
    push()
        translate(this.chartPosX,this.chartPosY)
        noFill()
        stroke(this.axisColour)
        strokeWeight(this.axisThickness)
        line (0,0,0,-this.chartHeight) //vertical line
        line (0,0,this.chartWidth,0) //orizontal line


            push()
                translate(this.margin,0)
                for(let i = 0; i<this.data.length; i++){
                    let xPos = (this.barWidth + this.gap) * i;
                    fill(this.barColor)
                    rect (xPos, 0, this.barWidth, -this.data[i][this.yValue]*this.scaler)

                    // fill(this.axisTextColour)
                    // noStroke()
                    // textAlign(LEFT, CENTER)
                    // textSize (8)
                    // push()
                    // translate(xPos + (this.barWidth/2),20)
                    // rotate(45)
                    // text (this.data[i][this.xValue],0,0);
                    // pop()
                }
                pop()
                pop()
    }

    renderAxis(){
            push()
                translate(this.chartPosX,this.chartPosY)
                noFill()
                stroke(this.axisColour)
                strokeWeight(this.axisThickness)
                line (0,0,0,-this.chartHeight) //vertical line
                line (0,0,this.chartWidth,0) //orizontal line    
                
                pop()
            }



    renderLabels(){
        push()
            translate(this.chartPosX,this.chartPosY)
    
    
                push()
                    translate(this.margin,0)
                    for(let i = 0; i<this.data.length; i++){
                        let xPos = (this.barWidth + this.gap) * i;

                    fill(this.axisTextColour)
                    noStroke()
                    textAlign(LEFT, CENTER)
                    textSize (12)
                    push()
                    translate(xPos + (this.barWidth/2),20)
                    rotate(45)
                    text (this.data[i][this.xValue],0,0);
                    pop()

                    }
        pop()    
        pop()        
        }

    renderTicks(){
                push()
                    translate(this.chartPosX,this.chartPosY)
                    noFill()
                    stroke(this.axisColour)
                    strokeWeight(this.axisThickness)
                    
                    let tickIncrement = this.chartHeight/this.numTicks;
                    for(let i = 0; i<this.numTicks; i++){
                        line(0, -tickIncrement * i, -this.tickLength, -tickIncrement * i);
                    }
                    
                pop()
                    
                }
                
}


