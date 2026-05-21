import React, { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "@/components/shared/SectionHeader";
import { useLocation } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  subject: z.string().min(3, {
    message: "Subject must be at least 3 characters."
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters."
  })
});
type ContactFormValues = z.infer<typeof contactFormSchema>;
const ContactForm: React.FC = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const shouldAutoFocus = location.pathname === '/contact';
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('send-contact-email', {
        body: values
      });
      if (error) throw error;
      toast({
        title: "Thanks for reaching out!",
        description: "Your message has been received. I'll get back to you soon.",
        duration: 5000
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="contact" className="flex flex-col justify-center py-2 bg-muted/30 relative scroll-mt-20">
      <div className="bg-white mx-0 px-[10px] py-[10px]">
        <SectionHeader as="h2" title="Get In Touch" subtitle="Ready to start your project? Let's discuss your needs." subtitleClassName="text-sm md:text-base" className="mb-3" titleClassName="text-2xl md:text-3xl" />

        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="dark:bg-gray-800 rounded-lg space-y-3">
              <FormField control={form.control} name="name" render={({
              field
            }) => <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-barsky-dark dark:text-white">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} autoFocus={shouldAutoFocus} className="w-full px-3 py-2 h-9 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="email" render={({
              field
            }) => <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-barsky-dark dark:text-white">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" type="email" {...field} className="w-full px-3 py-2 h-9 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="subject" render={({
              field
            }) => <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-barsky-dark dark:text-white">Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject of your message" {...field} className="w-full px-3 py-2 h-9 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="message" render={({
              field
            }) => <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-barsky-dark dark:text-white">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message..." rows={3} {...field} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <Button type="submit" variant="outline" size="sm" className="flex items-center gap-2 h-9 px-4" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>;
};
export default ContactForm;