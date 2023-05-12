class Pen{
    constructor(context, posX, posY,  color, thick){ 
    
        this.posX = posX;
        this.posY = posY;
        this.antX = posX;
        this.antY = posY;
        this.color = color;
        this.ctx = context;
        this.thick = thick;
        
    }

    moveTo(posX, posY){
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = posX;
        this.posY = posY;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color; // 
        this.ctx.lineWidth = this.thick;
        this.ctx.lineCap = "round";
        this.ctx.moveTo(this.antX, this.antY);
        this.ctx.lineTo(this.posX, this.posY);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}// Fin clase Pen