'use client';

import { useState } from 'react';
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Book, 
  Video, 
  FileText,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from '@/components/ui/label';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: "How do I create a new meeting?",
      answer: "To create a new meeting, click the '+' button in the sidebar or navigate to the dashboard and click 'New Meeting'. Fill in the meeting details including title, date, time, and participants, then click 'Create Meeting'."
    },
    {
      question: "Can I record meetings?",
      answer: "Yes! During a meeting, click the 'Record' button in the meeting controls. The recording will be saved automatically and accessible in your meeting history. You can also download recordings for offline access."
    },
    {
      question: "How do I share meeting notes?",
      answer: "After a meeting, go to the meeting details page and click 'Share'. You can share via email, generate a shareable link, or export as PDF. You can also set permissions for who can view or edit the notes."
    },
    {
      question: "What AI features are available?",
      answer: "NeuroNote offers AI-powered meeting summaries, action item extraction, automatic transcription, sentiment analysis, and a meeting assistant chatbot that can answer questions about your meetings."
    },
    {
      question: "How do I integrate with Google Calendar?",
      answer: "Go to Settings > Integrations and click 'Connect Google Calendar'. Authorize the connection and your meetings will automatically sync with your calendar."
    },
    {
      question: "Can I export my meeting data?",
      answer: "Yes, you can export individual meetings as PDF, Word documents, or CSV files. Go to the meeting page and click 'Export' to choose your preferred format."
    },
    {
      question: "How does the search function work?",
      answer: "Use the search bar in the navigation to search across all your meetings. You can search by meeting name, date range, or attendee email. Advanced filters are available via the filter icon."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! We use end-to-end encryption for all meeting data, implement regular security audits, and comply with GDPR and SOC 2 standards. Your data is stored securely and never shared with third parties."
    }
  ];

  const resources = [
    {
      icon: Book,
      title: "Documentation",
      description: "Comprehensive guides and API references",
      link: "/docs"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      link: "/tutorials"
    },
    {
      icon: FileText,
      title: "Blog & Updates",
      description: "Latest features and best practices",
      link: "/blog"
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for contacting us! We\'ll get back to you within 24 hours.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              How can we help you?
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Search our knowledge base or get in touch with our support team
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base bg-card border-border"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <resource.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {resource.title}
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{resource.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Frequently Asked Questions
            </h2>
            
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-border rounded-lg px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-medium text-foreground">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No FAQs match your search. Try different keywords or contact support.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Support */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Contact Support
                </CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Send us a message.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="How can we help?"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Describe your issue..."
                      required
                      rows={4}
                      className="mt-1 resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>

                {/* Alternative Contact Methods */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <h4 className="font-semibold text-sm text-foreground">Other ways to reach us:</h4>
                  
                  <a 
                    href="mailto:support@neuronote.com"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    support@neuronote.com
                  </a>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    Live Chat (Mon-Fri, 9AM-5PM)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Support Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                  <span className="font-semibold text-primary">2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                  <span className="font-semibold text-primary">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Support Availability</span>
                  <span className="font-semibold text-green-600">24/7</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}