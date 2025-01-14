export default function VerifyEmail() {
  return (
    <div className="flex flex-col justify-center gap-3 px-5 bg-base-200 bg-opacity-90 border border-base-content border-opacity-40 rounded-lg shadow-lg max-w-md">
      <h1 className="font-heading text-2xl font-bold uppercase self-center mt-10">
        Vérifie ton Email !
      </h1>
      <p className="text-center text-base-content text-opacity-80">
        Merci de t’être inscrit sur notre plateforme. Pour activer ton compte,
        nous avons envoyé un email à l’adresse que tu as utilisée lors de
        l’inscription.
      </p>
      <ul
        className="list-disc text-secondary
       text-opacity-80 px-10 space-y-2 text-sm"
      >
        <li>Vérifie ta boîte de réception (et aussi tes spams au cas où).</li>
        <li>Clique sur le lien dans l’e-mail pour confirmer ton compte.</li>
      </ul>
      <p className="text-center text-sm text-base-content text-opacity-70 italic">
        Si tu n’as pas reçu l’e-mail après quelques minutes, tu peux demander à
        le renvoyer.
      </p>
      <div className="flex justify-center">
        <button
          className="btn btn-primary mt-3 mb-10 text-base-content"
          onClick={() => {
            // Ajoute ici la logique pour renvoyer l'e-mail
            alert("Le lien de vérification a été renvoyé !");
          }}
        >
          Renvoyer l'Email
        </button>
      </div>
    </div>
  );
}
