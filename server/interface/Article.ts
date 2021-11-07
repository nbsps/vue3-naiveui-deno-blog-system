export default interface Article {
  id: string;
  cover?: string;
  title?: string;
  content?: string;
  thumbnail?: string;
  status?: boolean;
  isPublish?: boolean;
  password?: string;
  views?: number;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
