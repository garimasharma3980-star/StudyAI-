"use client";

import { useState } from "react";

const features = [
  ["01", "AI Study Plans", "Tell us your subjects and exam date. Get a realistic day-by-day plan."],
  ["02", "Instant Explanations", "Turn difficult topics into simple, step-by-step lessons."],
  ["03", "Smart Quizzes", "Generate practice questions and identify your weak areas."],
  ["04", "Revision Engine", "Keep important topics in a personalized revision queue."]
];

const plans = [
  { name:"Free", price:"₹0", desc:"Start studying with the essentials.", items:["5 AI generations/day","Basic study plans","Topic explanations","10 quiz questions/day"], cta:"Start Free" },
  { name:"Student Pro", price:"₹199", period:"/month", desc:"Your complete AI study companion.", items:["Unlimited study plans","Unlimited explanations","Unlimited quizzes","Weak-topic analytics","Revision engine","Saved study history"], cta:"Upgrade to Pro", featured:true },
  { name:"Exam Pro", price:"₹499", period:"/3 months", desc:"Built for serious exam preparation.", items:["Everything in Student Pro","Mock exams","Advanced progress analytics","Priority AI processing","Exam countdown dashboard"], cta:"Choose Exam Pro" }
];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [selected, setSelected] = useState("Student Pro");

  function demoExplain() {
    if (!topic.trim()) return;
    setResult(`Demo explanation for “${topic}”: First identify the core idea, then break it into smaller concepts, learn one example, and finish with 3 practice questions. Connect your Supabase + AI API to replace this demo with real AI responses.`);
  }

  return (
    <main>
      <nav className="nav">
        <div className="brand"><span className="logo">S</span> StudyAI</div>
        <div className="navlinks">
          <a href="#features">Features</a>
          <a href="#pricing">Premium</a>
          <a href="#security">Security</a>
          <button className="ghost" onClick={() => alert("Connect Supabase Auth to enable real sign-in.")}>Sign in</button>
          <button className="primary" onClick={() => document.getElementById("pricing").scrollIntoView({behavior:"smooth"})}>Get Pro</button>
        </div>
      </nav>

      <section className="hero">
        <div className="heroText">
          <div className="pill">AI-powered • Student-first • Built for exams</div>
          <h1>Study smarter.<br/><span>Not longer.</span></h1>
          <p>One intelligent workspace for study plans, explanations, quizzes, revision and exam preparation.</p>
          <div className="actions">
            <button className="primary big" onClick={() => document.getElementById("demo").scrollIntoView({behavior:"smooth"})}>Try the AI Demo →</button>
            <button className="secondary big" onClick={() => document.getElementById("pricing").scrollIntoView({behavior:"smooth"})}>See Premium</button>
          </div>
          <div className="trust">✓ No credit card for Free &nbsp; ✓ Cancel Pro anytime &nbsp; ✓ Your study data stays private</div>
        </div>
        <div className="dashboardCard">
          <div className="dashTop"><span>Today’s plan</span><b>72% complete</b></div>
          <div className="progress"><i style={{width:"72%"}} /></div>
          {["Mathematics — Relations", "C Programming — Loops", "English — Revision"].map((x,i)=>
            <div className="task" key={x}><span className={i<2 ? "check done":"check"}>{i<2?"✓":""}</span><div><b>{x}</b><small>{i<2?"Completed":"25 min • Priority"}</small></div></div>
          )}
          <div className="aiBox"><b>AI insight</b><br/>You’re strongest in C. Spend your next 30 minutes on Mathematics.</div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="sectionHead"><div className="eyebrow">THE CORE PRODUCT</div><h2>Everything you need to prepare.</h2><p>Start simple, then let the platform become your personal study operating system.</p></div>
        <div className="featureGrid">{features.map(([n,t,d])=><article className="feature" key={n}><div className="num">{n}</div><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section id="demo" className="demo section">
        <div className="sectionHead"><div className="eyebrow">LIVE MVP DEMO</div><h2>Explain any topic simply.</h2><p>This demo works immediately. Connect your server-side AI route for production generation.</p></div>
        <div className="demoBox">
          <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Try: Newton’s laws, binary numbers, photosynthesis..." />
          <button className="primary" onClick={demoExplain}>Explain it</button>
          {result && <div className="result"><b>StudyAI explanation</b><p>{result}</p></div>}
        </div>
      </section>

      <section id="pricing" className="section pricing">
        <div className="sectionHead"><div className="eyebrow">PREMIUM</div><h2>Choose your study level.</h2><p>Keep the free plan useful. Make Pro dramatically better.</p></div>
        <div className="priceGrid">{plans.map(p=><article className={"price "+(p.featured?"featured":"")} key={p.name}>
          {p.featured && <div className="popular">MOST POPULAR</div>}
          <h3>{p.name}</h3><p>{p.desc}</p><div className="priceValue">{p.price}<small>{p.period}</small></div>
          <ul>{p.items.map(x=><li key={x}>✓ {x}</li>)}</ul>
          <button className={p.featured?"primary":"secondary"} onClick={()=>setSelected(p.name)}>{selected===p.name ? "Selected" : p.cta}</button>
        </article>)}</div>
      </section>

      <section id="security" className="security section">
        <div><div className="eyebrow">SECURITY BY DESIGN</div><h2>Built so user data isn't an afterthought.</h2></div>
        <div className="securityGrid">
          <div><b>Authentication</b><p>Supabase Auth with verified email, secure sessions and optional MFA.</p></div>
          <div><b>Database isolation</b><p>Postgres Row Level Security so users can access only their own study data.</p></div>
          <div><b>Secrets</b><p>AI and payment secrets stay server-side in environment variables.</p></div>
          <div><b>Abuse controls</b><p>Rate-limit AI endpoints, validate input, cap request size and log suspicious activity.</p></div>
        </div>
      </section>

      <footer><div className="brand"><span className="logo">S</span> StudyAI</div><p>© 2026 StudyAI. Built for better learning.</p></footer>
    </main>
  );
}