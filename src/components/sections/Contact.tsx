"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { Github, Linkedin, Mail, MessageCircle, FileText, ArrowUpRight } from "lucide-react";
import SplitLines from "@/components/motion/SplitLines";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { ABTestTracker } from "@/app/tracking/ABTestTracker";

const channels = [
  { key: "email", href: "mailto:andre@andrebordignon.dev", Icon: Mail, value: "andre@andrebordignon.dev" },
  {
    key: "whatsapp",
    href: "https://wa.me/5545998253744?text=Ol%C3%A1%2C%20Andr%C3%A9!%20Gostaria%20de%20conversar%20sobre%20um%20projeto.",
    Icon: MessageCircle,
    value: "+55 45 99825-3744",
  },
  { key: "github", href: "https://github.com/AndreBordignon", Icon: Github, value: "AndreBordignon" },
  { key: "linkedin", href: "https://linkedin.com/in/andrebordignon/", Icon: Linkedin, value: "andrebordignon" },
  { key: "substack", href: "https://andrebordignon.substack.com/", Icon: FileText, value: "andrebordignon" },
] as const;

const inputClass =
  "w-full border-b border-[color:var(--line-strong)] bg-transparent px-0 py-3.5 text-bone placeholder-muted/60 outline-none transition-colors focus:border-ember";

export default function Contact() {
  const t = useTranslations();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Sem sitekey o widget do reCAPTCHA lança e derruba a página inteira.
  // Sem chave: nada de captcha, formulário continua utilizável.
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const captchaEnabled = Boolean(RECAPTCHA_SITE_KEY);

  const [variant, setVariant] = useState("A");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(!captchaEnabled);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("ab-test-variant="))
      ?.split("=")[1];
    setVariant(cookie || "A");
  }, []);

  const YOUR_EMAIL = process.env.NEXT_PUBLIC_EMAILJS_SEND_EMAIL;
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch("/api", {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        setIsVerified(true);
      }
    } catch (error) {
      console.error("Erro ao verificar o reCAPTCHA:", error);
      setIsVerified(false);
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({ type: "error", message: t("contact.form.errors.fillAll") });
      setIsSubmitting(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormStatus({ type: "error", message: t("contact.form.errors.invalidEmail") });
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: YOUR_EMAIL,
        },
        EMAILJS_PUBLIC_KEY,
      );

      setFormStatus({ type: "success", message: t("contact.form.success") });
      setFormData({ name: "", email: "", subject: "", message: "" });
      if (captchaEnabled) {
        recaptchaRef.current?.reset();
        setIsVerified(false);
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setFormStatus({ type: "error", message: t("contact.form.errors.sendError") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contato"
      className="relative overflow-hidden border-t border-[color:var(--line)] bg-ink py-28 md:py-40"
    >
      <ABTestTracker variant={variant} />

      {/* Brasa que restou da cena de abertura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(70%_100%_at_50%_120%,rgba(249,115,22,0.2),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[92rem] px-6 md:px-10">
        <span className="type-label">{t("contactSection.index")}</span>

        <SplitLines as="h2" className="type-display mt-10 text-balance" type="words">
          {t("contactSection.title")}
        </SplitLines>

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-14">
          {/* Canais */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="type-lead max-w-md text-muted text-balance">
                {t("contactSection.description")}
              </p>
            </Reveal>

            <Reveal className="mt-12 flex flex-col" stagger>
              {channels.map(({ key, href, Icon, value }) => (
                <a
                  key={key}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 border-t border-[color:var(--line)] py-5 last:border-b"
                >
                  <span className="flex items-center gap-4">
                    <Icon size={18} className="text-ember" aria-hidden />
                    <span className="text-base font-medium text-bone transition-colors group-hover:text-ember">
                      {t(`contact.${key}`)}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="hidden font-mono text-xs text-muted sm:block">{value}</span>
                    <ArrowUpRight
                      size={16}
                      className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
                    />
                  </span>
                </a>
              ))}
            </Reveal>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h3 className="type-label mb-8">{t("contact.sendMessage")}</h3>

              {formStatus.message && (
                <div
                  role="status"
                  className={`mb-8 border-l-2 py-3 pl-4 text-sm ${
                    formStatus.type === "success"
                      ? "border-ember text-ember-soft"
                      : "border-red-500 text-red-300"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="type-label">
                      {t("contact.form.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.namePlaceholder")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="type-label">
                      {t("contact.form.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.emailPlaceholder")}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="type-label">
                    {t("contact.form.subject")}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={t("contact.form.subjectPlaceholder")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="type-label">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("contact.form.messagePlaceholder")}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  {captchaEnabled ? (
                    <div className="origin-left scale-90 sm:scale-100">
                      <ReCAPTCHA
                        theme="dark"
                        sitekey={RECAPTCHA_SITE_KEY!}
                        ref={recaptchaRef}
                        onChange={handleCaptchaSubmission}
                        onExpired={() => setIsVerified(false)}
                      />
                    </div>
                  ) : (
                    <span />
                  )}

                  <Magnetic>
                    <button
                      type="submit"
                      disabled={!isVerified || isSubmitting}
                      className="rounded-full bg-bone px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ember disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
                    </button>
                  </Magnetic>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
