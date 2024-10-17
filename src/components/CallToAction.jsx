import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CallToAction = ({ season, title, description, buttonText, price, history }) => {
  const handleClick = () => {
    history.push('/shop');
    toast.success('Redirecting to shop page!');
  };

  return (
    <div className="absolute inset-0 flex flex-col flex-wrap items-center justify-center text-center px-4 gap-2 
                    md:items-start md:text-left md:justify-end
                    md:left-[15%] md:bottom-[25%]">
      <p className="text-white text-sm tracking-wide uppercase">{season}</p>
      <h2 className="text-5xl font-bold text-white mt-2 max-w-xs md:max-w-md lg:max-w-lg">{title}</h2>
      <p className="text-white mt-4 max-w-xs md:max-w-sm lg:max-w-md">{description}</p>

      {price ? (
        <div className="mt-6 md:flex md:items-center gap-6">
          <p className="text-white font-bold text-lg mt-2">{`$${price}`}</p>
          <Button 
            size="xl" 
            className="mt-2 bg-[#2DC071] text-white font-bold uppercase hover:bg-[#2DC071]"
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        </div>
      ) : (
        <Button 
          size="xl" 
          className="mt-4 bg-[#2DC071] text-white font-bold uppercase hover:bg-[#2DC071]"
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default withRouter(CallToAction);