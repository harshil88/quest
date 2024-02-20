import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface GridComponentProps {
  name: string;
  handleCategory: () => void;
}

function GridComponent({ name, handleCategory }: GridComponentProps) {
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle className="grow">{name}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button className="grow" onClick={() => handleCategory()}>
          Start
        </Button>
      </CardFooter>
    </Card>
  );
}

export default GridComponent;
