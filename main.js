document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const slidesMovile= document.querySelectorAll(".slide-movile");

    let currentSlideIndex = 0;
    let isAnimating = false;
    let currentTopValue = 0;

    const elements = [
        { selector: ".prefix", delay: 0 },
        { selector: ".places", delay: 0.15 },
        { selector: ".year", delay: 0.3 },
    ];    

    const elementsMovile = [
        { selector: ".prefix-movile", delay: 0 },
        { selector: ".places-movile", delay: 0.15 },
        { selector: ".year-movile", delay: 0.3 },
    ];    

    slides.forEach((slide, idx) => {
        if (idx !== 0) {
            const img = slide.querySelector("img");
            gsap.set(img, {
                scale: 2, top: "2em"
            });
        }
    });

    slidesMovile.forEach((slide, idx) => {
        if (idx !== 0) {
            const img = slide.querySelector("img");
            gsap.set(img, {
                scale: 2, top: "2em"
            });
        }
    });


    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        const slide = slides[index];
        const img = slide.querySelector("img");

        currentTopValue -= 30;

        elements.forEach((elem) => {
            gsap.to(document.querySelector(elem.selector), {
                y: `${currentTopValue}px`,
                duration: 1,
                ease: "power4.inOut",
                delay: elem.delay,
            });
        });

        gsap.to(img, {
            scale: 1,
            top: "0%",
            duration: 1,
            ease: "power3.inOut",
        });

        gsap.to(
            slide,
            {
                clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power4.inOut",
                onComplete: () => {
                    isAnimating = false;
                },
            },
            "<"
        );
    }

    function hideSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        const slide = slides[index];
        const img = slide.querySelector("img");

        currentTopValue += 30;

        elements.forEach((elem) => {
            gsap.to(document.querySelector(elem.selector), {
                y: `${currentTopValue}px`,
                duration: 1,
                ease: "power4.inOut",
                delay: elem.delay,
            });
        });

        gsap.to(slide, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            duration: 1,
            ease: "power4.inOut",
        });

        gsap.to(img, {
            scale: 2,
            top: "4em",
            duration: 1,
            ease: "power3.inOut"
        });

        gsap.to(slide, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
                isAnimating = false;
            },
        },
            "<"
        );
    }

    function showSlideMovile(index) {
        if (isAnimating) return;
        isAnimating = true;
        const slideM = slidesMovile[index];
        const img = slideM.querySelector("img");

        currentTopValue -= 30;

        elementsMovile.forEach((elem) => {
            gsap.to(document.querySelector(elem.selector), {
                y: `${currentTopValue}px`,
                duration: 1,
                ease: "power4.inOut",
                delay: elem.delay,
            });
        });

        gsap.to(img, {
            scale: 1,
            top: "0%",
            duration: 1,
            ease: "power3.inOut",
        });

        gsap.to(
            slideM,
            {
                clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                duration: 1,
                ease: "power4.inOut",
                onComplete: () => {
                    isAnimating = false;
                },
            },
            "<"
        );
    }

    function hideSlideMovile(index) {
        if (isAnimating) return;
        isAnimating = true;
        const slideM = slidesMovile[index];
        const img = slideM.querySelector("img");

        currentTopValue += 30;

        elementsMovile.forEach((elem) => {
            gsap.to(document.querySelector(elem.selector), {
                y: `${currentTopValue}px`,
                duration: 1,
                ease: "power4.inOut",
                delay: elem.delay,
            });
        });

        gsap.to(slideM, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            duration: 1,
            ease: "power4.inOut",
        });

        gsap.to(img, {
            scale: 2,
            top: "4em",
            duration: 1,
            ease: "power3.inOut"
        });

        gsap.to(slideM, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
                isAnimating = false;
            },
        },
            "<"
        );
    }
    const desktopSize = window.matchMedia('(min-width: 601px)')
    const phoneSize = window.matchMedia('(max-width: 600px)')

    //Funcionamiento en Escritorio (Desplazamiento)
    if (desktopSize.matches) {
        window.addEventListener("wheel", (e) => {
            if (isAnimating) return;
            if (e.deltaY > 0 && currentSlideIndex < slides.length - 1) {
                showSlide(currentSlideIndex + 1);
                currentSlideIndex++;
            } else if (e.deltaY < 0 && currentSlideIndex > 0) {
                hideSlide(currentSlideIndex);
                currentSlideIndex--;
            }
        });

        console.log("Funciona en base a Scroll");
    }

    //Funcionamiento en Movil (Click)
    if (phoneSize.matches) {
        const nextBtn = document.getElementById("next");
        const previousBtn = document.getElementById("previous");

        nextBtn.addEventListener('click', () => {
            if (isAnimating) return;
            if (currentSlideIndex < slidesMovile.length - 1) {
                showSlideMovile(currentSlideIndex + 1);
                currentSlideIndex++;
            }
        });

        previousBtn.addEventListener('click', () => {
            if (isAnimating) return;
            if (currentSlideIndex > 0) {
                hideSlideMovile(currentSlideIndex);
                currentSlideIndex--;
            } else if (currentSlideIndex > slidesMovile.length - 1) {
                hideSlideMovile(currentSlideIndex);
                currentSlideIndex--;
            }
        });

        console.log("Funciona en base a Click");
    }

});

/*Barra de Inforcion */

const tl = gsap.timeline({ paused: true });

let mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
    const animateOpeninfo = () => {

        tl.to(".info-container", 0.8, {
            y: '40vh',
            ease: "power4.inOut",
            autoAlpha: 1,
            delay: 0.1,
        });

        tl.from(".social-links > div", 0.4, {
            opacity: 0,
            y: 10,
            stagger: {
                amount: 0.4,
            },
        });

        tl.to(".contact-link > a", 0.8, {
            top: 0,
            ease: "power2.inOut",
            stagger: {
                amount: 0.4,
            },
        },
            "-=0.4");

        tl.from(".info-footer", 0.3, {
            opacity: 0
        }, "-=0.5").reverse();
    };

    const openinfo = () => {
        animateOpeninfo();
        const infoBtn = document.getElementById("info-btn");
        infoBtn.onclick = function (e) {
            infoBtn.classList.toggle("active");
            tl.reversed(!tl.reversed());
        };
    };

    openinfo();
});

mm.add("(max-width: 799px)", () => {
    const animateOpeninfo = () => {

        tl.to(".info-container", 1, {
            y: '100vh',
            ease: "power4.inOut",
            autoAlpha: 1,
            delay: 0.1,
        });

        tl.from(".social-links > div", 0.4, {
            opacity: 0,
            y: 10,
            stagger: {
                amount: 0.4,
            },
        });

        tl.to(".contact-link > a", 0.8, {
            top: 0,
            ease: "power2.inOut",
            stagger: {
                amount: 0.4,
            },
        },
            "-=0.4");

        tl.from(".info-footer", 0.3, {
            opacity: 0
        }, "-=0.5").reverse();
    };

    const openinfo = () => {
        animateOpeninfo();
        const infoBtn = document.getElementById("info-btn");
        infoBtn.onclick = function (e) {
            infoBtn.classList.toggle("active");
            tl.reversed(!tl.reversed());
        };
    };

    openinfo();
});