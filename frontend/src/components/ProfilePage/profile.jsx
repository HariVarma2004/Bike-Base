// src/pages/Profile.jsx
import { Award, Globe2, MapPin, Activity } from "lucide-react";

// Import your logo directly (adjust the path as needed)
import Logo from "../../assets/Logo.png";

export default function Profile() {
  return (
    <section className="min-h-screen bg-base-100 text-base-content py-16 px-6 flex flex-col items-center">
      {/* Logo + Motive */}
      <div className="text-center mb-16">
        <img
          src={Logo} // Use the imported logo
          alt="Motovex Logo"
          className="mx-auto w-24 h-24 mb-4 drop-shadow-lg object-contain"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling?.classList.remove('hidden');
          }}
        />
        {/* Fallback text logo */}
        <div className="hidden mx-auto mb-4 text-5xl font-bold text-primary">
          BB
        </div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
          Motovex
        </h1>
        <p className="text-base-content/70 max-w-2xl mx-auto leading-relaxed">
          Our motive is to unite bikers across the world with a platform that
          blends <span className="text-primary font-medium">bike garage</span>,{" "}
          <span className="text-primary font-medium">parts marketplace</span>, and a{" "}
          <span className="text-primary font-medium">community hub</span> where every rider
          can share, explore, and grow.
        </p>
      </div>

      {/* Bikers Blog */}
      <div className="max-w-6xl w-full mb-20">
        <h2 className="text-2xl font-semibold text-primary mb-8 text-center">
          Biker's Blogs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Riding Through the Ghats",
              desc: "An unforgettable road trip exploring the winding hills of Western Ghats — pure freedom on two wheels.",
              author: "By Arjun, March 2025",
            },
            {
              title: "Why I Switched to Electric",
              desc: "From fuel to battery — my experience of embracing electric bikes and the thrill it brings.",
              author: "By Meera, April 2025",
            },
            {
              title: "Biker Brotherhood",
              desc: "More than machines, it's about friendships, trust, and stories shared on every ride.",
              author: "By Rahul, May 2025",
            },
          ].map((blog, idx) => (
            <div
              key={idx}
              className="card bg-base-200 shadow-lg border border-transparent hover:border-primary/40 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="card-body">
                <h3 className="card-title text-primary">{blog.title}</h3>
                <p className="text-base-content/70">{blog.desc}</p>
                <p className="text-sm text-base-content/50 mt-2">{blog.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rider Stats / Achievements */}
      <div className="max-w-5xl w-full text-center">
        <h2 className="text-2xl font-semibold text-primary mb-8">
          Rider Achievements
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "120+", label: "Rides Completed", icon: Activity },
            { value: "50K km", label: "Total Distance", icon: MapPin },
            { value: "15", label: "Countries Explored", icon: Globe2 },
            { value: "10+", label: "Years Riding", icon: Award },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="card bg-base-200 shadow-md border border-base-300 hover:border-primary/40 hover:scale-[1.03] transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <stat.icon className="mb-3 text-primary w-8 h-8" />
                <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
                <p className="text-base-content/70">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}