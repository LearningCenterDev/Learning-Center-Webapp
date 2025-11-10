import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Search, BookOpen, Users, Award, TrendingUp } from "lucide-react";
import FadeInWhenVisible from "../components/FadeInWhenVisible";
import coursesData from "../data/courses.json";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const navigate = useNavigate();

  // Handle responsive testimonials carousel
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1); // Mobile: 1 item
      } else if (width < 1024) {
        setItemsPerView(2); // Tablet: 2 items
      } else {
        setItemsPerView(3); // Desktop: 3 items
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Simulate checking authentication status
  useEffect(() => {
    // In a real app, this would check localStorage, cookies, or make an API call
    const checkAuthStatus = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user is logged in (in real app, this would be from your auth context/API)
        const token = localStorage.getItem('authToken');
        if (token) {
          setIsAuthenticated(true);
          // In real app, fetch user data from your backend
          setUserData({
            name: "John Doe",
            activeCourses: 12,
            progress: 85,
            currentCourse: "Python Basics",
            currentProgress: 75,
            recentActivity: [
              { type: "completed", course: "JavaScript Fundamentals" },
              { type: "started", course: "React Development" },
              { type: "scheduled", course: "Data Structures & Algorithms" }
            ]
          });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    const testimonials = [
      { name: "Sarah M.", avatar: "/avatars/sarah.jpg", text: "LearnOne helped me ace my SATs with personalized sessions. Highly recommend!" },
      { name: "David R.", avatar: "/avatars/david.jpg", text: "The tutors are excellent — they really know how to make tough topics simple." },
      { name: "Priya K.", avatar: "/avatars/priya.jpg", text: "Affordable, convenient, and interactive! My go-to for live learning." },
      { name: "James W.", avatar: "/avatars/james.jpg", text: "The best investment I've made in my education. Quality is outstanding!" },
      { name: "Maria G.", avatar: "/avatars/maria.jpg", text: "Flexible schedule and amazing tutors. Learning has never been this enjoyable!" },
      { name: "Alex T.", avatar: "/avatars/alex.jpg", text: "Perfect platform for students who want to excel. Highly satisfied!" }
    ];

    const maxIndex = Math.max(0, testimonials.length - itemsPerView);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [itemsPerView]);

  // Get first 5 courses for popular section
  const courses = coursesData.slice(0, 5);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate auto-suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const matchedCourses = coursesData
        .filter((course) => 
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
        )
        .slice(0, 5); // Limit to 5 suggestions
      setSuggestions(matchedCourses);
      setShowSuggestions(matchedCourses.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  return (
     <div className="bg-gradient-to-b from-blue-50 via-blue-25 to-blue-100 text-slate-800 min-h-screen">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-blue-50 via-white to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Side - CTA and Search */}
            <div className="space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-800">
                  Empower Your Future with{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                    LearnOne
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl">
                  Learn From Experts and Grow Your Skills — All in one place.
                </p>
              </motion.div>

              {/* Search Bar with Auto-Suggestions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative max-w-md"
              >
                <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
                  <div className="flex items-center px-3 sm:px-4 bg-white text-gray-600">
                    <Search size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="flex-1 px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base text-gray-900 placeholder:text-gray-500 outline-none bg-white border-0 focus:outline-none focus:ring-0 rounded-r-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      if (suggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    onBlur={() => {
                      // Delay to allow clicking on suggestions
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (searchQuery.trim()) {
                          navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
                          setShowSuggestions(false);
                        } else {
                          navigate('/courses');
                        }
                      } else if (e.key === 'Escape') {
                        setShowSuggestions(false);
                      }
                    }}
                  />
                </div>
                
                {/* Auto-Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
                    {suggestions.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => {
                          navigate(`/courses?search=${encodeURIComponent(course.title)}`);
                          setSearchQuery(course.title);
                          setShowSuggestions(false);
                        }}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-slate-800 truncate">{course.title}</h4>
                            <p className="text-xs text-slate-700 mt-1 line-clamp-1">{course.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-medium">{course.category}</span>
                              <span className="text-xs text-slate-600">{course.instructor}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      onClick={() => {
                        if (searchQuery.trim()) {
                          navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
                        } else {
                          navigate('/courses');
                        }
                        setShowSuggestions(false);
                      }}
                      className="px-4 py-3 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors border-t border-blue-200 rounded-b-xl"
                    >
                      <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm">
                        <Search size={16} />
                        <span>View all results for "{searchQuery}"</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link
                  to="/login"
                  className="px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-xl hover:scale-105 text-center text-base sm:text-lg md:text-xl"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/courses"
                  className="px-8 sm:px-12 py-4 sm:py-6 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 text-center text-base sm:text-lg md:text-xl"
                >
                  Browse Courses
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Conditional Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative mt-8 lg:mt-0"
            >
              {loading ? (
                // Loading state
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                    <div className="animate-pulse space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-16 bg-gray-200 rounded"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ) : isAuthenticated && userData ? (
                // Authenticated user dashboard
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                    <div className="space-y-4">
                      {/* Dashboard Header */}
                      <div className="flex items-center justify-between border-b pb-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-800">Welcome back, {userData.name}!</h3>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      
                      {/* Dashboard Content */}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                          <div className="text-xl sm:text-2xl font-bold text-blue-600">{userData.activeCourses}</div>
                          <div className="text-xs sm:text-sm text-slate-700">Active Courses</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                          <div className="text-xl sm:text-2xl font-bold text-green-700">{userData.progress}%</div>
                          <div className="text-xs sm:text-sm text-slate-700">Overall Progress</div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-slate-700 truncate pr-2">{userData.currentCourse}</span>
                          <span className="text-slate-700 whitespace-nowrap">{userData.currentProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div 
                            className="bg-blue-700 h-2 rounded-full transition-all duration-500" 
                            style={{width: `${userData.currentProgress}%`}}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Recent Activity */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm sm:text-base text-slate-900">Recent Activity</h4>
                        <div className="space-y-1 text-xs sm:text-sm text-slate-700">
                          {userData.recentActivity.map((activity, index) => (
                            <div key={index} className="truncate">
                              {activity.type === 'completed' && '✓ Completed: '}
                              {activity.type === 'started' && '→ Started: '}
                              {activity.type === 'scheduled' && '📅 Next: '}
                              {activity.course}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Non-authenticated user - platform preview
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                    <div className="space-y-4 sm:space-y-6">
                      {/* Platform Features Preview */}
                      <div className="text-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">What You'll Get</h3>
                        <p className="text-sm sm:text-base text-slate-600">Join thousands of learners already on their journey</p>
                      </div>
                      
                      {/* Feature Icons */}
                      <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                          </div>
                          <div className="text-xs sm:text-sm font-medium text-slate-800">Expert Courses</div>
                          <div className="text-xs text-slate-700">Learn from industry professionals</div>
                        </div>
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                          </div>
                          <div className="text-xs sm:text-sm font-medium text-slate-900">Live Tutoring</div>
                          <div className="text-xs text-slate-700">1-on-1 sessions with tutors</div>
                        </div>
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-700" />
                          </div>
                          <div className="text-xs sm:text-sm font-medium text-slate-900">Certificates</div>
                          <div className="text-xs text-slate-700">Earn recognized credentials</div>
                        </div>
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-700" />
                          </div>
                          <div className="text-xs sm:text-sm font-medium text-slate-900">Track Progress</div>
                          <div className="text-xs text-slate-700">Monitor your learning journey</div>
                        </div>
                      </div>
                      
                      {/* Stats Preview */}
                      <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                          <div>
                            <div className="text-base sm:text-lg font-bold text-slate-900">10K+</div>
                            <div className="text-xs text-slate-700">Students</div>
                          </div>
                          <div>
                            <div className="text-base sm:text-lg font-bold text-slate-900">500+</div>
                            <div className="text-xs text-slate-700">Courses</div>
                          </div>
                          <div>
                            <div className="text-base sm:text-lg font-bold text-slate-900">4.9★</div>
                            <div className="text-xs text-slate-700">Rating</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

       {/* ---------------- FEATURES SECTION ---------------- */}
       <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-blue-100 via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <FadeInWhenVisible>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 transition-all duration-300 hover:scale-105 cursor-default">Why LearnOne?</h2>
            <p className="text-slate-700 mt-3 text-base sm:text-lg">
              Real tutors. Real results. Learn at your own pace, anywhere.
            </p>
          </FadeInWhenVisible>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { icon: "🎯", title: "Live Tutoring" },
              { icon: "👩‍🏫", title: "Expert-Led Courses" },
              { icon: "💼", title: "Career-Focused Skills" },
              { icon: "📚", title: "Personalized Learning" },
              { icon: "⏰", title: "Learn Anytime, Anywhere" },
              { icon: "🌐", title: "Join a Global Community" },
            ].map((f, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.2}>
                <motion.div
                  whileHover={{ y: -14, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="feature-card p-4 sm:p-6 rounded-xl"
                >
                  <div className="text-3xl sm:text-4xl icon-container w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">{f.icon}</div>
                  <h3 className="mt-2 sm:mt-3 text-base sm:text-lg text-slate-900">{f.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    LearnOne brings students and tutors together for live, focused
                    learning sessions designed around your goals.
                  </p>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

       {/* ---------------- HOW IT WORKS ---------------- */}

       <section className="bg-gradient-to-b from-white via-blue-50 to-blue-100 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <FadeInWhenVisible>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 transition-all duration-300 hover:scale-105 cursor-default">How It Works</h2>
          </FadeInWhenVisible>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                desc: "Create your free account in seconds and set your learning goals.",
              },
              {
                step: "2",
                title: "Find a Tutor",
                desc: "Browse qualified tutors and subjects that fit your needs.",
              },
              {
                step: "3",
                title: "Learn Live",
                desc: "Join interactive sessions and track progress over time.",
              },
            ].map((s, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.2}>
                  <motion.div
                    whileHover={{ y: -14, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="warm-card p-4 sm:p-6 rounded-xl"
                  >
                  <div className="text-3xl sm:text-4xl font-bold step-number w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">{s.step}</div>
                  <h3 className="mt-2 sm:mt-3 text-base sm:text-lg">{s.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

       {/* ---------------- POPULAR COURSES ---------------- */}
       <section id="courses" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-blue-100 via-white to-blue-50">
        <FadeInWhenVisible>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col items-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 transition-all duration-300 hover:scale-105 cursor-default">Popular Courses</h2>
            </div>

            {filteredCourses.length === 0 ? (
              <p className="text-center text-slate-500">
                No courses match your search.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredCourses.map((course, i) => (
                    <FadeInWhenVisible key={course.id} delay={i * 0.15}>
                      <motion.div
                        whileHover={{ y: -14, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                        className="course-card rounded-xl overflow-hidden h-full flex flex-col"
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          loading="lazy"
                          className="w-full h-32 sm:h-44 object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="p-3 sm:p-4 lg:p-6 flex flex-col flex-grow">
                          <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 lg:mb-4">
                            {course.title}
                          </h3>
                          <div className="mt-auto">
                            <Link
                              to={`/course/${course.id}`}
                              className="w-full block text-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md enroll-btn"
                            >
                              Enroll Now
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </FadeInWhenVisible>
                  ))}
                </div>

                {/* single View All CTA at bottom of section */}
                <div className="mt-8 flex justify-center">
                  <Link
                    to="/courses"
                     className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md font-semibold shadow transform transition duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-lg active:scale-95 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    aria-label="View all courses"
                    aria-pressed="false"
                  >
                    View All Courses
                  </Link>
                </div>
              </>
            )}
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <FadeInWhenVisible>
         <section id="testimonials" className="bg-gradient-to-b from-blue-50 via-blue-100 to-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-800 transition-all duration-300 hover:scale-105 cursor-default">What Students Say</h2>

            {/* Testimonials Carousel */}
            <div className="mt-10 overflow-hidden">
              <motion.div 
                className="flex gap-4 sm:gap-6 lg:gap-8"
                animate={{ x: `calc(-${currentIndex * (100 / itemsPerView)}%)` }}
                transition={{ 
                  type: "tween", 
                  ease: "easeInOut",
                  duration: 0.6
                }}
              >
                {[
                  {
                    name: "Sarah M.",
                    avatar: "/avatars/sarah.jpg",
                    text: "LearnOne helped me ace my SATs with personalized sessions. Highly recommend!",
                  },
                  {
                    name: "David R.",
                    avatar: "/avatars/david.jpg",
                    text: "The tutors are excellent — they really know how to make tough topics simple.",
                  },
                  {
                    name: "Priya K.",
                    avatar: "/avatars/priya.jpg",
                    text: "Affordable, convenient, and interactive! My go-to for live learning.",
                  },
                  {
                    name: "James W.",
                    avatar: "/avatars/james.jpg",
                    text: "The best investment I've made in my education. Quality is outstanding!",
                  },
                  {
                    name: "Maria G.",
                    avatar: "/avatars/maria.jpg",
                    text: "Flexible schedule and amazing tutors. Learning has never been this enjoyable!",
                  },
                  {
                    name: "Alex T.",
                    avatar: "/avatars/alex.jpg",
                    text: "Perfect platform for students who want to excel. Highly satisfied!",
                  },
                  ].map((t, i) => (
                  <div key={i} className="min-w-full sm:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.33rem)] flex-shrink-0">
                    <motion.div 
                      whileHover={{ y: -12, scale: 1.02 }} 
                      transition={{ type: 'spring', stiffness: 260, damping: 22 }} 
                      className="testimonial-card p-4 sm:p-6 rounded-xl h-full"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <img
                          src={t.avatar}
                          alt={`${t.name} avatar`}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover bg-gray-200 flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="text-left">
                          <h4 className="font-semibold text-sm sm:text-base text-slate-900">{t.name}</h4>
                          <p className="italic mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">"{t.text}"</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-1.5 mt-6">
              {Array.from({ length: Math.max(1, 7 - itemsPerView + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1 h-1 rounded-full transition-all duration-200 border-0 p-0 shadow-none hover:shadow-none ${
                    currentIndex === index 
                      ? 'bg-blue-600' 
                      : 'bg-blue-300 hover:bg-blue-400'
                  }`}
                  style={{
                    borderRadius: '50%',
                    minWidth: '4px',
                    minHeight: '4px',
                    width: '4px',
                    height: '4px'
                  }}
                />
              ))}
            </div>

            {/* Metrics row */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="warm-card px-4 sm:px-6 py-3 sm:py-4 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-white">1,000+</div>
                <div className="text-xs sm:text-sm text-white">learners</div>
              </div>
              <div className="warm-card px-4 sm:px-6 py-3 sm:py-4 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-white">4.9/5</div>
                <div className="text-xs sm:text-sm text-white">average rating</div>
              </div>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

       {/* ---------------- CALL TO ACTION ---------------- */}
       <FadeInWhenVisible>
         <section className="py-12 sm:py-16 md:py-20 text-center bg-gradient-to-b from-white via-blue-50 to-blue-100">
          <div className="max-w-3xl mx-auto bg-white border-4 border-blue-500 text-blue-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md mx-4 sm:mx-auto">
            {/* Background decoration with depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-blue-200/30 rounded-2xl sm:rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-300/30 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-blue-400/30 rounded-full translate-y-10 -translate-x-10 sm:translate-y-12 sm:-translate-x-12"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-blue-800">
                Ready to Learn as One?
              </h3>
              <p className="mt-3 sm:mt-4 text-blue-600 text-base sm:text-lg mb-6 sm:mb-8">
                Join thousands of learners improving their skills every day.
              </p>
              <Link
                to="/login"
                className="inline-block px-8 sm:px-12 md:px-14 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800 text-base sm:text-lg md:text-xl"
              >
                Join LearnOne for Free!
              </Link>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

        {/* ---------------- FOOTER ---------------- */}
       <footer className="bg-gradient-to-b from-blue-500 via-blue-700 via-blue-50 to-blue-700 text-white py-8 sm:py-10 md:py-12 border-t-2 border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h5 className="text-white font-semibold mb-3">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:underline">About Us</a></li>
                <li><a href="/careers" className="hover:underline">Careers</a></li>
                <li><a href="/blog" className="hover:underline">Blog</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/courses" className="hover:underline">Courses</a></li>
                <li><a href="/pricing" className="hover:underline">Pricing</a></li>
                <li><a href="/login" className="hover:underline">LogIn</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/faqs" className="hover:underline">FAQs</a></li>
                <li><a href="/terms" className="hover:underline">Terms & Policy</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
                <li><a href="/refund" className="hover:underline">Refund Policy</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3">Connect</h5>
              <p className="text-sm">support@learnone.example</p>
              <div className="mt-4 flex items-center gap-3">
                <a href="#" className="p-2 bg-blue-700 rounded-full hover:bg-blue-600 transition-colors">Twitter</a>
                <a href="#" className="p-2 bg-blue-700 rounded-full hover:bg-blue-600 transition-colors">LinkedIn</a>
                <a href="#" className="p-2 bg-blue-700 rounded-full hover:bg-blue-600 transition-colors">YouTube</a>
              </div>
            </div>
          </div>

           <div className="mt-6 sm:mt-8 border-t border-blue-300 pt-4 sm:pt-6 text-xs sm:text-sm text-white flex flex-col md:flex-row items-center justify-between gap-3">
            <div>© {new Date().getFullYear()} LearnOne. All rights reserved.</div>
            <div>Made with ♥ for learners.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
