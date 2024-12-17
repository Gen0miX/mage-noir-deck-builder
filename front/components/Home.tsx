import Image from "next/image";
import bg from "@/public/cape_galactique_wallpaper.png";

export default function Home() {
  return (
    <section className="flex flex-1 justify-center items-center font-p h-full">
      <div className="">
        <h1 className="text-3xl font-semibold text-center">
          Un site de deck building pour <br />
          <span className="text-7xl font-heading font-black">Mage Noir.</span>
        </h1>
        <div>
          <h2 className="text-xl text-center mt-10 mb-5">
            Recherchez un deck ou créez le vôtre !
          </h2>
          <div className="flex justify-center gap-4">
            <button className="btn btn-secondary w-24 text-base-content text-lg">
              Chercher
            </button>
            <button className="btn btn-primary w-24 text-base-content text-lg">
              Créer
            </button>
          </div>
        </div>
      </div>
      <Image
        alt="Background image"
        src={bg}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: -1,
        }}
      />
    </section>
  );
}
