import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactInput = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const payload = parsed.data as ContactInput & { name: string; email: string; message: string };
    const { error } = await supabase.from("contact_messages").insert([payload]);
    setLoading(false);
    if (error) {
      toast.error("Couldn't send message. Try again.");
      return;
    }
    toast.success("Message sent — I'll get back to you soon 🌿");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
          maxLength={100}
          className="w-full rounded-lg bg-card/70 border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          placeholder="Email"
          maxLength={255}
          className="w-full rounded-lg bg-card/70 border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>
      <textarea
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="What are you building?"
        rows={4}
        maxLength={2000}
        className="w-full rounded-lg bg-card/70 border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-forest text-primary-foreground font-medium px-4 py-2.5 text-sm shadow-glow hover:opacity-95 transition-opacity disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {loading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
