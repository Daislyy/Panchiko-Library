import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function DucatiClone() {
  return (
    <div className="font-sans bg-black text-white">
      <Head>
        <title>Web Ducati</title>
        <meta
          name="description"
          content="Ducati inspired motorcycle showcase"
        />
      </Head>

      <header className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video
          autoPlay
          loop
          nuted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/ducati-video.mp4" type="video/mp4" />
        </video>

        <nav className="relative z-20 flex justify-between items-center px-8 py-6">
          <div className="text-2xl font-bold text-red-600">DUCATI</div>

          <div className="hidden md:flex space-x-8">
            <Link
              href="#models"
              className="text-white hover:text-red-600 transition"
            >
              Models
            </Link>
            <Link
              href="#racing"
              className="text-white hover:text-red-600 transition"
            >
              Racing
            </Link>
            <Link
              href="#experience"
              className="text-white hover:text-red-600 transition"
            >
              Experience
            </Link>
            <Link
              href="#world"
              className="text-white hover:text-red-600 transition"
            >
              World
            </Link>
          </div>

          <Link
            href="/customers"
            className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 transition"
          >
            Go to next page
          </Link>
        </nav>

        <div className="relative z-20 h-full flex flex-col justify-center px-8 right-10.7">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-red-600">Ducati</span> Corse
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8">King Pecco #63</p>
          <div className="flex space-x-4">
            <button className="bg-red-600 px-8 py-3 rounded-full hover:bg-red-700 transition">
              Discover More
            </button>
            <button className="border border-white px-8 py-3 rounded-full hover:bg-white/10 transition">
              Configurator
            </button>
          </div>
        </div>
      </header>

      <section id="models" className="py-20 px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">MODEL RANGE</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group relative overflow-hidden rounded-lg">
            <Image
              src="/panigale-v4.jpg"
              alt="Panigale V4"
              width={800}
              height={600}
              className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold">PANIGALE V4</h3>
              <p className="text-red-600 mb-4">Superbike</p>
              <button className="self-start border-b border-red-600 text-red-600 pb-1 hover:text-white hover:border-white transition">
                Discover
              </button>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg">
            <Image
              src="/streetfighter-v4.jpg"
              alt="Streetfighter V4"
              width={800}
              height={600}
              className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold">STREETFIGHTER V4</h3>
              <p className="text-red-600 mb-4">Naked</p>
              <button className="self-start border-b border-red-600 text-red-600 pb-1 hover:text-white hover:border-white transition">
                Discover
              </button>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg">
            <Image
              src="/multistrada-v4.jpg"
              alt="Multistrada V4"
              width={800}
              height={600}
              className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold">MULTISTRADA V4</h3>
              <p className="text-red-600 mb-4">Adventure</p>
              <button className="self-start border-b border-red-600 text-red-600 pb-1 hover:text-white hover:border-white transition">
                Discover
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="racing" className="py-20 bg-red-600 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">MOTOGP™ 2023</h2>
            <p className="text-lg mb-8">
              Ducati dominates the 2023 season with the Desmosedici GP, proving
              once again our commitment to racing excellence.
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition">
              Follow the Championship
            </button>
          </div>
          <div className="relative h-96">
            <Image
              src="/ducati-motogp.jpg"
              alt="Ducati MotoGP"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">
          DUCATI EXPERIENCE
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <img src="/motorbike.png" className="w-30 " />
            <h3 className="text-2xl font-bold mb-4">Riding Academy</h3>
            <p className="mb-6">
              Improve your riding skills with professional instructors on Ducati
              bikes.
            </p>
            <button className="text-red-600 hover:text-white transition">
              Learn More →
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <img src="/settings.png" className="w-30 " />
            <h3 className="text-2xl font-bold mb-4">Ducati Premium</h3>
            <p className="mb-6">
              Exclusive services and benefits for Ducati owners.
            </p>
            <button className="text-red-600 hover:text-white transition">
              Discover →
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <img src="/car.png" className="w-30 " />
            <h3 className="text-2xl font-bold mb-4">Track Days</h3>
            <p className="mb-6">
              Experience your Ducati on the most beautiful racetracks in the
              world.
            </p>
            <button className="text-red-600 hover:text-white transition">
              Book Now →
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-12 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">DUCATI</h3>
            <p className="mb-4">The most beautiful motorcycles in the world.</p>
            <div className="flex space-x-4">
              <Link href="#">
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#">
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#">
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">MODELS</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-red-600 transition">
                  Superbike
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition">
                  Streetfighter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition">
                  Monster
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition">
                  Multistrada
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">WORLD</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-red-600 transition">
                  Ducati Corse
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition">
                  Ducati Museum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition">
                  Dealers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-600 transition">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">CONTACT</h4>
            <p>Ducati Motor Holding ID</p>
            <p>Via Cavalieri Ducati, 3</p>
            <p>40132 Depok - Cilodong</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center text-sm">
          <p>© Klesi Ducati Inspired Clone. Not affiliated with Ducati.</p>
        </div>
      </footer>
    </div>
  );
}
