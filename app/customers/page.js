import Link from "next/link";
import Image from "next/image";

export default function DucatiHistory() {
  const motorcycles = [
    {
      name: "Ducati Panigale",
      image: "/panigale.jpg",
      year: "2018-Present",
    },
    {
      name: "Ducati Monster",
      image: "/monster.jpg",
      year: "1993-Present",
    },
    {
      name: "Ducati Multistrada",
      image: "/multistrada.jpg",
      year: "2003-Present",
    },
    {
      name: "Ducati 916",
      image: "/916.jpg",
      year: "1994-1998",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      
      <nav className="bg-black py-6 px-8 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-red-600">
            DUCATI
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="#" className="hover:text-red-600 transition">
              History
            </Link>
            <Link href="#" className="hover:text-red-600 transition">
              Models
            </Link>
            <Link href="#" className="hover:text-red-600 transition">
              Racing
            </Link>
          </div>
        </div>
      </nav>

    
      <section className="relative h-96 flex items-center justify-center">
        <Image
          src="/ducati-hero.jpg"
          alt="Ducati History"
          fill
          className="object-cover opacity-70"
        />
        <div className="relative z-10 text-center px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            DUCATI HISTORY
          </h1>
          <p className="text-xl max-w-2xl mx-auto">From Bologna to the world</p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-red-600">Our Story</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="mb-4">
              Ducati was founded in 1926 in Bologna, Italy, originally as a
              manufacturer of radio components.
            </p>
            <p className="mb-4">
              The company produced its first motorcycle in 1946 - the Ducati
              Cucciolo, a small engine that could be attached to a bicycle.
            </p>
            <p>
              Throughout the 1950s and 1960s, Ducati gained fame for its
              innovative engineering and racing success.
            </p>
          </div>
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <Image
              src="/ducati-old.jpg"
              alt="Vintage Ducati"
              fill
              className="object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-bold mb-4">Racing Heritage</h3>
            <p className="mb-4">
              Ducati has dominated World Superbike racing with 14 manufacturer's
              titles and numerous rider championships.
            </p>
            <p>
              In MotoGP, Ducati won its first championship in 2007 with Casey
              Stoner and continues to be a top competitor.
            </p>
          </div>
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden order-1">
            <Image
              src="/ducati-racing.jpg"
              alt="Ducati Racing"
              fill
              className="object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </section>

      
      <section className="py-16 px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            ICONIC MODELS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {motorcycles.map((bike, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg hover:shadow-lg hover:shadow-red-600/20 transition-all"
              >
                <div className="relative h-64">
                  <Image
                    src={bike.image}
                    alt={bike.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold">{bike.name}</h3>
                  <p className="text-red-600">{bike.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <footer className="bg-black py-12 px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ducati Motor Holding. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
