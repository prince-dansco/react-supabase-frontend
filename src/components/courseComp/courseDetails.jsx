import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { courses } from '../../const/constDataCourses';
import AOS from "aos";
import "aos/dist/aos.css";

export default function CourseDetails() {
    const navigate = useNavigate();
   useEffect(() => {
        AOS.init({
          duration: 800,
          easing: "ease-out",
          once: false,
        });
      }, []);
  return (
    <div>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-32 md:px-22 ">
      <div className="max-w-7xl mx-auto"
      
      >
        <div className="text-center mb-12 max-w-[490px] w-full mx-auto"
        data-aos="zoom-in-right"
        >
          <h1 className="text-4xl font-extrabold text-fuchsia-500 sm:text-2xl">
            Welcome to Your Amazing Courses Page
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Explore our curated courses and take your web development skills to
            the next level.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-aos="zoom-in-left"
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Course Image */}
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-fuchsia-500 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4">{course.description}</p>

                {/* Course Details */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    Duration: {course.duration}
                  </span>
                  <span className="text-sm text-gray-500">
                    Level: {course.level}
                  </span>
                </div>

                {/* Use navigate function on button click */}
                <button
                  onClick={() => navigate("/pageForCourse")}
                  className="w-full bg-fuchsia-600 text-white py-2 px-4 rounded-md 
                             hover:bg-fuchsia-700 transition-colors duration-300"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}
