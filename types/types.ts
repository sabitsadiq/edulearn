export interface Instructor {
  id: number;
  title: string;
}

export interface Course {
  id: number;
  title: string;
  url: string;
  is_paid: boolean;
  price: string;
  visible_instructors: Instructor[];
  image_125_h: string;
  image_240x135: string;
  publish_title: string;
  tracking_id: string;
  locale: {
    title: string;
    english_title: string;
    simple_english_title: string;
  };
  result: any;
  subtitle: string;
  num_reviews: number;
  image_240x13: string;
}
