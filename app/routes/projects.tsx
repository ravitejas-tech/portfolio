import { motion } from "framer-motion";
import { toast } from "sonner";
import { projects } from "~/data/projects";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

export default function Projects() {
    return (
        <section className="min-h-screen py-20 lg:py-24">
            <div className="w-full">
                {/* Projects List */}
                <motion.div
                    className="space-y-0"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="relative"
                            variants={itemVariants as any}
                        >
                            {/* Project Container with Background */}
                            <div
                                className={`${
                                    index % 2 === 0
                                        ? "bg-white dark:bg-black-900"
                                        : "bg-gray-50 dark:bg-black-800"
                                } 
                                py-16 lg:py-20 relative overflow-hidden`}
                            >
                                <div className="max-w-6xl mx-auto px-4">
                                    <div
                                        className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-start mt-8 lg:mt-0`}
                                    >
                                        {/* Project Image/Visual */}
                                        <motion.div
                                            className="w-full lg:w-1/2 flex-shrink-0"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="relative group">
                                                <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
                                                <div className="relative h-64 sm:h-80 lg:h-72 bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 dark:from-primary-800 dark:via-primary-700 dark:to-primary-600 rounded-2xl overflow-hidden border-2 border-primary-300 dark:border-primary-600 shadow-xl">
                                                    {/* Project Icon */}
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <img
                                                            src={project.image}
                                                        />
                                                    </div>

                                                    {/* Overlay with Links */}
                                                    <div className="absolute bottom-4 right-4 flex gap-3">
                                                        <a
                                                            href={
                                                                project.liveLink
                                                            }
                                                            target="_blank"
                                                            onClick={() => {
                                                                if (
                                                                    !project.liveLink
                                                                ) {
                                                                    toast.warning(
                                                                        "This project is not available on live demo. Please visit github repository."
                                                                    );
                                                                }
                                                            }}
                                                            rel="noopener noreferrer"
                                                            className="bg-primary-500 hover:bg-primary-400 text-black-900 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                        >
                                                            Live Demo
                                                        </a>
                                                        <a
                                                            href={
                                                                project.githubLink
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-white-50/90 dark:bg-black-900/90 backdrop-blur-sm hover:bg-white-50 dark:hover:bg-black-800 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 border border-primary-200 dark:border-primary-700"
                                                        >
                                                            GitHub
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Project Content */}
                                        <div className="w-full lg:w-1/2 space-y-6">
                                            {/* Title and Description */}
                                            <div>
                                                <motion.h2
                                                    className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 dark:text-white-50 mb-4"
                                                    initial={{
                                                        opacity: 0,
                                                        x:
                                                            index % 2 === 0
                                                                ? -30
                                                                : 30,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.8,
                                                        delay: 0.2,
                                                    }}
                                                >
                                                    <span className="text-primary-500">
                                                        {project.title}
                                                    </span>
                                                </motion.h2>
                                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Features */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white-50 mb-3">
                                                    Key Features
                                                </h3>
                                                <ul className="space-y-2">
                                                    {project.features.map(
                                                        (
                                                            feature,
                                                            featureIndex
                                                        ) => (
                                                            <motion.li
                                                                key={
                                                                    featureIndex
                                                                }
                                                                className="flex items-start gap-3"
                                                                initial={{
                                                                    opacity: 0,
                                                                    x: -20,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    x: 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.5,
                                                                    delay:
                                                                        0.3 +
                                                                        featureIndex *
                                                                            0.1,
                                                                }}
                                                            >
                                                                <span className="text-primary-500 text-lg mt-0.5">
                                                                    •
                                                                </span>
                                                                <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                                                                    {feature}
                                                                </span>
                                                            </motion.li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>

                                            {/* Tech Stack */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white-50 mb-3">
                                                    Technologies Used
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.techStack.map(
                                                        (tech, techIndex) => (
                                                            <motion.span
                                                                key={techIndex}
                                                                className="px-3 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg font-medium text-sm border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors duration-200"
                                                                initial={{
                                                                    opacity: 0,
                                                                    scale: 0.8,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    scale: 1,
                                                                }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                    delay:
                                                                        0.5 +
                                                                        techIndex *
                                                                            0.05,
                                                                }}
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                }}
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Note Section */}
                <motion.div
                    className="mt-20 lg:mt-24 px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700 rounded-2xl p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <div className="text-3xl flex-shrink-0">💡</div>
                            <div>
                                <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2">
                                    Important Note About Live Demos
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Since I've deployed my projects on free
                                    hosting plans, some may be inactive due to
                                    inactivity timeouts. If a live demo isn't
                                    working or takes time to load, I encourage
                                    you to visit the GitHub repository to
                                    explore the complete source code,
                                    documentation, and setup instructions. Each
                                    repository contains detailed README files
                                    with project screenshots and implementation
                                    details.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Floating Decorative Elements */}
                <motion.div
                    className="fixed top-1/4 left-8 w-3 h-3 bg-primary-400 rounded-full opacity-60 pointer-events-none"
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
                    className="fixed top-1/2 right-12 w-2 h-2 bg-primary-300 rounded-full opacity-40 pointer-events-none"
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
                    className="fixed bottom-1/4 left-1/4 w-4 h-4 bg-primary-200 rounded-full opacity-50 pointer-events-none"
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
