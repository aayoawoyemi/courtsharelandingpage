"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  // Fixed counter without auto-incrementing
  const signupCount = 31;
  const totalSpots = 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    // Create form data for Netlify
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Submit the form data to Netlify
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
    })
      .then(() => {
        console.log("Form successfully submitted to Netlify");
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        alert("There was an error submitting the form. Please try again.");
      });
  };

  return (
    <div className="w-full max-w-sm mx-auto font-sans">
      <form
        name="waitlist"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="w-full"
        aria-label="Join waitlist"
      >
        {/* Required hidden fields for Netlify forms */}
        <input type="hidden" name="form-name" value="waitlist" />
        
        {/* Honeypot field to prevent spam */}
        <p className="hidden">
          <label>
            Don{"'"}t fill this out if you{"'"}re human: <input name="bot-field" />
          </label>
        </p>

        {/* Accessible header (visually hidden because the main headline is already outside) */}
        <h3 className="sr-only">Become a Founding Trader</h3>

        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 mb-4 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-transparent text-sm sm:text-base"
        />
        <button
          type="submit"
          className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-[#00b3b0] text-white hover:bg-[#00d5d1] hover:shadow-xl hover:shadow-[#00b3b0]/20 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 font-bold text-base sm:text-lg disabled:opacity-50 disabled:pointer-events-none mb-3 sm:mb-4"
          disabled={submitted}
        >
          {submitted ? "✓ Access Requested" : "Request Early Access"}
        </button>
      </form>

      {/* Live Tracker - Grouped in center */}
      <div className="mt-2 sm:mt-4 flex items-center justify-center gap-x-2 sm:gap-x-4 text-xs sm:text-sm text-text-secondary">
        <div className="flex items-center gap-x-1 sm:gap-x-2">
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#00b3b0] animate-pulse"></span>
          <span>Real-Time Signups</span>
        </div>

        <span>{signupCount}/{totalSpots} traders confirmed</span>
      </div>
    </div>
  );
} 