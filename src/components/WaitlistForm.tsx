"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
      body: new URLSearchParams(formData as any).toString(),
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
    <form
      name="waitlist"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto font-sans"
    >
      {/* Required hidden fields for Netlify forms */}
      <input type="hidden" name="form-name" value="waitlist" />
      
      {/* Honeypot field to prevent spam */}
      <p className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
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
        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 mb-6 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
      />
      <button
        type="submit"
        className="w-full px-6 py-4 rounded-lg bg-brand-green hover:bg-brand-green hover:shadow-xl hover:shadow-brand-green/40 hover:scale-[1.02] transition-all duration-300 font-bold text-white text-lg shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:pointer-events-none"
        disabled={submitted}
      >
        {submitted ? "✓ Added to Waitlist" : "Join the Closed Beta Cohort"}
      </button>
    </form>
  );
} 