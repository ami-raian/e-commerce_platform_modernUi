"use client";

import { useState } from "react";
import { Tag, Check, X } from "lucide-react";
import { mockPromoCodes } from "@/lib/mock-promos";
import { usePromoStore } from "@/lib/promo-store";

interface PromoInputProps {
  onApply?: () => void;
}

export function PromoInput({ onApply }: PromoInputProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const appliedCode = usePromoStore((state) => state.appliedCode);
  const setPromoCode = usePromoStore((state) => state.setPromoCode);
  const removePromoCode = usePromoStore((state) => state.removePromoCode);

  const handleApply = () => {
    setError("");
    setSuccess(false);

    if (!code.trim()) {
      setError("Please enter a promo code");
      return;
    }

    const promo = mockPromoCodes.find(
      (p) => p.code.toUpperCase() === code.toUpperCase()
    );

    if (!promo) {
      setError("Invalid promo code");
      return;
    }

    if (new Date() > promo.expiresAt) {
      setError("This promo code has expired");
      return;
    }

    if (promo.maxUses && promo.usedCount >= promo.maxUses) {
      setError("This promo code has reached its usage limit");
      return;
    }

    setPromoCode(promo.code, promo.discount, promo.discountType);
    setSuccess(true);
    setCode("");
    onApply?.();

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Tag size={20} className="text-primary" />
        <h3 className="font-semibold">Promo Code</h3>
      </div>

      {appliedCode ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-success rounded-lg mb-4">
          <div className="flex items-center gap-2">
            <Check size={18} className="text-success" />
            <span className="text-sm font-medium">
              Code applied: {appliedCode}
            </span>
          </div>
          <button
            onClick={() => removePromoCode()}
            className="p-1 hover:bg-white rounded transition-colors"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter promo code"
              onKeyPress={(e) => e.key === "Enter" && handleApply()}
              className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
            >
              Apply
            </button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && (
            <p className="text-sm text-success">
              Promo code applied successfully!
            </p>
          )}
        </>
      )}
    </div>
  );
}
