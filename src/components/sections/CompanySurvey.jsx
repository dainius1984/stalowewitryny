import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Web3Forms Access Key - Zastąp tym swoim kluczem z web3forms.com
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "84088c99-554e-4733-bf89-ffde9a2691b5";

export function CompanySurvey({ isOpen, onClose, isFullPage = false }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Nowe zapytanie o wycenę strony - Stalowe Witryny",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setFormData({
            name: "",
            email: "",
            message: "",
          });
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Błąd wysyłania formularza:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // If full page mode, render without modal
  if (isFullPage) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 pb-12">
        <form onSubmit={handleSubmit} className="space-y-8" action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input type="hidden" name="subject" value="Nowe zapytanie o wycenę strony - Stalowe Witryny" />
          
          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 text-center">
              Dziękujemy! Twoje zapytanie zostało wysłane. Skontaktujemy się wkrótce.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-center">
              Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie później.
            </div>
          )}

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-3">
                Imię i nazwisko <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="w-full p-4 rounded-lg border-2 border-white/10 bg-neutral-900/50 text-white focus:border-primary focus:outline-none transition-colors"
                placeholder="Jan Kowalski"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-3">
                Email <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="w-full p-4 rounded-lg border-2 border-white/10 bg-neutral-900/50 text-white focus:border-primary focus:outline-none transition-colors"
                placeholder="jan@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-3">
                Wiadomość <span className="text-primary">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                rows={6}
                className="w-full p-4 rounded-lg border-2 border-white/10 bg-neutral-900/50 text-white focus:border-primary focus:outline-none transition-colors resize-none"
                placeholder="Opisz swoje potrzeby lub zadaj pytania..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              variant="primary"
              className="px-8 py-4 text-lg"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
            >
              {isSubmitting ? "Wysyłanie..." : "Wyślij zapytanie"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Kontakt - Darmowa Wycena"
    >
      <form onSubmit={handleSubmit} className="space-y-6" action="https://api.web3forms.com/submit" method="POST">
        <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
        <input type="hidden" name="subject" value="Nowe zapytanie o wycenę strony - Stalowe Witryny" />
        
        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 text-center text-sm">
            Dziękujemy! Twoje zapytanie zostało wysłane. Skontaktujemy się wkrótce.
          </div>
        )}
        {submitStatus === "error" && (
          <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-center text-sm">
            Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie później.
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-white mb-3 font-sans">
            Imię i nazwisko <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            className={cn(
              "w-full px-4 py-3 rounded-xl border-2 bg-neutral-800/50 text-white font-sans",
              "border-white/10 focus:border-primary focus:outline-none transition-colors",
              "hover:border-white/20"
            )}
            placeholder="Jan Kowalski"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-white mb-3 font-sans">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            className={cn(
              "w-full px-4 py-3 rounded-xl border-2 bg-neutral-800/50 text-white font-sans",
              "border-white/10 focus:border-primary focus:outline-none transition-colors",
              "hover:border-white/20"
            )}
            placeholder="jan@example.com"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-white mb-3 font-sans">
            Wiadomość <span className="text-primary">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            required
            rows={5}
            className={cn(
              "w-full px-4 py-3 rounded-xl border-2 bg-neutral-800/50 text-white font-sans resize-none",
              "border-white/10 focus:border-primary focus:outline-none transition-colors",
              "hover:border-white/20"
            )}
            placeholder="Opisz swoje potrzeby lub zadaj pytania..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex gap-4">
          <Button
            type="submit"
            variant="primary"
            className="flex-1 text-lg py-4"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
          >
            {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-6"
          >
            Anuluj
          </Button>
        </div>
      </form>
    </Modal>
  );
}
