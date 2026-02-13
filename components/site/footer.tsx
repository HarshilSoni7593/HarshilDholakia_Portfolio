export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Harshil Dholakia</p>
        <p><a href="mailto:harshilsd1952@gmail.com" className="hover:text-primary transition-colors">harshilsd1952@gmail.com</a>
          <a href="callto:+15197217426" className="ml-4 hover:text-primary transition-colors">+1 (519) 721-7426</a>
        </p>
        <p>Built with Next.js, Tailwind, shadcn/ui</p>
      </div>
    </footer>
  );
}
