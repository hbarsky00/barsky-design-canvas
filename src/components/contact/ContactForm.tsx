import React, { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});
type ContactFormValues = z.infer<typeof contactFormSchema>;

const fieldClass =
  "w-full h-11 px-3.5 rounded-lg border border-border bg-white text-foreground text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

interface ContactFormProps {
  /**
   * The /contact page lets this component title itself. The homepage section
   * already renders its own "Get in Touch" heading through SectionHeader, and
   * two of them stacked reads as a mistake.
   */
  showHeading?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ showHeading = true }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const shouldAutoFocus = location.pathname === "/contact";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const [fallbackVisible, setFallbackVisible] = useState(false);

  /**
   * Netlify Forms, not a Supabase edge function.
   *
   * The old path died the way free-tier infrastructure dies: the Supabase
   * project paused after ~7 days idle, its subdomain stopped resolving, and
   * every submission failed silently for as long as that lasted. Netlify
   * already serves this site, so its form handler has nothing to wake up.
   *
   * The POST is url-encoded to "/" with a form-name field — that is the shape
   * Netlify's handler expects, and "/" is a real file rather than something the
   * SPA catch-all rewrites.
   */
  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
      .join("&");

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", "bot-field": "", ...values }),
      });
      // fetch only rejects on network failure, so a 404 from a form Netlify
      // never registered would otherwise read as success.
      if (!res.ok) throw new Error(`form POST returned ${res.status}`);

      // Netlify has stored the submission by this point. Fire the notification
      // separately and never let it fail the submit — if the email does not
      // go out, the message is still safe in the Netlify dashboard.
      fetch("/.netlify/functions/notify-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).catch((e) => console.error("notification failed (submission is stored):", e));

      toast({
        title: "Thanks for reaching out!",
        description: "It's in my inbox. I'll come back to you.",
        duration: 5000,
      });
      form.reset();
      setFallbackVisible(false);

      // Land them back on the homepage rather than on a spent form.
      //
      // A toast fired on the page you are already looking at is easy to miss —
      // nothing else on screen changed, so there is no signal the submit did
      // anything. Moving the page is the confirmation. The Toaster is mounted
      // at the app root, so the message travels with them and is still on
      // screen when they arrive, and the route transition already scrolls to
      // the top on a non-POP navigation.
      //
      // Only on success: a failed submit keeps them here, with what they typed
      // still in the fields.
      window.setTimeout(() => navigate("/"), 600);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Never send someone away with nothing. A failed submit has to hand over
      // the direct address, and the message they already typed has to survive —
      // the form is deliberately not reset here so it is still there to copy.
      toast({
        title: "That didn't send — email me directly",
        description: "hbarsky01@gmail.com — your message is still in the form, copy it across.",
        variant: "destructive",
        duration: 15000,
      });
      setFallbackVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full">
      {showHeading && (
        <div className="mb-5">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Get in Touch</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Tell me what you're working on and where it's stuck. Short messages are fine.
          </p>
        </div>
      )}

      <Form {...form}>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Netlify needs the form name in the payload; the honeypot is a
              field a person never sees and a bot fills in. Both are submitted
              by the fetch in onSubmit, so these are here for the no-JS case
              and for parity with the detection stub in index.html. */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-foreground/80 uppercase tracking-wide">
                    Name
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      autoFocus={shouldAutoFocus}
                      placeholder="Your name"
                      className={fieldClass}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-foreground/80 uppercase tracking-wide">
                    Email
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      placeholder="your@email.com"
                      className={fieldClass}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-foreground/80 uppercase tracking-wide">
                  Subject
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    placeholder="What's this about?"
                    className={fieldClass}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-foreground/80 uppercase tracking-wide">
                  Message
                </FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={3}
                    placeholder="Tell me a bit about your project..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-white text-foreground text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send message"}
            <Send size={14} />
          </button>

        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
