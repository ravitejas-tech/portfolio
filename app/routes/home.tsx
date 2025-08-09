import { motion } from "framer-motion";

export default function () {
    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-8 lg:py-16">
            <div className="max-w-6xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
                    <motion.div
                        className="flex-1 text-center lg:text-left order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.h1
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Hi, I'm{" "}
                            <span className="text-primary-500 inline-block">
                                Kasi Raviteja Salva
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-6 font-body"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Full Stack Developer
                        </motion.p>

                        <motion.p
                            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            Passionate about creating innovative web solutions
                            and bringing ideas to life through clean, efficient
                            code and stunning user experiences.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            <button className="px-8 py-3 bg-primary-500 text-black-900 font-semibold rounded-lg hover:bg-primary-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/25">
                                View My Work
                            </button>
                            <button className="px-8 py-3 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-500 hover:text-black-900 transition-all duration-300 transform hover:scale-105">
                                Contact Me
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex-shrink-0 order-1 lg:order-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative">
                            <motion.div
                                className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-primary-300/20 rounded-full blur-2xl"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            <motion.div
                                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary-500/30 shadow-2xl"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src="/images/avatar_placeholder.png"
                                    alt="Kasi Raviteja Salva"
                                    className="w-full h-full object-cover bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-900"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-transparent" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute top-20 left-10 w-4 h-4 bg-primary-400 rounded-full opacity-60"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute top-40 right-20 w-3 h-3 bg-primary-300 rounded-full opacity-40"
                    animate={{
                        y: [0, -15, 0],
                        x: [0, 10, 0],
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />

                <motion.div
                    className="absolute bottom-40 left-20 w-2 h-2 bg-primary-200 rounded-full opacity-50"
                    animate={{
                        x: [0, 15, 0],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
            </div>
        </section>
    );
}
