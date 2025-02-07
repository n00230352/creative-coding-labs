class BarChart{
    constructor(_data,_xValue, _yValue, _chartHeight, _chartWidth,_barWidth, _margin, _axisTickenss,_axisTickTickenss,_chartPosX, _chartPosY){
        this.data = _data;
        this.xValue = _xValue;
        this.yValue = _yValue;
        this.chartHeight = _chartHeight;
        this.chartWidth = _chartWidth;
        this.barWidth = _barWidth;
        this.margin = _margin;
        this.axisTickenss = _axisTickenss;
        this.axisTickTickenss = _axisTickTickenss;
        this.chartPosX = _chartPosX;
        this.chartPosY = _chartPosY;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth ) - (this.margin*2)) / (this.data.length - 1)
        this.scaler = this.chartHeight / (max(cleanedData.map(row => row[this.yValue])));

        this.axisColour = color(0);
        this.axisTickColour = (0);
        this.barColor =color(0);
        this.axisTextColour = (200,0,0);  
        this.numTicks=5;
        this.tickLength = 3;
    }


    renderBars(){
    push()
        translate(this.chartPosX,this.chartPosY)
        noFill()
        stroke(this.axisColour)
        strokeWeight(this.axisTickenss)
        line (0,0,0,-this.chartHeight) //vertical line
        line (0,0,this.chartWidth,0) //orizontal line


            push()
                translate(this.margin,0)
                for(let i = 0; i<this.data.length; i++){
                    let xPos = (this.barWidth + this.gap) * i;
                    fill(this.barColor)
                    rect (xPos, 0, this.barWidth, -this.data[i][this.yValue]*this.scaler)

                    fill(this.axisTextColour)
                    noStroke()
                    textAlign(LEFT, CENTER)
                    textSize (8)
                    push()
                    translate(xPos + (this.barWidth/2),20)
                    rotate(45)
                    text (this.data[i][this.xValue],0,0);
                    pop()
                }
                pop()
                pop()
    }

    renderAxis(){
            push()
                translate(this.chartPosX,this.chartPosY)
                noFill()
                stroke(this.axisColour)
                strokeWeight(this.axisTickenss)
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

                    }
        pop()    
        pop()        
        }

    renderTicks(){
                push()
                    translate(this.chartPosX,this.chartPosY)
                    noFill()
                    stroke(this.axisColour)
                    strokeWeight(this.axisTickenss)
                    
                    let tickIncrement = this.chartHeight/this.numTicks;
                    for(let i = 0; i<this.numTicks; i++){
                        line(0,-tickIncrement*i - this.tickLenght,-tickIncrement*i)
                    }
                    
                pop()
                    
                }
        

}


