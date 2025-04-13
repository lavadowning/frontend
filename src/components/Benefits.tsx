import React from "react";
import { Truck, Headphones, ShieldCheck } from "lucide-react";
const benefits = [
  {
    icon: <Truck size={40} className=" text-neutral-50" />,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    icon: <Headphones size={40} className=" text-neutral-50" />,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: <ShieldCheck size={40} className="text-neutral-50" />,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
];

function Benefits() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex flex-col items-center text-center p-4">
          <div className="w-16 h-16 bg-black text-white text-2xl rounded-full flex items-center justify-center border-4 border-gray-300">
            {benefit.icon}
          </div>
          <h3 className="font-bold mt-4">{benefit.title}</h3>
          <p className="text-gray-500">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Benefits;
