import React from 'react';
import bigManImage from '../assets/images/bigMan.jpeg';
import bigWomanImage from '../assets/images/bigWoman.jpeg';
import accessories from '../assets/images/accessories.jpeg';
import kids from '../assets/images/kids.jpeg';
import Card from './Card';

const Categories = () => {
  const categoryImages = [
    { id: 1, image: bigManImage, alt: 'MEN' },
    { id: 2, image: bigWomanImage, alt: 'WOMEN' },
    { id: 3, image: accessories, alt: 'ACCESSORIES' },
    { id: 4, image: kids, alt: 'KIDS' },
  ];

  return <Card categoryImages={categoryImages} />;
};

export default Categories;