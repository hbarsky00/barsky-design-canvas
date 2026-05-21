import React, { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";
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

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const shouldAutoFocus = location.pathname === "/contact";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: values });
      if (error) throw error;
      toast({
        title: "Thanks for reaching out!",
        description: "Your message has been received. I'll get back to you soon.",
        duration: 5000,
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Get in touch</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Ready to start your project? Let's discuss your needs.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    rows={5}
                    placeholder="Tell me a bit about your project..."
                    className="w-full px-3.5 py-3 rounded-lg border border-border bg-white text-foreground text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-primary-foreground text-sm font-semibold shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send message"}
            <Send size={16} />
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
