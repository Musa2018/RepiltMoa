import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(9, {
    message: "Please enter a valid phone number.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  department: z.enum(['general', 'technical', 'services', 'media']),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      department: "general",
    },
  });

  function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      
      toast({
        title: language === 'ar' ? 'تم الإرسال بنجاح' : 'Submitted Successfully',
        description: language === 'ar' 
          ? 'شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.'
          : 'Thank you for contacting us. We will get back to you as soon as possible.',
        variant: 'default',
      });
      
      form.reset();
    }, 1500);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
        <h1 className="text-3xl font-bold text-primary mb-2">
          {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
        </h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'نحن هنا للإجابة على استفساراتك وتقديم المساعدة. يمكنك التواصل معنا من خلال النموذج أدناه أو باستخدام معلومات الاتصال المباشرة.'
            : 'We are here to answer your inquiries and provide assistance. You can reach us through the form below or using the direct contact information.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className={`text-xl font-semibold text-primary mb-6 ${isRTL ? 'text-right' : ''}`}>
                {language === 'ar' ? 'نموذج الاتصال' : 'Contact Form'}
              </h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? 'الموضوع' : 'Subject'}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'ar' ? 'أدخل موضوع الرسالة' : 'Enter message subject'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          {language === 'ar' ? 'القسم المختص' : 'Department'}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse">
                              <FormControl>
                                <RadioGroupItem value="general" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {language === 'ar' ? 'الاستعلامات العامة' : 'General Inquiries'}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse">
                              <FormControl>
                                <RadioGroupItem value="technical" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {language === 'ar' ? 'الدعم الفني' : 'Technical Support'}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse">
                              <FormControl>
                                <RadioGroupItem value="services" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {language === 'ar' ? 'خدمات المزارعين' : 'Farmer Services'}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse">
                              <FormControl>
                                <RadioGroupItem value="media" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {language === 'ar' ? 'العلاقات العامة والإعلام' : 'Media & Public Relations'}
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'ar' ? 'الرسالة' : 'Message'}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner animate-spin mr-2"></i>
                        {language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
                      </>
                    ) : (
                      language === 'ar' ? 'إرسال الرسالة' : 'Send Message'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact Information */}
        <div className="md:col-span-1">
          <div className={`bg-white rounded-lg shadow-sm p-6 mb-6 ${isRTL ? 'text-right' : ''}`}>
            <h2 className="text-xl font-semibold text-primary mb-6">
              {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
            </h2>
            
            <div className="space-y-5">
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`bg-primary/10 p-3 rounded-full ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">
                    {language === 'ar' ? 'العنوان' : 'Address'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? 'مبنى وزارة الزراعة، الطابق الثالث، البيرة، رام الله، فلسطين'
                      : '3rd Floor, Agricultural Building, Al-Bireh, Ramallah, Palestine'}
                  </p>
                </div>
              </div>
              
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`bg-primary/10 p-3 rounded-full ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <i className="fas fa-phone-alt text-primary"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">
                    {language === 'ar' ? 'الهاتف' : 'Phone'}
                  </h3>
                  <p className="text-gray-600">+970 2 240 6340</p>
                  <p className="text-gray-600">+970 2 240 6341</p>
                </div>
              </div>
              
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`bg-primary/10 p-3 rounded-full ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </h3>
                  <p className="text-gray-600">info@moa.gov.ps</p>
                  <p className="text-gray-600">support@moa.gov.ps</p>
                </div>
              </div>
              
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`bg-primary/10 p-3 rounded-full ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <i className="fas fa-clock text-primary"></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">
                    {language === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? 'الأحد - الخميس: 8:00 صباحًا - 3:00 مساءً'
                      : 'Sunday - Thursday: 8:00 AM - 3:00 PM'}
                  </p>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? 'الجمعة - السبت: مغلق'
                      : 'Friday - Saturday: Closed'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium text-gray-700 mb-3">
                {language === 'ar' ? 'تابعنا على' : 'Follow Us On'}
              </h3>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className={`font-medium text-primary mb-3 ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' ? 'موقعنا' : 'Our Location'}
            </h3>
            <div className="bg-gray-300 h-48 rounded-md flex items-center justify-center">
              <p className="text-gray-600">
                {language === 'ar' ? 'خريطة تفاعلية' : 'Interactive Map'}
              </p>
            </div>
            <p className={`text-sm text-gray-500 mt-2 ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' 
                ? 'مبنى وزارة الزراعة، بالقرب من دوار المنارة، البيرة، رام الله'
                : 'Ministry of Agriculture Building, near Al-Manara Square, Al-Bireh, Ramallah'}
            </p>
          </div>
        </div>
      </div>
      
      {/* FAQs Section */}
      <div className={`mt-12 ${isRTL ? 'text-right' : ''}`}>
        <h2 className="text-2xl font-semibold text-primary mb-6">
          {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-lg text-primary mb-3">
              {language === 'ar' 
                ? 'كيف يمكنني التقدم بطلب للحصول على ترخيص زراعي؟'
                : 'How can I apply for an agricultural license?'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'يمكنك التقدم بطلب للحصول على ترخيص زراعي من خلال زيارة أقرب مديرية زراعة أو من خلال بوابة الخدمات الإلكترونية على موقعنا. تحتاج إلى تقديم المستندات المطلوبة والتي تختلف حسب نوع الترخيص المطلوب.'
                : 'You can apply for an agricultural license by visiting the nearest agricultural directorate or through the e-services portal on our website. You need to submit the required documents, which vary depending on the type of license required.'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-lg text-primary mb-3">
              {language === 'ar' 
                ? 'ما هي الوثائق المطلوبة للحصول على دعم للمشاريع الزراعية؟'
                : 'What documents are required to obtain support for agricultural projects?'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'تختلف المستندات المطلوبة حسب نوع المشروع وبرنامج الدعم. بشكل عام، ستحتاج إلى إثبات ملكية الأرض أو عقد إيجار، وخطة عمل للمشروع، وتقدير التكاليف، والتصاريح اللازمة من الجهات المختصة.'
                : 'The required documents vary depending on the type of project and support program. Generally, you will need proof of land ownership or a lease contract, a business plan for the project, cost estimation, and necessary permits from the relevant authorities.'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-lg text-primary mb-3">
              {language === 'ar' 
                ? 'كيف يمكنني الحصول على استشارة زراعية؟'
                : 'How can I get agricultural consultation?'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'يمكنك الحصول على استشارة زراعية من خلال التواصل مع المرشدين الزراعيين في المديريات الزراعية المختلفة، أو من خلال خدمة الاستشارات الهاتفية على الرقم المخصص، أو عبر نموذج الاستشارات في موقعنا الإلكتروني.'
                : 'You can get agricultural consultation by contacting the agricultural extension officers in the various agricultural directorates, through the telephone consultation service on the dedicated number, or via the consultation form on our website.'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-lg text-primary mb-3">
              {language === 'ar' 
                ? 'ما هي خدمات الوقاية من الآفات التي تقدمها الوزارة؟'
                : 'What pest control services does the ministry provide?'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'تقدم الوزارة خدمات تشخيص الآفات والأمراض النباتية، وتوفير الإرشادات للوقاية والمكافحة، وتنفيذ حملات مكافحة جماعية للآفات الرئيسية، وتوفير بعض المبيدات المدعومة للآفات الاستراتيجية، وتدريب المزارعين على أساليب المكافحة المتكاملة للآفات.'
                : 'The ministry provides services for diagnosing pests and plant diseases, providing guidelines for prevention and control, implementing collective campaigns against major pests, providing some subsidized pesticides for strategic pests, and training farmers on integrated pest management methods.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
