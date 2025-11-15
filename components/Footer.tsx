import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">CollabSphere</h3>
            <p className="text-sm text-muted-foreground">
              Connecting students to build amazing things together.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/explore" className="hover:text-primary">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

  
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CollabSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
