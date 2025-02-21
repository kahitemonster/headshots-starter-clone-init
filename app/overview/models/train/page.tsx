import TrainModelZone from "@/components/TrainModelZone";
import StripeTestComponent from "./stripeTest";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default async function Index() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return (
    <div className="w-full max-w-2xl mx-auto mt-[90px]">
      <div
        id="train-model-container"
        className="flex flex-1 flex-col gap-2 px-2"
      >
        <Link href="/overview" className="text-sm w-fit">
          <Button variant={"outline"} className="hover:bg-gray-500">
            <FaArrowLeft className="mr-2" />
            Go Back
            {/* Wracać */}
          </Button>
        </Link>
        <Card className="text-white bg-transparent border-0">
          <CardHeader>
            <CardTitle>Generate character</CardTitle>
            {/* <CardTitle>Model pociągu</CardTitle> */}
            <CardDescription>
              Choose a name, type, and upload some photos to get started.
              {/* Aby rozpocząć, wybierz nazwę, wpisz ją i prześlij kilka zdjęć. */}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <TrainModelZone />
          </CardContent>
        </Card>
      </div>
      {/* <StripeTestComponent stripeSecretKey={stripeSecretKey} endpointSecret={endpointSecret} supabaseUrl={supabaseUrl} supabaseServiceRoleKey={supabaseServiceRoleKey}></StripeTestComponent> */}
    </div>
  );
}
