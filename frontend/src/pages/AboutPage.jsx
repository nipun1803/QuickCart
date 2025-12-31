import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  UsersRound,
  ShieldCheck,
  ShoppingBag,
  Smile,
  Target
} from "lucide-react";

function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zinc-50 to-orange-50/30 py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold mb-6">
              <Target size={16} /> Our Vision
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl lg:text-6xl font-extrabold text-zinc-900 leading-tight mb-6">
              Redefining <span className="text-orange-500">E-Commerce</span> <br />One Order at a Time.
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-zinc-600">
              At QuickCart, we believe shopping should be more than just a transaction.
              It's about trust, speed, and the joy of finding exactly what you need.
              We're building the future of retail, designed for you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-extrabold text-zinc-900 text-center mb-12">
              Why Shop With Us?
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, title: "Guaranteed Trust", desc: "100% secure payments and buyer protection for every single order." },
                { icon: ShoppingBag, title: "Curated Collection", desc: "Hand-picked, verified products from the best sellers around the globe." },
                { icon: Smile, title: "Customer Obsession", desc: "Round-the-clock support and hassle-free return policies designed for you." }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="text-center p-8 bg-zinc-50 rounded-2xl hover:shadow-xl transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
                  <p className="text-zinc-500">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-900 to-zinc-800">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white text-center mb-12">
              QuickCart in Numbers
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: ShoppingBag, value: 250000, label: "Orders Delivered" },
                { icon: UsersRound, value: 50000, label: "Satisfied Customers" },
                { icon: ShieldCheck, value: 1200, label: "Registered Partners" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <stat.icon size={40} className="mx-auto mb-4 text-orange-400" />
                  <h3 className="text-4xl font-extrabold text-white mb-2">
                    <CountUp end={stat.value} duration={2.5} separator="," />+
                  </h3>
                  <p className="text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-extrabold text-zinc-900 text-center mb-12">
              The Minds Behind QuickCart
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { name: "Nipun Reddy", role: "Founder & Architect", img: "https://i.pravatar.cc/150?img=12" },
                { name: "Riya Sen", role: "Director of Marketing", img: "https://i.pravatar.cc/150?img=5" },
                { name: "Arjun Mehta", role: "Lead Engineering", img: "https://i.pravatar.cc/150?img=8" }
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-zinc-900 text-lg">{member.name}</h4>
                  <p className="text-zinc-500">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
