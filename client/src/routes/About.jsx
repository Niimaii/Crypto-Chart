import React from 'react';
import handImage from '../images/hand-wave.png';

function About() {
  return (
    <section className='about'>
      <div className='about_intro'>
        <img src={handImage} alt='' />
        <p>
          Hello and welcome. This website is a big personal milestone and
          something I can say I am proud of. I have always been curious about
          investing in crypto, but was scared of the potential money I could
          lose. Hence why I made this website, but what is exactly Cryptonium?
        </p>
      </div>
      <div className='about_intro'>
        <h1>What is Cryptonium?</h1>
        <p>
          Cryptonium is a crypto paper trading website. Essentially you can make
          trades as if they were real and track their progress. This is meant to
          be a stress free way to learn about investing in crypto, while taking
          on 0 risk.
        </p>
      </div>
      <div className='about_intro'>
        <h1>What are the plans for this website?</h1>
        <p>
          To be honest I am still deciding on exactly what to do with this. One
          idea that comes to mind is making it so users can opt into publicly
          sharing their investment progress and compete on who has the most
          consistent profits. This way users can make learning fun while also
          having access to strategies that other people use.
        </p>
      </div>
    </section>
  );
}

export default About;
