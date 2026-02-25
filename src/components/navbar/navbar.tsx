"use client";
import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar: React.FC = () => {
	return (
		<header className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.left}>
					<span className={styles.logo}>LOGO</span>
				</div>
				<div className={styles.spacer} />

				<nav className={styles.right} aria-label="Main navigation">
					<ul className={styles.menu}>
						<li><Link href="#" className={styles.menuLink}>Nosotros</Link></li>
						<li><Link href="#" className={styles.menuLink}>Servicios</Link></li>
						<li><Link href="#" className={styles.menuLink}>Soluciones</Link></li>
						<li><Link href="#" className={styles.menuLink}>Contacto</Link></li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
