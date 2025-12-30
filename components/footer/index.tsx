import Link from "next/link";
import { CodeXml, Coins, FileText, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full px-16 pb-16 space-y-4 flex justify-center">
      <div className="flex space-x-2">
        <Link href="/app" className="hover:bg-accent ">
          <div className="text-xs flex space-x-1 items-center h-6 px-3 rounded-md">
            <div>
              <Coins size={16} />
            </div>
            <div>Support</div>
          </div>
        </Link>
        <Link href="/app" className="hover:bg-accent">
          <div className="text-xs flex space-x-1 items-center h-6 px-3 rounded-md">
            <div>
              <FileText size={16} />
            </div>
            <div>Terms</div>
          </div>
        </Link>
        <Link href="/app" className="hover:bg-accent">
          <div className="text-xs flex space-x-1 items-center h-6 px-3 rounded-md">
            <div>
              <Lock size={16} />
            </div>
            <div>Privacy</div>
          </div>
        </Link>
        <Link href="/app" className="hover:bg-accent">
          <div className="text-xs flex space-x-1 items-center h-6 px-3 rounded-md">
            <div>
              <CodeXml size={16} />
            </div>
            <div>Github</div>
          </div>
        </Link>
      </div>
    </footer>
  );
}
