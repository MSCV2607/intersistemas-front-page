import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.container}>
      <p className={styles.topText}>footer</p>
      <hr className={styles.divider} />
      <p className={styles.bottomText}>footer</p>
    </footer>
  )
}
