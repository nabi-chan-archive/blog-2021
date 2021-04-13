export interface Post {
  id: number;
  title: string;
  subTitle: string;
  body: string;
  createdAt: string;
  author: User;
  authorId: number;
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
