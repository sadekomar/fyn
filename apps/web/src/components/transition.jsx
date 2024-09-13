import { motion } from "framer-motion";
import './transition.css'

export function Transition({ children }) {
    return <>
        <motion.div className="slide-in"
            initial={{ x: '-2000px' }}
            animate={{ x: '0' }}
            exit={{ x: '0' }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
        </motion.div>


        <motion.div
            className="slide-out"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    </>

}