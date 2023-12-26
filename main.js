document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let currentSlideIndex = 0;
    let isAnimating = false;
    let currentTopValue = 0;

    const elements = [
        { selector: ".prefix", delay: 0 },
        { selector: ".places", delay: 0.15 },
        { selector: ".year", delay: 0.3 },
    ];

    slides.forEach((slide, idx) => {
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

    window.addEventListener("wheel", (e) => {
        if (isAnimating) return;
        if (e.deltaY > 0 && currentSlideIndex < slides.length - 1) 
        {
            showSlide(currentSlideIndex + 1);
            currentSlideIndex++;
        }   else if (e.deltaY < 0 && currentSlideIndex > 0) {
            hideSlide(currentSlideIndex);
            currentSlideIndex--;
        }
    })

    console.log("finciona?"); 
});

/*Barra de Inforcion */

const tl = gsap.timeline({ paused: true });

        let mm = gsap.matchMedia();

        mm.add("(min-width: 800px)", () => {
            const animateOpenNav = () => {

                tl.to(".nav-container", 0.8, {
                    y: '40vh',
                    ease: "power4.inOut",
                    autoAlpha: 1,
                    delay: 0.1,
                });

                tl.to(".city-text, .logo-text", 0.2, {
                    color: "#fff",
                },
                    "-+0.1");

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

                tl.from(".nav-footer", 0.3, {
                    opacity: 0
                }, "-=0.5").reverse();
            };

            const openNav = () => {
                animateOpenNav();
                const navBtn = document.getElementById("info-btn");
                navBtn.onclick = function (e) {
                    navBtn.classList.toggle("active");
                    tl.reversed(!tl.reversed());
                };
            };

            openNav();
        });

        mm.add("(max-width: 799px)", () => {
            const animateOpenNav = () => {

                tl.to(".nav-container", 1, {
                    y: '100vh',
                    ease: "power4.inOut",
                    autoAlpha: 1,
                    delay: 0.1,
                });

                tl.to(".city-text, .logo-text", 0.2, {
                    color: "#fff",
                },
                    "-+0.1");

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

                tl.from(".nav-footer", 0.3, {
                    opacity: 0
                }, "-=0.5").reverse();
            };

            const openNav = () => {
                animateOpenNav();
                const navBtn = document.getElementById("info-btn");
                navBtn.onclick = function (e) {
                    navBtn.classList.toggle("active");
                    tl.reversed(!tl.reversed());
                };
            };

            openNav();
        });