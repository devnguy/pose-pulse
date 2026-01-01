import PageLayout from "@/components/layout/page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { H1 } from "@/components/ui/typography";

export default function Terms() {
  return (
    <PageLayout>
      <div className="py-6">
        <H1 className="text-left">Terms of Service</H1>
      </div>
      <Card>
        <CardContent>Terms of service</CardContent>
      </Card>
    </PageLayout>
  );
}
