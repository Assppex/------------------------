
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
            ctx.arc(length/(2*this.N)*i + length/(2*this.N)*(i + 1), 300, length/(2*this.N), 0, 2*Math.PI); 
            ctx.fill();
            particles.push( new Knut_particles(1,i,length/(2*this.N)*i + length/(2*this.N)*(i + 1),300,0,0,length/(2*this.N)));
            
        }

        particles[0].x = 0;
        particles[0].v_x = 0;

        particles[0].y = 0;
        particles[0].v_y = 2*5;
    }
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
  let c = 0.1;
  let l0 =  0;
  if( i > 0 && i != particles.length - 1)
  {
    let l2 = Math.sqrt(Math.pow(particles[i].x - particles[i-1].x,2) + Math.pow(particles[i].y - particles[i-1].y,2));
    let l1 = Math.sqrt(Math.pow(particles[i+1].x - particles[i].x,2) + Math.pow(particles[i+1].y - particles[i].y,2));

    particles[i].v_x = particles[i].v_x + c*(l1 - l0)/m*Math.abs((particles[i].x - particles[i-1].x)/(particles[i].y - particles[i-1].y))*dt + c*(l2 - l0)/m*Math.abs((particles[i+1].x - particles[i].x)/(particles[i+1].y - particles[i].y))*dt; //- particles[i].x*dt;
    particles[i].x = particles[i].x + particles[i].v_x*dt;

    particles[i].v_y = particles[i].v_y + c*(l2 - l0)/m*Math.abs((particles[i+1].y - particles[i].y)/(particles[i+1].x - particles[i].x))*dt + c*(l1 - l0)/m*Math.abs((particles[i].y - particles[i-1].y)/(particles[i].x - particles[i-1].x))*dt;
    particles[i].y = particles[i].y + particles[i].v_y*dt;
  }
  else if( i == 0)
  {
    let l1 = Math.sqrt(Math.pow(particles[i+1].x - particles[i].x,2) + Math.pow(particles[i+1].y - particles[i].y,2));

    
  }
  else if( i == particles.length)
  {
    let l2 = Math.sqrt(Math.pow(particles[i].x - particles[i-1].x,2) + Math.pow(particles[i].y - particles[i-1].y,2));


  }

}

but.addEventListener('click',function(){
    var a = new Knut(50,0,0)
    a.draw_knut_first_time();
});

start_but.addEventListener('click',function(){
    let current_t = 0;
    let max_t = 10; // решаем задачу для t от 0 до max_t (max_t тоже мб стоит вводить как параметр)
    let dt = 0.01; //мб стоит позволить ввести шаг по времени (отдельный инпут)

    for(var t = 0; t < max_t; t+=dt)
    {
        for(var i = 0; i < particles.length; i++)
        {
            solve(i,dt);
        }
        draw_knut();
    }

});

