import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="px-4 md:px-16 pb-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="w-full">
            <Header />
            <div className="flex justify-center">
              <div className="w-[740px]">{children}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
