export interface NewsItem {
  id: number;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  imageUrl: string;
  category: string;
  publishDate: string;
  isPublished: boolean;
}

export interface Resource {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: string;
  fileType: string;
  fileUrl: string;
  fileSize: string;
  isPublished: boolean;
}

export interface Service {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: string;
  icon: string;
  isPublished: boolean;
}

export interface Directory {
  id: number;
  nameEn: string;
  nameAr: string;
  region: string;
  addressEn: string;
  addressAr: string;
  phone: string;
  email: string;
  hoursEn: string;
  hoursAr: string;
  servicesEn: string[];
  servicesAr: string[];
  isPublished: boolean;
}

export interface Statistic {
  id: number;
  labelEn: string;
  labelAr: string;
  value: string;
  order: number;
  isPublished: boolean;
}
