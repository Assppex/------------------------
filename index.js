
class Knut_particles
{
    constructor(m,num,v_x,v_y)
    {
        this.m = m;
        this.num = num;
        this.v_x = v_x;
        this.v_y = v_y;
    }

}

var but = document.getElementById("submit");

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
        var particles = [];
        particles.push( new Knut_particles(1,0,0,0));
       
        for(var i = 0 ; i < this.N; i++)
        {
            ctx.beginPath();
            ctx.arc(length/(2*this.N)*i + length/(2*this.N)*(i + 1), 300, length/(2*this.N), 0, 2*Math.PI); 
            ctx.fill();
        }
    }
}

but.addEventListener('click',function(){
    var a = new Knut(50,0,0)
    a.draw_knut_first_time();
});

