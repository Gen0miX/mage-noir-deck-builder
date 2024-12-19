"use client";

import ElementIcon from "./ElementIcon";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <section className="flex flex-col justify-center items-center h-full">
      <div className="flex gap-1 sm:gap-5">
        {[1, 2, 3, 4, 5, 6].map((id, index) => (
          <motion.div
            key={id}
            className="w-10 sm:w-14"
            animate={{
              y: [0, -30, 0], // Mouvement de "saut"
            }}
            transition={{
              duration: 0.8, // Durée de chaque saut
              ease: "easeInOut",
              repeat: Infinity, // Animation infinie
              repeatDelay: 0.8,
              delay: index * 0.2, // Délai progressif pour chaque icône
            }}
          >
            <ElementIcon id={id} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
