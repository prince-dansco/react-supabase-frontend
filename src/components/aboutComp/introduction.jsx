import Typewriter from "react-typewriter-effect";
import React from "react";
import { Link } from "react-router-dom";

export default function Introduction() {
  return (
    <div className="min-h-screen bg-fuchsia-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center items-center justify-self-center-center mb-12">
          <Typewriter
            multiText={[
              "Introduction to Web Development",
              "Learn Web Development",
              "Frontend & Backend",
              "Start Coding Today",
            ]}
            multiTextDelay={1000}
            typeSpeed={70}
            eraseSpeed={50}
            delaySpeed={1500}
            cursorColor="#a21caf"
            textStyle={{
              fontSize: "1.9rem",
              fontWeight: "800",
              color: "#a21caf",
              lineHeight: "1.75rem",
             alignText: "center"
            }}
            wrapperClassName="md:text-4xl font-extrabold justify-self-center text-fuchsia-700 text-xl"
            loop={true} 
          />
          <p className="mt-4 text-sm md:text-xl text-gray-600">
            Learn the basics of web development, its branches, and why it's an
            essential skill in today's digital world.
          </p>
        </div>

        {/* Rest of your content remains unchanged */}
        <section className="mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-fuchsia-700 mb-4">
            What is Web Development?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Web development refers to the process of building, creating, and
            maintaining websites and web applications. It involves a combination
            of programming, design, and problem-solving skills to deliver
            functional and visually appealing web experiences.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-fuchsia-600 mb-4 text-center">
            Branches of Web Development
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg md:text-2xl font-bold text-fuchsia-600 mb-2">
                Frontend Development
              </h3>
              <p className="text-gray-600 mb-4">
                Frontend development focuses on the user interface (UI) and user
                experience (UX) of a website. It involves everything that users
                interact with directly, such as buttons, forms, and layouts.
              </p>
              <h4 className="text-base md:text-xl font-semibold text-fuchsia-500 mb-2">
                Why Learn Frontend Development?
              </h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>High demand for frontend developers.</li>
                <li>Opportunity to create visually appealing designs.</li>
                <li>Ability to work on both web and mobile applications.</li>
              </ul>
              <h4 className="text-xl font-semibold text-fuchsia-500 mt-4 mb-2">
                Languages to Learn:
              </h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React (Frontend Framework)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg md:text-2xl font-bold text-fuchsia-600 mb-2">
                Backend Development
              </h3>
              <p className="text-gray-600 mb-4">
                Backend development deals with the server-side of web
                applications. It involves managing databases, server logic, and
                ensuring smooth communication between the frontend and backend.
              </p>
              <h4 className="text-base md:text-xl font-semibold text-fuchsia-500 mb-2">
                Why Learn Backend Development?
              </h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Critical for building scalable and secure applications.</li>
                <li>High demand for backend developers.</li>
                <li>Opportunity to work with databases and APIs.</li>
              </ul>
              <h4 className="text-xl font-semibold text-fuchsia-500 mt-4 mb-2">
                Languages to Learn:
              </h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Node.js (JavaScript runtime)</li>
                <li>Python</li>
                <li>PHP</li>
                <li>Ruby</li>
                <li>Databases (e.g., MySQL, MongoDB)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-fuchsia-500 mb-4">
            Importance of Web Development
          </h2>
          <p className="text-gray-600 leading-relaxed text-base">
            Web development is a crucial skill in today's digital age. It powers
            everything from small personal blogs to large e-commerce platforms.
            Here are some reasons why web development is important:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-4">
            <li>Enables businesses to establish an online presence.</li>
            <li>Facilitates communication and interaction with users.</li>
            <li>Drives innovation in technology and user experiences.</li>
            <li>Offers lucrative career opportunities.</li>
          </ul>
        </section>

        <div className="text-center mt-12">
          <p className="text-xl text-gray-600 mb-4">
            Ready to start your web development journey?
          </p>
          <button className="bg-fuchsia-600 text-white py-3 px-8 rounded-lg hover:bg-fuchsia-700 transition-colors duration-300">
            <Link to="/courses">Choose course</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
