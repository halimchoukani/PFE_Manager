import React, { useState } from "react";
import io from "socket.io-client";

export default function AdminLogin() {
  const [email, setUsername] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function registerAdmin() {
    if (password !== cpassword) {
      setError("Les mots de passe ne correspondent pas");
      document.getElementById("error").style.opacity = 1;
    } else {
      try {
        const response = await fetch("http://localhost:3001/admin/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cin,
            nom,
            prenom,
            email,
            password,
          }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          setError(errorMessage);
          document.getElementById("error").style.opacity = 1;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log(data);
        setError("Inscription réussie");
        document.getElementById("error").style.opacity = 1;
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div className="flex min-h-full h-auto flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/*  */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            S'Inscrire
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div
            className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 opacity-0"
            id="error"
          >
            {" "}
            {error}{" "}
          </div>
          <form className="space-y-6" onSubmit={registerAdmin}>
            <div>
              <label className="h-full relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  id="cin"
                  value={cin}
                  onChange={(e) => {
                    if (e.target.value.length <= 8) {
                      setCin(e.target.value);
                    }
                    if (isNaN(e.target.value)) {
                      setCin("");
                    }
                  }}
                  name="cin"
                  type="text"
                  autoComplete="cin"
                  required
                  className="h-10 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-2 w-full rounded-md text-sm text-gray-900"
                  placeholder="cin"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Votre CIN
                </span>
              </label>
            </div>
            <div className="flex flex-row flex-wrap justify-between items-center gap-1 ">
              <div className="flex-1 w-50 ">
                <label className="h-full relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <input
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    name="nom"
                    type="text"
                    required
                    className="h-10 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-2 w-full rounded-md text-sm text-gray-900"
                    placeholder="Nom"
                  />

                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Votre Nom
                  </span>
                </label>
              </div>
              <div className="flex-1 w-50 ">
                <label className="h-full relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <input
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    name="prenom"
                    type="text"
                    autoComplete="prenom"
                    required
                    className="h-10 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-2 w-full rounded-md text-sm text-gray-900"
                    placeholder="Username"
                  />

                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    Votre Prénom
                  </span>
                </label>
              </div>
            </div>
            <div>
              <label className="h-full relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  id="remail"
                  value={email}
                  onChange={(e) => setUsername(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-10 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-2 w-full rounded-md text-sm text-gray-900"
                  placeholder="Username"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Adresse mail
                </span>
              </label>
            </div>

            <div>
              <label className="h-full relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  id="rmotdepasse"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  required
                  className="h-10 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-2 w-full rounded-md text-sm text-gray-900"
                  placeholder="Mot de passe"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Mot de passe
                </span>
              </label>
            </div>
            <div>
              <label className="h-full relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  id="cmotdepasse"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  name="cpassword"
                  type="password"
                  required
                  className="h-10 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 px-2 py-2 w-full rounded-md text-sm text-gray-900"
                  placeholder="Confirmer le mot de passe"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Confirmer le mot de passe
                </span>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enregistrer
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Vous avez un compte ?{" "}
            <a
              href=""
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              S'Authentifier
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
