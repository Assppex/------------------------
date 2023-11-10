
class Knut_particles
{
    constructor(m,num,x,y,v_x,v_y,r)
    {
        this.m = m;
        this.num = num;
        this.x = x;
        this.y = y;
        this.v_x = v_x;
        this.v_y = v_y;
        this.r = r;
    }

}

var but = document.getElementById("submit-draw");
var start_but = document.getElementById("submit-start")
var particles = [];

class Knut
{
    constructor(N,v0,k)
    {
        this.N = N;
        this.v0 = v0;
        this.k = k;
        //  this.l0 = l0;
    }


    draw_knut_first_time()
    {
        var can = document.getElementById("canvas")
        var ctx = can.getContext("2d");
        let length = can.width;
        particles = [];
        for(var i = 0 ; i < this.N; i++)
        {
            ctx.beginPath();
            ctx.arc(10*(2*i+1), 590, 10 , 0, 2*Math.PI); 
            ctx.fill();
            particles.push( new Knut_particles(1,i,10*(2*i+1),590,0,0,10));
            
        }
        particles[0].v_y = -10;
        particles[1].v_y = -7;
        particles[2].v_y = -6;
        particles[3].v_y = -5;
        particles[4].v_y = -4;
        particles[5].v_y = -3;

        
    }
}

function sleep(milliseconds)
{
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function draw_knut()
{
    var can = document.getElementById("canvas")
    var ctx = can.getContext("2d");
    let length = can.width;
    ctx.clearRect(0, 0, can.width, can.height);
    for(var i = 0 ; i < particles.length; i++)
    {
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, 2*Math.PI); 
        ctx.fill();
    }
}

//Симпоектический интегратор 4 порядка
function solve(i,dt)
{
/*
  let x = particles[i].x;
  let y = particles[i].y;

  let vx = particles[i].v_x;
  let vy = particles[i].v_y;
  
    let a = [1/6 * (2 + Math.pow(2,1/3) + Math.pow(2,-1/3)),1/6 * (1 - Math.pow(2,1/3) - Math.pow(2,-1/3)),1/6 * (2 + Math.pow(2,1/3) + Math.pow(2,-1/3)),1/6 * (1 - Math.pow(2,1/3) - Math.pow(2,-1/3))];
    let b = [0,1/(2 - Math.pow(2,1/3)),1/(1 - Math.pow(2,1/3)),1/(2 - Math.pow(2,1/3))];

    for(var j = 0; j < 4; j++)
    {
        vx = vx - a[j]*x*dt;
        x = x + b[j]*vx*dt;
        

        y = y + b[j]*vy*dt;
        vy = vy - a[j]*y*dt;
    }

    particles[i].x = x;
    particles[i].v_x = vx;

    particles[i].y = y;
    particles[i].v_y = vy;
*/

  //Метод leapfrog
  let c = 5;
  let l0 =  20; //отношение m/c должно быть около 2
  var m = 10;
  if( i > 0 && i != particles.length - 1)
  {

    let l1 = Math.sqrt(Math.pow(particles[i].x - particles[i-1].x,2) + Math.pow(particles[i].y - particles[i-1].y,2));
    let l2 = Math.sqrt(Math.pow(particles[i+1].x - particles[i].x,2) + Math.pow(particles[i+1].y - particles[i].y,2));

    let cos_prev = (particles[i-1].x - particles[i].x)/l1;
    let sin_prev = (particles[i-1].y - particles[i].y)/l1;
    
    let cos_next = (particles[i+1].x - particles[i].x)/l2;
    let sin_next = (particles[i+1].y - particles[i].y)/l2;

    particles[i].v_x = particles[i].v_x + c*(l1 - l0)/m*cos_prev*dt + c*(l2 - l0)/m*cos_next*dt; //- particles[i].x*dt;
    particles[i].x = particles[i].x + particles[i].v_x*dt;

    if(particles[i].y > 590)
    {
        particles[i].v_y = 0;
        particles[i].v_x = 0;
    }
    else
    {
        particles[i].v_y = particles[i].v_y + c*(l2 - l0)/m*sin_next*dt + c*(l1 - l0)/m*sin_prev*dt;
    }
    particles[i].y = particles[i].y + particles[i].v_y*dt;

    //console.log("New coords for particle " + i + ":" + particles[i].x + " " + particles[i].y + " " + (c*(l2 - l0)/m*sin_next*dt - c*(l1 - l0)/m*sin_prev*dt) + " " + " " + particles[i].v_y);
  }
  else if( i == 0)
  {
    let l2 = Math.sqrt(Math.pow(particles[i+1].x - particles[i].x,2) + Math.pow(particles[i+1].y - particles[i].y,2));

    let cos_next = (particles[i+1].x - particles[i].x)/l2;
    let sin_next = (particles[i+1].y - particles[i].y)/l2;

    particles[i].v_x = particles[i].v_x + c*(l2 - l0)/m*cos_next*dt; //- particles[i].x*dt;
    particles[i].x = particles[i].x + particles[i].v_x*dt;
    if(particles[i].y > 590)
    {
        particles[i].v_y = 0;
        particles[i].v_x = 0;
    }
    else{
        particles[i].v_y = particles[i].v_y + c*(l2 - l0)/m*sin_next*dt;
    }
    particles[i].y = particles[i].y + particles[i].v_y*dt;
    
    //console.log("New coords for particle " + i + ":" + sin_next + " " + cos_next);
  }
  else if( i == particles.length - 1)
  {
    let l1 = Math.sqrt(Math.pow(particles[i].x - particles[i-1].x,2) + Math.pow(particles[i].y - particles[i-1].y,2));

    let cos_prev = (particles[i-1].x - particles[i].x)/l1;
    let sin_prev = (particles[i-1].y - particles[i].y)/l1;
    
    particles[i].v_x = 0//particles[i].v_x + c*(l1 - l0)/m*cos_prev*dt; //- particles[i].x*dt;
    particles[i].x = particles[i].x + particles[i].v_x*dt;

    particles[i].v_y = 0//particles[i].v_y + c*(l1 - l0)/m*sin_prev*dt;
    particles[i].y = particles[i].y + particles[i].v_y*dt;

    //console.log("New coords for particle " + i + ":" + particles[i].x + " " + particles[i].y);
    console.log("New coords for particle " + i + ":" + particles[i].v_x + (l1-l0))
  }

}

but.addEventListener('click',function(){
    var a = new Knut(20,0,0)
    a.draw_knut_first_time();
});

start_but.addEventListener('click',function(){

    setInterval(control,0.1);
});
function phys()
{
    let dt = 0.1; //мб стоит позволить ввести шаг по времени (отдельный инпут)
    for(var i = 0; i < particles.length ; i++)
    {
        solve(i,dt);
        draw_knut();
    }
}
function control (){
    phys();
	draw_knut();
}
	