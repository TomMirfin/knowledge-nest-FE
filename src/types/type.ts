export interface UserPreference {
  username: string;
  bio: string;
  email: string;
  interests: string[];
  skills: string[];
  img_url: string;
}

export interface SignIn {
  username: string;
  img_url: string;
  token: string;
}

export interface Review {
  body: string;
  rating: number;
  title: string;
}

export interface EditReview {
  username: SignIn;
  created_about: string;
  title: string;
  body: string;
  rating: number;
}

export interface Article {
  title: string;
  topic: string;
  body: string;
  username: string;
}

export interface ArticleData extends Article {
  id: string;
  created_at: Date | String;
}

export interface PostObject {
  username: string;
  skills: string[];
  interests: string[];
}

export interface User {
  photoURL: any;
  uid: any;
  displayName: any;
}
