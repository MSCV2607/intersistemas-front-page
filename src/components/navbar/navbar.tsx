"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

const Navbar: React.FC = () => {
	return (
		<header className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.left}>
					<Link href="/" aria-label="Inicio" className={styles.logo}>
						<div className={styles.logoImages}>
							<Image
								src="/logo/interSistemas-cmyk-imprimir_iso_1.png"
								alt="InterSistemas iso"
								width={56}
								height={56}
							/>
							<Image
								src="/logo/interSistemas-cmyk-imprimir_1.png"
								alt="InterSistemas texto"
								width={160}
								height={56}
							/>
						</div>
					</Link>
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
