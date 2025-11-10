import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, Clock, Users, Star, ArrowLeft, CheckCircle, 
  Play, Award, TrendingUp 
} from "lucide-react";
import FadeInWhenVisible from "../components/FadeInWhenVisible";
import coursesData from "../data/courses.json";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the course by ID
    const foundCourse = coursesData.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-blue-50 via-blue-25 to-blue-100 text-slate-800 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-xl text-slate-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-gradient-to-b from-blue-50 via-blue-25 to-blue-100 text-slate-800 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Course Not Found</h2>
          <p className="text-slate-600 mb-8">The course you're looking for doesn't exist.</p>
          <Link
            to="/courses"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-25 to-blue-100 text-slate-800 min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-b from-blue-50 via-white to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Course Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {course.gradeLevel}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                  {course.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed">
                  {course.description}
                </p>
              </motion.div>

              {/* Course Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
              >
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{course.rating}</div>
                  <div className="text-sm text-slate-700 font-medium">Rating</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{course.students.toLocaleString()}+</div>
                  <div className="text-sm text-slate-700 font-medium">Students</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{course.duration}</div>
                  <div className="text-sm text-slate-700 font-medium">Duration</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">Certified</div>
                  <div className="text-sm text-slate-700 font-medium">Certificate</div>
                </div>
              </motion.div>

              {/* Course Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
              </motion.div>

              {/* Learning Goals */}
              <FadeInWhenVisible>
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Learning Goals</h2>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed">
                    {course.learningGoals}
                  </p>
                </div>
              </FadeInWhenVisible>

              {/* Session Outline */}
              <FadeInWhenVisible delay={0.2}>
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Session Outline</h2>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {course.sessionOutline.map((session, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl hover:bg-blue-100 transition-colors"
                      >
                        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm">
                          {index + 1}
                        </div>
                        <p className="text-sm sm:text-base text-slate-800">{session}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeInWhenVisible>

              {/* Capstone Project */}
              <FadeInWhenVisible delay={0.4}>
                <div className="bg-gradient-to-br from-blue-700 to-blue-800 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Capstone Project</h2>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed">
                    {course.capstoneProject}
                  </p>
                </div>
              </FadeInWhenVisible>

              {/* Key Takeaways */}
              <FadeInWhenVisible delay={0.6}>
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Key Takeaways</h2>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed">
                    {course.keyTakeaways}
                  </p>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="sticky top-20 sm:top-24 space-y-4 sm:space-y-6"
              >
                {/* Enroll Card */}
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-blue-200">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                      {course.price}
                    </div>
                  <div className="text-sm sm:text-base text-slate-700 font-medium">One-time payment</div>
                </div>

                <button
                  onClick={() => {
                    alert(`Enrollment for "${course.title}" coming soon!`);
                  }}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 mb-4 text-sm sm:text-base"
                >
                  Enroll Now
                </button>

                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Access on mobile and desktop</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Instructor support</span>
                  </div>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-3 sm:mb-4">Instructor</h3>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-700" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm sm:text-base text-slate-900 truncate">{course.instructor}</div>
                    <div className="text-xs sm:text-sm text-slate-700">Expert Instructor</div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />
                  Tech Stack
                </h3>
                <p className="text-sm sm:text-base text-slate-700 break-words">{course.techStack}</p>
              </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

