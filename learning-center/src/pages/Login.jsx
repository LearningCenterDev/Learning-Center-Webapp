import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-blue-25 to-blue-100 text-slate-800 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Login Page</h1>
        <p className="text-slate-600 mb-8">Coming soon...</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

