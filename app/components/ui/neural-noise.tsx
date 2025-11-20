import { useRef, useEffect } from "react";

interface PointerState {
    x: number;
    y: number;
    tX: number;
    tY: number;
}

interface Uniforms {
    [key: string]: WebGLUniformLocation | null;
}

export const NeuralNoise = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const glRef = useRef<WebGLRenderingContext | null>(null);
    const uniformsRef = useRef<Uniforms | null>(null);
    const pointerRef = useRef<PointerState>({
        x: 0,
        y: 0,
        tX: 0,
        tY: 0,
    });

    const vertexShaderSource = `
    precision mediump float;

    varying vec2 vUv;
    attribute vec2 a_position;

    void main() {
        vUv = .5 * (a_position + 1.);
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

    const fragmentShaderSource = `
    precision mediump float;

    varying vec2 vUv;
    uniform float u_time;
    uniform float u_ratio;
    uniform vec2 u_pointer_position;
    uniform float u_scroll_progress;

    vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
    }

    float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 8.;

        for (int j = 0; j < 15; j++) {
            uv = rotate(uv, 1.);
            sine_acc = rotate(sine_acc, 1.);
            vec2 layer = uv * scale + float(j) + sine_acc - t;
            sine_acc += sin(layer) + 2.4 * p;
            res += (.5 + .5 * cos(layer)) / scale;
            scale *= (1.2);
        }
        return res.x + res.y;
    }

    void main() {
        vec2 uv = .5 * vUv;
        uv.x *= u_ratio;

        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0., 1.);
        p = .5 * pow(1. - p, 2.);

        float t = .001 * u_time;
        vec3 color = vec3(0.);

        float noise = neuro_shape(uv, t, p);

        noise = 1.2 * pow(noise, 3.);
        noise += pow(noise, 10.);
        noise = max(.0, noise - .5);
        noise *= (1. - length(vUv - .5));

        // Blue/indigo color palette
        color = vec3(0.0, 0.9, 0.9); // Base aqua color (#00e6e6)
        color += vec3(0.0, 0.4, 0.4) * sin(3.0 * u_scroll_progress + 1.5); // Darker aqua variation

        color = color * noise;

        gl_FragColor = vec4(color, noise);
    }
  `;

    const createShader = (
        gl: WebGLRenderingContext,
        sourceCode: string,
        type: number
    ): WebGLShader | null => {
        const shader = gl.createShader(type);
        if (!shader) return null;

        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(
                "An error occurred compiling the shaders: " +
                    gl.getShaderInfoLog(shader)
            );
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    };

    const createShaderProgram = (
        gl: WebGLRenderingContext,
        vertexShader: WebGLShader,
        fragmentShader: WebGLShader
    ): WebGLProgram | null => {
        const program = gl.createProgram();
        if (!program) return null;

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(
                "Unable to initialize the shader program: " +
                    gl.getProgramInfoLog(program)
            );
            return null;
        }

        return program;
    };

    const getUniforms = (
        gl: WebGLRenderingContext,
        program: WebGLProgram
    ): Uniforms => {
        const uniforms: Uniforms = {};
        const uniformCount = gl.getProgramParameter(
            program,
            gl.ACTIVE_UNIFORMS
        );
        for (let i = 0; i < uniformCount; i++) {
            const uniformInfo = gl.getActiveUniform(program, i);
            if (uniformInfo) {
                uniforms[uniformInfo.name] = gl.getUniformLocation(
                    program,
                    uniformInfo.name
                );
            }
        }
        return uniforms;
    };

    const initShader = (): WebGLRenderingContext | null => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const context =
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");

        // Type guard to ensure we have a WebGLRenderingContext
        if (!context || !(context instanceof WebGLRenderingContext)) {
            alert("WebGL is not supported by your browser.");
            return null;
        }

        const gl = context as WebGLRenderingContext;

        const vertexShader = createShader(
            gl,
            vertexShaderSource,
            gl.VERTEX_SHADER
        );
        const fragmentShader = createShader(
            gl,
            fragmentShaderSource,
            gl.FRAGMENT_SHADER
        );

        if (!vertexShader || !fragmentShader) return null;

        const shaderProgram = createShaderProgram(
            gl,
            vertexShader,
            fragmentShader
        );

        if (!shaderProgram) return null;

        uniformsRef.current = getUniforms(gl, shaderProgram);

        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        gl.useProgram(shaderProgram);

        const positionLocation = gl.getAttribLocation(
            shaderProgram,
            "a_position"
        );
        gl.enableVertexAttribArray(positionLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        return gl;
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        const gl = glRef.current;
        if (!canvas || !gl) return;

        const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
        canvas.width = window.innerWidth * devicePixelRatio;
        canvas.height = window.innerHeight * devicePixelRatio;

        const uniforms = uniformsRef.current;
        if (uniforms && uniforms.u_ratio) {
            gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
        }
        gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = () => {
        const gl = glRef.current;
        const uniforms = uniformsRef.current;
        const pointer = pointerRef.current;

        if (!gl || !uniforms) return;

        const currentTime = performance.now();

        pointer.x += (pointer.tX - pointer.x) * 0.2;
        pointer.y += (pointer.tY - pointer.y) * 0.2;

        if (uniforms.u_time) {
            gl.uniform1f(uniforms.u_time, currentTime);
        }
        if (uniforms.u_pointer_position) {
            gl.uniform2f(
                uniforms.u_pointer_position,
                pointer.x / window.innerWidth,
                1 - pointer.y / window.innerHeight
            );
        }
        if (uniforms.u_scroll_progress) {
            gl.uniform1f(
                uniforms.u_scroll_progress,
                window.pageYOffset / (2 * window.innerHeight)
            );
        }

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        animationRef.current = requestAnimationFrame(render);
    };

    const updateMousePosition = (x: number, y: number) => {
        pointerRef.current.tX = x;
        pointerRef.current.tY = y;
    };

    const handlePointerMove = (e: PointerEvent) => {
        updateMousePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
        updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleClick = (e: MouseEvent) => {
        updateMousePosition(e.clientX, e.clientY);
    };

    useEffect(() => {
        glRef.current = initShader();
        resizeCanvas();
        render();

        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("pointermove", handlePointerMove as any);
        window.addEventListener("touchmove", handleTouchMove as any);
        window.addEventListener("click", handleClick as any);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("pointermove", handlePointerMove as any);
            window.removeEventListener("touchmove", handleTouchMove as any);
            window.removeEventListener("click", handleClick as any);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-95"
                style={{ backgroundColor: "#000000" }}
            />
        </>
    );
};
