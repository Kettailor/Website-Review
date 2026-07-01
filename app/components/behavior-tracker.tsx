"use client";

import { useEffect, useRef } from "react";
import { useApp } from "./providers";

export function BehaviorTracker() {
  const { lang, addToast } = useApp();
  const trackedScrollMilestones = useRef<Record<number, boolean>>({
    25: false,
    50: false,
    75: false,
    100: false
  });
  const trackedSessionMilestones = useRef<Record<number, boolean>>({
    30: false,
    60: false
  });

  // Track event sender
  const trackEvent = async (action: string, label: string, metadata?: Record<string, any>) => {
    // Show Toast
    const toastMsg = lang === "vi" 
      ? `Hành vi: ${action} - ${label}`
      : `Behavior: ${action} - ${label}`;
    addToast(toastMsg, "behavior", 3000);

    // Call API
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          label,
          metadata: {
            ...metadata,
            url: window.location.href,
            timestamp: new Date().toISOString()
          }
        })
      });
    } catch (e) {
      console.warn("Tracking request failed", e);
    }
  };

  useEffect(() => {
    // 1. Scroll tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;

      const scrollPercentage = Math.round((scrollTop / docHeight) * 100);

      // Check milestones
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercentage >= milestone && !trackedScrollMilestones.current[milestone]) {
          trackedScrollMilestones.current[milestone] = true;
          const labelVi = `Cuộn đạt ${milestone}% trang`;
          const labelEn = `Scrolled to ${milestone}%`;
          trackEvent("scroll", lang === "vi" ? labelVi : labelEn, { milestone });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // 2. Session time tracking
    const startTime = Date.now();
    const timer30 = setTimeout(() => {
      if (!trackedSessionMilestones.current[30]) {
        trackedSessionMilestones.current[30] = true;
        trackEvent("session", lang === "vi" ? "Thời gian xem trang 30s" : "Session duration 30s", { duration: 30 });
      }
    }, 30000);

    const timer60 = setTimeout(() => {
      if (!trackedSessionMilestones.current[60]) {
        trackedSessionMilestones.current[60] = true;
        trackEvent("session", lang === "vi" ? "Thời gian xem trang 60s" : "Session duration 60s", { duration: 60 });
      }
    }, 60000);

    // 3. Click event tracking using event delegation
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for buttons, links, or specific tracked classes
      const clickableElement = target.closest("a, button, [data-track-click]");
      if (!clickableElement) return;

      const action = "click";
      let label = clickableElement.textContent?.trim() || clickableElement.getAttribute("aria-label") || "unlabeled";
      
      // Clean up text label
      if (label.length > 50) label = label.substring(0, 47) + "...";
      
      const trackId = clickableElement.id || clickableElement.getAttribute("data-track-click") || "";
      const href = clickableElement.getAttribute("href") || "";

      // Exclude toast close buttons and chatbot input area clicks
      if (
        clickableElement.classList.contains("toast-close") || 
        clickableElement.closest(".chatbot-window") ||
        clickableElement.closest(".site-controls")
      ) {
        return;
      }

      trackEvent(action, label, { trackId, href });
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer30);
      clearTimeout(timer60);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [lang]);

  return null; // Silent component
}
