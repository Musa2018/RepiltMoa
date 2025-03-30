import { 
  users, type User, type InsertUser,
  news, type News, type InsertNews,
  resources, type Resource, type InsertResource,
  services, type Service, type InsertService,
  directories, type Directory, type InsertDirectory,
  statistics, type Statistic, type InsertStatistic
} from "@shared/schema";

// Comprehensive storage interface for the Ministry of Agriculture portal
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // News
  getAllNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  createNews(item: InsertNews): Promise<News>;
  updateNews(id: number, item: Partial<InsertNews>): Promise<News | undefined>;
  deleteNews(id: number): Promise<boolean>;

  // Resources
  getAllResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  getResourceById(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: number, resource: Partial<InsertResource>): Promise<Resource | undefined>;
  deleteResource(id: number): Promise<boolean>;

  // Services
  getAllServices(): Promise<Service[]>;
  getServicesByCategory(category: string): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  // Directories
  getAllDirectories(): Promise<Directory[]>;
  getDirectoriesByRegion(region: string): Promise<Directory[]>;
  getDirectoryById(id: number): Promise<Directory | undefined>;
  createDirectory(directory: InsertDirectory): Promise<Directory>;
  updateDirectory(id: number, directory: Partial<InsertDirectory>): Promise<Directory | undefined>;
  deleteDirectory(id: number): Promise<boolean>;

  // Statistics
  getAllStatistics(): Promise<Statistic[]>;
  getStatisticById(id: number): Promise<Statistic | undefined>;
  createStatistic(statistic: InsertStatistic): Promise<Statistic>;
  updateStatistic(id: number, statistic: Partial<InsertStatistic>): Promise<Statistic | undefined>;
  deleteStatistic(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private newsItems: Map<number, News>;
  private resourceItems: Map<number, Resource>;
  private serviceItems: Map<number, Service>;
  private directoryItems: Map<number, Directory>;
  private statisticItems: Map<number, Statistic>;
  
  private userId: number;
  private newsId: number;
  private resourceId: number;
  private serviceId: number;
  private directoryId: number;
  private statisticId: number;

  constructor() {
    this.users = new Map();
    this.newsItems = new Map();
    this.resourceItems = new Map();
    this.serviceItems = new Map();
    this.directoryItems = new Map();
    this.statisticItems = new Map();
    
    this.userId = 1;
    this.newsId = 1;
    this.resourceId = 1;
    this.serviceId = 1;
    this.directoryId = 1;
    this.statisticId = 1;

    // Initialize with seed data
    this.seedData();
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // News
  async getAllNews(): Promise<News[]> {
    return Array.from(this.newsItems.values());
  }

  async getNewsById(id: number): Promise<News | undefined> {
    return this.newsItems.get(id);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.newsId++;
    const newsItem: News = { ...insertNews, id };
    this.newsItems.set(id, newsItem);
    return newsItem;
  }

  async updateNews(id: number, updateData: Partial<InsertNews>): Promise<News | undefined> {
    const existing = this.newsItems.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.newsItems.set(id, updated);
    return updated;
  }

  async deleteNews(id: number): Promise<boolean> {
    return this.newsItems.delete(id);
  }

  // Resources
  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resourceItems.values());
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resourceItems.values())
      .filter(resource => resource.category === category);
  }

  async getResourceById(id: number): Promise<Resource | undefined> {
    return this.resourceItems.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.resourceId++;
    const resource: Resource = { ...insertResource, id };
    this.resourceItems.set(id, resource);
    return resource;
  }

  async updateResource(id: number, updateData: Partial<InsertResource>): Promise<Resource | undefined> {
    const existing = this.resourceItems.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.resourceItems.set(id, updated);
    return updated;
  }

  async deleteResource(id: number): Promise<boolean> {
    return this.resourceItems.delete(id);
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.serviceItems.values());
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.serviceItems.values())
      .filter(service => service.category === category);
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    return this.serviceItems.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceId++;
    const service: Service = { ...insertService, id };
    this.serviceItems.set(id, service);
    return service;
  }

  async updateService(id: number, updateData: Partial<InsertService>): Promise<Service | undefined> {
    const existing = this.serviceItems.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.serviceItems.set(id, updated);
    return updated;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.serviceItems.delete(id);
  }

  // Directories
  async getAllDirectories(): Promise<Directory[]> {
    return Array.from(this.directoryItems.values());
  }

  async getDirectoriesByRegion(region: string): Promise<Directory[]> {
    return Array.from(this.directoryItems.values())
      .filter(directory => directory.region === region);
  }

  async getDirectoryById(id: number): Promise<Directory | undefined> {
    return this.directoryItems.get(id);
  }

  async createDirectory(insertDirectory: InsertDirectory): Promise<Directory> {
    const id = this.directoryId++;
    const directory: Directory = { ...insertDirectory, id };
    this.directoryItems.set(id, directory);
    return directory;
  }

  async updateDirectory(id: number, updateData: Partial<InsertDirectory>): Promise<Directory | undefined> {
    const existing = this.directoryItems.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.directoryItems.set(id, updated);
    return updated;
  }

  async deleteDirectory(id: number): Promise<boolean> {
    return this.directoryItems.delete(id);
  }

  // Statistics
  async getAllStatistics(): Promise<Statistic[]> {
    return Array.from(this.statisticItems.values());
  }

  async getStatisticById(id: number): Promise<Statistic | undefined> {
    return this.statisticItems.get(id);
  }

  async createStatistic(insertStatistic: InsertStatistic): Promise<Statistic> {
    const id = this.statisticId++;
    const statistic: Statistic = { ...insertStatistic, id };
    this.statisticItems.set(id, statistic);
    return statistic;
  }

  async updateStatistic(id: number, updateData: Partial<InsertStatistic>): Promise<Statistic | undefined> {
    const existing = this.statisticItems.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.statisticItems.set(id, updated);
    return updated;
  }

  async deleteStatistic(id: number): Promise<boolean> {
    return this.statisticItems.delete(id);
  }

  // Seed with initial demo data
  private seedData() {
    // Seed users
    this.createUser({
      username: "admin",
      password: "password123",
    });

    // Seed news
    this.createNews({
      titleEn: "Ministry Launches New Olive Support Program",
      titleAr: "وزارة الزراعة تطلق برنامج دعم جديد للزيتون",
      contentEn: "The Palestinian Ministry of Agriculture announced a new support program for olive farmers, aiming to improve production quality and international market access.",
      contentAr: "أعلنت وزارة الزراعة الفلسطينية عن برنامج دعم جديد لمزارعي الزيتون، يهدف إلى تحسين جودة الإنتاج والوصول إلى الأسواق الدولية.",
      imageUrl: "https://images.unsplash.com/photo-1631819825505-4ae5383e5fa3",
      category: "Press Release",
      publishDate: new Date("2025-11-02"),
      isPublished: true,
    });

    this.createNews({
      titleEn: "Upcoming Workshop: Sustainable Farming Practices",
      titleAr: "ورشة عمل قادمة: ممارسات الزراعة المستدامة",
      contentEn: "Join our experts for a comprehensive workshop on implementing sustainable farming practices that conserve water and improve soil health.",
      contentAr: "انضم إلى خبرائنا لورشة عمل شاملة حول تنفيذ ممارسات الزراعة المستدامة التي تحافظ على المياه وتحسن صحة التربة.",
      imageUrl: "https://images.unsplash.com/photo-1635176502606-denafdc2a54e",
      category: "Event",
      publishDate: new Date("2025-11-15"),
      isPublished: true,
    });

    this.createNews({
      titleEn: "New Agricultural Information System Launched",
      titleAr: "إطلاق نظام معلومات زراعي جديد",
      contentEn: "The Ministry has launched a new Integrated Agricultural Information System to provide real-time data and support to farmers across Palestine.",
      contentAr: "أطلقت الوزارة نظام معلومات زراعي متكامل جديد لتوفير بيانات في الوقت الحقيقي ودعم للمزارعين في جميع أنحاء فلسطين.",
      imageUrl: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f",
      category: "Announcement",
      publishDate: new Date("2025-10-30"),
      isPublished: true,
    });

    // Seed resources
    this.createResource({
      titleEn: "Olive Cultivation Guide",
      titleAr: "دليل زراعة الزيتون",
      descriptionEn: "Comprehensive guide to olive farming techniques, disease prevention, and harvesting best practices.",
      descriptionAr: "دليل شامل لتقنيات زراعة الزيتون، والوقاية من الأمراض، وأفضل ممارسات الحصاد.",
      category: "Farming Guides",
      fileType: "PDF",
      fileUrl: "/resources/olive-cultivation-guide.pdf",
      fileSize: "4.2 MB",
      isPublished: true,
    });

    this.createResource({
      titleEn: "Water Conservation Manual",
      titleAr: "دليل الحفاظ على المياه",
      descriptionEn: "Techniques and technologies for efficient water usage in agriculture in arid and semi-arid regions.",
      descriptionAr: "تقنيات وتكنولوجيات للاستخدام الفعال للمياه في الزراعة في المناطق الجافة وشبه الجافة.",
      category: "Water Management",
      fileType: "PDF",
      fileUrl: "/resources/water-conservation-manual.pdf",
      fileSize: "3.7 MB",
      isPublished: true,
    });

    this.createResource({
      titleEn: "Pest Management Presentation",
      titleAr: "عرض إدارة الآفات",
      descriptionEn: "Educational slides on integrated pest management techniques for various crops grown in Palestine.",
      descriptionAr: "شرائح تعليمية حول تقنيات الإدارة المتكاملة للآفات لمختلف المحاصيل المزروعة في فلسطين.",
      category: "Pest Control",
      fileType: "PPT",
      fileUrl: "/resources/pest-management-presentation.ppt",
      fileSize: "8.1 MB",
      isPublished: true,
    });

    this.createResource({
      titleEn: "Crop Calendar & Planning Tools",
      titleAr: "تقويم المحاصيل وأدوات التخطيط",
      descriptionEn: "Spreadsheet tools for planning seasonal planting, harvesting, and farm management activities.",
      descriptionAr: "أدوات جداول البيانات لتخطيط الزراعة الموسمية والحصاد وأنشطة إدارة المزرعة.",
      category: "Farming Guides",
      fileType: "XLSX",
      fileUrl: "/resources/crop-calendar-tools.xlsx",
      fileSize: "1.3 MB",
      isPublished: true,
    });

    this.createResource({
      titleEn: "Greenhouse Management Video Series",
      titleAr: "سلسلة فيديو إدارة البيوت المحمية",
      descriptionEn: "Video tutorials on setting up and maintaining productive greenhouse operations.",
      descriptionAr: "دروس فيديو حول إنشاء وصيانة عمليات البيوت المحمية المنتجة.",
      category: "Training Videos",
      fileType: "Video",
      fileUrl: "/resources/greenhouse-management-videos",
      fileSize: "6 Episodes",
      isPublished: true,
    });

    this.createResource({
      titleEn: "Agricultural Market Data",
      titleAr: "بيانات سوق المنتجات الزراعية",
      descriptionEn: "Historical price data for major agricultural products in local and international markets.",
      descriptionAr: "بيانات الأسعار التاريخية للمنتجات الزراعية الرئيسية في الأسواق المحلية والدولية.",
      category: "Market Reports",
      fileType: "CSV",
      fileUrl: "/resources/agricultural-market-data.csv",
      fileSize: "850 KB",
      isPublished: true,
    });

    // Seed services
    this.createService({
      titleEn: "Plant Disease Diagnosis",
      titleAr: "تشخيص أمراض النباتات",
      descriptionEn: "Expert assessment and treatment recommendations for crop diseases.",
      descriptionAr: "تقييم الخبراء وتوصيات العلاج لأمراض المحاصيل.",
      category: "Crop & Plant Services",
      icon: "fa-seedling",
      isPublished: true,
    });

    this.createService({
      titleEn: "Seed Certification",
      titleAr: "اعتماد البذور",
      descriptionEn: "Quality certification for seeds and planting materials.",
      descriptionAr: "شهادة الجودة للبذور ومواد الزراعة.",
      category: "Crop & Plant Services",
      icon: "fa-seedling",
      isPublished: true,
    });

    this.createService({
      titleEn: "Greenhouse Licensing",
      titleAr: "ترخيص البيوت المحمية",
      descriptionEn: "Permits and technical support for greenhouse farming.",
      descriptionAr: "التصاريح والدعم الفني للزراعة في البيوت المحمية.",
      category: "Crop & Plant Services",
      icon: "fa-seedling",
      isPublished: true,
    });

    this.createService({
      titleEn: "Aquaculture Licensing",
      titleAr: "ترخيص تربية الأحياء المائية",
      descriptionEn: "Registration and permits for fish farming operations.",
      descriptionAr: "التسجيل والتصاريح لعمليات تربية الأسماك.",
      category: "Fisheries & Aquaculture",
      icon: "fa-fish",
      isPublished: true,
    });

    this.createService({
      titleEn: "Fisheries Support",
      titleAr: "دعم مصايد الأسماك",
      descriptionEn: "Technical assistance and resources for fishing communities.",
      descriptionAr: "المساعدة الفنية والموارد لمجتمعات الصيد.",
      category: "Fisheries & Aquaculture",
      icon: "fa-fish",
      isPublished: true,
    });

    this.createService({
      titleEn: "Animal Health Services",
      titleAr: "خدمات صحة الحيوان",
      descriptionEn: "Vaccination programs and disease prevention for livestock.",
      descriptionAr: "برامج التطعيم والوقاية من الأمراض للماشية.",
      category: "Livestock & Veterinary Services",
      icon: "fa-cow",
      isPublished: true,
    });

    this.createService({
      titleEn: "Livestock Registration",
      titleAr: "تسجيل الماشية",
      descriptionEn: "Official registration and tracking of animal populations.",
      descriptionAr: "التسجيل الرسمي وتتبع أعداد الحيوانات.",
      category: "Livestock & Veterinary Services",
      icon: "fa-cow",
      isPublished: true,
    });

    this.createService({
      titleEn: "Breeding Programs",
      titleAr: "برامج التربية",
      descriptionEn: "Support for improving local livestock breeds and genetics.",
      descriptionAr: "دعم تحسين سلالات الماشية المحلية والوراثة.",
      category: "Livestock & Veterinary Services",
      icon: "fa-cow",
      isPublished: true,
    });

    this.createService({
      titleEn: "Export Certification",
      titleAr: "شهادة التصدير",
      descriptionEn: "Documentation and quality assurance for agricultural exports.",
      descriptionAr: "التوثيق وضمان الجودة للصادرات الزراعية.",
      category: "Marketing & Support",
      icon: "fa-chart-line",
      isPublished: true,
    });

    this.createService({
      titleEn: "Farmer Subsidies",
      titleAr: "دعم المزارعين",
      descriptionEn: "Financial support programs for eligible agricultural activities.",
      descriptionAr: "برامج الدعم المالي للأنشطة الزراعية المؤهلة.",
      category: "Marketing & Support",
      icon: "fa-chart-line",
      isPublished: true,
    });

    this.createService({
      titleEn: "Cooperative Development",
      titleAr: "تطوير التعاونيات",
      descriptionEn: "Support for establishing and managing agricultural cooperatives.",
      descriptionAr: "دعم إنشاء وإدارة التعاونيات الزراعية.",
      category: "Marketing & Support",
      icon: "fa-chart-line",
      isPublished: true,
    });

    // Seed directories
    this.createDirectory({
      nameEn: "Ministry Headquarters",
      nameAr: "المقر الرئيسي للوزارة",
      region: "Central",
      addressEn: "3rd Floor, Agricultural Building, Al-Bireh, Ramallah",
      addressAr: "الطابق الثالث، مبنى الزراعة، البيرة، رام الله",
      phone: "+970 2 240 6340",
      email: "info@moa.gov.ps",
      hoursEn: "Sun-Thu: 8:00 AM - 3:00 PM",
      hoursAr: "الأحد-الخميس: 8:00 صباحاً - 3:00 مساءً",
      servicesEn: [],
      servicesAr: [],
      isPublished: true,
    });

    this.createDirectory({
      nameEn: "Agricultural Development Department",
      nameAr: "دائرة التنمية الزراعية",
      region: "Central",
      addressEn: "2nd Floor, Agricultural Building, Al-Bireh, Ramallah",
      addressAr: "الطابق الثاني، مبنى الزراعة، البيرة، رام الله",
      phone: "+970 2 240 6343",
      email: "dev@moa.gov.ps",
      hoursEn: "Sun-Thu: 8:00 AM - 3:00 PM",
      hoursAr: "الأحد-الخميس: 8:00 صباحاً - 3:00 مساءً",
      servicesEn: ["Agricultural planning", "Project coordination", "Rural development"],
      servicesAr: ["التخطيط الزراعي", "تنسيق المشاريع", "التنمية الريفية"],
      isPublished: true,
    });

    this.createDirectory({
      nameEn: "Plant Production & Protection Department",
      nameAr: "دائرة الإنتاج النباتي والوقاية",
      region: "Central",
      addressEn: "1st Floor, Agricultural Building, Al-Bireh, Ramallah",
      addressAr: "الطابق الأول، مبنى الزراعة، البيرة، رام الله",
      phone: "+970 2 240 6345",
      email: "plants@moa.gov.ps",
      hoursEn: "Sun-Thu: 8:00 AM - 3:00 PM",
      hoursAr: "الأحد-الخميس: 8:00 صباحاً - 3:00 مساءً",
      servicesEn: ["Plant disease diagnosis", "Pest management", "Crop production guidance"],
      servicesAr: ["تشخيص أمراض النباتات", "إدارة الآفات", "توجيه إنتاج المحاصيل"],
      isPublished: true,
    });

    this.createDirectory({
      nameEn: "Veterinary Services Department",
      nameAr: "دائرة الخدمات البيطرية",
      region: "Central",
      addressEn: "1st Floor, Agricultural Building, Al-Bireh, Ramallah",
      addressAr: "الطابق الأول، مبنى الزراعة، البيرة، رام الله",
      phone: "+970 2 240 6347",
      email: "vet@moa.gov.ps",
      hoursEn: "Sun-Thu: 8:00 AM - 3:00 PM",
      hoursAr: "الأحد-الخميس: 8:00 صباحاً - 3:00 مساءً",
      servicesEn: ["Animal health services", "Vaccination programs", "Livestock disease control"],
      servicesAr: ["خدمات صحة الحيوان", "برامج التطعيم", "مكافحة أمراض الماشية"],
      isPublished: true,
    });

    // Seed statistics
    this.createStatistic({
      labelEn: "of Palestinian land is agricultural",
      labelAr: "من الأراضي الفلسطينية زراعية",
      value: "63%",
      order: 1,
      isPublished: true,
    });

    this.createStatistic({
      labelEn: "registered farmers",
      labelAr: "مزارع مسجل",
      value: "110,000",
      order: 2,
      isPublished: true,
    });

    this.createStatistic({
      labelEn: "annual agricultural exports",
      labelAr: "الصادرات الزراعية السنوية",
      value: "$450M",
      order: 3,
      isPublished: true,
    });

    this.createStatistic({
      labelEn: "of GDP from agriculture",
      labelAr: "من الناتج المحلي الإجمالي من الزراعة",
      value: "12%",
      order: 4,
      isPublished: true,
    });
  }
}

export const storage = new MemStorage();
