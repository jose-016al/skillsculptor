import React from 'react';
import { DiJavascript1, DiNodejs, DiPython, DiJava, DiRuby, DiSwift, DiSass, DiBootstrap, DiGit, DiReact, DiSymfony, } from "react-icons/di";
import { FaHtml5, FaCss3Alt, FaPhp, FaVuejs, FaLaravel, FaAngular, FaWordpress, FaGithub, } from "react-icons/fa";
import { SiTypescript, SiDjango, SiDotnet, SiCsharp, SiCplusplus, SiTailwindcss, SiUnity, SiVisualstudiocode, } from "react-icons/si";

// Mapeo de los lenguajes con sus respectivos íconos
const iconsMap = {
    html: <FaHtml5 />,
    css: <FaCss3Alt />,
    javascript: <DiJavascript1 />,
    nodejs: <DiNodejs />,
    python: <DiPython />,
    java: <DiJava />,
    php: <FaPhp />,
    vuejs: <FaVuejs />,
    react: <DiReact />,
    symfony: <DiSymfony />,
    laravel: <FaLaravel />,
    typescript: <SiTypescript />,
    angular: <FaAngular />,
    django: <SiDjango />,
    wordpress: <FaWordpress />,
    csharp: <SiCsharp />,
    dotnet: <SiDotnet />,
    ruby: <DiRuby />,
    cplusplus: <SiCplusplus />,
    swift: <DiSwift />,
    sass: <DiSass />,
    unity: <SiUnity />,
    bootstrap: <DiBootstrap />,
    tailwind: <SiTailwindcss />,
    git: <DiGit />,
    github: <FaGithub />,
    vscode: <SiVisualstudiocode />,
};

export const Stack = ({ languages }) => {
    return (
        <div className="flex flex-wrap justify-center mt-5">
            {languages.map((language) => (
                <div key={language} className="text-5xl m-2">
                    {iconsMap[language]} {/* Renderiza el ícono según el lenguaje */}
                </div>
            ))}
        </div>
    );
};
