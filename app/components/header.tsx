import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const navItems = [
    { name: "Home", path: "/" },
    { name: "About Me", path: "/about" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Tech Stack", path: "/tech-stack" },
    { name: "Contact", path: "/contact" },
];

const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const navItemVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const activeSection = useMemo(() => {
        const currentItem = navItems.find(
            (item) => item.path === location.pathname
        );
        return currentItem ? currentItem.name : "Home";
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavigation = useCallback(
        (item: (typeof navItems)[0]) => {
            navigate(item.path);
            setIsOpen(false);
        },
        [navigate]
    );

    return (
        <motion.header
            variants={headerVariants as any}
            initial="hidden"
            animate="visible"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-white-50/95 dark:bg-black-900/95 backdrop-blur-xl shadow-xl border-b border-primary-400/30"
                    : "bg-gradient-to-r from-white-50/80 via-white-50/60 to-white-50/80 dark:from-black-900/80 dark:via-black-900/60 dark:to-black-900/80"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex items-center space-x-2 group cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="relative"
                        >
                            <Sparkles className="w-6 h-6 text-primary-500 group-hover:text-primary-400" />
                        </motion.div>
                        <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 bg-clip-text text-transparent group-hover:from-primary-400 group-hover:to-primary-500 transition-all duration-300">
                            Ravi Teja
                        </h1>
                    </motion.div>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.name}
                                variants={navItemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    delay: 0.3 + index * 0.1,
                                    duration: 0.5,
                                    ease: "easeOut",
                                }}
                                onClick={() => handleNavigation(item)}
                                className={`relative text-sm lg:text-base font-medium transition-all duration-300 group ${
                                    activeSection === item.name
                                        ? "text-primary-500 scale-105"
                                        : "text-gray-700 dark:text-white-200 hover:text-primary-400 hover:scale-102"
                                }`}
                            >
                                <span className="relative z-10">
                                    {item.name}
                                </span>

                                {activeSection === item.name && (
                                    <motion.div
                                        layoutId="activeUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                                        transition={{
                                            type: "spring",
                                            bounce: 0.2,
                                            duration: 0.6,
                                        }}
                                    />
                                )}

                                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400/40 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                            </motion.button>
                        ))}
                    </nav>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative p-3 rounded-xl bg-white-100/80 dark:bg-black-800/80 backdrop-blur-sm border border-primary-200/30 dark:border-primary-500/30 text-gray-700 dark:text-white-200 hover:text-primary-500 hover:border-primary-400/50 transition-all duration-200 group"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 bg-primary-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.2 }}
                        />
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                            className="md:hidden fixed inset-0 bg-black-900/60 backdrop-blur-sm z-40"
                        />

                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-white-50/95 to-white-100/95 dark:from-black-800/95 dark:to-black-900/95 backdrop-blur-xl shadow-2xl border-l border-primary-200/30 dark:border-primary-500/30 z-50"
                        >
                            <div className="p-6 h-full flex flex-col">
                                <div className="flex justify-between items-center mb-8 pb-4 border-b border-primary-200/20 dark:border-primary-500/20">
                                    <div className="flex items-center space-x-2">
                                        <Sparkles className="w-5 h-5 text-primary-500" />
                                        <h2 className="text-lg font-bold text-primary-500">
                                            Menu
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-500/20 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <nav className="flex-1 space-y-1">
                                    {navItems.map((item, index) => (
                                        <motion.button
                                            key={item.name}
                                            initial={{ y: -20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay: index * 0.1,
                                                duration: 0.4,
                                            }}
                                            onClick={() =>
                                                handleNavigation(item)
                                            }
                                            className={`relative w-full text-left px-4 py-3 font-medium transition-all duration-300 group ${
                                                activeSection === item.name
                                                    ? "text-primary-500 scale-105"
                                                    : "text-gray-700 dark:text-white-200 hover:text-primary-400 hover:scale-102"
                                            }`}
                                        >
                                            <span className="relative z-10 flex items-center justify-between">
                                                {item.name}
                                                {activeSection ===
                                                    item.name && (
                                                    <motion.div
                                                        initial={{
                                                            scale: 0,
                                                            rotate: -180,
                                                        }}
                                                        animate={{
                                                            scale: 1,
                                                            rotate: 0,
                                                        }}
                                                        className="w-2 h-2 bg-primary-500 rounded-full"
                                                    />
                                                )}
                                            </span>

                                            {activeSection === item.name && (
                                                <motion.div
                                                    layoutId="mobileActiveIndicator"
                                                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-primary-600 rounded-r-full"
                                                    transition={{
                                                        type: "spring",
                                                        bounce: 0.2,
                                                        duration: 0.6,
                                                    }}
                                                />
                                            )}

                                            <motion.div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-400/40 rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
                                        </motion.button>
                                    ))}
                                </nav>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="pt-6 border-t border-primary-200/20 dark:border-primary-500/20 text-center"
                                >
                                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-primary-400/10 border border-primary-200/20 dark:border-primary-500/20">
                                        <Sparkles className="w-4 h-4 text-primary-500" />
                                        <span className="text-sm text-gray-600 dark:text-white-300">
                                            Crafted with ❤️
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
