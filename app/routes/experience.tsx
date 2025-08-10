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
            "Contributing as a Frontend Developer while actively expanding backend development skills through hands-on tasks. Collaborated closely with UI/UX designers and QA teams to deliver user-friendly, high-performance applications. Involved in end-to-end development, from planning to deployment, ensuring seamless integration between frontend and backend systems.",
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
                    "Developed a comprehensive yoga appointment booking mobile application using React Native, Nest JS, TypeORM, and MySQL, with a back-office panel built in Refine. Integrated Cashfree for secure payment processing and Novu for a real-time notification system. Implemented robust role-based access controls for Admin, Center Admin, Therapist, and Patient, ensuring smooth workflow across the platform.",
                status: "Link available soon",
            },
            {
                name: "Surge",
                description:
                    "Built a Telegram Mini App — a crypto prediction game where users forecast coin movements (e.g., Bitcoin pump/dump). Developed features including Leaderboards, AI-powered recommendations (Surge AI), gamified tasks, multi-currency wallet system, and advanced statistics dashboards. Worked across both frontend and backend using Remix JS, Nest JS, TypeORM, and MySQL.",
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
            "Completed a remote internship as a MERN Stack Developer, building full-stack applications with a focus on scalable architecture, efficient data handling, and user-centric design. Strengthened expertise in modern JavaScript frameworks and database management while working in an agile environment.",
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
                    "Engineered a web-based recruitment platform enabling recruiters and students to connect seamlessly. Implemented key features such as bulk job applications, analytical dashboards, online exams, and instant notifications, improving efficiency and user engagement for both stakeholders.",
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
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 1.5 }}
                                />

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

                                <motion.div
                                    className="mb-8 relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.8 + index * 0.3,
                                    }}
                                >
                                    <h5 className="font-heading font-bold text-gray-800 dark:text-gray-200 mb-6">
                                        Tech Stack
                                    </h5>

                                    <div className="relative">
                                        <div className="flex flex-wrap gap-2 items-center">
                                            {exp.techStack.map(
                                                (tech, techIndex) => (
                                                    <motion.span
                                                        key={tech}
                                                        className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent border border-gray-200 dark:border-gray-600 rounded-full hover:border-primary-400 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group/tech"
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
                                                                techIndex *
                                                                    0.05,
                                                            type: "spring",
                                                            bounce: 0.3,
                                                        }}
                                                        whileHover={{
                                                            scale: 1.05,
                                                            transition: {
                                                                duration: 0.2,
                                                            },
                                                        }}
                                                    >
                                                        <motion.div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-primary-400/10 to-primary-500/5 rounded-full opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300" />

                                                        <motion.div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-500 rounded-full opacity-0 group-hover/tech:opacity-100 scale-0 group-hover/tech:scale-100 transition-all duration-300" />

                                                        <span className="relative z-10">
                                                            {tech}
                                                        </span>
                                                    </motion.span>
                                                )
                                            )}
                                        </div>

                                        <motion.div
                                            className="absolute -bottom-3 left-0 h-px bg-gradient-to-r from-transparent via-primary-200 dark:via-primary-700 to-transparent opacity-30"
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{
                                                duration: 1.2,
                                                delay: 1.5 + index * 0.3,
                                                ease: "easeOut",
                                            }}
                                        />
                                    </div>
                                </motion.div>

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
