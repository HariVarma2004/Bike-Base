// src/pages/Profile.jsx
export default function Profile() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0a0f1c] to-[#091621] text-white py-12 px-6 flex flex-col items-center">
      {/* Logo + Motive */}
      <div className="text-center mb-12">
        {/* Replace with your actual logo image */}
        <img
          src="/logo.png"
          alt="BikeBase Logo"
          className="mx-auto w-24 h-24 mb-4"
        />
        <h1 className="text-4xl font-extrabold text-cyan-400 mb-3">BikeBase</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our motive is to unite bikers across the world with a platform that
          blends <span className="text-cyan-300">bike garage</span>,{" "}
          <span className="text-cyan-300">parts marketplace</span>, and a{" "}
          <span className="text-cyan-300">community hub</span> where every rider
          can share, explore, and grow.
        </p>
      </div>

      {/* Bikers Blog */}
      <div className="max-w-6xl w-full mb-16">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-6 text-center">
          Biker’s Blogs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Card 1 */}
          <div className="bg-[#0f1b2d] p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition">
            <h3 className="text-xl font-bold text-cyan-300 mb-2">
              Riding Through the Ghats
            </h3>
            <p className="text-gray-300 mb-4">
              An unforgettable road trip exploring the winding hills of Western
              Ghats — pure freedom on two wheels.
            </p>
            <p className="text-sm text-gray-500">By Arjun, March 2025</p>
          </div>

          {/* Blog Card 2 */}
          <div className="bg-[#0f1b2d] p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition">
            <h3 className="text-xl font-bold text-cyan-300 mb-2">
              Why I Switched to Electric
            </h3>
            <p className="text-gray-300 mb-4">
              From fuel to battery — my experience of embracing electric bikes
              and the thrill it brings.
            </p>
            <p className="text-sm text-gray-500">By Meera, April 2025</p>
          </div>

          {/* Blog Card 3 */}
          <div className="bg-[#0f1b2d] p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition">
            <h3 className="text-xl font-bold text-cyan-300 mb-2">
              Biker Brotherhood
            </h3>
            <p className="text-gray-300 mb-4">
              More than machines, it’s about friendships, trust, and stories
              shared on every ride.
            </p>
            <p className="text-sm text-gray-500">By Rahul, May 2025</p>
          </div>
        </div>
      </div>

      {/* Rider Stats / Achievements */}
      <div className="max-w-5xl w-full text-center">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-6">
          Rider Achievements
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0f1b2d] p-6 rounded-2xl shadow-md">
            <h3 className="text-3xl font-bold text-cyan-400">120+</h3>
            <p className="text-gray-300">Rides Completed</p>
          </div>
          <div className="bg-[#0f1b2d] p-6 rounded-2xl shadow-md">
            <h3 className="text-3xl font-bold text-cyan-400">50K km</h3>
            <p className="text-gray-300">Total Distance</p>
          </div>
          <div className="bg-[#0f1b2d] p-6 rounded-2xl shadow-md">
            <h3 className="text-3xl font-bold text-cyan-400">15</h3>
            <p className="text-gray-300">Countries Explored</p>
          </div>
          <div className="bg-[#0f1b2d] p-6 rounded-2xl shadow-md">
            <h3 className="text-3xl font-bold text-cyan-400">10+</h3>
            <p className="text-gray-300">Years Riding</p>
          </div>
        </div>
      </div>
    </section>
  );
}
