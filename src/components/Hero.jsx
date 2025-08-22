import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import _SplitText from "gsap/SplitText";
import SplitText from "gsap/SplitText";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, _SplitText);

const Hero = () => {
  const videoRef = useRef();
  const videoTimelineRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 180,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap.from(".right-leaf", {
      opacity: 0,
      xPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      delay: 0.8,
    });
    gsap.from(".left-leaf", {
      opacity: 0,
      xPercent: -100,
      duration: 1.8,
      ease: "expo.out",
      delay: 0.8,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".title", { scale: 0.7, y: 50 })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0)
      .to(".p-tag", { opacity: 0.3, y: 50 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "top 30%" : "bottom top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block p-tag">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails p-tag">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails" className="view-cocktail">
                View Cocktails
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0 w-full h-screen">
        <video
          src="/videos/output.mp4"
          type="video/mp4"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
};

export default Hero;
