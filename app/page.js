import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#2e2e2e] text-white font-[Merriweather]">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 pt-32 pb-20 text-center md:text-left">
        {/* Left Text */}
        <div className="flex-1 md:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-[Merriweather]">
            Books in your hands,
            <br /> worlds at your fingertips.
          </h1>
          <p className="text-gray-300 mb-8 text-lg md:text-xl font-[Open_Sans] leading-relaxed">
            Borrow. Read. Explore.
            <br />
            Panchiko connects you to stories.
          </p>
          <div className="flex justify-center md:justify-start gap-6">
            {/* Tombol Sign-in kembali ke warna abu-abu */}
            <button className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-md text-lg transition-colors font-[Merriweather]">
              Sign-in
            </button>
            <button className="border border-gray-500 hover:bg-gray-700 px-8 py-3 rounded-md text-lg transition-colors font-[Merriweather]">
              Learn More
            </button>
          </div>
        </div>

        {/* Divider line (hidden on mobile) */}
        <div className="hidden md:block w-[1px] h-64 bg-gray-500 opacity-60 mx-12"></div>

        {/* Right Books */}
        <div className="flex justify-center gap-6 mt-12 md:mt-0 flex-1">
          <Image
            src="/images/everything.jpg"
            alt="Everything Must Go"
            width={160}
            height={240}
            className="rounded-lg shadow-xl translate-y-4 hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="/images/metamorphosis.jpg"
            alt="The Metamorphosis"
            width={160}
            height={240}
            className="rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="/images/animalfarm.jpg"
            alt="Animal Farm"
            width={160}
            height={240}
            className="rounded-lg shadow-xl -translate-y-4 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Today's Pick Section - Diperlebar */}
      <section className="bg-white text-black px-8 md:px-20 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-[Merriweather]">
            Today's Pick
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>

        {/* Grid dengan gap yang lebih lebar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {/* Book 1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
            <div className="flex-1 mb-6">
              <Image
                src="/images/money.png"
                alt="Psychology of Money"
                width={140}
                height={200}
                className="mx-auto rounded-lg"
              />
            </div>
            <h3 className="font-bold mb-4 text-lg font-[Merriweather] min-h-[60px] flex items-center justify-center">
              Psychology of Money
            </h3>
            {/* Tombol Borrow tetap hijau */}
            <button className="bg-green-400 hover:bg-green-500 text-black font-semibold py-3 px-8 rounded-md transition-colors w-full mt-auto">
              Borrow
            </button>
          </div>

          {/* Book 2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
            <div className="flex-1 mb-6">
              <Image
                src="/images/dogman.png"
                alt="Dog Man"
                width={140}
                height={200}
                className="mx-auto rounded-lg"
              />
            </div>
            <h3 className="font-bold mb-4 text-lg font-[Merriweather] min-h-[60px] flex items-center justify-center">
              Dog Man: The Scarlet Shedder
            </h3>
            <button className="bg-green-400 hover:bg-green-500 text-black font-semibold py-3 px-8 rounded-md transition-colors w-full mt-auto">
              Borrow
            </button>
          </div>

          {/* Book 3 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
            <div className="flex-1 mb-6">
              <Image
                src="/images/kenshin.png"
                alt="Rurouni Kenshin"
                width={140}
                height={200}
                className="mx-auto rounded-lg"
              />
            </div>
            <h3 className="font-bold mb-4 text-lg font-[Merriweather] min-h-[60px] flex items-center justify-center">
              Rurouni Kenshin
            </h3>
            <button className="bg-green-400 hover:bg-green-500 text-black font-semibold py-3 px-8 rounded-md transition-colors w-full mt-auto">
              Borrow
            </button>
          </div>

          {/* Book 4 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
            <div className="flex-1 mb-6">
              <Image
                src="/images/crime.png"
                alt="Crime and Punishment"
                width={140}
                height={200}
                className="mx-auto rounded-lg"
              />
            </div>
            <h3 className="font-bold mb-4 text-lg font-[Merriweather] min-h-[60px] flex items-center justify-center">
              Crime and Punishment
            </h3>
            <button className="bg-green-400 hover:bg-green-500 text-black font-semibold py-3 px-8 rounded-md transition-colors w-full mt-auto">
              Borrow
            </button>
          </div>
        </div>

        {/* Divider dengan spacing lebih longgar */}
        <div className="flex justify-center mt-24">
          <div className="w-3/4 h-[1px] bg-gray-300"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white text-black px-6 md:px-16 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Left: Box Logo Panchiko */}
          <div className="relative w-full md:w-96 h-64 bg-[#2e2e2e] flex items-center justify-center rounded-lg shadow-xl">
            {/* Dot pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] rounded-lg"></div>

            {/* Panchiko Image */}
            <Image
              src="/images/panchiko.png"
              alt="Panchiko Logo"
              width={180}
              height={100}
              className="z-10"
            />
          </div>

          {/* Right: Text Description */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 font-[Merriweather] text-[#1c1c1c] relative inline-block">
              About Panchiko
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-amber-500"></span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8 font-[Open_Sans]">
              Panchiko is a modern digital platform designed to revolutionize
              book borrowing and sharing. Our web-based service provides
              seamless access to a vast collection of books through an intuitive
              online system.
            </p>

            {/* Info grid */}
            <div className="flex gap-12 text-center">
              <div>
                <p className="text-3xl font-bold text-[#1c1c1c] mb-2">01</p>
                <p className="text-gray-600 font-[Open_Sans]">Web Platform</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#1c1c1c] mb-2">4.5</p>
                <p className="text-gray-600 font-[Open_Sans]">User Reviews</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#1c1c1c] mb-2">03</p>
                <p className="text-gray-600 font-[Open_Sans]">
                  Best Sellers Awards
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center mt-20">
          <div className="w-3/4 h-[1px] bg-gray-300"></div>
        </div>
      </section>

      {/* New Book Section */}
      <section className="bg-white text-black px-6 md:px-16 py-20">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-[Merriweather]">
            New Book
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Left: Prologue */}
          <div className="flex-1 bg-white border border-black-200 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 font-[Merriweather] text-center lg:text-left">
              Prologue
            </h3>

            <p className="text-gray-700 text-lg leading-relaxed font-[Open_Sans] text-justify ">
              Yuta Ito receives a smartphone for his birthday. Shortly after
              opening his present, Yuta's terminally ill mother assigns him the
              task of filming her and compiling a movie about her in the event
              of her death. After she dies, Yuta premieres the movie at his
              school but is met with heavy derision over his decision to end the
              film with him running away from an exploding hospital. Bullied and
              ostracized, Yuta decides to commit suicide by jumping from the
              roof of his mother's hospital. He's stopped by a girl named Eri,
              who reveals she actually loved his movie and urges him to make
              another one. The two work together to bring this to fruition,
              alternating between production and marathoning various movies for
              inspiration and education. They decide on making the movie a
              semi-documentary about themselves, but with various exaggeration
              and fictional elements, most prominently the idea of Eri being a
              vampire. Yuta and Eri grow closer as time goes by until Eri falls
              unconscious while the two were playing at a beach.
            </p>
          </div>

         
          <div className="flex-1 flex justify-center">
            <div className="text-center">
              <Image
                src="/images/eri.png"
                alt="Goodbye Eri Cover"
                width={320}
                height={450}
                className="rounded-xl shadow-2xl mx-auto"
              />
              <div className="mt-6">
                <p className="text-2xl font-bold font-[Merriweather] text-gray-800">
                  Goodbye Eri
                </p>
                <p className="text-gray-600 mt-2 font-[Open_Sans]">
                  By Tatsuki Fujimoto
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
