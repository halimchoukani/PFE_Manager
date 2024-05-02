import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
export function FormulaireStage() {
  function AjouterStage(ev) {
    ev.preventDefault();
  }

  return (
    <div className=" absolute w-screen h-screen">
      <Card className="w-full p-5 flex flex-col justify-center items-center">
        <Typography variant="h4" color="blue-gray">
          Stage PFE {new Date().getFullYear()} - {new Date().getFullYear() + 1}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Remplissez les informations de votre stage correctement
        </Typography>
        <form className="mt-8 mb-2 w-10/12 flex flex-col justify-between items-center">
          <div className="mx-auto mb-1 flex flex-row justify-center items-center gap-6 w-full">
            <div className="w-full flex flex-col gap-4">
              <Input type="text" size="lg" label="Votre CIN" />
              <Input type="text" size="lg" label="Votre Nom" />
              <Input type="text" size="lg" label="Votre Prénom" />
              <Input type="email" size="lg" label="Votre  " />
              <div className="w-full">
                <Select
                  label="Selectionnez votre binome"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>
              <Input type="email" size="lg" label="Email de votre binome" />
              <Textarea
                type="textarea"
                name="sujet"
                id="sujet"
                rows={4}
                label="Sujet de votre stage"
                defaultValue={""}
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full">
                <Select
                  label="Selectionnez votre encadrant de l'iset"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>
              <Input type="text" size="lg" label="Nom de votre société" />
              <Input type="text" size="lg" label="Encadrant de votre société" />
              <Input type="text" size="lg" label="Email de votre société" />
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Fichier de Stage (PDF)
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Ajouter un fichier</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="application/pdf"
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PDF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                J'ai submiter mon informati on correctement
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}
