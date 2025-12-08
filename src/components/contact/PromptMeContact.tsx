import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Mail, MessageSquare, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const PromptMeContact: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  
  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('leads').insert({
        name: values.name,
        email: values.email,
        project_description: values.message,
        lead_source: 'prompt-me-contact',
        lead_status: 'new',
      });
      
      if (error) throw error;
      
      setIsSubmitted(true);
      toast({
        title: 'Prompt received!',
        description: "I'll get back to you soon.",
      });
      
      form.reset();
      setTimeout(() => {
        setIsSubmitted(false);
        setIsExpanded(false);
      }, 3000);
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 0%, hsl(var(--neon-cyan) / 0.05) 0%, transparent 50%),
          linear-gradient(180deg, hsl(var(--terminal-bg)) 0%, hsl(220 25% 6%) 100%)
        `
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Prompt Me
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind? Let's build something great together.
          </p>
        </motion.div>
        
        {/* Chat-style input container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div 
            className="rounded-2xl bg-terminal-surface/80 border border-terminal-border-dim/30 
                       backdrop-blur-sm overflow-hidden transition-all duration-300
                       hover:border-neon-cyan/30"
            style={{
              boxShadow: '0 0 40px hsl(var(--neon-cyan) / 0.05)',
            }}
          >
            {/* AI avatar indicator */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-terminal-border-dim/20">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 
                              flex items-center justify-center border border-neon-cyan/30">
                <Sparkles className="h-4 w-4 text-neon-cyan" />
              </div>
              <span className="text-sm text-muted-foreground font-mono">hiram.ai</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs text-muted-foreground/60">Online</span>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-8 text-center"
                    >
                      <div className="h-16 w-16 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-neon-green" />
                      </div>
                      <p className="text-lg text-foreground font-medium">Prompt received!</p>
                      <p className="text-sm text-muted-foreground mt-1">I'll respond soon.</p>
                    </motion.div>
                  ) : !isExpanded ? (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-5"
                    >
                      <div 
                        className="flex items-center gap-3 cursor-text"
                        onClick={() => setIsExpanded(true)}
                      >
                        <Input
                          placeholder="How can I help you scale your product?"
                          className="flex-1 bg-chat-input-bg border-terminal-border-dim/30 text-foreground 
                                     placeholder:text-muted-foreground/50 focus:border-neon-cyan/50 
                                     focus:ring-neon-cyan/20 h-12 rounded-xl font-mono"
                          onFocus={() => setIsExpanded(true)}
                          readOnly
                        />
                        <Button
                          type="button"
                          onClick={() => setIsExpanded(true)}
                          className="h-12 px-6 bg-gradient-to-r from-neon-cyan to-neon-purple 
                                     hover:from-neon-cyan-glow hover:to-neon-purple-glow 
                                     text-terminal-bg font-semibold rounded-xl"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Prompt
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-5 space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                                  <Input
                                    placeholder="Your name"
                                    className="pl-10 bg-chat-input-bg border-terminal-border-dim/30 
                                               focus:border-neon-cyan/50 h-11 rounded-lg"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                                  <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="pl-10 bg-chat-input-bg border-terminal-border-dim/30 
                                               focus:border-neon-cyan/50 h-11 rounded-lg"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50" />
                                <Textarea
                                  placeholder="How can I help you scale your product?"
                                  className="pl-10 bg-chat-input-bg border-terminal-border-dim/30 
                                             focus:border-neon-cyan/50 min-h-[100px] rounded-lg resize-none"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setIsExpanded(false)}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Cancel
                        </button>
                        
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-11 px-6 bg-gradient-to-r from-neon-cyan to-neon-purple 
                                     hover:from-neon-cyan-glow hover:to-neon-purple-glow 
                                     text-terminal-bg font-semibold rounded-xl disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <div className="h-4 w-4 border-2 border-terminal-bg/30 border-t-terminal-bg rounded-full animate-spin" />
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4" />
                              Send Prompt
                            </span>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromptMeContact;
