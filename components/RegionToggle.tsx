"use client";

interface RegionToggleProps {
  region: "global" | "uae";
  onChange: (region: "global" | "uae") => void;
}

export default function RegionToggle({ region, onChange }: RegionToggleProps) {
  return (
    <div className="flex justify-center">
      <div className="flex space-x-2 bg-slate-900/40 backdrop-blur-sm rounded-lg p-1 border border-slate-700/30">
        <button
          onClick={() => onChange("global")}
          className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
            region === "global"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          🌍 Global
        </button>
        <button
          onClick={() => onChange("uae")}
          className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
            region === "uae"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          🇦🇪 UAE
        </button>
      </div>
    </div>
  );
}
