"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      interest: String(formData.get("interest") ?? "checklist")
    };

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Không thể gửi thông tin lúc này.");
      }

      setState("success");
      setMessage(result.message ?? "Đã ghi nhận yêu cầu tư vấn của bạn.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra, vui lòng thử lại sau."
      );
    }
  }

  return (
    <form className="newsletter-form reveal" onSubmit={handleSubmit}>
      <label>
        Họ và tên
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
        Bạn cần gì?
        <select name="interest" defaultValue="checklist">
          <option value="checklist">Nhận checklist trước khi mua</option>
          <option value="compare">So sánh với máy khác</option>
          <option value="setup">Tư vấn đặt máy và loại cát</option>
        </select>
      </label>
      <button className="button button-primary form-button" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Đang gửi..." : "Gửi yêu cầu"}
        <span aria-hidden="true">-&gt;</span>
      </button>
      <p className={`form-message ${state}`} role="status" aria-live="polite">
        {message || "Thông tin chỉ dùng để gửi checklist và tư vấn liên quan UBPet C41."}
      </p>
    </form>
  );
}
