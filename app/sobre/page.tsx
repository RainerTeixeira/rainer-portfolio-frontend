import Image from "next/image"

export default function SobrePage() {
  const skills = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", 
    "MongoDB", "Docker", "AWS", "Git", "Agile", "Scrum"
  ]

  const experience = [
    {
      period: "2020 - Atual",
      role: "Desenvolvedor Full-Stack Freelancer",
      description: "Desenvolvimento de aplicações web e mobile para clientes diversos, focado em soluções escaláveis e modernas."
    },
    {
      period: "2018 - 2020",
      role: "Desenvolvedor Frontend",
      description: "Especialização em React e desenvolvimento de interfaces de usuário responsivas e acessíveis."
    },
    {
      period: "2016 - 2018",
      role: "Desenvolvedor Junior",
      description: "Início da carreira trabalhando com tecnologias web tradicionais e aprendendo as bases do desenvolvimento moderno."
    }
  ]

  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
      {/* Efeito de partículas sutis - apenas no dark */}
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100">
        <div className="absolute top-24 left-1/5 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-45"></div>
        <div className="absolute top-80 right-1/5 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-35" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-80 left-1/3 w-0.5 h-0.5 bg-pink-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1.8s' }}></div>
      </div>
      
      {/* Header da página */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary dark:border-cyan-400/50 shadow-lg dark:shadow-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-cyan-400/10 dark:to-purple-400/10 blur-sm opacity-0 dark:opacity-100"></div>
              <Image
                src="/images/t2.jpg"
                alt="Rainer Teixeira - Desenvolvedor Full-Stack"
                fill
                className="object-cover relative z-10"
                sizes="128px"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-primary dark:from-cyan-400 dark:to-purple-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground dark:text-white text-sm font-bold">💻</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground dark:text-cyan-200 dark:font-mono dark:tracking-wider">Sobre Mim</h1>
          <div className="w-28 h-1 bg-gradient-to-r from-primary to-primary dark:from-cyan-400 dark:to-purple-400 mx-auto mb-6"></div>
          <p className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto dark:font-mono">
            Sou um desenvolvedor Full-Stack apaixonado por tecnologia e inovação. Com mais de 8 anos de experiência no mercado, trabalho criando soluções digitais que fazem a diferença na vida das pessoas e empresas.
          </p>
        </div>
      </div>

      {/* Conteúdo da página com grid padrão */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experiência */}
          <div className="border-l-4 border-primary dark:border-cyan-400 pl-6 bg-card/40 dark:bg-black/20 rounded-r-xl p-6 backdrop-blur-sm border border-border/40 dark:border-cyan-400/20">
            <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-cyan-200 dark:font-mono">Experiência</h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground dark:text-gray-200">{exp.role}</h3>
                  <span className="text-sm text-muted-foreground dark:text-cyan-400 dark:font-mono">{exp.period}</span>
                </div>
                <p className="text-muted-foreground dark:text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="bg-card/40 dark:bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-border/40 dark:border-purple-400/20">
            <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-purple-200 dark:font-mono">Tecnologias</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-cyan-400/10 dark:to-purple-400/10 text-primary dark:text-cyan-300 rounded-full font-medium hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 dark:hover:from-cyan-400/20 dark:hover:to-purple-400/20 transition-all duration-300 border border-border/20 dark:border-cyan-400/20 hover:border-border/40 dark:hover:border-cyan-400/40 dark:font-mono text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}