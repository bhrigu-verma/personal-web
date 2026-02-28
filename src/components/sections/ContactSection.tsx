"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, MessageSquare, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-wider mb-2">
            LET&apos;S CONNECT
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Have a project in mind or want to collaborate? Drop me a message!
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6 sm:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-white/50 text-sm">
                      Thank you for reaching out. I&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-1.5">
                        <User size={14} className="inline mr-1" />
                        Name
                      </label>
                      <Input placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-1.5">
                        <Mail size={14} className="inline mr-1" />
                        Email
                      </label>
                      <Input type="email" placeholder="your@email.com" required />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-1.5">
                        <MessageSquare size={14} className="inline mr-1" />
                        Message
                      </label>
                      <Textarea placeholder="Your message..." required />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Send size={16} className="mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
