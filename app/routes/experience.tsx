import { motion } from "framer-motion";

const experiences = [
    {
        id: 1,
        current: true,
        period: "02 Dec 2024 - Present",
        designation: "Frontend Developer",
        company: "BOP Consultancy and Services, Pune",
        type: "On-site",
        description:
            "Working as a frontend developer, and learning backend skills while working on backend tasks and collaborated with UI/UX designers and testers",
        techStack: [
            "React Native",
            "Remix JS",
            "Refine",
            "Zustand",
            "Tailwind CSS",
            "Nest JS",
            "TypeORM",
            "MySQL",
            "TypeScript",
        ],
        projects: [
            {
                name: "Synergy",
                description:
                    "A yoga appointment booking mobile application using react native, Nest JS, TypeORM and MySQL and backoffice in Refine. Done payment gateway integration using cashfree, integrated notification system using Novu. Handled all user roles Admin, Center Admin, Therapist and Patient across the entire system.",
                status: "Link available soon",
            },
            {
                name: "Surge",
                description:
                    "A telegram mini app. A crypto swiping game, predict pump or dump on crypto coins (Bitcoin and etc.), Created features like Leaderboards, Surge AI for recommendations, User tasks, User wallets, game currencies, Statistics and Analytics. Participated in frontend and backend Remix JS, Nest JS, TypeORM, MySQL.",
                status: "Link available soon",
            },
        ],
    },
    {
        id: 2,
        current: false,
        period: "01 Aug 2024 - 30 Nov 2024",
        designation: "MERN Stack Intern",
        company: "Aptitude Guru Hem, Chennai",
        type: "Remote",
        description:
            "Worked as a MERN Stack intern developing full-stack applications and gaining experience in modern web development technologies",
        techStack: [
            "MongoDB",
            "Express.js",
            "React.js",
            "Node.js",
            "JavaScript",
        ],
        projects: [
            {
                name: "Recruitment Management System (RMS)",
                description:
                    "Created a system for recruiters and students to easily apply for jobs by adding features like bulk apply, analytics, exams, notifications etc.",
                status: "Completed",
            },
        ],
    },
];

export default function () {
    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-8 lg:py-20">
            <div className="max-w-6xl mx-auto w-full">
                <div className="space-y-12 lg:space-y-16">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            className="group"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2 + index * 0.3,
                            }}
                        >
                            <div className="bg-white dark:bg-black-800 rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                                {/* Subtle Background Glow */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 1.5 }}
                                />

                                {/* Header Section */}
                                <motion.div
                                    className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.4 + index * 0.3,
                                    }}
                                >
                                    <div className="mb-4 lg:mb-0">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-primary-500">
                                                {exp.designation}
                                            </h3>
                                            {exp.current && (
                                                <motion.span
                                                    className="px-4 py-2 bg-primary-500 text-black-900 text-sm font-bold rounded-full"
                                                    animate={{
                                                        scale: [1, 1.05, 1],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                    }}
                                                >
                                                    Current
                                                </motion.span>
                                            )}
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                                            {exp.company}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                                            {exp.type}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-primary-500 font-bold text-lg">
                                            {exp.period}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Description */}
                                <motion.p
                                    className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.6 + index * 0.3,
                                    }}
                                >
                                    {exp.description}
                                </motion.p>

                                {/* Tech Stack */}
                                <motion.div
                                    className="mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.8 + index * 0.3,
                                    }}
                                >
                                    <h5 className="font-heading font-bold text-gray-800 dark:text-gray-200 mb-4">
                                        Tech Stack
                                    </h5>
                                    <div className="flex flex-wrap gap-3">
                                        {exp.techStack.map(
                                            (tech, techIndex) => (
                                                <motion.span
                                                    key={tech}
                                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-300"
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.4,
                                                        delay:
                                                            1 +
                                                            index * 0.3 +
                                                            techIndex * 0.1,
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            )
                                        )}
                                    </div>
                                </motion.div>

                                {/* Projects */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 1.2 + index * 0.3,
                                    }}
                                >
                                    <h5 className="font-heading font-bold text-gray-800 dark:text-gray-200 mb-6">
                                        Key Projects
                                    </h5>
                                    <div className="space-y-6">
                                        {exp.projects.map(
                                            (project, projectIndex) => (
                                                <motion.div
                                                    key={project.name}
                                                    className="border-l-4 border-primary-500/40 pl-6 py-3 hover:border-primary-500 transition-all duration-300"
                                                    initial={{
                                                        opacity: 0,
                                                        x: 30,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                        delay:
                                                            1.4 +
                                                            index * 0.3 +
                                                            projectIndex * 0.2,
                                                    }}
                                                    whileHover={{ x: 10 }}
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <h6 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                                                            {project.name}
                                                        </h6>
                                                        <span className="text-xs text-primary-500 font-semibold bg-primary-500/10 px-3 py-1 rounded-full">
                                                            {project.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                        {project.description}
                                                    </p>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Elements (same as home) */}
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
