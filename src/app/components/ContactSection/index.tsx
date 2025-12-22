"use client";

import { useState, useRef } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactSection() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const YOUR_EMAIL = process.env.NEXT_PUBLIC_EMAILJS_SEND_EMAIL;
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch("/api", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setIsVerified(true);
      }
    } catch (error: any) {
      console.error("Erro ao verificar o reCAPTCHA:", error);
      setIsVerified(false);
    }
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setFormStatus({
        type: "error",
        message: t("contact.form.errors.fillAll"),
      });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: "error",
        message: t("contact.form.errors.invalidEmail"),
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: YOUR_EMAIL,
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email enviado com sucesso!", response.status, response.text);

      setFormStatus({
        type: "success",
        message: t("contact.form.success"),
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setFormStatus({
        type: "error",
        message: t("contact.form.errors.sendError"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl font-medium mb-4 text-[#f97316]">
            {t("contact.title")}
          </h2>
          <p className="text-[#a8a29e] text-sm leading-relaxed max-w-[50%]">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Info */}
          <div className="space-y-6">
            <div className="bg-[#292524] rounded-lg p-6 border border-[#44403c] hover:border-[#f97316] transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#f97316]/10 rounded-md border border-[#f97316]/20">
                  <Mail className="text-[#f97316]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-[#e7e5e4]">
                    {t("contact.email")}
                  </h3>
                  <a
                    href="mailto:andre@andrebordignon.dev"
                    className="text-[#a8a29e] hover:text-[#f97316] transition-colors"
                  >
                    andre@andrebordignon.dev
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#292524] rounded-lg p-6 border border-[#44403c] hover:border-[#f97316] transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#f97316]/10 rounded-md border border-[#f97316]/20">
                  <Github className="text-[#f97316]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-[#e7e5e4]">
                    {t("contact.github")}
                  </h3>
                  <a
                    href="https://github.com/AndreBordignon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a8a29e] hover:text-[#f97316] transition-colors"
                  >
                    github.com/AndreBordignon
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#292524] rounded-lg p-6 border border-[#44403c] hover:border-[#f97316] transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#f97316]/10 rounded-md border border-[#f97316]/20">
                  <Linkedin className="text-[#f97316]" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-[#e7e5e4]">
                    {t("contact.linkedin")}
                  </h3>
                  <a
                    href="https://linkedin.com/in/andrebordignon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a8a29e] hover:text-[#f97316] transition-colors"
                  >
                    linkedin.com/in/andrebordignon/
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-[#292524] rounded-lg p-4 sm:p-6 lg:p-8 border border-[#44403c] overflow-x-hidden">
            <h3 className="text-2xl font-medium mb-6 text-[#e7e5e4]">
              {t("contact.sendMessage")}
            </h3>
            {formStatus.message && (
              <div
                className={`mb-6 p-4 rounded-md border ${
                  formStatus.type === "success"
                    ? "bg-[#ea580c]/20 border-[#f97316] text-[#fdba74]"
                    : "bg-[#ea580c]/20 border-[#f97316] text-[#fdba74]"
                }`}
              >
                {formStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#e7e5e4]">
                    {t("contact.form.name")}
                  </label>
                  <input
                    value={formData.name}
                    name="name"
                    onChange={handleInputChange}
                    type="text"
                    className="w-full px-4 py-3 bg-[#1c1917] border border-[#44403c] rounded-md focus:ring-2 focus:ring-[#f97316] focus:border-[#f97316] text-[#e7e5e4] placeholder-[#78716c]"
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#e7e5e4]">
                    {t("contact.form.email")}
                  </label>
                  <input
                    value={formData.email}
                    name="email"
                    onChange={handleInputChange}
                    type="email"
                    className="w-full px-4 py-3 bg-[#1c1917] border border-[#44403c] rounded-md focus:ring-2 focus:ring-[#f97316] focus:border-[#f97316] text-[#e7e5e4] placeholder-[#78716c]"
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#e7e5e4]">
                  {t("contact.form.subject")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#1c1917] border border-[#44403c] rounded-md focus:ring-2 focus:ring-[#f97316] focus:border-[#f97316] text-[#e7e5e4] placeholder-[#78716c]"
                  placeholder={t("contact.form.subjectPlaceholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#e7e5e4]">
                  {t("contact.form.message")}
                </label>
                <textarea
                  value={formData.message}
                  rows={5}
                  name="message"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#1c1917] border border-[#44403c] rounded-md focus:ring-2 focus:ring-[#f97316] focus:border-[#f97316] text-[#e7e5e4] placeholder-[#78716c] resize-none"
                  placeholder={t("contact.form.messagePlaceholder")}
                ></textarea>
              </div>
              <div className="text-center">
                <div className="flex justify-center overflow-x-auto">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    ref={recaptchaRef}
                    onChange={(token) => handleCaptchaSubmission(token)}
                    onExpired={() => setIsVerified(false)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isVerified}
                  onClick={(e) => handleSubmit(e)}
                  className="w-full cursor-pointer px-8 py-3 mt-6 bg-[#f97316] rounded-md hover:bg-[#ea580c] transition-all duration-200 font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? t("contact.form.sending")
                    : t("contact.form.send")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

