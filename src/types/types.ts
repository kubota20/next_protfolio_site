export interface Category {
  id: string;
  name: string;
}

export interface Blog {
  id: string;
  title: string;
  discription: string;
  link: string;
  imageUrl: string;
  release: boolean;
  category: Category;
  createdAt: string;
}
