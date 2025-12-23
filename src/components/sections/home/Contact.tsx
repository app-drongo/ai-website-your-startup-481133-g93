'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { useState } from 'react';

const DEFAULT_CONTACT = {
  sectionTitle: 'Get in Touch',
  sectionSubtitle: 'Ready to transform your ideas into reality? Let\'s start the conversation.',
  description: 'Whether you have questions about our platform, need technical support, or want to discuss a custom solution, our team is here to help.',
  contactInfo: [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@yourstartup.com',
      href: 'mailto:hello@yourstartup.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Office',
      value: 'San Francisco, CA',
      href: '#'
    }
  ],
  formFields: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'company', label: 'Company', type: 'text', required: false },
    { name: 'message', label: 'Message', type: 'textarea', required: true }
  ],
  submitText: 'Send Message',
  successMessage: 'Thank you for your message! We\'ll get back to you within 24 hours.'
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };
  const { handleSubmit, isSubmitting, isSuccess, message } = useFormSubmit();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(e);
    if (isSuccess) {
      setFormData({ name: '', email: '', company: '', message: '' });
    }
  };

  return (
    <section id="contact" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="sectionTitle">{config.sectionTitle}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {config.contactInfo.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">
                          <span data-editable={`contactInfo[${idx}].label`}>{item.label}</span>
                        </p>
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          data-editable-href={`contactInfo[${idx}].href`}
                          data-href={item.href}
                        >
                          <span data-editable={`contactInfo[${idx}].value`}>{item.value}</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Info */}
            <Card className="bg-muted/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">24/7 Technical Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Fast Response Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Expert Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Custom Solutions</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} data-form-id="contact" className="space-y-6">
                {config.formFields.map((field, idx) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium mb-2">
                      <span data-editable={`formFields[${idx}].label`}>{field.label}</span>
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        required={field.required}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        className="min-h-[120px]"
                        disabled={isSubmitting}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        required={field.required}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        disabled={isSubmitting}
                      />
                    )}
                  </div>
                ))}

                {/* Form Status */}
                {message && (
                  <div className={`p-4 rounded-lg ${
                    isSuccess 
                      ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                      : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                  }`}>
                    {message}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      <span data-editable="submitText">{config.submitText}</span>
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}