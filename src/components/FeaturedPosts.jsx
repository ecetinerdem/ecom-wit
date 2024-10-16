import React from "react";
import madisonOne from '../assets/images/madisonOne.jpeg';
import madisonTwo from '../assets/images/madisonTwo.jpeg';
import madisonThree from '../assets/images/madisonThree.jpeg';

const FeaturedPosts = () => {
  const posts = [
    {
      id: 1,
      img: madisonOne,
      title: "Loudest à la Madison #1 (L'integral)",
      description:
        "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: "22 April 2021",
      comments: 10,
    },
    {
      id: 2,
      img: madisonTwo,
      title: "Loudest à la Madison #1 (L'integral)",
      description:
        "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: "22 April 2021",
      comments: 10,
    },
    {
      id: 3,
      img: madisonThree,
      title: "Loudest à la Madison #1 (L'integral)",
      description:
        "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: "22 April 2021",
      comments: 10,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-16">
      <h2 className="text-4xl font-bold text-center mb-6">Featured Posts</h2>
      <p className="text-center text-gray-600 mb-8">
        Problems trying to resolve the conflict between Classical and Newtonian mechanics.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-0  mx-auto"> {/* Reduced gap on larger screens */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md  mx-auto flex flex-col justify-center"
            style={{ height: '500px', width: '80%' }} // Reduced width by 1/5 (80% width)
          >
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-1/2 object-cover shadow-sm" // Set image height to 50% of card height
            />
            <div className="p-6 sm:p-8 flex flex-col justify-between h-1/2"> {/* Text area covers 50% of the card */}
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{post.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.date}</span>
                <span>{post.comments} comments</span>
              </div>
              <button className="mt-4 text-sm text-blue-500 text-left"> {/* Align Learn More to the left */}
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
