// src/pages/AboutUs.jsx
export default function AboutUs() {
  return (
    <section className="min-h-screen bg-base-100 text-base-content flex flex-col items-center py-12 px-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-4 text-primary">About Us</h1>
      <p className="text-base-content/70 mb-12 text-center max-w-3xl">
        BikeBase is more than just a platform — it’s a one-stop hub for all bike enthusiasts.  
        Whether you’re into exploring specs, buying & selling bikes or parts, or sharing your biking journey,  
        BikeBase brings the entire community together.
      </p>

      {/* Core Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        <div className="bg-base-200 p-8 rounded-2xl shadow-lg hover:shadow-primary/30 transition">
          <h2 className="text-xl font-semibold text-secondary mb-3">🚴 Bike Garage</h2>
          <p className="text-base-content/80">
            Explore the latest bikes, check their price, specs, and details in a sleek, interactive garage view.
          </p>
        </div>

        <div className="bg-base-200 p-8 rounded-2xl shadow-lg hover:shadow-primary/30 transition">
          <h2 className="text-xl font-semibold text-secondary mb-3">🛠 Bike Parts</h2>
          <p className="text-base-content/80">
            Find genuine parts, compare prices, and buy/sell components with fellow bikers in a trusted marketplace.
          </p>
        </div>

        <div className="bg-base-200 p-8 rounded-2xl shadow-lg hover:shadow-primary/30 transition">
          <h2 className="text-xl font-semibold text-secondary mb-3">💰 Marketplace</h2>
          <p className="text-base-content/80">
            Buy and sell new or used bikes & parts easily. BikeBase makes it seamless to connect buyers and sellers.
          </p>
        </div>

        <div className="bg-base-200 p-8 rounded-2xl shadow-lg hover:shadow-primary/30 transition">
          <h2 className="text-xl font-semibold text-secondary mb-3">🌐 Community Hub</h2>
          <p className="text-base-content/80">
            Join a passionate biker community, share your blogs, experiences, and stay updated with the latest trends.
          </p>
        </div>

        <div className="bg-base-200 p-8 rounded-2xl shadow-lg hover:shadow-primary/30 transition">
          <h2 className="text-xl font-semibold text-secondary mb-3">📊 Insights</h2>
          <p className="text-base-content/80">
            Get detailed insights into bike performance, user reviews, and latest updates from riders around the world.
          </p>
        </div>

        <div className="bg-base-200 p-8 rounded-2xl shadow-lg hover:shadow-primary/30 transition">
          <h2 className="text-xl font-semibold text-secondary mb-3">⚡ Innovation</h2>
          <p className="text-base-content/80">
            We blend technology with biking passion to create a platform that’s smart, modern, and rider-focused.
          </p>
        </div>
      </div>

      {/* Closing Note */}
      <div className="mt-16 max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
        <p className="text-base-content/80">
          At BikeBase, we aim to revolutionize how bikers interact with machines, parts, and each other.  
          From garages to communities, we’re building the future of biking culture — digital, connected, and rider-first.
        </p>
      </div>
    </section>
  );
}
