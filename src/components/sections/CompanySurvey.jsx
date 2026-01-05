import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CompanySurvey({ isOpen, onClose, isFullPage = false }) {
  const [formData, setFormData] = useState({
    companySize: "",
    industry: "",
    websiteType: "",
    budget: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tutaj później dodasz logikę wysyłania formularza
    alert("Dziękujemy! Skontaktujemy się wkrótce.");
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // If full page mode, render without modal
  if (isFullPage) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Form content will be here */}
          <div className="space-y-6">
            {/* Company Size */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-3">
                Wielkość firmy
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["1-10 pracowników", "11-50 pracowników", "51-200 pracowników", "200+ pracowników"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleChange("companySize", size)}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all duration-300 text-left",
                      formData.companySize === size
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/10 bg-neutral-900/50 text-neutral-300 hover:border-primary/50"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-3">
                Branża
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                className="w-full p-4 rounded-lg border-2 border-white/10 bg-neutral-900/50 text-white focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Wybierz branżę</option>
                <option value="e-commerce">E-commerce</option>
                <option value="uslugi">Usługi</option>
                <option value="produkcja">Produkcja</option>
                <option value="technologia">Technologia</option>
                <option value="inne">Inne</option>
              </select>
            </div>

            {/* Website Type */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-3">
                Typ strony
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["Wizytówka", "Landing Page", "Sklep Online", "Blog/Portfolio"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange("websiteType", type)}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all duration-300 text-left",
                      formData.websiteType === type
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/10 bg-neutral-900/50 text-neutral-300 hover:border-primary/50"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-3">
                Budżet
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["< 2000 zł", "2000-5000 zł", "5000-10000 zł", "> 10000 zł"].map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => handleChange("budget", budget)}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all duration-300 text-left",
                      formData.budget === budget
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-white/10 bg-neutral-900/50 text-neutral-300 hover:border-primary/50"
                    )}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              variant="primary"
              className="px-8 py-4 text-lg"
            >
              Wyślij zapytanie
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
      title="Ankieta o Firmie - Darmowa Wycena"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rozmiar Firmy */}
        <div>
          <label className="block text-sm font-semibold text-white mb-3 font-sans">
            Rozmiar firmy <span className="text-primary">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["Mała (1-10 osób)", "Średnia (11-50 osób)", "Duża (50+ osób)"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleChange("companySize", size)}
                className={cn(
                  "px-4 py-3 rounded-xl border-2 transition-all duration-300 font-sans",
                  formData.companySize === size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/10 bg-neutral-800/50 text-neutral-300 hover:border-white/20 hover:bg-neutral-800"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Branża */}
        <div>
          <label className="block text-sm font-semibold text-white mb-3 font-sans">
            Branża <span className="text-primary">*</span>
          </label>
          <select
            value={formData.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-xl border-2 bg-neutral-800/50 text-white font-sans",
              "border-white/10 focus:border-primary focus:outline-none transition-colors",
              "hover:border-white/20"
            )}
            required
          >
            <option value="">Wybierz branżę</option>
            <option value="medycyna-estetyczna">Medycyna Estetyczna</option>
            <option value="gastronomia">Gastronomia</option>
            <option value="uslugi-lokalne">Usługi Lokalne</option>
            <option value="e-commerce">E-commerce</option>
            <option value="edukacja">Edukacja</option>
            <option value="biznes-przemysl">Biznes / Przemysł</option>
            <option value="inna">Inna</option>
          </select>
        </div>

        {/* Typ Strony */}
        <div>
          <label className="block text-sm font-semibold text-white mb-3 font-sans">
            Typ strony internetowej <span className="text-primary">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Wizytówka",
              "Sklep Online",
              "Blog",
              "Strona Firmowa",
            ].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange("websiteType", type)}
                className={cn(
                  "px-4 py-3 rounded-xl border-2 transition-all duration-300 font-sans",
                  formData.websiteType === type
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/10 bg-neutral-800/50 text-neutral-300 hover:border-white/20 hover:bg-neutral-800"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Budżet */}
        <div>
          <label className="block text-sm font-semibold text-white mb-3 font-sans">
            Planowany budżet <span className="text-primary">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Do 5 000 zł",
              "5 000 - 10 000 zł",
              "10 000 - 20 000 zł",
              "20 000+ zł",
            ].map((budget) => (
              <button
                key={budget}
                type="button"
                onClick={() => handleChange("budget", budget)}
                className={cn(
                  "px-4 py-3 rounded-xl border-2 transition-all duration-300 font-sans",
                  formData.budget === budget
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/10 bg-neutral-800/50 text-neutral-300 hover:border-white/20 hover:bg-neutral-800"
                )}
              >
                {budget}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex gap-4">
          <Button
            type="submit"
            variant="primary"
            className="flex-1 text-lg py-4"
            disabled={!formData.companySize || !formData.industry || !formData.websiteType || !formData.budget}
          >
            Wyślij Ankietę
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

