import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("SignOut Error:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src="/koalibook_icon2.png"
          alt="Koalibook Logo"
          width={80}
          height={80}
        />
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/books">My bookshelf</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        {user && (
          <li className={globalStyles.button}>
            <button onClick={handleSignOut}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
