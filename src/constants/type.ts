export interface Post {
  id: number;
  title: string;
  subTitle: string;
  place: string;
  body: string;
  createdAt: string;
  author: User;
  authorId: number;
  state: PostState;
}

export interface User {
  id: number;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
}

export enum PostState {
  HIDDEN = "HIDDEN",
  PRIVATE = "PRIVATE",
  SAVED = "SAVED",
  PUBLISHED = "PUBLISHED",
}
