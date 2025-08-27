import gsap from "gsap";
import { openingHours, socials } from "../../constants";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Contact = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#contact h2", {
      type: "words",
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        end: "bottom 90%",
        scrub: true,
      },
      ease: "power1.inOut",
    });

    timeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .from("#contact h3, #contact p", {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .to("#f-right-leaf", {
        y: -100,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        "#f-left-leaf",
        {
          y: 100,
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      );

    // gsap.from("#f-right-leaf", {
    //   y: 300,
    //   duration: 3,
    //   scrollTrigger: {
    //     trigger: "#contact",
    //     start: "top 90%",
    //     end: "bottom 60%",
    //     scrub: true,
    //     ease: "power1.out",
    //   },
    // });
    // gsap.from("#f-left-leaf", {
    //   y: -300,
    //   duration: 3,
    //   scrollTrigger: {
    //     trigger: "#contact",
    //     start: "top 60%",
    //     end: "bottom 90%",
    //     scrub: true,
    //     ease: "power1.out",
    //   },
    // });
  }, []);

  return (
    <footer id="contact">
      <img
        src="/images/footer-right-leaf.png"
        alt="right-leaf"
        id="f-right-leaf"
      />
      <img
        src="/images/footer-left-leaf.png"
        alt="left-leaf"
        id="f-left-leaf"
      />

      <div className="content">
        <h2>Where to Fine Us</h2>

        <div>
          <h3>Visit Our Bar</h3>
          <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>info@mojito.com</p>
          <p>(123) 456-7890</p>
        </div>

        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </div>
        <div>
          <h3>Socials</h3>
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}>
                <img src={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
