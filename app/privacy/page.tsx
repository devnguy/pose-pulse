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
        <CardContent>
          No data is collected. Pose Pulse merely displays images hosted on
          Pinterest. Local images you use are not stored.
        </CardContent>
      </Card>
    </PageLayout>
  );
}
