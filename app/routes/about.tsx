import { motion } from "framer-motion";

const ITEMS = [
    {
        title: "Cross-Functional Collaboration",
        description:
            "Experienced in working closely with UI/UX designers and testing teams to ensure seamless product delivery",
        delay: 1.0,
    },
    {
        title: "Technology Adaptability",
        description:
            "Quick to learn and adapt to new technologies, frameworks, and development methodologies",
        delay: 1.1,
    },
    {
        title: "Project Excellence",
        description:
            "Delivered multiple successful projects with focus on quality, performance, and user experience",
        delay: 1.2,
    },
    {
        title: "Team Leadership",
        description:
            "Strong team player with excellent communication skills and collaborative mindset",
        delay: 1.3,
    },
];

export default function About() {
    return (
        <section className="min-h-screen pt-25 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <motion.div
                        className="space-y-6 lg:space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg blur opacity-25"></div>
                            <div className="relative bg-white dark:bg-black-800 p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                                    Before a single line of code appears on the
                                    screen, most of the work has already been
                                    done. The process begins with research —
                                    understanding the problem, exploring
                                    possibilities, and designing a clear path
                                    forward. Around 80% of the effort goes into
                                    this stage, making the remaining 20% of
                                    coding a smooth and purposeful execution.
                                </p>
                                <div className="h-4" />
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                                    Collaboration plays a central role. Working
                                    closely with UI/UX designers, testers, and
                                    cross-functional teams has shaped an
                                    approach that values both precision and
                                    usability. Adapting to new tools and
                                    technologies comes naturally, and each
                                    project is seen as an opportunity to create
                                    something innovative, functional, and worth
                                    using.
                                </p>
                                <div className="h-4" />
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                                    Whether it’s part of a larger team or
                                    through freelance work, the goal remains the
                                    same — to turn well-researched ideas into
                                    meaningful, reliable solutions.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <motion.h3
                            className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white-50 mb-4 lg:mb-6 font-heading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            What I Bring to the Table
                        </motion.h3>

                        <div className="space-y-4">
                            {ITEMS.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-4 rounded-lg bg-gray-50 dark:bg-black-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 transition-colors duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: skill.delay,
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <motion.div
                                        className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: skill.delay + 0.2,
                                        }}
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white-50 text-sm sm:text-base">
                                            {skill.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-body">
                                            {skill.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-12 lg:mt-16 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                >
                    <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-6 sm:p-8 border border-primary-200 dark:border-primary-800">
                        <motion.h3
                            className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white-50 mb-4 font-heading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 2.6 }}
                        >
                            Let's Build Something Amazing Together
                        </motion.h3>
                        <motion.p
                            className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 font-body leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 2.8 }}
                        >
                            I'm always excited about new opportunities and
                            challenges. Whether it's building scalable
                            applications, optimizing user experiences, or
                            solving complex technical problems, I'm ready to
                            contribute my skills and passion to your next
                            project.
                        </motion.p>
                        <motion.div
                            className="flex flex-wrap justify-center gap-3 sm:gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 3.0 }}
                        >
                            {[
                                "Problem Solver",
                                "Continuous Learner",
                                "Quality Focused",
                            ].map((tag, index) => (
                                <motion.span
                                    key={index}
                                    className="px-3 sm:px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm font-medium"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 3.2 + index * 0.1,
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="absolute top-20 left-4 sm:left-10 w-3 sm:w-4 h-3 sm:h-4 bg-primary-400 rounded-full opacity-60"
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
                className="absolute top-32 sm:top-40 right-6 sm:right-20 w-2 sm:w-3 h-2 sm:h-3 bg-primary-300 rounded-full opacity-40"
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
                className="absolute bottom-32 sm:bottom-40 left-6 sm:left-20 w-2 h-2 bg-primary-200 rounded-full opacity-50"
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
        </section>
    );
}
