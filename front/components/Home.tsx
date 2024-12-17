export default function Home() {
  return (
    <section className="flex flex-1 justify-center items-center bg-[url('/cape_galactique_wallpaper.png')] bg-cover bg-center font-p">
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
            <button className="btn btn-secondary w-24 text-base-content">
              Chercher
            </button>
            <button className="btn btn-secondary w-24 text-base-content">
              Créer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
