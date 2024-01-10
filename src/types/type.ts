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
