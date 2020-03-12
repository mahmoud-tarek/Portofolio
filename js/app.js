/*-----Variabels-----*/

const portofolio = document.querySelector('.portofolio');
const pages = document.querySelectorAll('.page');
const imgs = document.querySelectorAll('.model-img');
const dots = document.querySelectorAll('.dot');
const backgrounds = 
[
    'radial-gradient(#2B3760,#0B1023)',
    'radial-gradient(#4E3022,#161616)',
    'radial-gradient(#4E4342,#161616)'
];

const burger = document.querySelector('nav #burger');
const burgerLines = document.querySelectorAll('nav #burger line');
const navOpen = document.querySelector('.nav-open');
const nav = document.querySelector('nav');
const contact = document.querySelector('.contact');
const social = document.querySelector('.social');
const socialLinks = social.querySelectorAll('div a');
const hrefs = document.querySelectorAll('.href');

let current = 0;
let wheelCurrent = 0;

/*-----Events-----*/

dots.forEach( (dot,index) => {
    dot.addEventListener('click', function() {
        changeDots(this);
        changePage(index);
    });
});

pages.forEach( page => {
    page.addEventListener('click', () => {
        !tl.reversed() ? tl.reverse() : null;
    });
});
/*-----Navbar-----*/

const tl = new TimelineMax({paused: true, reversed: true});

tl.to(navOpen, 0.3, {y: '0%'})
.fromTo(nav , 0.3, {color: '#fff'}, {color: '#000'}, '-=0.2')
.fromTo(burgerLines , 0.3, {stroke: 'white'}, {stroke: 'black'} , '-=0.5')
.fromTo(contact, 0.3, {opacity: 0, y: '30%'}, {opacity: 1, y: '0%'})
.fromTo(social, 0.3, {opacity: 0, y: '30%'}, {opacity: 1, y: '0%'});

burger.addEventListener('click' , () => tl.reversed() ? tl.play() : tl.reverse());

/*-----Functions--------*/
function changeDots(dot)
{
    dots.forEach( dot => dot.classList.remove('active'));
    dot.classList.add('active');
};

function changePage(index)
{
    const imgLeft = document.querySelectorAll('.img-left')[current];
    const imgRight = document.querySelectorAll('.img-right')[current];
    const nextLeft = document.querySelectorAll('.img-left')[index];
    const nextRight = document.querySelectorAll('.img-right')[index];
    const currentPage = document.querySelectorAll('.page')[current];
    const nextPage = document.querySelectorAll('.page')[index];
    const text = document.querySelectorAll('.page .text')[index];

    const tl = new TimelineMax({
        onStart: function(){
            dots.forEach(dot => dot.style.pointerEvents = 'none')
        },
        onComplete: function(){
            dots.forEach(dot => dot.style.pointerEvents = 'all')
        }
    });

    contact.querySelector('p').innerHTML = text.querySelector('p').innerHTML;
    
    socialLinks.forEach( (e,i) => 
        {
            i == 0 ? e.href = hrefs[index].querySelector('.one').innerHTML : null;
            i == 1 ? e.href = hrefs[index].querySelector('.two').innerHTML : null;
            i == 2 ? e.href = hrefs[index].querySelector('.three').innerHTML : null;
        });

    if(current != index)
    {
        tl.fromTo(imgLeft , 0.3 , {y: '-10%'} , {y: '-100%'})
        .fromTo(imgRight , 0.3 , {y: '10%'} , {y: '-100%'} , '-=0.2')
        .to(portofolio , 0.3 , {background: backgrounds[index]})
        .fromTo(currentPage, 0.3, {opacity: 1, pointerEvents: 'all'}, {opacity: 0, pointerEvents: 'none'})
        .fromTo(nextPage, 0.3, {opacity: 0, pointerEvents: 'none'}, {opacity: 1, pointerEvents: 'all'}, '-=0.6')
        .fromTo(nextLeft , 0.3 , {y: '-100%'} ,{y: '-10%'} , '-=0.6')
        .fromTo(nextRight , 0.3 , {y: '-100%'} , {y: '10%'} , '-=0.8')
        .set(nextLeft, {clearProps: 'all'})
        .set(nextRight, {clearProps: 'all'})
        .fromTo(text, 0.6, {opacity: 0, y: '10%'}, {opacity: 1, y: '0%'}, '-=0.2');

        current = index;
        wheelCurrent = current;
    }
};

//Optional

document.addEventListener('wheel', throttle(wheelFun, 1300));
document.addEventListener('touchmove', throttle(wheelFun, 1300));

function throttle(func, limit)
{
    let inThrottle;

    return function()
    {
        const args = arguments;
        const context = this;

        if(!inThrottle)
        {
            func.apply(context, args);
            inThrottle = true;
            setTimeout( () => (inThrottle = false), limit);
        }
    };
}

function wheelFun(e)
{
    e.deltaY > 0 ? wheelCurrent++ : wheelCurrent--;

    wheelCurrent > 2 ? wheelCurrent = 0 : null;

    wheelCurrent < 0 ? wheelCurrent = 2 : null;

    slideWheel();
}

function slideWheel()
{
    changeDots(dots[wheelCurrent]);
    changePage(wheelCurrent);
}