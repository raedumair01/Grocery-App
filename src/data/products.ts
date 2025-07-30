import images from '../assets/images';

export type Product = {
  id: string;
  title: string;
  price: string;
  img: any;
  imgKey: string;
  calories: string;
  rating: number;
  reviews: number;
  description: string;
};

const offers: Product[] = [
  {
    id: '1',
    title: 'Bell Pepper Red',
    price: '$4.99',
    img: images.pepper,
    imgKey: 'pepper',
    calories: '100 Calories',
    rating: 4.8,
    reviews: 203,
    description:
      'Bell peppers are sweet, crisp vegetables full of antioxidants and vitamin C. The red variety offers a rich flavor, perfect for salads, stir-fries, and roasting.',
  },
  {
    id: '2',
    title: 'Organic Ginger',
    price: '$6.99',
    img: images.ginger,
    imgKey: 'ginger',
    calories: '80 Calories',
    rating: 4.5,
    reviews: 132,
    description:
      'Organic ginger is a bold, aromatic root that enhances flavor and digestion. Ideal for teas, stir-fries, and smoothies.',
  },
];

export default offers;
