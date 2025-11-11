"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SpotlightCard from "../components/SpotlightCard.jsx";
import BlurText from "@/components/BlurText";
import { motion } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    product: "",
    message: "",
  });

  const handleAnimationComplete = () => console.log("Animation completed!");

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f0fdf4] via-white to-[#ecfeff] text-gray-900 relative overflow-x-hidden">
        {/* Floating background gradients */}
        <div className="absolute top-[-200px] left-[-150px] w-[400px] h-[400px] bg-green-500/20 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-[-200px] right-[-150px] w-[400px] h-[400px] bg-green-300/20 blur-[120px] rounded-full -z-10"></div>

        {/* Navbar */}
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
          <Navbar />
        </div>

        <main className="flex-grow pt-[100px]">
          {/* HERO SECTION */}
          <section className="relative flex justify-center items-center pt-16 pb-16 px-4 sm:pb-28">
            <SpotlightCard className="w-full max-w-5xl p-12 sm:p-16 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-lg transition hover:scale-[1.01]">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0A0F2C] mb-6 leading-tight text-center whitespace-nowrap"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <BlurText
                  text="Let’s Connect with CompareFi"
                  delay={80}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                />
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Have a question, partnership idea, or want to collaborate?
                <br /> We’re always excited to hear from you.
              </motion.p>
            </SpotlightCard>
          </section>

          {/* CONTACT SECTION */}
          <section className="py-16 sm:py-24 relative px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start"
            >
              {/* Contact Info */}
              <section className="w-full flex justify-center items-center">
                <div className="w-full max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/30 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 sm:p-14 flex flex-col space-y-8 hover:shadow-green-200 transition-all duration-700"
                  >
                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0F2C] text-center">
                      Get in Touch
                    </h2>

                    {/* Subtext */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 text-center leading-relaxed">
                      Reach out to our team for any inquiries, collaborations, or product details.
                      We typically respond within 24 hours.
                    </p>

                    {/* Contact Cards */}
                    <div className="space-y-4">
                      {[
                        {
                          icon: <Mail className="text-green-500 w-6 h-6" />,
                          text: "comparefi@gmail.com",
                        },
                        {
                          icon: <Phone className="text-green-500 w-6 h-6" />,
                          text: "+91 99999 99999",
                        },
                        {
                          icon: <MapPin className="text-green-500 w-6 h-6" />,
                          text: "123, Mumbai, India",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl shadow-md p-4 hover:shadow-green-300 transition-all duration-500"
                        >
                          {item.icon}
                          <span className="text-[#0A0F2C] font-medium">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Contact Form */}
              <SpotlightCard className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-green-100 transition hover:shadow-green-200 hover:scale-[1.01] w-full">
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#10B981] mb-6">
                  Send Us a Message
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const subject = encodeURIComponent(
                      `Enquiry from ${formData.name}`
                    );
                    const body = encodeURIComponent(
                      `Hello CompareFi Team,%0D%0A%0D%0A` +
                        `I would like to enquire about: ${formData.product}%0D%0A%0D%0A` +
                        `Message:%0D%0A${formData.message}%0D%0A%0D%0A` +
                        `Contact Details:%0D%0A` +
                        `Name: ${formData.name}%0D%0A` +
                        `Email: ${formData.email}%0D%0A` +
                        `Mobile: ${formData.mobile}`
                    );
                    const mailtoLink = `mailto:comparefi@gmail.com?subject=${subject}&body=${body}`;
                    window.location.href = mailtoLink;
                  }}
                  className="flex flex-col gap-4 sm:gap-6 text-[#047857]"
                >
                  {["name", "mobile", "email"].map((field) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={
                        field === "name"
                          ? "Your Name"
                          : field === "mobile"
                          ? "Mobile Number"
                          : "Email Address"
                      }
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="w-full p-4 rounded-xl border border-green-400/40 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-gray-800 transition"
                      required
                    />
                  ))}

                  <select
                    name="product"
                    value={formData.product}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="w-full p-4 rounded-xl border border-green-400/40 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 transition"
                    required
                  >
                    <option value="">Select Product to Enquire</option>
                    <option value="Loan Against Shares (LAS)">
                      Loan Against Shares (LAS)
                    </option>
                    <option value="Loan Against Mutual Funds (LAMF)">
                      Loan Against Mutual Funds (LAMF)
                    </option>
                    <option value="Margin Trading Facility (MTF)">
                      Margin Trading Facility (MTF)
                    </option>
                  </select>

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="w-full p-4 rounded-xl border border-green-400/40 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-gray-800 transition resize-none h-40"
                    required
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-[#10B981] to-[#047857] text-white rounded-2xl px-6 py-4 text-lg shadow-md transition hover:scale-105 hover:shadow-green-400/50"
                  >
                    Send Message
                  </Button>
                </form>
              </SpotlightCard>
            </motion.div>
          </section>

          {/* MAP SECTION */}
          <section className="py-16 sm:py-24 px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-6xl mx-auto text-center mb-8 sm:mb-10"
            >
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#0A0F2C] mb-4">
                Visit Our Office
              </h2>
              <p className="text-base sm:text-lg md:text-lg text-gray-600">
                Drop by for a cup of coffee or schedule a consultation — we’d
                love to meet you in person.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <SpotlightCard className="relative w-full max-w-6xl rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl p-6 overflow-hidden border border-green-100">
                <iframe
                  title="Our Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019221819469!2d-122.42067928468116!3d37.77928077975716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c2fbd6c3b%3A0x5d53b45c4ed3b0!2sCity%20Hall%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sin!4v1697750000000!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  className="rounded-3xl border-0"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </SpotlightCard>
            </motion.div>
          </section>
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </TooltipProvider>
  );
}
