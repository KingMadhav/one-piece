
const scroll = new LocomotiveScroll({
    el: document.querySelector('.contain'),
    smooth: true
});
// Update ScrollTrigger on LocomotiveScroll events
scroll.on('scroll', ScrollTrigger.update);

// Tell ScrollTrigger to use LocomotiveScroll as the scroller
ScrollTrigger.scrollerProxy('.contain', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector('.contain').style.transform ? 'transform' : 'fixed'
});

// Refresh ScrollTrigger after LocomotiveScroll initialization
ScrollTrigger.addEventListener('refresh', () => scroll.update());
ScrollTrigger.refresh();
const characters = [
    { name: 'luffy', delay: 0 },
    { name: 'zoro', delay: 0, scrollTrigger: true },
    { name: 'sanji', delay: 0, scrollTrigger: true },
    { name: 'usopp', delay: 0, scrollTrigger: true }
];

characters.forEach(character => {
    let timeline = gsap.timeline({
        scrollTrigger: character.scrollTrigger ? {
            scroller:".contain",
            trigger: `.${character.name}`,
            start: "top 30%",
            end: "bottom 20%"
        } : null
    });

    timeline.from(`.${character.name} .part h3`, {
        y: "-50",
        opacity: 0,
        stagger: 0.2,
        delay: character.delay
    })
    .from(`.${character.name} .naam h2`, {
        y: "-50",
        opacity: 0,
        delay: character.delay 
    })
    .from(`.${character.name} .main h1`, {
        x: "-250",
        opacity: 0,
        stagger: 0.2,
        delay: character.delay 
    })
    .from(`.${character.name} .images img`, {
        y: "200",
        rotate: 45,
        opacity: 0,
        stagger: 0.5,
        delay: character.delay
    });
});
