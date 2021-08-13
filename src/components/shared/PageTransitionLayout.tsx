import { motion } from "framer-motion";

function PageTransitionLayout({children}: any) {
    return (
        <motion.div
            initial={{opacity: 0.4}}
            animate={{opacity: 1}}
            exit={{opacity: 0.4}}
        >
            {children}
        </motion.div>   
    )
}

export default PageTransitionLayout;