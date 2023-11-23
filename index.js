
class Knut_particles {
    constructor(m, num, x, y, v_x, v_y, r) {
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
var particles_steps = [];
var step = 0;

class Knut {
    constructor(N, v0, k) {
        this.N = N;
        this.v0 = v0;
        this.k = k;
        //  this.l0 = l0;
    }


    draw_knut_first_time() {
        var can = document.getElementById("canvas")
        var ctx = can.getContext("2d");
        let length = can.width;
        particles = [];
        for (var i = 0; i < this.N; i++) {
            ctx.beginPath();
            ctx.arc(400 + 10 * (2 * i + 1), 400, 10, 0, 2 * Math.PI);
            ctx.fill();
            particles.push(new Knut_particles(1, i, 400 + 10 * (2 * i + 1), 400, 0, 0, 10));

        }
        
        //particles[0].v_y = -30;
        //particles[0].v_x = 0;
        particles[this.N - 2].v_y = -20;
        particles[this.N - 3].v_y = -17;
        particles[this.N - 4].v_y = -16;
        particles[this.N - 5].v_y = -15;
        particles[this.N - 6].v_y = -14;
        
        // particles[0].v_y = -20;
        // particles[1].v_y = -17;
        // particles[2].v_y = -16;
        // particles[3].v_y = -15;
        // particles[4].v_y = -14;
        // particles[5].v_y = -13;

        // particles[0].v_x = 10;
        // particles[1].v_x = 7;
        // particles[2].v_x = 6;
        // particles[3].v_x = 5;
        // particles[4].v_x = 4;
        // particles[5].v_x = 3;
        
        //particles[4].v_y = -4;
        //particles[5].v_y = -3;


    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function draw_knut() {
    var can = document.getElementById("canvas")
    var ctx = can.getContext("2d");
    let length = can.width;
    ctx.clearRect(0, 0, can.width, can.height);
    for (var i = 0; i < particles.length; i++) {
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, 2 * Math.PI);
        ctx.fill();
    }
}

//Симпоектический интегратор 4 порядка
function solve_euler(dt)
{
    //Метод Эйлер
    let c = 500;
    let l0 = 20; //отношение m/c должно быть около 2
    var m = 5;
    let new_particles = particles;

    /*for(let i = 0; i < particles.length; i++ )
    {
        new_particles[i] = Object.assign({},particles[i]);
    }*/

    for (var i = 0; i < particles.length; i++) {
        if (i > 0 && i != particles.length - 1) {

            let l1 = Math.sqrt(Math.pow(particles[i].x - particles[i-1].x, 2) + Math.pow(particles[i].y - particles[i - 1].y, 2));
            let l2 = Math.sqrt(Math.pow(particles[i + 1].x - particles[i].x, 2) + Math.pow(particles[i + 1].y - particles[i].y, 2));

            let cos_prev = (particles[i - 1].x - particles[i].x) / l1;
            let sin_prev = (particles[i - 1].y - particles[i].y) / l1;

            let cos_next = (particles[i + 1].x - particles[i].x) / l2;
            let sin_next = (particles[i + 1].y - particles[i].y) / l2;

            
            new_particles[i].v_x = particles[i].v_x + c * (l1 - l0) / m * cos_prev * dt + c * (l2 - l0) / m * cos_next * dt; //- particles[i].x*dt;
            new_particles[i].x = particles[i].x + particles[i].v_x * dt;

            
            new_particles[i].v_y = particles[i].v_y + c * (l2 - l0) / m * sin_next * dt + c * (l1 - l0) / m * sin_prev * dt; //+ 9.8*dt;
            new_particles[i].y = particles[i].y + particles[i].v_y * dt;

            console.log("New coords for particle " + i + ":" + new_particles[i].x + " " + new_particles[i].y, "l1:" + l1,"l2:" + l2);
        }
        else if (i == 0) {
            let l2 = Math.sqrt(Math.pow(particles[i + 1].x - particles[i].x, 2) + Math.pow(particles[i + 1].y - particles[i].y, 2));

            let cos_next = (particles[i + 1].x - particles[i].x) / l2;
            let sin_next = (particles[i + 1].y - particles[i].y) / l2;

            
            new_particles[i].v_x = particles[i].v_x + c * (l2 - l0) / m * cos_next * dt; //- particles[i].x*dt;
            new_particles[i].x = particles[i].x + particles[i].v_x * dt;
            
            new_particles[i].v_y = particles[i].v_y + c * (l2 - l0) / m * sin_next * dt;
            new_particles[i].y = particles[i].y + particles[i].v_y * dt;
            

            console.log("New coords for particle " + i + ":" + new_particles[i].x  + " " +  new_particles[i].y);
        }
        // else if (i == particles.length - 1) {
        //     let l1 = Math.sqrt(Math.pow(particles[i].x - particles[i - 1].x, 2) + Math.pow(particles[i].y - particles[i - 1].y, 2));

        //     let cos_prev = (particles[i - 1].x - particles[i].x) / l1;
        //     let sin_prev = (particles[i - 1].y - particles[i].y) / l1;

        //     new_particles[i].v_x = 0//particles[i].v_x + c*(l1 - l0)/m*cos_prev*dt; //- particles[i].x*dt;
        //     new_particles[i].x = particles[i].x + particles[i].v_x * dt;

        //     new_particles[i].v_y = 0//particles[i].v_y + c*(l1 - l0)/m*sin_prev*dt;
        //     new_particles[i].y = particles[i].y + particles[i].v_y * dt;

        //     //console.log("New coords for particle " + i + ":" + particles[i].x + " " + particles[i].y);
        //     //console.log("New coords for particle " + i + ":" + new_particles[i].v_x + (l1 - l0))
        // }
    }
    let tmp = []
    for(let i = 0; i < particles.length; i++ )
    {
        tmp[i] = Object.assign({},particles[i]);
    }
    return tmp;
}

function solve_leapfrog(dt)
{
    //Метод leapfrog
    let c = 500;
    let l0 = 20; //отношение m/c должно быть около 2
    var m = 5;
    let new_particles = particles;

    for (var i = 0; i < particles.length; i++)
    {
        // if(new_particles[i].y <= 810)
        // {
            if(i > 0 && i < particles.length - 1)
            {
                let l1 = Math.sqrt(Math.pow(particles[i].x - particles[i-1].x, 2) + Math.pow(particles[i].y - particles[i - 1].y, 2));
                let l2 = Math.sqrt(Math.pow(particles[i + 1].x - particles[i].x, 2) + Math.pow(particles[i + 1].y - particles[i].y, 2));

                let cos_prev = (particles[i - 1].x - particles[i].x) / l1;
                let sin_prev = (particles[i - 1].y - particles[i].y) / l1;

                let cos_next = (particles[i + 1].x - particles[i].x) / l2;
                let sin_next = (particles[i + 1].y - particles[i].y) / l2;

                let Fx = c * (l1 - l0) / m * cos_prev + c * (l2 - l0) / m * cos_next;
                let Fy = c * (l2 - l0) / m * sin_next  + c * (l1 - l0) / m * sin_prev; //+ 9.8;

                //alert(particles[i].x + " " + particles_steps[particles_steps.length - 2][i].x);

                new_particles[i].x = 2*particles[i].x - particles_steps[particles_steps.length - 2][i].x + Fx*Math.pow(dt,2);
                new_particles[i].y = 2*particles[i].y - particles_steps[particles_steps.length - 2][i].y + Fy*Math.pow(dt,2);

                console.log("For part. " + i,particles[i].x,particles_steps[particles_steps.length - 2][i].x);
            }
            else if(i == 0)
            {   
                let l2 = Math.sqrt(Math.pow(particles[i + 1].x - particles[i].x, 2) + Math.pow(particles[i + 1].y - particles[i].y, 2));
                
                let cos_next = (particles[i + 1].x - particles[i].x) / l2;
                let sin_next = (particles[i + 1].y - particles[i].y) / l2;

                let Fx = c * (l2 - l0) / m * cos_next;
                let Fy = c * (l2 - l0) / m * sin_next;
            
                new_particles[i].x = 2*particles[i].x - particles_steps[particles_steps.length - 2][i].x + Fx*Math.pow(dt,2);
                new_particles[i].y = 2*particles[i].y - particles_steps[particles_steps.length - 2][i].y + Fy*Math.pow(dt,2);
            }
        // }
        // {
        //     console.log(new_particles[i].y);
        // }
        

    }
    let tmp = []
    for(let i = 0; i < particles.length; i++ )
    {
        tmp[i] = Object.assign({},particles[i]);
    }
    return tmp;
}


var num_solve = 0;

but.addEventListener('click', function () {
    var a = new Knut(40, 0, 0)
    a.draw_knut_first_time();
});

start_but.addEventListener('click', function () {
    step = 0;
    
    particles_steps = [];
    let dt = 0.1
    //control_euler();
    setInterval(control_frog,0.001)

});


function phys_euler()
{
    let dt = 0.001; //мб стоит позволить ввести шаг по времени (отдельный инпут)
    
    let tmp = solve_euler(dt);
    particles_steps.push(tmp);
}
function control_euler() {
    phys_euler();
    num_solve++;
    if(num_solve >= 1000)
    {
        draw_knut();
        num_solve = 0;
    }
    
}

function phys_frog() {
    let dt = 0.001; //мб стоит позволить ввести шаг по времени (отдельный инпут)
    //Тк метод не самостартующий
    if(step < 3)
    {
        phys_euler();
        step++;
    }
    else
    {
        let tmp = solve_leapfrog(dt);
        particles_steps.push(tmp);
    }
}
function control_frog() {
    phys_frog();
    num_solve++;
    if(num_solve >= 1000)
    {
        draw_knut();
        num_solve = 0;
    }
}