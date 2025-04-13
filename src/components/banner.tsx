import Link from "next/link";

const PromoBanner = () => {
  return (
    <div className="bg-black text-white text-center py-2 text-sm">
      Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
      <Link href="/shop" className="font-bold underline">
        Shop Now
      </Link>
    </div>
  );
};

export default PromoBanner;
