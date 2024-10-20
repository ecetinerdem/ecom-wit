import React from 'react';
import productOwner from '../assets/images/productOwner.jpeg';
import scrumMaster from '../assets/images/scrumMaster.jpeg';
import full from '../assets/images/full.jpg';

function TeamPage() {
    const teamMembers = [
        {
            id: 1,
            name: 'Erhan Fırat',
            profession: "Product Owner",
            image: productOwner,
        },
        {
            id: 2,
            name: 'Gökhan Özdemir',
            profession: "Scrum Master",
            image: scrumMaster,
        },
        {
            id: 3,
            name: 'Çetin Erdem',
            profession: "Full Stack Developer",
            image: full,
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center mt-12 md:mt-24">
            <div className="flex flex-col items-center justify-center text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Meet Our Team</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
                </p>
            </div>
            <div className="flex flex-wrap justify-center items-center -mx-2">
                {teamMembers.map(member => (
                    <div key={member.id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                        <div className="bg-white overflow-hidden shadow-lg max-w-[280px] mx-auto">
                            <div className="h-[280px] overflow-hidden">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <h4 className="text-lg font-semibold text-gray-800 text-center">{member.name}</h4>
                                <p className="text-sm text-gray-600 mb-2 text-center">{member.profession}</p>
                                <div className="flex justify-center space-x-3">
                                    <a href="#" className="text-[#23A6F0] hover:text-blue-700">
                                        <i className="fa-brands fa-github text-lg"></i>
                                    </a>
                                    <a href="#" className="text-[#23A6F0] hover:text-blue-700">
                                        <i className="fa-brands fa-linkedin-in text-lg"></i>
                                    </a>
                                    <a href="#" className="text-[#23A6F0] hover:text-blue-700">
                                        <i className="fa-brands fa-twitter text-lg"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamPage;