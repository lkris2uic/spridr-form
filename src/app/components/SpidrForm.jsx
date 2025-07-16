"use client"
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SpidrForm() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles = [];
    let mouse = { x: null, y: null };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = 1;
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#666";
        ctx.fill();
      }
    }

    function connectParticles() {
      if (mouse.x === null || mouse.y === null) return;
      for (let i = 0; i < particles.length; i++) {
        // Only consider particles near the mouse
        const dxm = particles[i].x - mouse.x;
        const dym = particles[i].y - mouse.y;
        const distm = Math.sqrt(dxm * dxm + dym * dym);
        if (distm < 150) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              // Only draw if both are near mouse
              const dxmj = particles[j].x - mouse.x;
              const dymj = particles[j].y - mouse.y;
              const distmj = Math.sqrt(dxmj * dxmj + dymj * dymj);
              if (distmj < 150) {
                ctx.beginPath();
                ctx.strokeStyle = "rgba(255,255,255,0.2)";
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
              }
            }
          }
        }
      }
    }

    function animate() {
      // Fill with blank grey
      ctx.fillStyle = "#222";
      ctx.fillRect(0, 0, width, height);
      for (let p of particles) {
        p.move();
        p.draw();
      }
      connectParticles();
      requestAnimationFrame(animate);
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    initParticles();
    animate();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    guess: "",
    spidrPin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "spidrPin") {
      formattedValue = value.replace(/[^0-9]/g, "").slice(0, 16);
      formattedValue = formattedValue.replace(/(.{4})/g, "$1-").slice(0, 19);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-neutral-950 px-4 py-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      ></canvas>
      <div className="relative z-10">
        <Card className="w-[500px] bg-neutral-900 border border-neutral-800 text-white">
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-neutral-400">First Name</label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-neutral-800 border border-neutral-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400">Last Name</label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-neutral-800 border border-neutral-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400">Phone Number</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  className="bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400">Email Address</label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="bg-neutral-800 border border-neutral-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400">Guess the Air Fryer's Cost ($)</label>
                <Input
                  name="guess"
                  value={formData.guess}
                  onChange={handleChange}
                  type="number"
                  className="bg-neutral-800 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400">Very, Very Secret 16-Digit Spidr PIN</label>
                <Input
                  name="spidrPin"
                  value={formData.spidrPin}
                  onChange={handleChange}
                  placeholder="####-####-####-####"
                  className="bg-neutral-800 border border-neutral-700 text-white tracking-widest"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-neutral-300 font-semibold"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
