import Link from "next/link";
import {SendHorizontal } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Exclusive</h2>
          <p className="text-gray-400 text-sm">Get 10% off your first order</p>
          <div className="mt-3 flex items-center border border-gray-500 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-sm p-2 flex-grow outline-none placeholder-gray-400"
            />
            <button className="bg-white text-black px-3 py-2 ">
              <SendHorizontal />
            </button>
          </div>
        </div>

        {/* Поддержка */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <p className="text-gray-400 text-sm">
            111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
          </p>
          <p className="text-gray-400 text-sm mt-2">exclusive@gmail.com</p>
          <p className="text-gray-400 text-sm mt-1">+88015-88888-9999</p>
        </div>

        {/* Аккаунт */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Account</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>
              <Link href="/profile">My Account</Link>
            </li>
            <li>
              <Link href="/login">Login / Register</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
          </ul>
        </div>

        {/* Быстрые ссылки */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Link</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms Of Use</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Приложение + соцсети */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Download App</h3>
          <p className="text-gray-400 text-sm">
            Save $3 with App New User Only
          </p>
          <div className="flex gap-3 mt-2">
            <img
              src="https://wealthy-idea-ec9a86a949.media.strapiapp.com/QR_code_7b4057244f.png"
              alt="QR Code"
              className="w-16 h-16"
            />
            <div className="flex flex-col gap-2">
              <img
                src="https://wealthy-idea-ec9a86a949.media.strapiapp.com/google_play_42a6945e05.png"
                alt="Google Play"
                className="w-24"
              />
              <img
                src="https://wealthy-idea-ec9a86a949.media.strapiapp.com/app_store_eb0a5e6b8f.png"
                alt="App Store"
                className="w-24"
              />
            </div>
          </div>

          {/* Соцсети */}
          <div className="flex gap-4 mt-4 text-xl text-gray-400">
            <Link href="#">
              <span>F</span>
            </Link>
            <Link href="#">
              <span>X.com</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        © Copyright Rimel 2022. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
