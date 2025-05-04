import React, { useState } from "react";
import { Send, Mail, MapPin, Phone, Linkedin, Github } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Form,
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(3, {
    message: "Subject must be at least 3 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: values,
      });
      
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
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="section-container">
        <h2 className="section-title text-center mb-16">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-barsky-dark dark:text-white">Contact Information</h3>
            <p className="text-barsky-text dark:text-gray-300 mb-8">
              Have a project in mind or want to discuss a collaboration? Feel free to reach out — 
              I'm always open to new opportunities and challenges.
            </p>
            
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Mail className="w-5 h-5 text-barsky-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-barsky-dark dark:text-white">Email</h4>
                  <a href="mailto:hbarsky01@gmail.com" className="text-barsky-text dark:text-gray-300 hover:text-barsky-blue transition-colors">
                    hbarsky01@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <MapPin className="w-5 h-5 text-barsky-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-barsky-dark dark:text-white">Location</h4>
                  <p className="text-barsky-text dark:text-gray-300">New York, NY</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Phone className="w-5 h-5 text-barsky-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-barsky-dark dark:text-white">Phone</h4>
                  <a href="tel:2016684754" className="text-barsky-text dark:text-gray-300 hover:text-barsky-blue transition-colors">
                    (201) 668-4754
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium text-barsky-dark dark:text-white mb-4">Connect on Social</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/hiram-barsky" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-barsky-blue/10 p-3 rounded-full hover:bg-barsky-blue hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://github.com/hbarsky00/barsky-design-canvas.git" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-barsky-blue/10 p-3 rounded-full hover:bg-barsky-blue hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-barsky-bg-light dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-barsky-dark dark:text-white">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field} 
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-barsky-blue focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-barsky-dark dark:text-white">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          type="email" 
                          {...field} 
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-barsky-blue focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-barsky-dark dark:text-white">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Subject of your message" 
                          {...field} 
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-barsky-blue focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-barsky-dark dark:text-white">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message..." 
                          rows={5}
                          {...field}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-barsky-blue focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <button 
                  type="submit" 
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send size={18} />
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
