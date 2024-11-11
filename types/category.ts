export type CategoryLink = {
  href: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: any[]; // You can further define the shape of the image if needed
  menu_order: number;
  count: number;
  _links: {
    self: CategoryLink[];
    collection: CategoryLink[];
    up: CategoryLink[];
  };
};
