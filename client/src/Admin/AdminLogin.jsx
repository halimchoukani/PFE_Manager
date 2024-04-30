import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  async function login(ev) {
    ev.preventDefault();
    const responce = await fetch("http://localhost:3001/admin/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (responce.ok) {
      responce.json().then((data) => {
        setRedirect(true);
      });
    } else {
      console.log("Invalid email or password");
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
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
          <form className=" space-y-6" onSubmit={login}>
            <div>
              <label className="h-full relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  id="motdepasse"
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

            <div className="mb-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                S'Authentifier
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
