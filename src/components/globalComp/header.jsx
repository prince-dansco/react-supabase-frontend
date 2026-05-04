import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

export default function HeaderComp({ h1 }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
    });
  }, []);

  return (
    <div>
      <div className="text-center py-14 flex flex-col justify-center">
        <motion.h1
          className="md:text-7xl text-3xl font-semibold my-3 w-full font-playfair mx-auto text-fuchsia-400"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-anchor-placement="center-bottom"
        >
          {h1}
        </motion.h1>

        {/* Framer Motion Animation for Paragraph */}
        <motion.p
          className="text-[#495460] md:text-[18px] text-[14px] max-w-[550px] w-full mx-auto px-2 md:px-0 font-dmSans"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.5,
          }}
        >
          Transforming ideas into stunning, functional websites is our passion.
          From sleek designs to seamless user experiences, we craft digital
          solutions that captivate and inspire. Let's build the future of the
          web together!
        </motion.p>
      </div>
    </div>
  );
}
