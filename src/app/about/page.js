import Image from "next/image";
import BenefitsSection from "../../components/Benefits";
export default function About() {
  return (
    <div className="container max-w-7xl mx-auto px-6 lg:px-20 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600">
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500+ sellers and 300 brands and serves 3 million customers
            across the region.
          </p>
          <p className="text-gray-600 mt-4">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast rate. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div>
          <Image
            src="https://wealthy-idea-ec9a86a949.media.strapiapp.com/shopping_974cde66e3.jpg"
            alt="Shopping"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {[
          {
            value: "10.5k",
            label: "Sellers active our site",
          },
          {
            value: "33k",
            label: "Monthly Product Sale",
            highlight: true,
          },
          {
            value: "45.5k",
            label: "Customer active in our site",
          },
          {
            value: "25k",
            label: "Annual gross sale in our site",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`p-6 border rounded-lg text-center ${
              stat.highlight ? "bg-red-500 text-white" : "bg-white"
            } shadow`}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Tom Cruise",
              role: "Founder & Chairman",
              img: "https://wealthy-idea-ec9a86a949.media.strapiapp.com/tom_6a1cb5eb95.png",
            },
            {
              name: "Emma Watson",
              role: "Managing Director",
              img: "https://wealthy-idea-ec9a86a949.media.strapiapp.com/emma_f107ce68ea.png",
            },
            {
              name: "Will Smith",
              role: "Product Designer",
              img: "https://wealthy-idea-ec9a86a949.media.strapiapp.com/will_073d9d8939.jpg",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <Image
                src={member.img}
                alt={member.name}
                width={200}
                height={200}
                className="mx-auto rounded-lg shadow-lg"
              />
              <h3 className="mt-4 font-bold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <div className="flex justify-center gap-3 mt-2 text-gray-500">
                <span>X.com</span> <span>F</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BenefitsSection />
    </div>
  );
}
