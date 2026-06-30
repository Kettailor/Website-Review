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
      interest: String(formData.get("interest") ?? "launch")
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
        throw new Error(result.message ?? "Không thể gửi đăng ký lúc này.");
      }

      setState("success");
      setMessage(result.message ?? "Đã ghi nhận đăng ký của bạn.");
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
        <input name="name" type="text" placeholder="Nguyen Minh Anh" autoComplete="name" />
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
        Nhu cầu quan tâm
        <select name="interest" defaultValue="launch">
          <option value="launch">Nhận tin mở bán</option>
          <option value="demo">Đăng ký demo doanh nghiệp</option>
          <option value="integration">Tư vấn tích hợp dữ liệu</option>
        </select>
      </label>
      <button className="button button-primary form-button" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Đang gửi..." : "Gửi đăng ký"}
        <span aria-hidden="true">-&gt;</span>
      </button>
      <p className={`form-message ${state}`} role="status" aria-live="polite">
        {message || "Thông tin chỉ dùng để gửi cập nhật về NovaSync One."}
      </p>
    </form>
  );
}
