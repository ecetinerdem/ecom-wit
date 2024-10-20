import React from 'react';
import productOwner from '../assets/images/productOwner.jpeg';
import scrumMaster from '../assets/images/scrumMaster.jpeg';
import full from '../assets/images/full.jpg';
import fullOne from '../assets/images/fullOne.jpeg';
import fullTwo from '../assets/images/fullTwo.jpeg';
import frontEndOne from '../assets/images/frontEndOne.jpeg';
import frontEndTwo from '../assets/images/frontEndTwo.jpeg';
import frontEndThree from '../assets/images/frontEndThree.jpeg';

function TeamPage() {
    const teamMembers = [
        {
            id: 1,
            name: 'Erhan Fırat',
            profession: "Product Owner",
            image: productOwner,
            github:'https://github.com/Workintech',//TODO add links to github,Linkedin,Twitter for the team
        },
        {
            id: 2,
            name: 'Gökhan Özdemir',
            profession: "Scrum Master",
            image: scrumMaster,
            github:'https://github.com/gokhanozdemir'//TODO add links to github,Linkedin,Twitter for the team
        },
        {
            id: 3,
            name: 'Çetin Erdem',
            profession: "Full Stack Developer",
            image: full,
            github:'https://github.com/ecetinerdem'//TODO add links to github,Linkedin,Twitter for the team
        },
        {
            id: 4,
            name: 'Ömer Bayram',
            profession: "Full Stack Developer",
            image: fullOne,
            github:'https://github.com/obayramer'//TODO add links to github,Linkedin,Twitter for the team
        },
        {
            id: 5,
            name: 'Aleyna Şebnem Uçak',
            profession: "Full Stack Developer",
            image: fullTwo,
            github:'https://github.com/asebneemu'//TODO add links to github,Linkedin,Twitter for the team
        },
        {
            id: 6,
            name: 'Ayşen Aydın',
            profession: "Front End Developer",
            image: frontEndOne,
            github:'https://github.com/aysenayydin'//TODO add links to github,Linkedin,Twitter for the team
        },
        {
            id: 7,
            name: 'Alperen Mimarlar',
            profession: "Front End Developer",
            image: frontEndTwo,
            github:'https://github.com/Replena'//TODO add links to github,Linkedin,Twitter for the team
        },
        {
            id: 8,
            name: 'Nida Türkay',
            profession: "Front End Developer",
            image: frontEndThree,
            github:'https://github.com/NdaTrky'//TODO add links to github,Linkedin,Twitter for the team
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center mt-12 md:mt-24">
            <div className="flex flex-col items-center justify-center text-center mb-12">
                <h2 className="text-3xl font-bold text-[#252B42] mb-2">Meet Our Team</h2>
                <p className="text-[#737373] max-w-2xl mx-auto">
                    Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
                </p>
            </div>
            <div className="flex flex-wrap justify-center items-center md:my-16">
                {teamMembers.map(member => (
                    <div key={member.id} className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <div className="bg-white overflow-hidden shadow-lg max-w-[280px] mx-auto">
                            <div className="h-[280px] overflow-hidden">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <h5 className="text-md font-bold text-[#252B42] text-center">{member.name}</h5>
                                <h6 className="text-sm font-semibold text-[#737373] mb-2 text-center">{member.profession}</h6>
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