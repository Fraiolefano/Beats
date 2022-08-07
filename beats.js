//By Fraiolefano

var osc1,osc2;
var playStatus=[];

var inputR1;var inputR2;
var inputN1;var inputN2;
var inputC1;var inputC2;

var w1;
var w2;
var phi=Math.PI;

function getInputs()
{
    inputR1=document.getElementById("r1");
    inputN1=document.getElementById("n1");
    inputC1=document.getElementById("c1");

    inputR2=document.getElementById("r2");
    inputN2=document.getElementById("n2");
    inputC2=document.getElementById("c2");
}

function initInputs()
{
    inputR1.value=200;
    inputN1.value=200;
    inputC1.value="START";

    inputR2.value=201;
    inputN2.value=201;
    inputC2.value="START";

    playStatus=[false,false];
}
function setup()
{
    pixelDensity(1);
    getInputs();
    initInputs();

    osc1=new p5.Oscillator("sine");
    osc2=new p5.Oscillator("sine");
    osc1.freq(int(r1.value));
    osc2.freq(int(r2.value));
    createCanvas(window_size,window_size);

    w1=new Wave(r1.value);
    w2=new Wave(r2.value);
    w3=new Wave(0);

    w1.phi=phi;

    lineVel=width;
}

function draw()
{
    background(0);
    drawLines();
    translate(0,height*0.125);
    
    if (playStatus[0]==true)
    {stroke(0,255,0);}
    else
    {stroke(255,0,0);}

    w1.calcAndDraw();
    translate(0,height*0.250);

    if (playStatus[1]==true)
    {stroke(0,255,0);}
    else
    {stroke(255,0,0);}

    w2.calcAndDraw();
    translate(0,height*0.375);

    if (playStatus[0]==true && playStatus[1]==true)
    {stroke(0,255,0);}
    else
    {stroke(255,0,0);}

    w3.sumAndDraw(w1,w2);
}

function changeStatus(s)
{
    playStatus[s]=!playStatus[s];

    if (!playStatus[s])
    {
        if (s==0)
        {
            osc1.stop();
            inputC1.value="START";
        }
        else
        {
            osc2.stop();
            inputC2.value="START";
        }
    }
    else
    {
        if (s==0)
        {
            osc1.start();
            inputC1.value="STOP";
        }
        else
        {
            osc2.start();
            inputC2.value="STOP";
        }
    }
}

function changeV(v)
{
    if (v==0)
    {
        osc1.freq(int(r1.value));
        w1=new Wave(int(r1.value));
        w1.phi=phi;
    }
    else
    {
        osc2.freq(int(r2.value));
        w2=new Wave(int(r2.value));
    }
}

function drawLines()
{
    stroke(0,255,127);
    line(0,height*0.25,width,height*0.25);
    line(0,height*0.50,width,height*0.50);
}

class Wave
{
    constructor(f)
    {
        this.f=f;  //lunghezza d'onda=larghezza schermo/frequenza;
        if (this.f==0){this.f=0.001;}

        this.l=width/this.f;
        this.k=(2*PI)/this.l;
        this.amp=height*0.12;
        if (this.amp>50)
        {
            this.amp=50;
        }
        this.nPoints=width;
        this.points=[];
        this.phi=0;

        for(let x=0;x<this.nPoints;x++)
        {
            this.points[x]=new p5.Vector(x,0);
        }
    }
    
    calc()
    {
        for(let x=0;x<this.nPoints;x++)
        {
            this.points[x].y=this.amp*sin((this.k*x)+this.phi);
        }
    }

    draw()
    {
        for(let x=0;x<this.nPoints;x++)
        {
            if (x>0)
            {
                line(this.points[x-1].x,this.points[x-1].y,this.points[x].x,this.points[x].y);
            }
            //point(this.points[x]);
        }
    }
    calcAndDraw() // risparmi un ciclo for
    {
        for(let x=0;x<this.nPoints;x++)
        {
            this.points[x].y=this.amp*sin((this.k*x)+this.phi);
            if (x>0)
            {
                line(this.points[x-1].x,this.points[x-1].y,this.points[x].x,this.points[x].y);
            }
            //point(this.points[x]);
        }
    }

    sum(waveA,waveB)  //f(x)+g(x) o formule di prostaferesi
    {
        for(let x=0;x<this.nPoints;x++)
        {
            this.points[x].y=waveA.points[x].y+waveB.points[x].y;
        }
    }
    sumAndDraw(waveA,waveB) //risparmi un ciclo for
    {
        for(let x=0;x<this.nPoints;x++)
        {
            this.points[x].y=waveA.points[x].y+waveB.points[x].y;
            if (x>0)
            {
                line(this.points[x-1].x,this.points[x-1].y,this.points[x].x,this.points[x].y);
            }
            //point(this.points[x]);
        }
    }
}
