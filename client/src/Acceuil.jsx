import { React, useState, createElement, Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { Link, Navigate } from "react-router-dom";

import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { FaKey } from "react-icons/fa";
// import imageIllust from "./assets/projet.jpg";
import { MdDashboard } from "react-icons/md";
const navListMenuItems = [
  {
    title: "Etudiant",
    description: "Connexion qu'aux étudiants",
    link: "/etudiant/login",
    icon: SquaresPlusIcon,
  },
  {
    title: "Encadrant",
    description: "Connexion qu'aux encadrants",
    link: "/encadrant/login",
    icon: UserGroupIcon,
  },
  {
    title: "Admin",
    description: "Connexion qu'aux admins",
    link: "/admin/login",
    icon: Bars4Icon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, link }, key) => (
      <Link to={link} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-sm !bg-blue-gray-50 p-2  ">
            {" "}
            {createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium     ">
            <ListItem
              className="flex items-center justify-between gap-2 py-5 font-bold pr-4 text-gray-900 "
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              S'Authentifier
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </Fragment>
  );
}
const features = [
  {
    name: "Intégration des Notifications par E-mail",
    description:
      "Restez informé de chaque action effectuée dans votre application grâce à des notifications par e-mail intégrées. Soyez toujours au courant, où que vous soyez.",
  },
  {
    name: "Tableau de Bord Personnalisable",
    description:
      "Personnalisez votre tableau de bord selon vos besoins et préférences. Visualisez les données qui comptent le plus pour vous, avec la mise en page que vous préférez.",
  },
  {
    name: "Contrôle d'Accès Basé sur les Rôles",
    description:
      "Définissez des rôles d'utilisateur et des autorisations granulaires pour contrôler l'accès à vos données. Assurez-vous que seules les bonnes personnes ont accès aux bonnes informations.",
  },
];
const navigation = [
  { name: "Acceuil", href: "#" },
  { name: "À propos", href: "#apropos" },
  { name: "Contacter Nous", href: "#contact" },
];

export function Acceuil() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="sticky inset-x-0 top-0 z-50 backdrop-blur-sm">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Logo</span>
              <img
                className="h-8 w-auto"
                src="https://www.pikpng.com/pngl/b/282-2822211_graduation-cap-png-vector-clipart-image-graduation-hat.png"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:gap-x-12 ml-5">
            <NavListMenu />
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Logo </span>
                <img
                  className="h-8 w-auto"
                  src="https://www.pikpng.com/pngl/b/282-2822211_graduation-cap-png-vector-clipart-image-graduation-hat.png"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="space-y-2 py-6">
                  <NavListMenu />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div id="acceuil" className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Améliorez votre <br></br>
              <span className="text-indigo-600">Gestion de PFE</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ce projet a ete creer par les etudiants de l'ISET Radés pour
              faciliter la gestion des stages au sein de l'etablissement
            </p>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      <div id="apropos" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tout ce dont vous avez besoin pour gérer votre application de
              gestion de stages de PFE
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Créez, suivez et gérez vos stages de Projet de Fin d'Études (PFE)
              avec facilité grâce à notre application conviviale. Organisez vos
              données, communiquez avec les stagiaires et superviseurs, et
              suivez le progrès des projets, le tout sur une seule plateforme
              sécurisée.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <ArrowPathIcon
                        strokeWidth={2}
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div
        id="contact"
        className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8"
      >
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contacter Nous
          </h2>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <div className="mt-2.5">
                <Input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  label="Nom"
                />
              </div>
            </div>
            <div>
              <div className="mt-2.5">
                <Input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  label="Prénom"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="mt-2.5">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  label="Adresse Mail"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="mt-2.5">
                <Textarea
                  type="textarea"
                  name="message"
                  id="message"
                  rows={4}
                  label="Message"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Button type="submit" className="w-full">
              Envoyer
            </Button>
          </div>
        </form>
      </div>
      <footer className="flex w-full flex-row flex-wrap items-center  -center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
        <Typography
          color="blue-gray"
          className="w-full font-normal text-center"
        >
          &copy; 2024 Choukani Halim et Med Hedi Bejaoui
        </Typography>
      </footer>
    </div>
  );
}
