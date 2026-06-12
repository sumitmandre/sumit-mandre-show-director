import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const STORAGE_KEY = "sm-portfolio-access";
const PASSWORD = "sumitm";

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [granted, setGranted] = useState<boolean | null>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setGranted(sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setGranted(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  if (granted === null) return null;
  if (granted) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm text-center"
      >
        <div className="mx-auto w-14 h-14 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center mb-6">
          <Lock size={20} className="text-primary" />
        </div>
        <p className="text-primary font-display text-[10px] tracking-[0.5em] uppercase">
          Sumit Mandre
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight mt-2">
          Private Portfolio
        </h1>
        <p className="text-muted-foreground text-sm mt-3 mb-8">
          Enter password to continue
        </p>
        <motion.input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Password"
          animate={error ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className={`w-full px-4 py-3 bg-secondary/60 border ${
            error ? "border-destructive" : "border-border"
          } rounded-md text-foreground text-center tracking-[0.3em] font-display focus:outline-none focus:border-primary transition-colors`}
        />
        <button
          type="submit"
          className="mt-4 w-full py-3 rounded-md bg-primary text-primary-foreground font-display text-sm tracking-wide hover:bg-primary/90 transition-colors"
        >
          Enter
        </button>
      </motion.form>
    </div>
  );
};

export default PasswordGate;
