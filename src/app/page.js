import Hero from "./Components/hero";
import Services from "./Components/Services/services";
import Projects from "./Components/Projects/Projects";

import Testimonials from "./Components/testimonials/testomonial";


export default function Home() {
  return (
  <>
  <Hero/>  
   <Services />
   <Projects />
   <Testimonials/>
   
  </>
  );
}
