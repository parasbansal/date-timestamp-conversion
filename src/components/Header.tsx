import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Header() {
  return (
    <header className="h-12 border-b flex items-center justify-between px-4 gap-2">
      <span />
      <h1 className="text-xl font-semibold"> Date - Timestamp Conversion </h1>

      <div className="flex gap-2 items-center justify-end">
        <a href="https://github.com/parasbansal/date-time-convertor">
          <GitHubLogoIcon className="w-6 h-6" />
        </a>
      </div>
    </header>
  );
}
