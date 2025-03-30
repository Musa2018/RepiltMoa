import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { useParams } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function About() {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  const { section = 'overview' } = useParams();
  
  // Default tab value based on the section parameter
  const defaultTab = 
    section === 'vision' ? 'vision' :
    section === 'leadership' ? 'leadership' :
    section === 'plan' ? 'plan' : 'overview';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
        <h1 className="text-3xl font-bold text-primary mb-2">{t('nav.about')}</h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'تعرف على وزارة الزراعة الفلسطينية، رؤيتنا، قيادتنا وخططنا لتطوير القطاع الزراعي في فلسطين.'
            : 'Learn about the Palestinian Ministry of Agriculture, our vision, leadership and plans to develop the agricultural sector in Palestine.'}
        </p>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">{t('nav.about.overview')}</TabsTrigger>
          <TabsTrigger value="vision">{t('nav.about.vision')}</TabsTrigger>
          <TabsTrigger value="leadership">{t('nav.about.leadership')}</TabsTrigger>
          <TabsTrigger value="plan">{t('nav.about.plan')}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? 'text-right' : ''}>{t('nav.about.overview')}</CardTitle>
            </CardHeader>
            <CardContent className={isRTL ? 'text-right' : ''}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-xl font-semibold text-primary">
                    {language === 'ar' ? 'نبذة عن وزارة الزراعة الفلسطينية' : 'About the Palestinian Ministry of Agriculture'}
                  </h2>
                  <p>
                    {language === 'ar' 
                      ? 'تعمل وزارة الزراعة الفلسطينية على تطوير القطاع الزراعي المستدام في فلسطين وتقديم الدعم للمزارعين والمجتمعات الريفية. تأسست الوزارة لتعزيز التنمية الزراعية المستدامة وضمان الأمن الغذائي.'
                      : 'The Palestinian Ministry of Agriculture works to develop a sustainable agricultural sector in Palestine and provide support to farmers and rural communities. The ministry was established to promote sustainable agricultural development and ensure food security.'}
                  </p>
                  <p>
                    {language === 'ar'
                      ? 'تلعب الوزارة دورًا محوريًا في توفير الخدمات الزراعية، وإجراء البحوث، وتطوير السياسات، ودعم المزارعين، وتعزيز التنمية الريفية المستدامة في جميع أنحاء فلسطين.'
                      : 'The ministry plays a pivotal role in providing agricultural services, conducting research, developing policies, supporting farmers, and promoting sustainable rural development throughout Palestine.'}
                  </p>
                  <h3 className="text-lg font-semibold text-primary mt-6">
                    {language === 'ar' ? 'أهدافنا الرئيسية' : 'Our Main Objectives'}
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      {language === 'ar'
                        ? 'تحسين الأمن الغذائي والتغذية لجميع الفلسطينيين'
                        : 'Improve food security and nutrition for all Palestinians'}
                    </li>
                    <li>
                      {language === 'ar'
                        ? 'تعزيز التنمية الزراعية المستدامة والممارسات الصديقة للبيئة'
                        : 'Promote sustainable agricultural development and environmentally friendly practices'}
                    </li>
                    <li>
                      {language === 'ar'
                        ? 'دعم المزارعين وتحسين سبل العيش الريفية'
                        : 'Support farmers and improve rural livelihoods'}
                    </li>
                    <li>
                      {language === 'ar'
                        ? 'تطوير وتحديث القطاع الزراعي لتعزيز المساهمة في الاقتصاد الوطني'
                        : 'Develop and modernize the agricultural sector to enhance contribution to the national economy'}
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-primary mb-4">
                      {language === 'ar' ? 'حقائق عن الوزارة' : 'Ministry Facts'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {language === 'ar' ? 'تأسست' : 'Established'}
                        </p>
                        <p className="font-medium">1994</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {language === 'ar' ? 'الموظفين' : 'Staff'}
                        </p>
                        <p className="font-medium">500+</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {language === 'ar' ? 'المكاتب الميدانية' : 'Field Offices'}
                        </p>
                        <p className="font-medium">16</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {language === 'ar' ? 'المزارعين المسجلين' : 'Registered Farmers'}
                        </p>
                        <p className="font-medium">110,000+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vision & Mission Tab */}
        <TabsContent value="vision">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? 'text-right' : ''}>{t('nav.about.vision')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`bg-primary/5 p-6 rounded-lg border border-primary/20 ${isRTL ? 'text-right' : ''}`}>
                  <h2 className="text-xl font-bold text-primary mb-4">
                    {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                  </h2>
                  <p className="text-gray-700">
                    {language === 'ar' 
                      ? 'قطاع زراعي مستدام ومنافس محليًا وعالميًا، يساهم في تحقيق الأمن الغذائي والتنمية الريفية الشاملة، ويعزز صمود المزارع الفلسطيني على أرضه.'
                      : 'A sustainable agricultural sector that is competitive locally and globally, contributes to food security and comprehensive rural development, and enhances the resilience of Palestinian farmers on their land.'}
                  </p>
                </div>
                <div className={`bg-secondary/5 p-6 rounded-lg border border-secondary/20 ${isRTL ? 'text-right' : ''}`}>
                  <h2 className="text-xl font-bold text-secondary mb-4">
                    {language === 'ar' ? 'رسالتنا' : 'Our Mission'}
                  </h2>
                  <p className="text-gray-700">
                    {language === 'ar'
                      ? 'تطوير وإدارة الموارد الزراعية بكفاءة، وتعزيز التنمية الزراعية المستدامة من خلال تقديم خدمات زراعية متميزة، وتطبيق سياسات وتشريعات فعالة، وتعزيز الشراكات مع جميع الأطراف المعنية.'
                      : 'To efficiently develop and manage agricultural resources, and promote sustainable agricultural development through providing distinguished agricultural services, implementing effective policies and legislation, and enhancing partnerships with all stakeholders.'}
                  </p>
                </div>
              </div>

              <div className={`mt-8 ${isRTL ? 'text-right' : ''}`}>
                <h2 className="text-xl font-bold text-primary mb-4">
                  {language === 'ar' ? 'قيمنا' : 'Our Values'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">
                      {language === 'ar' ? 'النزاهة والشفافية' : 'Integrity & Transparency'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'ar'
                        ? 'نلتزم بأعلى معايير النزاهة والشفافية في جميع تعاملاتنا وخدماتنا.'
                        : 'We adhere to the highest standards of integrity and transparency in all our dealings and services.'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">
                      {language === 'ar' ? 'التميز والابتكار' : 'Excellence & Innovation'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'ar'
                        ? 'نسعى باستمرار إلى تحقيق التميز وتبني الأفكار والتقنيات المبتكرة.'
                        : 'We continuously strive for excellence and embrace innovative ideas and technologies.'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">
                      {language === 'ar' ? 'التعاون والشراكة' : 'Collaboration & Partnership'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'ar'
                        ? 'نؤمن بقوة العمل الجماعي وبناء شراكات فعالة مع جميع الأطراف المعنية.'
                        : 'We believe in the power of teamwork and building effective partnerships with all stakeholders.'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leadership Tab */}
        <TabsContent value="leadership">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? 'text-right' : ''}>{t('nav.about.leadership')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
                <h2 className="text-xl font-bold text-primary mb-4">
                  {language === 'ar' ? 'قيادة الوزارة' : 'Ministry Leadership'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar'
                    ? 'يقود وزارة الزراعة الفلسطينية فريق من الخبراء المتخصصين في مجال الزراعة والتنمية المستدامة.'
                    : 'The Palestinian Ministry of Agriculture is led by a team of experts specialized in agriculture and sustainable development.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <i className="fas fa-user-circle text-7xl text-gray-400"></i>
                  </div>
                  <div className={`p-4 ${isRTL ? 'text-right' : ''}`}>
                    <h3 className="font-bold text-lg text-primary">
                      {language === 'ar' ? 'د. محمد أحمد عبد الله' : 'Dr. Mohammed Ahmed Abdullah'}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {language === 'ar' ? 'وزير الزراعة' : 'Minister of Agriculture'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === 'ar'
                        ? 'يقود وزارة الزراعة منذ عام 2021، ولديه أكثر من 25 عامًا من الخبرة في مجال التنمية الزراعية المستدامة.'
                        : 'Leading the Ministry of Agriculture since 2021, with over 25 years of experience in sustainable agricultural development.'}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <i className="fas fa-user-circle text-7xl text-gray-400"></i>
                  </div>
                  <div className={`p-4 ${isRTL ? 'text-right' : ''}`}>
                    <h3 className="font-bold text-lg text-primary">
                      {language === 'ar' ? 'د. سميرة محمود حسن' : 'Dr. Samira Mahmoud Hassan'}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {language === 'ar' ? 'وكيل الوزارة' : 'Deputy Minister'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === 'ar'
                        ? 'متخصصة في السياسات الزراعية والتنمية الريفية، تشرف على البرامج الإستراتيجية للوزارة.'
                        : 'Specialized in agricultural policies and rural development, oversees the ministry\'s strategic programs.'}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <i className="fas fa-user-circle text-7xl text-gray-400"></i>
                  </div>
                  <div className={`p-4 ${isRTL ? 'text-right' : ''}`}>
                    <h3 className="font-bold text-lg text-primary">
                      {language === 'ar' ? 'م. خالد يوسف عمران' : 'Eng. Khaled Yousef Imran'}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {language === 'ar' ? 'وكيل مساعد للشؤون الفنية' : 'Assistant Deputy Minister for Technical Affairs'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === 'ar'
                        ? 'خبير في الإرشاد الزراعي ونظم الري الحديثة، يقود الجهود الفنية لتطوير القطاع الزراعي.'
                        : 'Expert in agricultural extension and modern irrigation systems, leads technical efforts to develop the agricultural sector.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`mt-8 ${isRTL ? 'text-right' : ''}`}>
                <h3 className="text-lg font-semibold text-primary mb-4">
                  {language === 'ar' ? 'الهيكل التنظيمي' : 'Organizational Structure'}
                </h3>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-center text-gray-500 py-6">
                    {language === 'ar' 
                      ? 'مخطط الهيكل التنظيمي للوزارة' 
                      : 'Ministry Organizational Chart'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strategic Plan Tab */}
        <TabsContent value="plan">
          <Card>
            <CardHeader>
              <CardTitle className={isRTL ? 'text-right' : ''}>{t('nav.about.plan')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
                <h2 className="text-xl font-bold text-primary mb-4">
                  {language === 'ar' ? 'الخطة الإستراتيجية 2023-2027' : 'Strategic Plan 2023-2027'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar'
                    ? 'تهدف الخطة الإستراتيجية لوزارة الزراعة إلى تعزيز القدرات الزراعية وتحقيق التنمية المستدامة في القطاع الزراعي الفلسطيني.'
                    : 'The strategic plan of the Ministry of Agriculture aims to enhance agricultural capabilities and achieve sustainable development in the Palestinian agricultural sector.'}
                </p>
              </div>

              <div className="space-y-6">
                <div className={`bg-primary/5 p-6 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {language === 'ar' ? 'الأهداف الإستراتيجية' : 'Strategic Objectives'}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className={`mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                        <i className="fas fa-check-circle text-secondary"></i>
                      </div>
                      <span>
                        {language === 'ar'
                          ? 'تعزيز صمود المزارعين وتطوير سلاسل القيمة الزراعية'
                          : 'Enhance farmers\' resilience and develop agricultural value chains'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className={`mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                        <i className="fas fa-check-circle text-secondary"></i>
                      </div>
                      <span>
                        {language === 'ar'
                          ? 'تعزيز الإدارة المستدامة للموارد الطبيعية والتكيف مع تغير المناخ'
                          : 'Promote sustainable management of natural resources and adaptation to climate change'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className={`mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                        <i className="fas fa-check-circle text-secondary"></i>
                      </div>
                      <span>
                        {language === 'ar'
                          ? 'تطوير الأطر المؤسسية والقانونية لتعزيز القطاع الزراعي'
                          : 'Develop institutional and legal frameworks to strengthen the agricultural sector'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className={`mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                        <i className="fas fa-check-circle text-secondary"></i>
                      </div>
                      <span>
                        {language === 'ar'
                          ? 'تحسين الأمن الغذائي والتغذوي للأسر الفلسطينية'
                          : 'Improve food and nutritional security for Palestinian households'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 border-secondary ${isRTL ? 'text-right border-r-4 border-l-0' : ''}`}>
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      {language === 'ar' ? 'المشاريع الرئيسية' : 'Key Projects'}
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        {language === 'ar'
                          ? 'تطوير نظم الري الحديثة وإدارة المياه'
                          : 'Development of modern irrigation systems and water management'}
                      </li>
                      <li>
                        {language === 'ar'
                          ? 'برنامج البذور المحسنة وتنويع المحاصيل'
                          : 'Improved seed program and crop diversification'}
                      </li>
                      <li>
                        {language === 'ar'
                          ? 'تطوير سلاسل التسويق وزيادة القدرة التنافسية'
                          : 'Development of marketing chains and increasing competitiveness'}
                      </li>
                      <li>
                        {language === 'ar'
                          ? 'برامج الصحة الحيوانية وتحسين الإنتاج الحيواني'
                          : 'Animal health programs and improvement of animal production'}
                      </li>
                    </ul>
                  </div>

                  <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 border-accent ${isRTL ? 'text-right border-r-4 border-l-0' : ''}`}>
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      {language === 'ar' ? 'المؤشرات المستهدفة بحلول 2027' : 'Targets by 2027'}
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        {language === 'ar'
                          ? 'زيادة مساهمة القطاع الزراعي في الناتج المحلي الإجمالي بنسبة 15%'
                          : 'Increase the contribution of the agricultural sector to GDP by 15%'}
                      </li>
                      <li>
                        {language === 'ar'
                          ? 'زيادة الصادرات الزراعية بنسبة 20%'
                          : 'Increase agricultural exports by 20%'}
                      </li>
                      <li>
                        {language === 'ar'
                          ? 'زيادة كفاءة استخدام المياه في الزراعة بنسبة 25%'
                          : 'Increase water use efficiency in agriculture by 25%'}
                      </li>
                      <li>
                        {language === 'ar'
                          ? 'تقليل الفجوة الغذائية بنسبة 10%'
                          : 'Reduce the food gap by 10%'}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={`mt-6 text-center ${isRTL ? 'text-right' : ''}`}>
                  <a href="#" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition">
                    <i className={`fas fa-file-pdf ${isRTL ? 'ml-2' : 'mr-2'}`}></i>
                    {language === 'ar' 
                      ? 'تحميل الخطة الإستراتيجية الكاملة (PDF)' 
                      : 'Download Full Strategic Plan (PDF)'}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
