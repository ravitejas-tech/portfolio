"use client";
import { Send, Code, Smartphone, Globe } from "lucide-react";
import { AlignJustify, X } from "lucide-react";
import { useRef, useState } from "react";
import { Drawer } from "vaul";
import { AnimatedTooltip } from "~/components/ui/animated-tooltip";
import { LiquidGlassCard } from "~/components/ui/liquid-glass";
import { NeuralNoise } from "~/components/ui/neural-noise";
import { ProgressiveBlur } from "~/components/ui/progressive-blur";
import { TimelineContent } from "~/components/ui/timeline-animation";
import VerticalCutReveal from "~/components/ui/vertical-cut-reveal";
import { useMediaQuery } from "~/hooks/use-media-query";

const techStack = [
    {
        id: 1,
        name: "React, Remix & Next.js",
        designation: "Frontend",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=350&q=80",
    },
    {
        id: 2,
        name: "Nest JS & Node JS",
        designation: "Backend",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=350&q=80",
    },
    {
        id: 3,
        name: "SQL & MongoDB",
        designation: "Database",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=350&q=80",
    },
    {
        id: 4,
        name: "React Native",
        designation: "Mobile Development",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=350&q=80",
    },
];

export default function () {
    const isMobile = useMediaQuery("(max-width: 992px)");
    const [isOpen, setIsOpen] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const revealVariants = {
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.4,
                duration: 0.5,
            },
        }),
        hidden: {
            filter: "blur(10px)",
            y: -20,
            opacity: 0,
        },
    };
    const opacityVariants = {
        visible: (i: number) => ({
            opacity: 1,
            transition: {
                delay: i * 0.4,
                duration: 0.5,
            },
        }),
        hidden: {
            opacity: 0,
        },
    };

    return (
        <section
            className="min-h-screen relative pb-10 bg-cover bg-center bg-no-repeat"
            style={{ fontFamily: "var(--font-body)" }}
            ref={heroRef}
        >
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source
                    src="https://videos.pexels.com/video-files/9318313/9318313-uhd_2560_1440_24fps.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            <TimelineContent
                as="figure"
                className="absolute top-0 left-0 w-full h-full"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
            >
                <NeuralNoise />
            </TimelineContent>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto xl:px-0 px-5">
                <article className="max-w-2xl text-white space-y-4 pt-14">
                    {/* Status Badge */}
                    <div className="h-10"></div>

                    <TimelineContent
                        as="div"
                        animationNum={1}
                        timelineRef={heroRef}
                        customVariants={revealVariants}
                        className="flex items-center space-x-3 mt-4"
                    >
                        <span className="relative flex size-4">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500 opacity-75"></span>
                            <span className="relative inline-flex size-4 rounded-full bg-primary-600"></span>
                        </span>
                        <span className="sm:text-lg text-sm">
                            Available for freelance & full-time opportunities
                        </span>
                    </TimelineContent>

                    {/* Main Headline */}
                    <h1
                        className="sm:text-5xl text-3xl lg:text-6xl font-semibold leading-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        <VerticalCutReveal
                            splitBy="words"
                            staggerDuration={0.15}
                            staggerFrom="first"
                            reverse={true}
                            containerClassName="justify-start"
                            transition={{
                                type: "spring",
                                stiffness: 250,
                                damping: 40,
                                delay: 0.8,
                            }}
                        >
                            Fullstack Developer crafting powerful web & mobile
                            experiences
                        </VerticalCutReveal>
                    </h1>
                </article>

                <div className="grid lg:grid-cols-2 gap-12 items-end">
                    <div className="space-y-8 sm:pt-0 pt-4">
                        <TimelineContent
                            as="p"
                            animationNum={2}
                            timelineRef={heroRef}
                            customVariants={revealVariants}
                            className="sm:text-xl text-lg text-white leading-relaxed max-w-lg"
                        >
                            Hi, I'm{" "}
                            <span className="text-primary-400 font-semibold">
                                Raviteja Salva
                            </span>
                            , a passionate developer specializing in building
                            scalable applications,{" "}
                            <span className="text-gray-200">
                                from responsive websites to cross-platform
                                mobile apps.
                            </span>
                        </TimelineContent>

                        <TimelineContent
                            as="div"
                            animationNum={3}
                            timelineRef={heroRef}
                            customVariants={revealVariants}
                            className="flex flex-wrap gap-3"
                        >
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-primary-500/30">
                                <Globe className="w-5 h-5 text-primary-400" />
                                <span className="text-white">
                                    Web Development
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-primary-500/30">
                                <Smartphone className="w-5 h-5 text-primary-400" />
                                <span className="text-white">
                                    App Development
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-primary-500/30">
                                <Code className="w-5 h-5 text-primary-400" />
                                <span className="text-white">Fullstack</span>
                            </div>
                        </TimelineContent>

                        <TimelineContent
                            as="button"
                            animationNum={4}
                            timelineRef={heroRef}
                            customVariants={revealVariants}
                            className="bg-primary-500 text-black-900 font-semibold px-8 py-4 rounded-full text-lg hover:bg-primary-400 transition-colors duration-200 shadow-lg shadow-primary-500/50"
                        >
                            View My Projects
                        </TimelineContent>
                    </div>

                    <TimelineContent
                        as="div"
                        animationNum={5}
                        timelineRef={heroRef}
                        customVariants={opacityVariants}
                        className="lg:mt-24"
                    >
                        <LiquidGlassCard
                            glowIntensity="none"
                            shadowIntensity="sm"
                            borderRadius="12px"
                            blurIntensity="lg"
                            className="p-4 ml-auto sm:w-[28rem] w-full border border-primary-500/20"
                        >
                            <div className="flex items-center gap-10 mb-6">
                                <div className="flex flex-row items-center justify-start">
                                    <AnimatedTooltip items={techStack} />
                                </div>
                                <span className="text-white font-medium text-sm">
                                    Expertise across modern tech stack
                                </span>
                            </div>

                            <div className="p-4 rounded-lg bg-white/10">
                                <p className="text-white text-sm leading-relaxed">
                                    Specialized in React, Next.js, Node.js, and
                                    React Native. I transform ideas into
                                    production-ready applications with clean
                                    code, seamless UX, and scalable
                                    architecture.
                                </p>

                                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-primary-500/30">
                                    <div>
                                        <div className="text-primary-400 text-2xl font-bold">
                                            10+
                                        </div>
                                        <div className="text-white/70 text-xs">
                                            Projects
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-primary-400 text-2xl font-bold">
                                            1+
                                        </div>
                                        <div className="text-white/70 text-xs">
                                            Years Exp
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-primary-400 text-2xl font-bold">
                                            10+
                                        </div>
                                        <div className="text-white/70 text-xs">
                                            Skills
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </LiquidGlassCard>
                    </TimelineContent>
                </div>
            </div>

            {/* Tech Stack Section */}
            {/* <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mt-28 xl:px-0 px-5 mb-12 text-white max-w-7xl mx-auto relative z-10"
            >
                <div className="flex flex-wrap items-center justify-between gap-8">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-primary-400">
                            Core Technologies:
                        </span>
                    </div>

                    <div className="text-lg font-semibold hover:text-primary-400 transition-colors">
                        React
                    </div>
                    <div className="text-lg font-semibold hover:text-primary-400 transition-colors">
                        Next.js
                    </div>
                    <div className="text-lg font-semibold hover:text-primary-400 transition-colors">
                        Node.js
                    </div>
                    <div className="text-lg font-semibold hover:text-primary-400 transition-colors">
                        TypeScript
                    </div>
                    <div className="text-lg font-semibold hover:text-primary-400 transition-colors">
                        React Native
                    </div>
                </div>
            </TimelineContent> */}

            <ProgressiveBlur
                className="pointer-events-none absolute bottom-0 left-0 h-[25%] w-full"
                blurIntensity={0.5}
            />
        </section>
    );
}
