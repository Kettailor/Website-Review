"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

function Copy({ vi, en }: { vi: string; en: string }) {
  return (
    <>
      <span className="i18n i18n-vi">{vi}</span>
      <span className="i18n i18n-en">{en}</span>
    </>
  );
}

function getLanguage() {
  if (typeof document === "undefined") {
    return "vi";
  }

  return document.documentElement.dataset.lang === "en" ? "en" : "vi";
}

export function NewsletterForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const language = getLanguage();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      interest: String(formData.get("interest") ?? "checklist"),
      language
    };

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { message?: string; messageEn?: string };

      if (!response.ok) {
        throw new Error(
          language === "en"
            ? result.messageEn ?? "Unable to submit right now."
            : result.message ?? "Không thể gửi thông tin lúc này."
        );
      }

      setState("success");
      setMessage(
        language === "en"
          ? result.messageEn ?? "Your request has been recorded."
          : result.message ?? "Đã ghi nhận yêu cầu tư vấn của bạn."
      );
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : language === "en"
            ? "Something went wrong. Please try again later."
            : "Có lỗi xảy ra, vui lòng thử lại sau."
      );
    }
  }

  return (
    <form className="newsletter-form reveal" onSubmit={handleSubmit}>
      <label>
        <Copy vi="Họ và tên" en="Full name" />
        <input name="name" type="text" placeholder="Nguyễn Minh Anh" autoComplete="name" />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          placeholder="ban@example.com"
          autoComplete="email"
          required
        />
      </label>
      <label>
        <Copy vi="Bạn cần gì?" en="What do you need?" />
        <select name="interest" defaultValue="checklist">
          <option value="checklist">Checklist / Pre-buy checklist</option>
          <option value="compare">So sánh / Compare models</option>
          <option value="setup">Tư vấn cát & vị trí / Setup advice</option>
        </select>
      </label>
      <button className="button button-primary form-button" type="submit" disabled={state === "loading"}>
        {state === "loading" ? (
          <Copy vi="Đang gửi..." en="Sending..." />
        ) : (
          <Copy vi="Gửi yêu cầu" en="Send request" />
        )}
        <span aria-hidden="true">-&gt;</span>
      </button>
      <p className={`form-message ${state}`} role="status" aria-live="polite">
        {message || (
          <Copy
            vi="Thông tin chỉ dùng để gửi checklist và tư vấn liên quan UBPet C41."
            en="Your details are used only for UBPet C41 checklist and advice."
          />
        )}
      </p>
    </form>
  );
}
