import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import "../../assets/LandingPage.css";
import heroImg from "../../assets/hero.jpg";
import featuresImg1 from "../../assets/feature1.jpg";
import featuresImg2 from "../../assets/feature2.jpg";
import featuresImg3 from "../../assets/feature3.jpeg";
import htmlImg from "../../assets/html.svg";
import cssImg from "../../assets/css.svg";
import jsImg from "../../assets/js.svg";
import bootstrapImg from "../../assets/bootstrap.svg";
import tailwindImg from "../../assets/tailwind.svg";
import reactImg from "../../assets/reactjs.svg";
import nodejsImg from "../../assets/nodejs.svg";
import mongodbImg from "../../assets/mongodb.svg";
import pythonImg from "../../assets/python.svg";
import javaImg from "../../assets/java.svg";
import CImg from "../../assets/C.svg";
import CPPImg from "../../assets/cpp.svg";
import tsImg from "../../assets/ts.svg";
import jqueryImg from "../../assets/jquery.svg";
import mysqlImg from "../../assets/sql.svg";
import ctaImg from "../../assets/cta.jpeg";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import codinghubLogo from "../../assets/codinghub.png";
import axiosInstance from "../../../axiosConfig";

const LandingPage = () => {
  const heroRef = useRef();
  const imgRef = useRef();
  const btnRef = useRef();
  const logoRef = useRef();
  const cardsRef = useRef([]);
  const langCardsRef = useRef([]);
  const ctaRef = useRef();
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const languages = [
    { name: "HTML", image: htmlImg },
    { name: "CSS", image: cssImg },
    { name: "JavaScript", image: jsImg },
    { name: "Bootstrap", image: bootstrapImg },
    { name: "Tailwind CSS", image: tailwindImg },
    { name: "ReactJS", image: reactImg },
    { name: "NodeJS", image: nodejsImg },
    { name: "MongoDB", image: mongodbImg },
    { name: "Python", image: pythonImg },
    { name: "Java", image: javaImg },
    { name: "C", image: CImg },
    { name: "C++", image: CPPImg },
    { name: "typescript", image: tsImg },
    { name: "JQuery", image: jqueryImg },
    { name: "MySQL", image: mysqlImg },
  ];

  const handleHome = () => {
    if (context.isLoggedIn === true) {
      navigate("/html/home");
    } else {
      navigate("/login");
      context.setFlashMessage(
        "Please Login or SignUp to access codingHub Resources!!"
      );
    }
  };

  const handlesubmit = async () => {
    try {
      const response = await axiosInstance.post("/api/logout");
      localStorage.removeItem("token");
      context.setIsLoggedIn(false);
      context.setFlashMessage(response.data.message);
    } catch (err) {
      console.error("Error while logging out:", err);
    }
  };

  useEffect(() => {
    if (context) {
      context.setShowNavbar(false);
    }
  }, [context]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(imgRef.current, {
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: 100,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(logoRef.current, {
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(btnRef.current, {
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: 100,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: ".features-container",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
      });

      gsap.from(langCardsRef.current, {
        scrollTrigger: {
          trigger: ".languages-container",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });

      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(imgRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -40,
        ease: "none",
      });

      cardsRef.current.forEach((card) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          },
          scale: 1.05,
          ease: "power1.out",
        });
      });

      langCardsRef.current.forEach((card) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
          y: -30,
          ease: "none",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header>
        <div className="signupHeader mt-4 p-2 d-flex align-items-center justify-content-between">
          <div className="logoWrapper" ref={logoRef}>
            <Link to="/">
              <img className="logo" src={codinghubLogo} />
            </Link>
          </div>
          {context.isLoggedIn === true ? (
            <button
              type="submit"
              onClick={handlesubmit}
              ref={btnRef}
              className="btn btn-info"
            >
              Log Out
            </button>
          ) : (
            <Link to={"/login"} ref={btnRef}>
              <button className="btn btn-info">Log In</button>
            </Link>
          )}
        </div>
      </header>
      <section className="landing-hero">
        <div className="hero-text" ref={heroRef}>
          <h1>Master Coding with Ease</h1>
          <p>Learn HTML, CSS, JavaScript, and more with interactive lessons.</p>

          <button className="cta-btn" onClick={handleHome}>
            Start Learning
          </button>
        </div>
        <div className="hero-image">
          <img
            ref={imgRef}
            src={heroImg}
            alt="Coding Illustration"
            className="hero-placeholder-img"
          />
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-heading">Why Choose Us?</h2>
        <div className="features-container">
          <div
            className="feature-card"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <img src={featuresImg1} alt="Learn by Doing" />
            <h3>Learn by Doing</h3>
            <p>Interactive exercises and real-world projects.</p>
          </div>
          <div
            className="feature-card"
            ref={(el) => (cardsRef.current[1] = el)}
          >
            <img src={featuresImg2} alt="Code Editor" />
            <h3>Code Editor</h3>
            <p>Practice coding in an integrated environment.</p>
          </div>
          <div
            className="feature-card"
            ref={(el) => (cardsRef.current[2] = el)}
          >
            <img src={featuresImg3} alt="Track Progress" />
            <h3>Track Progress</h3>
            <p>Monitor your progress with language-wise reports.</p>
          </div>
        </div>
      </section>

      <section className="languages-section">
        <h2 className="languages-heading">What You'll Learn</h2>
        <div className="languages-container">
          {languages.map((lang, i) => (
            <div
              key={lang.name}
              className="language-card"
              ref={(el) => (langCardsRef.current[i] = el)}
            >
              <img
                src={lang.image}
                alt={`${lang.name} icon`}
                className="lang-icon"
              />
              <h3>{lang.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section" ref={ctaRef}>
        <div className="cta-content">
          <div className="cta-text">
            <h2>Ready to Start Your Coding Journey?</h2>
            <p>Join thousands of learners and build your skills today.</p>

            <button className="cta-btn-big" onClick={handleHome}>
              Start Learning
            </button>
          </div>
          <div className="cta-image">
            <img src={ctaImg} alt="Start Coding Journey" />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
