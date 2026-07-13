"use client";

import { FormEvent, useEffect, useId, useState } from "react";

interface ContactEmailButtonProps {
  className?: string;
  children: React.ReactNode;
  source?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactEmailButton({
  className,
  children,
  source = "about-page",
}: ContactEmailButtonProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function closeModal() {
    setOpen(false);
    setStatus("idle");
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      message: String(form.get("message") || "").trim(),
      source,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setStatus("idle");
          setErrorMessage("");
          setOpen(true);
        }}
        className={className}
      >
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/70 px-4 backdrop-blur-sm"
          onClick={closeModal}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="w-full max-w-md border border-neutral-900/10 bg-[#c4bcb2] p-6 shadow-2xl shadow-black/40 md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-neutral-700">
                  Contact
                </p>
                <h2
                  id={titleId}
                  className="mt-2 font-serif text-3xl font-light text-neutral-900"
                >
                  {status === "success" ? "Message sent" : "Send a message"}
                </h2>
                <p id={descId} className="mt-2 text-sm text-neutral-700">
                  {status === "success"
                    ? "Thanks — your inquiry was received. I’ll get back to you soon."
                    : "Fill this out in your browser. Your message is saved securely — no email app needed."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-neutral-600 transition-colors hover:text-neutral-950"
                aria-label="Close contact form"
              >
                ✕
              </button>
            </div>

            {status === "success" ? (
              <div className="mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center bg-neutral-900 px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-[#c4bcb2] transition-colors hover:bg-neutral-800"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <label className="block">
                  <span className="text-[11px] tracking-[0.18em] uppercase text-neutral-600">
                    Name
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    maxLength={120}
                    autoFocus
                    disabled={status === "submitting"}
                    className="mt-2 w-full border border-neutral-900/15 bg-[#ddd6cc] px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-900/40 disabled:opacity-60"
                    placeholder="Your name"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] tracking-[0.18em] uppercase text-neutral-600">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    disabled={status === "submitting"}
                    className="mt-2 w-full border border-neutral-900/15 bg-[#ddd6cc] px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-900/40 disabled:opacity-60"
                    placeholder="you@email.com"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] tracking-[0.18em] uppercase text-neutral-600">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    maxLength={5000}
                    rows={4}
                    disabled={status === "submitting"}
                    className="mt-2 w-full resize-none border border-neutral-900/15 bg-[#ddd6cc] px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-900/40 disabled:opacity-60"
                    placeholder="Tell me about your session or inquiry..."
                  />
                </label>

                {status === "error" && errorMessage && (
                  <p className="text-sm text-red-800" role="alert">
                    {errorMessage}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center bg-neutral-900 px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-[#c4bcb2] transition-colors hover:bg-neutral-800 disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending..." : "Send message"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={status === "submitting"}
                    className="inline-flex items-center border border-neutral-900/25 px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-800 transition-colors hover:border-neutral-900/50 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
