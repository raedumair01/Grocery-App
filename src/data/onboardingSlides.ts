import images from '../assets/images';
export type SlideType = {
  id: string;
  image: any;
  title: string;
  description: string;
};

export const slides: SlideType[] = [
  {
    id: '1',
    image: images.onboard1,
    title: 'Amazing Deals & Offers',
    description:
      'Find deals cheaper than your local supermarket with great discounts and cashbacks.',
  },
  {
    id: '2',
    image: images.onboard2,
    title: 'Everyday Fresh & Healthy',
    description:
      'Quickly search and select a wide range of products from everyday fresh and healthy grocery.',
  },
  {
    id: '3',
    image: images.onboard3,
    title: 'Deliver at Your Door',
    description:
      'Safe and fast delivery for your valuable groceries at your door without any hustle',
  },
];
