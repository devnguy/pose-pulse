import PageLayout from "@/components/layout/page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { H1 } from "@/components/ui/typography";

export default function About() {
  return (
    <PageLayout>
      <div className="py-6">
        <H1 className="text-left">About</H1>
      </div>
      <Card>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </CardContent>
      </Card>
    </PageLayout>
  );
}
