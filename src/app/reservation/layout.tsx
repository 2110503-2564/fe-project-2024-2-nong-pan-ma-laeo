import styles from './reservation.module.css'
import ReservationMenu from '@/components/ReservationMenu'

export default function ReservationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.sectionlayout}>
            
                {/* <ReservationMenu /> */}
                {children}
            
        </div>
    )
} 