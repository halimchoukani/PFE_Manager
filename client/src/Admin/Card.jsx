import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Progress,
} from "@material-tailwind/react";

export default function MyCard(props) {
  return (
    <Card className="mt-6 w-full h-full">
      <CardBody>
        <svg
          className="mb-4 h-12 w-12 text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
        </svg>
        <div className="w-full">
          <div className="mb-2 flex items-center justify-between gap-4">
            <Typography color="blue-gray" variant="h6">
              {props.title}
            </Typography>
            <Typography color="blue-gray" variant="h6">
              {props.progress}
            </Typography>
          </div>
          <Progress value={props.progressValue} />
        </div>
      </CardBody>
    </Card>
  );
}
