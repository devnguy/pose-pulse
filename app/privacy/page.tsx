import PageLayout from "@/components/layout/page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { H1 } from "@/components/ui/typography";

export default function Privacy() {
  return (
    <PageLayout>
      <div className="py-6">
        <H1 className="text-left">Privacy Policy</H1>
      </div>
      <Card>
        <CardContent>test</CardContent>
      </Card>
    </PageLayout>
  );
}
